import React, { Component } from 'react';
import LifetimeStats from './LifetimeStats.jsx';
import Badges from './Badges.jsx';
import dummyData from './dummyData.js';
import TimeSeriesBarChart from './TimeSeriesBarChart.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Workouts from './Workouts.jsx';
import Goals from './Goals.jsx';
import GoalModal from './GoalModal';

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
        this.setState({ 
          isLoggedIn: true,
          userData
        });
        this.fetchUserData();
      } else {
        this.setState({ 
          isLoggedIn: false,
          userData: null,
          ...dummyData
        });
      }
    } catch (error) {
      console.error('Error checking login status:', error);
      this.setState({ 
        isLoggedIn: false,
        userData: null,
        ...dummyData
      });
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
          console.log(`Fetching data from ${endpoint}`);
          const response = await fetch(endpoint, { headers });
          console.log(`Response from ${endpoint}:`, response.status, response.statusText);
          if (!response.ok) return null;
          const data = await response.json();
          console.log(`Data from ${endpoint}:`, data);
          return data;
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
      // Keep the dummy data if API calls fail
      this.setState({
        ...dummyData
      });
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
        // Refresh the workouts data
        const workoutsResponse = await fetch('/api/workouts', {
          headers: {
            'X-CSRF-Token': this.getCsrfToken(),
            'Accept': 'application/json'
          }
        });
        const workouts = await workoutsResponse.json();
        
        // Update lifetime stats
        const lifetimeStatsResponse = await fetch('/api/lifetime_stats', {
          headers: {
            'X-CSRF-Token': this.getCsrfToken(),
            'Accept': 'application/json'
          }
        });
        const lifetimeStats = await lifetimeStatsResponse.json();

        this.setState(prevState => ({
          workouts: workouts || prevState.workouts,
          lifetimeStats: lifetimeStats || prevState.lifetimeStats
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
        // Refresh the goals data
        const goalsResponse = await fetch('/api/goals', {
          headers: {
            'X-CSRF-Token': this.getCsrfToken(),
            'Accept': 'application/json'
          }
        });
        const goals = await goalsResponse.json();
        this.setState(prevState => ({
          goals: Array.isArray(goals) ? goals : prevState.goals
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
      this.setState({ 
        isLoggedIn: false,
        userData: null,
        ...dummyData
      });
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
  };

  getCaloriesChartData = (workouts) => {
    const last3 = this.getLastNDates(3);
    const map = {};
    (workouts || []).forEach(w => {
      const date = w.date;
      map[date] = (map[date] || 0) + (w.calories || 0);
    });
    return last3.map(date => ({
      dateTime: date,
      value: map[date] || 0
    }));
  };

  getDistanceChartData = (workouts) => {
    const last3 = this.getLastNDates(3);
    const map = {};
    (workouts || []).forEach(w => {
      const date = w.date;
      map[date] = (map[date] || 0) + (w.distance || 0);
    });
    return last3.map(date => ({
      dateTime: date,
      value: map[date] || 0
    }));
  };

  getCaloriesYMax = (workouts) => {
    const arr = this.getCaloriesChartData(workouts);
    return Math.max(100, ...arr.map(d => d.value)) + 50;
  };

  getDistanceYMax = (workouts) => {
    const arr = this.getDistanceChartData(workouts);
    return Math.max(5, ...arr.map(d => d.value)) + 1;
  };

  render() {
    const { isLoggedIn, showLoginForm, showSignupForm, lifetimeStats, badges, steps, distance, workouts, goals, userData } = this.state;

    if (showSignupForm) {
      return <Signup onSignupSuccess={this.handleSignupSuccess} onCancel={this.handleCancelSignup} />;
    }

    if (showLoginForm) {
      return <Login onLoginSuccess={this.handleLoginSuccess} onShowSignup={this.handleShowSignup} />;
    }

    return (
      <div className="container-fluid py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>ReactFit Dashboard</h1>
          {isLoggedIn ? (
            <button className="btn btn-outline-danger" onClick={this.handleLogout}>
              Logout
            </button>
          ) : (
            <button className="btn btn-primary" onClick={this.handleLogin}>
              Login
            </button>
          )}
        </div>

        <div className="text-center mb-4">
          {isLoggedIn && userData && (
            <p className="text-muted mb-0">Welcome back, {userData.display_name}!</p>
          )}
          {!isLoggedIn && (
            <div className="alert alert-info mx-auto" style={{ maxWidth: '900px' }}>
              <i className="fas fa-info-circle me-2"></i>
              You are not logged in. Showing demo data. Please login to track your own fitness journey!
            </div>
          )}
        </div>

        <div className="row g-4">
          <div className="col-md-3">
            <div className="d-flex flex-column h-100">
              <Goals goals={goals} onAddGoal={this.handleAddGoal} isLoggedIn={isLoggedIn} />
              <Badges badges={isLoggedIn ? (Array.isArray(badges) ? badges : []) : dummyData.badges} />
            </div>
          </div>

          <div className="col-md-5">
            <div className="d-flex flex-column h-100">
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

          <div className="col-md-4">
            <div className="d-flex flex-column h-100">
              <Workouts workouts={workouts} onAddWorkout={this.handleAddWorkout} />
              <LifetimeStats lifetimeStats={lifetimeStats} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;