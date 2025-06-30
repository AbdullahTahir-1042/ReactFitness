import React, { Component } from 'react';
import LifetimeStats from './LifetimeStats.jsx';
import Badges from './Badges.jsx';
import dummyData from './dummyData.js';
import TimeSeriesBarChart from './TimeSeriesBarChart.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Workouts from './Workouts.jsx';
import Goals from './Goals.jsx';
import { FaUserFriends, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      showLoginForm: false,
      showSignupForm: false,
      userData: null,
      lifetimeStats: dummyData.lifetimeStats,
      badges: dummyData.badges,
      steps: dummyData.steps,
      distance: dummyData.distance,
      workouts: dummyData.workouts,
      goals: dummyData.goals
    };
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  getCsrfToken = () => {
    return document.querySelector('meta[name="csrf-token"]').content;
  }

  checkLoginStatus = async () => {
    try {
      const response = await fetch('/api/profile', {
        headers: {
          'X-CSRF-Token': this.getCsrfToken(),
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        const userData = await response.json();
        this.setState({ isLoggedIn: true, userData });
        this.fetchUserData();
      } else {
        this.setState({ isLoggedIn: false, userData: null, ...dummyData });
      }
    } catch (error) {
      console.error('Error checking login status:', error);
      this.setState({ isLoggedIn: false, userData: null, ...dummyData });
    }
  }

  fetchUserData = async () => {
    try {
      const headers = {
        'X-CSRF-Token': this.getCsrfToken(),
        'Accept': 'application/json'
      };

      const fetchData = async (endpoint) => {
        try {
          const response = await fetch(endpoint, { headers });
          if (!response.ok) return null;
          return await response.json();
        } catch (error) {
          console.error(`Error fetching ${endpoint}:`, error);
          return null;
        }
      };

      const [lifetimeStats, badges, steps, distance, workouts, goals] = await Promise.all([
        fetchData('/api/lifetime_stats'),
        fetchData('/api/badges'),
        fetchData('/api/steps'),
        fetchData('/api/distance'),
        fetchData('/api/workouts'),
        fetchData('/api/goals')
      ]);

      this.setState({
        lifetimeStats: lifetimeStats || dummyData.lifetimeStats,
        badges: badges || dummyData.badges,
        steps: steps || dummyData.steps,
        distance: distance || dummyData.distance,
        workouts: Array.isArray(workouts) ? workouts : dummyData.workouts,
        goals: Array.isArray(goals) ? goals : dummyData.goals
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
      this.setState({ ...dummyData });
    }
  }

  handleAddWorkout = async (workoutData) => {
    try {
      const response = await fetch('/api/workouts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': this.getCsrfToken()
        },
        body: JSON.stringify({ workout: workoutData })
      });

      if (response.ok) {
        const [workoutsRes, statsRes] = await Promise.all([
          fetch('/api/workouts', {
            headers: {
              'X-CSRF-Token': this.getCsrfToken(),
              'Accept': 'application/json'
            }
          }),
          fetch('/api/lifetime_stats', {
            headers: {
              'X-CSRF-Token': this.getCsrfToken(),
              'Accept': 'application/json'
            }
          })
        ]);

        const workouts = await workoutsRes.json();
        const lifetimeStats = await statsRes.json();

        this.setState(prev => ({
          workouts: workouts || prev.workouts,
          lifetimeStats: lifetimeStats || prev.lifetimeStats
        }));
      } else {
        console.error('Failed to add workout');
      }
    } catch (error) {
      console.error('Error adding workout:', error);
    }
  }

  handleAddGoal = async (goalData) => {
    try {
      const response = await fetch('/api/goals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': this.getCsrfToken()
        },
        body: JSON.stringify({ goal: goalData })
      });

      if (response.ok) {
        const res = await fetch('/api/goals', {
          headers: {
            'X-CSRF-Token': this.getCsrfToken(),
            'Accept': 'application/json'
          }
        });
        const goals = await res.json();
        this.setState(prev => ({
          goals: Array.isArray(goals) ? goals : prev.goals
        }));
      } else {
        console.error('Failed to add goal');
      }
    } catch (error) {
      console.error('Error adding goal:', error);
    }
  }

  handleLogin = () => {
    this.setState({ showLoginForm: true, showSignupForm: false });
  }

  handleShowSignup = () => {
    this.setState({ showSignupForm: true, showLoginForm: false });
  }

  handleSignupSuccess = (userData) => {
    this.handleLoginSuccess(userData);
  }

  handleCancelSignup = () => {
    this.setState({ showSignupForm: false, showLoginForm: true });
  }

  handleLoginSuccess = (userData) => {
    this.setState({
      isLoggedIn: true,
      showLoginForm: false,
      showSignupForm: false,
      userData
    });
    this.fetchUserData();
  }

  handleLogout = async () => {
    try {
      await fetch('/logout', {
        method: 'DELETE',
        headers: {
          'X-CSRF-Token': this.getCsrfToken(),
          'Accept': 'application/json'
        }
      });
      this.setState({ isLoggedIn: false, userData: null, ...dummyData });
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }

  getLastNDates = (n) => {
    const dates = [];
    for (let i = n - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      dates.push(d.toISOString().split('T')[0]);
    }
    return dates;
  }

  getCaloriesChartData = (workouts) => {
    const last3 = this.getLastNDates(3);
    const map = {};
    (workouts || []).forEach(w => {
      const date = w.date;
      map[date] = (map[date] || 0) + (w.calories || 0);
    });
    return last3.map(date => ({ dateTime: date, value: map[date] || 0 }));
  }

  getDistanceChartData = (workouts) => {
    const last3 = this.getLastNDates(3);
    const map = {};
    (workouts || []).forEach(w => {
      const date = w.date;
      map[date] = (map[date] || 0) + (w.distance || 0);
    });
    return last3.map(date => ({ dateTime: date, value: map[date] || 0 }));
  }

  getCaloriesYMax = (workouts) => {
    const arr = this.getCaloriesChartData(workouts);
    return Math.max(100, ...arr.map(d => d.value)) + 50;
  }

  getDistanceYMax = (workouts) => {
    const arr = this.getDistanceChartData(workouts);
    return Math.max(5, ...arr.map(d => d.value)) + 1;
  }

  render() {
    const { isLoggedIn, showLoginForm, showSignupForm, lifetimeStats, badges, steps, distance, workouts, goals, userData } = this.state;

    if (showSignupForm) return <Signup onSignupSuccess={this.handleSignupSuccess} onCancel={this.handleCancelSignup} />;
    if (showLoginForm) return <Login onLoginSuccess={this.handleLoginSuccess} onShowSignup={this.handleShowSignup} />;

    return (
      <div className="dashboard-bg py-4" style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)' }}>
        <div className="container-fluid">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1
              style={{
                fontWeight: 700,
                letterSpacing: 1,
                background: 'linear-gradient(to right, #ff6a00, #ffb347, #00c6ff, #0072ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              <FaUserCircle className="me-2 mb-1" size={36} /> ReactFit Dashboard
            </h1>
            <div className="d-flex gap-2">
              {isLoggedIn ? (
                <>
                  <a href="/profile" className="btn btn-outline-primary d-flex align-items-center">
                    <FaUserFriends className="me-1" /> Profile
                  </a>
                  <button className="btn btn-outline-danger d-flex align-items-center" onClick={this.handleLogout}>
                    <FaSignOutAlt className="me-1" /> Logout
                  </button>
                </>
              ) : (
                <button className="btn btn-primary" onClick={this.handleLogin}>Login</button>
              )}
            </div>
          </div>

          {isLoggedIn && userData && (
            <div className="alert alert-primary shadow-sm rounded-3 mb-4 text-center" style={{ fontSize: 20, fontWeight: 500 }}>
              Welcome back, <span style={{ color: '#0d6efd', fontWeight: 700 }}>{userData.display_name}</span>! Keep pushing your limits!
            </div>
          )}

          {!isLoggedIn && (
            <div className="alert alert-info mx-auto shadow-sm rounded-3 mb-4" style={{ maxWidth: '900px', fontSize: 18 }}>
              <i className="fas fa-info-circle me-2"></i>
              You are not logged in. Showing demo data. Please login to track your own fitness journey!
            </div>
          )}

          <div className="row g-4">
            {/* Left Column: Workouts → Badges */}
            <div className="col-md-3">
              <div className="d-flex flex-column h-100 gap-3">
                <div className="card shadow rounded-4 mb-3">
                  <div className="card-body">
                    <Workouts workouts={workouts} onAddWorkout={this.handleAddWorkout} />
                  </div>
                </div>
                <div className="card shadow rounded-4">
                  <div className="card-body text-center">
                    <FaUserCircle size={28} className="mb-2 text-warning" />
                    <Badges badges={isLoggedIn ? (Array.isArray(badges) ? badges : []) : dummyData.badges} />
                  </div>
                </div>
              </div>
            </div>

            {/* Middle Column: Graphs */}
            <div className="col-md-5">
              <div className="d-flex flex-column h-100 gap-3">
                <TimeSeriesBarChart
                  data={this.getCaloriesChartData(workouts)}
                  title="Calories"
                  yMax={this.getCaloriesYMax(workouts)}
                />
                <TimeSeriesBarChart
                  data={this.getDistanceChartData(workouts)}
                  title="Distance (miles)"
                  yMax={this.getDistanceYMax(workouts)}
                />
              </div>
            </div>

            {/* Right Column: Lifetime Stats → Goals */}
            <div className="col-md-4">
              <div className="d-flex flex-column h-100 gap-3">
                <div className="card shadow rounded-4 mb-3">
                  <div className="card-body">
                    <LifetimeStats lifetimeStats={lifetimeStats} />
                  </div>
                </div>
                <div className="card shadow rounded-4">
                  <div className="card-body text-center">
                    <FaUserCircle size={28} className="mb-2 text-primary" />
                    <Goals goals={goals} onAddGoal={this.handleAddGoal} isLoggedIn={isLoggedIn} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;