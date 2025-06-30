import React, { Component } from 'react';

class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loading: true,
      error: null,
      stats: null,
      selectedUser: null,
      showUserModal: false,
      userStats: null,
      lastUpdated: null,
      refreshing: false
    };
    this.refreshInterval = null;
  }

  componentDidMount() {
    this.fetchInitialData();
    // Refresh data every 30 seconds
    this.refreshInterval = setInterval(this.refreshData, 30000);
  }

  componentWillUnmount() {
    // Clear the interval when component unmounts
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
  }

  fetchInitialData = async () => {
    await this.fetchUsers();
    await this.fetchStats();
  }

  refreshData = async () => {
    this.setState({ refreshing: true });
    await this.fetchUsers();
    await this.fetchStats();
    this.setState({ refreshing: false });
  }

  getCsrfToken = () => {
    return document.querySelector('meta[name="csrf-token"]').content;
  }

  fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/dashboard_stats', {
        headers: {
        'X-CSRF-Token': this.getCsrfToken(),
        'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch stats');
      }

      const stats = await response.json();
      this.setState({
        stats,
        lastUpdated: new Date()
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  }

  fetchUsers = async () => {
    try {
      const response = await fetch('/api/users/all', {
        headers: {
          'X-CSRF-Token': this.getCsrfToken(),
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const users = await response.json();
      this.setState({ users, loading: false });
    } catch (error) {
      console.error('Error fetching users:', error);
      this.setState({ error: error.message, loading: false });
    }
  }

  fetchUserStats = async (userId) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}/stats`, {
        headers: {
          'X-CSRF-Token': this.getCsrfToken(),
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user stats');
      }

      const stats = await response.json();
      this.setState({ userStats: stats });
    } catch (error) {
      console.error('Error fetching user stats:', error);
    }
  }

  handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'X-CSRF-Token': this.getCsrfToken(),
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      // Refresh users list and stats
      this.fetchUsers();
      this.fetchStats();
      this.setState({ showUserModal: false, selectedUser: null, userStats: null });
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user. Please try again.');
    }
  }

  handleViewUser = (user) => {
    this.setState({ selectedUser: user, showUserModal: true });
    this.fetchUserStats(user.id);
  }

  handleLogout = async () => {
    try {
      const response = await fetch('/logout', {
        method: 'DELETE',
        headers: {
          'X-CSRF-Token': this.getCsrfToken(),
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      // Redirect to login page after successful logout
      window.location.href = '/';
    } catch (error) {
      console.error('Error during logout:', error);
      alert('Failed to logout. Please try again.');
    }
  }

  renderStatsCards() {
    const { stats, lastUpdated, refreshing } = this.state;
    if (!stats) return null;

    return (
      <>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h3 className="mb-0">Dashboard Statistics</h3>
            {lastUpdated && (
              <small className="text-muted">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </small>
            )}
          </div>
          <button 
            className="btn btn-outline-primary"
            onClick={this.refreshData}
            disabled={refreshing}
          >
            {refreshing ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Refreshing...
              </>
            ) : (
              <>
                <i className="bi bi-arrow-clockwise me-2"></i>
                Refresh Data
              </>
            )}
          </button>
        </div>
        <div className="row g-3 mb-4">
          <div className="col-md-3">
            <div className="card bg-primary text-white h-100">
              <div className="card-body">
                <h6 className="card-title">Total Users</h6>
                <h2 className="card-text">{stats.total_users}</h2>
                <small>Active in last 7 days: {stats.active_users_7d}</small>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card bg-success text-white h-100">
              <div className="card-body">
                <h6 className="card-title">Total Workouts</h6>
                <h2 className="card-text">{stats.total_workouts}</h2>
                <small>This week: {stats.workouts_this_week}</small>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card bg-info text-white h-100">
              <div className="card-body">
                <h6 className="card-title">Total Goals</h6>
                <h2 className="card-text">{stats.total_goals}</h2>
                <small>Completed: {stats.completed_goals}</small>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card bg-warning text-white h-100">
              <div className="card-body">
                <h6 className="card-title">Goal Completion Rate</h6>
                <h2 className="card-text">{stats.goal_completion_rate}%</h2>
                <small>Overall success rate</small>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  renderUserModal() {
    const { selectedUser, showUserModal, userStats } = this.state;
    if (!showUserModal || !selectedUser) return null;

    const handleBackdropClick = (e) => {
      if (e.target.classList.contains('modal')) {
        this.setState({ showUserModal: false, selectedUser: null });
      }
    };

    return (
      <>
        <div 
          className="modal fade show" 
          style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} 
          onClick={handleBackdropClick}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">User Details: {selectedUser.display_name}</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => this.setState({ showUserModal: false, selectedUser: null })}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                {userStats ? (
                  <div>
                    <div className="row mb-4">
                      <div className="col-md-6">
                        <h6>Basic Information</h6>
                        <p><strong>Email:</strong> {selectedUser.email}</p>
                        <p><strong>Joined:</strong> {new Date(selectedUser.created_at).toLocaleDateString()}</p>
                        <p><strong>Status:</strong> {selectedUser.admin ? 'Admin' : 'User'}</p>
          </div>
          <div className="col-md-6">
                        <h6>Fitness Score</h6>
                        <div className="progress mb-2">
                          <div 
                            className="progress-bar" 
                            role="progressbar" 
                            style={{ width: `${Math.min(userStats.fitness_score / 10, 100)}%` }}
                            aria-valuenow={userStats.fitness_score}
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >
                            {userStats.fitness_score}
              </div>
            </div>
          </div>
        </div>
        <div className="row">
                      <div className="col-md-4">
                        <div className="card">
                          <div className="card-body">
                            <h6 className="card-title">Workouts</h6>
                            <h3>{userStats.total_workouts}</h3>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="card">
                          <div className="card-body">
                            <h6 className="card-title">Goals</h6>
                            <h3>{userStats.total_goals}</h3>
                            <small>Completed: {userStats.completed_goals}</small>
                          </div>
                        </div>
                            </div>
                      <div className="col-md-4">
                        <div className="card">
                          <div className="card-body">
                            <h6 className="card-title">Daily Stats</h6>
                            <p>Steps: {userStats.daily_steps}</p>
                            <p>Distance: {userStats.daily_distance}km</p>
                            <p>Calories: {userStats.daily_calories}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" onClick={() => this.handleDeleteUser(selectedUser.id)}>
                  Delete User
                </button>
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => this.setState({ showUserModal: false, selectedUser: null })}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  render() {
    const { users, loading, error } = this.state;

    if (loading) {
      return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
              </div>
            </div>
      );
    }

    if (error) {
      return (
        <div className="alert alert-danger m-3" role="alert">
          Error: {error}
        </div>
      );
    }

    return (
      <div className="container-fluid py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Admin Dashboard</h2>
          <div className="d-flex gap-2">
            <a href="/profile" className="btn btn-outline-primary">Profile</a>
            <button 
              className="btn btn-outline-danger" 
              onClick={this.handleLogout}
            >
              <i className="bi bi-box-arrow-right me-2"></i>
              Logout
            </button>
          </div>
        </div>
        {this.renderStatsCards()}

        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                <h4 className="mb-0">User Management</h4>
                <div className="input-group" style={{ width: '300px' }}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search users..."
                    onChange={(e) => {
                      // Implement search functionality if needed
                    }}
                  />
                  <button className="btn btn-light" type="button">
                    <i className="fas fa-search"></i>
                  </button>
                </div>
              </div>
              <div className="card-body">
              <div className="table-responsive">
                  <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Joined</th>
                      <th>Workouts</th>
                      <th>Goals</th>
                        <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                      {users.map(user => (
                      <tr key={user.id}>
                          <td>{user.id}</td>
                          <td>{user.display_name}</td>
                          <td>{user.email}</td>
                          <td>{new Date(user.created_at).toLocaleDateString()}</td>
                          <td>
                            <span className="badge bg-info">
                              {user.total_workouts || 0}
                            </span>
                          </td>
                          <td>
                            <span className="badge bg-success">
                              {user.total_goals || 0}
                            </span>
                        </td>
                        <td>
                            <span className={`badge ${user.admin ? 'bg-warning' : 'bg-primary'}`}>
                              {user.admin ? 'Admin' : 'User'}
                            </span>
                        </td>
                          <td>
                            <button
                              className="btn btn-sm btn-info me-2"
                              onClick={() => this.handleViewUser(user)}
                            >
                              <i className="fas fa-eye"></i>
                            </button>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => this.handleDeleteUser(user.id)}
                            >
                              <i className="fas fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        </div>
        {this.renderUserModal()}
      </div>
    );
  }
}

export default AdminDashboard; 