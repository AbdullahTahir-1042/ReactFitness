// app/javascript/application.js
import React12 from "react";
import { createRoot } from "react-dom/client";

// app/javascript/components/Dashboard.jsx
import React10, { Component } from "react";

// app/javascript/components/LifetimeStats.jsx
import React from "react";
function LifetimeStats({ lifetimeStats }) {
  const stats = lifetimeStats || {};
  const formatNumber = (value, decimals = 0) => {
    if (value === void 0 || value === null) return "0";
    return Number(value).toFixed(decimals);
  };
  const formatWithCommas = (value) => {
    if (value === void 0 || value === null) return "0";
    return Number(value).toLocaleString();
  };
  return /* @__PURE__ */ React.createElement("div", { className: "card mb-4" }, /* @__PURE__ */ React.createElement("div", { className: "card-header" }, /* @__PURE__ */ React.createElement("h3", null, "Lifetime Stats")), /* @__PURE__ */ React.createElement("div", { className: "card-body" }, /* @__PURE__ */ React.createElement("div", { className: "row" }, /* @__PURE__ */ React.createElement("div", { className: "col-6" }, /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("strong", null, "Total Distance:")), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("strong", null, "Total Calories:")), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("strong", null, "Total Workouts:")), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("strong", null, "Average Duration:")), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("strong", null, "Average Calories:")), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("strong", null, "Average Distance:"))), /* @__PURE__ */ React.createElement("div", { className: "col-6" }, /* @__PURE__ */ React.createElement("p", null, formatNumber(stats.total_distance, 2), " miles"), /* @__PURE__ */ React.createElement("p", null, formatWithCommas(stats.total_calories)), /* @__PURE__ */ React.createElement("p", null, formatWithCommas(stats.total_workouts)), /* @__PURE__ */ React.createElement("p", null, formatNumber(stats.average_duration), " min"), /* @__PURE__ */ React.createElement("p", null, formatWithCommas(stats.average_calories)), /* @__PURE__ */ React.createElement("p", null, formatNumber(stats.average_distance, 2), " miles")))));
}
var LifetimeStats_default = LifetimeStats;

// app/javascript/components/Badges.jsx
import React2 from "react";
function Badges({ badges }) {
  if (!badges || badges.length === 0) return null;
  return /* @__PURE__ */ React2.createElement("div", { className: "card" }, /* @__PURE__ */ React2.createElement("div", { className: "card-header" }, /* @__PURE__ */ React2.createElement("h3", null, "Badges")), /* @__PURE__ */ React2.createElement("div", { className: "card-body" }, /* @__PURE__ */ React2.createElement("div", { className: "row" }, badges.map((badge, index) => /* @__PURE__ */ React2.createElement("div", { key: badge.key, className: "col-12 mb-3" }, /* @__PURE__ */ React2.createElement("div", { className: "d-flex align-items-center" }, /* @__PURE__ */ React2.createElement("div", { style: { minWidth: 60 } }, badge.earned ? /* @__PURE__ */ React2.createElement("span", { className: "badge bg-success p-2" }, "Unlocked") : /* @__PURE__ */ React2.createElement("span", { className: "badge bg-secondary p-2" }, "Locked")), /* @__PURE__ */ React2.createElement("div", { className: "flex-grow-1 ms-3" }, /* @__PURE__ */ React2.createElement("div", { className: "fw-bold" }, badge.name), /* @__PURE__ */ React2.createElement("div", { className: "text-muted small mb-1" }, badge.description), /* @__PURE__ */ React2.createElement("div", { className: "progress", style: { height: "16px" } }, /* @__PURE__ */ React2.createElement(
    "div",
    {
      className: `progress-bar${badge.earned ? " bg-success" : ""}`,
      role: "progressbar",
      style: { width: `${Math.min(badge.progress || 0, 100)}%` },
      "aria-valuenow": badge.progress || 0,
      "aria-valuemin": "0",
      "aria-valuemax": "100"
    },
    Math.round(badge.progress || 0),
    "%"
  )))))))));
}
var Badges_default = Badges;

// app/javascript/components/dummyData.js
var dummyData_default = {
  loggedIn: false,
  user: null,
  lifetimeStats: {
    lifetime: {
      total: {
        steps: 1234567,
        distance: 567.89,
        calories: 98765
      }
    }
  },
  badges: [
    {
      key: "distance_pro",
      name: "Distance Pro",
      description: "Complete a distance goal",
      progress: 80,
      earned: false
    },
    {
      key: "calorie_crusher",
      name: "Calorie Crusher",
      description: "Complete a calories goal",
      progress: 100,
      earned: true
    },
    {
      key: "workout_warrior",
      name: "Workout Warrior",
      description: "Complete 5 workout goals",
      progress: 60,
      earned: false
    },
    {
      key: "goal_master",
      name: "Goal Master",
      description: "Complete any 10 goals",
      progress: 30,
      earned: false
    },
    {
      key: "consistency_star",
      name: "Consistency Star",
      description: "Complete a goal 3 weeks in a row",
      progress: 50,
      earned: false
    }
  ],
  steps: {
    "activities-steps": [
      { dateTime: "2024-01-01", value: 8e3 },
      { dateTime: "2024-01-02", value: 1e4 },
      { dateTime: "2024-01-03", value: 7500 }
    ]
  },
  distance: {
    "activities-distance": [
      { dateTime: "2024-01-01", value: 3.5 },
      { dateTime: "2024-01-02", value: 4.2 },
      { dateTime: "2024-01-03", value: 3.1 }
    ]
  },
  friends: {
    friends: [
      {
        displayName: "John Doe",
        avatar: "https://via.placeholder.com/32",
        steps: 8500
      },
      {
        displayName: "Jane Smith",
        avatar: "https://via.placeholder.com/32",
        steps: 12e3
      }
    ]
  },
  workouts: [
    {
      workout_type: "Running",
      duration: 30,
      calories: 300,
      distance: 5,
      date: "2024-01-03"
    },
    {
      workout_type: "Cycling",
      duration: 45,
      calories: 250,
      distance: 15,
      date: "2024-01-02"
    },
    {
      workout_type: "Swimming",
      duration: 60,
      calories: 400,
      distance: 2,
      date: "2024-01-01"
    }
  ],
  goals: [
    {
      goal_type: "daily_steps",
      target_value: 1e4,
      progress: 85,
      end_date: "2024-01-10"
    },
    {
      goal_type: "weekly_workouts",
      target_value: 5,
      progress: 60,
      end_date: "2024-01-07"
    },
    {
      goal_type: "monthly_distance",
      target_value: 100,
      progress: 45,
      end_date: "2024-01-31"
    }
  ]
};

// app/javascript/components/TimeSeriesBarChart.jsx
import React3 from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
function TimeSeriesBarChart({ data, title, yMax }) {
  if (!data || data.length === 0) return null;
  const getGradient = (ctx, chartArea) => {
    const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
    gradient.addColorStop(0, "#36d1c4");
    gradient.addColorStop(1, "#5b86e5");
    return gradient;
  };
  const chartData = {
    labels: data.map((item) => item.dateTime),
    datasets: [
      {
        label: title,
        data: data.map((item) => item.value),
        backgroundColor: function(context) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return "#36d1c4";
          return getGradient(ctx, chartArea);
        },
        borderRadius: 8,
        borderSkipped: false,
        borderWidth: 1,
        maxBarThickness: 32
      }
    ]
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: title,
        font: { size: 20, weight: "bold" },
        color: "#222"
      },
      tooltip: {
        backgroundColor: "#222",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "#36d1c4",
        borderWidth: 1
      },
      datalabels: {
        display: true,
        color: "#222",
        anchor: "end",
        align: "start",
        font: { weight: "bold" },
        formatter: Math.round
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: "#666",
          font: { weight: "bold" }
        }
      },
      y: {
        beginAtZero: true,
        max: yMax,
        grid: {
          color: "#e0e0e0",
          borderDash: [4, 4]
        },
        ticks: {
          color: "#666",
          font: { weight: "bold" }
        }
      }
    }
  };
  return /* @__PURE__ */ React3.createElement("div", { className: "card mb-4 shadow-sm border-0" }, /* @__PURE__ */ React3.createElement("div", { className: "card-body" }, /* @__PURE__ */ React3.createElement(Bar, { data: chartData, options })));
}
var TimeSeriesBarChart_default = TimeSeriesBarChart;

// app/javascript/components/Login.jsx
import React4, { useState } from "react";
function Login({ onLoginSuccess, onShowSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch("/login", {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content
        },
        body: JSON.stringify({ email, password })
      });
      if (response.ok) {
        const data = await response.json();
        onLoginSuccess(data);
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Login failed. Please check your credentials.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };
  return /* @__PURE__ */ React4.createElement("div", { className: "container" }, /* @__PURE__ */ React4.createElement("div", { className: "row justify-content-center" }, /* @__PURE__ */ React4.createElement("div", { className: "col-md-6 col-lg-4" }, /* @__PURE__ */ React4.createElement("div", { className: "card shadow-sm mt-5" }, /* @__PURE__ */ React4.createElement("div", { className: "card-body p-4" }, /* @__PURE__ */ React4.createElement("div", { className: "text-center mb-4" }, /* @__PURE__ */ React4.createElement("h2", { className: "h3 mb-2" }, "Welcome Back"), /* @__PURE__ */ React4.createElement("p", { className: "text-muted mb-0" }, "Sign in to access your dashboard")), /* @__PURE__ */ React4.createElement("form", { onSubmit: handleSubmit }, error && /* @__PURE__ */ React4.createElement("div", { className: "alert alert-danger", role: "alert" }, error), /* @__PURE__ */ React4.createElement("div", { className: "mb-3" }, /* @__PURE__ */ React4.createElement("label", { htmlFor: "email", className: "form-label" }, "Email address"), /* @__PURE__ */ React4.createElement(
    "input",
    {
      type: "email",
      className: "form-control",
      id: "email",
      value: email,
      onChange: (e) => setEmail(e.target.value),
      required: true,
      placeholder: "Enter your email"
    }
  )), /* @__PURE__ */ React4.createElement("div", { className: "mb-4" }, /* @__PURE__ */ React4.createElement("label", { htmlFor: "password", className: "form-label" }, "Password"), /* @__PURE__ */ React4.createElement(
    "input",
    {
      type: "password",
      className: "form-control",
      id: "password",
      value: password,
      onChange: (e) => setPassword(e.target.value),
      required: true,
      placeholder: "Enter your password"
    }
  )), /* @__PURE__ */ React4.createElement(
    "button",
    {
      type: "submit",
      className: "btn btn-primary w-100 mb-3"
    },
    "Sign in"
  )), onShowSignup && /* @__PURE__ */ React4.createElement("div", { className: "text-center" }, /* @__PURE__ */ React4.createElement("span", { className: "text-muted" }, "Don't have an account? "), /* @__PURE__ */ React4.createElement(
    "button",
    {
      type: "button",
      className: "btn btn-link p-0",
      onClick: onShowSignup
    },
    "Sign up"
  )))))));
}
var Login_default = Login;

// app/javascript/components/Signup.jsx
import React5, { useState as useState2 } from "react";
function Signup({ onSignupSuccess, onCancel }) {
  const [name, setName] = useState2("");
  const [email, setEmail] = useState2("");
  const [password, setPassword] = useState2("");
  const [confirmPassword, setConfirmPassword] = useState2("");
  const [error, setError] = useState2("");
  const [success, setSuccess] = useState2("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content
        },
        body: JSON.stringify({
          user: { display_name: name, email, password }
        })
      });
      if (response.ok) {
        const data = await response.json();
        setSuccess("Signup successful!");
        if (onSignupSuccess) onSignupSuccess(data.user);
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Signup failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };
  return /* @__PURE__ */ React5.createElement("div", { className: "container" }, /* @__PURE__ */ React5.createElement("div", { className: "row justify-content-center" }, /* @__PURE__ */ React5.createElement("div", { className: "col-md-6 col-lg-4" }, /* @__PURE__ */ React5.createElement("div", { className: "card shadow-sm mt-5" }, /* @__PURE__ */ React5.createElement("div", { className: "card-body p-4" }, /* @__PURE__ */ React5.createElement("div", { className: "text-center mb-4" }, /* @__PURE__ */ React5.createElement("h2", { className: "h3 mb-3" }, "Sign Up"), /* @__PURE__ */ React5.createElement("p", { className: "text-muted" }, "Create a new account")), /* @__PURE__ */ React5.createElement("form", { onSubmit: handleSubmit }, error && /* @__PURE__ */ React5.createElement("div", { className: "alert alert-danger", role: "alert" }, error), success && /* @__PURE__ */ React5.createElement("div", { className: "alert alert-success", role: "alert" }, success), /* @__PURE__ */ React5.createElement("div", { className: "mb-3" }, /* @__PURE__ */ React5.createElement("label", { htmlFor: "name", className: "form-label" }, "Name"), /* @__PURE__ */ React5.createElement(
    "input",
    {
      type: "text",
      className: "form-control",
      id: "name",
      value: name,
      onChange: (e) => setName(e.target.value),
      required: true,
      placeholder: "Enter your name"
    }
  )), /* @__PURE__ */ React5.createElement("div", { className: "mb-3" }, /* @__PURE__ */ React5.createElement("label", { htmlFor: "email", className: "form-label" }, "Email address"), /* @__PURE__ */ React5.createElement(
    "input",
    {
      type: "email",
      className: "form-control",
      id: "email",
      value: email,
      onChange: (e) => setEmail(e.target.value),
      required: true,
      placeholder: "Enter your email"
    }
  )), /* @__PURE__ */ React5.createElement("div", { className: "mb-3" }, /* @__PURE__ */ React5.createElement("label", { htmlFor: "password", className: "form-label" }, "Password"), /* @__PURE__ */ React5.createElement(
    "input",
    {
      type: "password",
      className: "form-control",
      id: "password",
      value: password,
      onChange: (e) => setPassword(e.target.value),
      required: true,
      placeholder: "Enter your password"
    }
  )), /* @__PURE__ */ React5.createElement("div", { className: "mb-4" }, /* @__PURE__ */ React5.createElement("label", { htmlFor: "confirmPassword", className: "form-label" }, "Confirm Password"), /* @__PURE__ */ React5.createElement(
    "input",
    {
      type: "password",
      className: "form-control",
      id: "confirmPassword",
      value: confirmPassword,
      onChange: (e) => setConfirmPassword(e.target.value),
      required: true,
      placeholder: "Confirm your password"
    }
  )), /* @__PURE__ */ React5.createElement("button", { type: "submit", className: "btn btn-success w-100 mb-2" }, "Sign up"), /* @__PURE__ */ React5.createElement("button", { type: "button", className: "btn btn-link w-100", onClick: onCancel }, "Cancel")))))));
}
var Signup_default = Signup;

// app/javascript/components/Workouts.jsx
import React7, { useState as useState4 } from "react";

// app/javascript/components/WorkoutModal.jsx
import React6, { useState as useState3 } from "react";
function WorkoutModal({ show, onClose, workouts = [], onAddWorkout }) {
  const [showAddForm, setShowAddForm] = useState3(false);
  const [newWorkout, setNewWorkout] = useState3({
    workout_type: "",
    duration: "",
    distance: "",
    date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
  });
  const calculateCalories = (type, duration, distance) => {
    const metValues = {
      "Running": 10,
      "Cycling": 8,
      "Swimming": 8,
      "Walking": 4,
      "Weight Training": 6,
      "Yoga": 3
    };
    const weight = 70;
    const met = metValues[type] || 5;
    const calories = Math.round(met * weight * (duration / 60));
    return calories;
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedWorkout = {
      ...newWorkout,
      [name]: value
    };
    if (name === "workout_type" || name === "duration" || name === "distance") {
      updatedWorkout.calories = calculateCalories(
        updatedWorkout.workout_type,
        updatedWorkout.duration,
        updatedWorkout.distance
      );
    }
    setNewWorkout(updatedWorkout);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const workoutWithCalories = {
      ...newWorkout,
      calories: calculateCalories(newWorkout.workout_type, newWorkout.duration, newWorkout.distance)
    };
    onAddWorkout(workoutWithCalories);
    setNewWorkout({
      workout_type: "",
      duration: "",
      distance: "",
      date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
    });
    setShowAddForm(false);
  };
  const handleDeleteWorkout = async (id) => {
    if (!window.confirm("Are you sure you want to delete this workout?")) return;
    try {
      const response = await fetch(`/api/workouts/${id}`, {
        method: "DELETE",
        headers: {
          "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content
        }
      });
      if (response.ok) {
        window.location.reload();
      } else {
        alert("Failed to delete workout");
      }
    } catch (error) {
      alert("Error deleting workout");
    }
  };
  if (!show) return null;
  return /* @__PURE__ */ React6.createElement(React6.Fragment, null, /* @__PURE__ */ React6.createElement("div", { className: "modal-backdrop fade show", style: { zIndex: 1040 } }), /* @__PURE__ */ React6.createElement("div", { className: "modal fade show", style: { display: "block", zIndex: 1050 }, tabIndex: "-1" }, /* @__PURE__ */ React6.createElement("div", { className: "modal-dialog modal-lg" }, /* @__PURE__ */ React6.createElement("div", { className: "modal-content" }, /* @__PURE__ */ React6.createElement("div", { className: "modal-header" }, /* @__PURE__ */ React6.createElement("h5", { className: "modal-title" }, "Workouts"), /* @__PURE__ */ React6.createElement("button", { type: "button", className: "btn-close", onClick: onClose })), /* @__PURE__ */ React6.createElement("div", { className: "modal-body" }, !showAddForm ? /* @__PURE__ */ React6.createElement(React6.Fragment, null, /* @__PURE__ */ React6.createElement("div", { className: "d-flex justify-content-end mb-3" }, /* @__PURE__ */ React6.createElement(
    "button",
    {
      className: "btn btn-primary",
      onClick: () => setShowAddForm(true)
    },
    "Add Workout"
  )), workouts.length === 0 ? /* @__PURE__ */ React6.createElement("div", { className: "text-center py-4" }, /* @__PURE__ */ React6.createElement("p", { className: "text-muted" }, "No workouts recorded yet"), /* @__PURE__ */ React6.createElement(
    "button",
    {
      className: "btn btn-outline-primary",
      onClick: () => setShowAddForm(true)
    },
    "Add Your First Workout"
  )) : /* @__PURE__ */ React6.createElement("div", { className: "list-group" }, workouts.map((workout, index) => /* @__PURE__ */ React6.createElement("div", { key: index, className: "list-group-item" }, /* @__PURE__ */ React6.createElement("div", { className: "d-flex justify-content-between align-items-center" }, /* @__PURE__ */ React6.createElement("h5", { className: "mb-1" }, workout.workout_type), /* @__PURE__ */ React6.createElement("span", { className: "badge bg-primary rounded-pill" }, workout.duration, " min")), /* @__PURE__ */ React6.createElement("div", { className: "d-flex justify-content-between" }, /* @__PURE__ */ React6.createElement("small", { className: "text-muted" }, workout.calories, " calories"), /* @__PURE__ */ React6.createElement("small", { className: "text-muted" }, workout.distance, " km")), /* @__PURE__ */ React6.createElement("small", { className: "text-muted" }, new Date(workout.date).toLocaleDateString()), /* @__PURE__ */ React6.createElement("button", { className: "btn btn-sm btn-danger ms-2", onClick: () => handleDeleteWorkout(workout.id) }, "Delete"))))) : /* @__PURE__ */ React6.createElement("form", { onSubmit: handleSubmit }, /* @__PURE__ */ React6.createElement("div", { className: "mb-3" }, /* @__PURE__ */ React6.createElement("label", { className: "form-label" }, "Workout Type"), /* @__PURE__ */ React6.createElement(
    "select",
    {
      className: "form-select",
      name: "workout_type",
      value: newWorkout.workout_type,
      onChange: handleInputChange,
      required: true
    },
    /* @__PURE__ */ React6.createElement("option", { value: "" }, "Select a workout type"),
    /* @__PURE__ */ React6.createElement("option", { value: "Running" }, "Running"),
    /* @__PURE__ */ React6.createElement("option", { value: "Cycling" }, "Cycling"),
    /* @__PURE__ */ React6.createElement("option", { value: "Swimming" }, "Swimming"),
    /* @__PURE__ */ React6.createElement("option", { value: "Walking" }, "Walking"),
    /* @__PURE__ */ React6.createElement("option", { value: "Weight Training" }, "Weight Training"),
    /* @__PURE__ */ React6.createElement("option", { value: "Yoga" }, "Yoga")
  )), /* @__PURE__ */ React6.createElement("div", { className: "mb-3" }, /* @__PURE__ */ React6.createElement("label", { className: "form-label" }, "Duration (minutes)"), /* @__PURE__ */ React6.createElement(
    "input",
    {
      type: "number",
      className: "form-control",
      name: "duration",
      value: newWorkout.duration,
      onChange: handleInputChange,
      required: true,
      min: "1"
    }
  )), /* @__PURE__ */ React6.createElement("div", { className: "mb-3" }, /* @__PURE__ */ React6.createElement("label", { className: "form-label" }, "Distance (km)"), /* @__PURE__ */ React6.createElement(
    "input",
    {
      type: "number",
      className: "form-control",
      name: "distance",
      value: newWorkout.distance,
      onChange: handleInputChange,
      required: true,
      min: "0",
      step: "0.1"
    }
  )), /* @__PURE__ */ React6.createElement("div", { className: "mb-3" }, /* @__PURE__ */ React6.createElement("label", { className: "form-label" }, "Date"), /* @__PURE__ */ React6.createElement(
    "input",
    {
      type: "date",
      className: "form-control",
      name: "date",
      value: newWorkout.date,
      onChange: handleInputChange,
      required: true
    }
  )), newWorkout.calories > 0 && /* @__PURE__ */ React6.createElement("div", { className: "alert alert-info" }, "Estimated calories burned: ", newWorkout.calories, " calories"), /* @__PURE__ */ React6.createElement("div", { className: "d-flex justify-content-end gap-2" }, /* @__PURE__ */ React6.createElement(
    "button",
    {
      type: "button",
      className: "btn btn-secondary",
      onClick: () => setShowAddForm(false)
    },
    "Cancel"
  ), /* @__PURE__ */ React6.createElement("button", { type: "submit", className: "btn btn-primary" }, "Save Workout"))))))));
}
var WorkoutModal_default = WorkoutModal;

// app/javascript/components/Workouts.jsx
function Workouts({ workouts = [] }) {
  const [showModal, setShowModal] = useState4(false);
  const handleAddWorkout = async (workoutData) => {
    try {
      const response = await fetch("/api/workouts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content
        },
        body: JSON.stringify({ workout: workoutData })
      });
      if (response.ok) {
        window.location.reload();
      } else {
        console.error("Failed to add workout");
      }
    } catch (error) {
      console.error("Error adding workout:", error);
    }
  };
  const workoutList = Array.isArray(workouts) ? workouts : [];
  const recentWorkouts = workoutList.slice(0, 3);
  return /* @__PURE__ */ React7.createElement(React7.Fragment, null, /* @__PURE__ */ React7.createElement("div", { className: "card mb-4", style: { cursor: "pointer" }, onClick: () => setShowModal(true) }, /* @__PURE__ */ React7.createElement("div", { className: "card-header d-flex justify-content-between align-items-center" }, /* @__PURE__ */ React7.createElement("h3", { className: "mb-0" }, "Recent Workouts"), /* @__PURE__ */ React7.createElement("span", { className: "badge bg-primary rounded-pill" }, workoutList.length)), /* @__PURE__ */ React7.createElement("div", { className: "card-body" }, workoutList.length === 0 ? /* @__PURE__ */ React7.createElement("p", { className: "text-muted text-center mb-0" }, "No workouts recorded yet") : /* @__PURE__ */ React7.createElement("div", { className: "list-group" }, recentWorkouts.map((workout, index) => /* @__PURE__ */ React7.createElement("div", { key: index, className: "list-group-item" }, /* @__PURE__ */ React7.createElement("div", { className: "d-flex justify-content-between align-items-center" }, /* @__PURE__ */ React7.createElement("h5", { className: "mb-1" }, workout.workout_type), /* @__PURE__ */ React7.createElement("span", { className: "badge bg-primary rounded-pill" }, workout.duration, " min")), /* @__PURE__ */ React7.createElement("div", { className: "d-flex justify-content-between" }, /* @__PURE__ */ React7.createElement("small", { className: "text-muted" }, workout.calories, " calories"), /* @__PURE__ */ React7.createElement("small", { className: "text-muted" }, workout.distance, " km")), /* @__PURE__ */ React7.createElement("small", { className: "text-muted" }, new Date(workout.date).toLocaleDateString()))), workoutList.length > 3 && /* @__PURE__ */ React7.createElement("div", { className: "text-center mt-2" }, /* @__PURE__ */ React7.createElement("small", { className: "text-muted" }, "Click to view all ", workoutList.length, " workouts"))))), /* @__PURE__ */ React7.createElement(
    WorkoutModal_default,
    {
      show: showModal,
      onClose: () => setShowModal(false),
      workouts: workoutList,
      onAddWorkout: handleAddWorkout
    }
  ));
}
var Workouts_default = Workouts;

// app/javascript/components/Goals.jsx
import React9, { useState as useState6 } from "react";

// app/javascript/components/GoalModal.jsx
import React8, { useState as useState5 } from "react";
function GoalModal({ show, onClose, goals = [], onAddGoal }) {
  const [showAddForm, setShowAddForm] = useState5(false);
  const [newGoal, setNewGoal] = useState5({
    goal_type: "",
    target_value: "",
    start_date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    end_date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGoal((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onAddGoal(newGoal);
    setNewGoal({
      goal_type: "",
      target_value: "",
      start_date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      end_date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
    });
    setShowAddForm(false);
  };
  const handleDeleteGoal = async (id) => {
    if (!window.confirm("Are you sure you want to delete this goal?")) return;
    try {
      const response = await fetch(`/api/goals/${id}`, {
        method: "DELETE",
        headers: {
          "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content
        }
      });
      if (response.ok) {
        window.location.reload();
      } else {
        alert("Failed to delete goal");
      }
    } catch (error) {
      alert("Error deleting goal");
    }
  };
  if (!show) return null;
  return /* @__PURE__ */ React8.createElement(React8.Fragment, null, /* @__PURE__ */ React8.createElement("div", { className: "modal-backdrop fade show", style: { zIndex: 1040 } }), /* @__PURE__ */ React8.createElement("div", { className: "modal fade show", style: { display: "block", zIndex: 1050 }, tabIndex: "-1" }, /* @__PURE__ */ React8.createElement("div", { className: "modal-dialog modal-lg" }, /* @__PURE__ */ React8.createElement("div", { className: "modal-content" }, /* @__PURE__ */ React8.createElement("div", { className: "modal-header" }, /* @__PURE__ */ React8.createElement("h5", { className: "modal-title" }, "Goals"), /* @__PURE__ */ React8.createElement("button", { type: "button", className: "btn-close", onClick: onClose })), /* @__PURE__ */ React8.createElement("div", { className: "modal-body" }, !showAddForm ? /* @__PURE__ */ React8.createElement(React8.Fragment, null, /* @__PURE__ */ React8.createElement("div", { className: "d-flex justify-content-end mb-3" }, /* @__PURE__ */ React8.createElement(
    "button",
    {
      className: "btn btn-primary",
      onClick: () => setShowAddForm(true)
    },
    "Add Goal"
  )), goals.length === 0 ? /* @__PURE__ */ React8.createElement("div", { className: "text-center py-4" }, /* @__PURE__ */ React8.createElement("p", { className: "text-muted" }, "No goals set yet"), /* @__PURE__ */ React8.createElement(
    "button",
    {
      className: "btn btn-outline-primary",
      onClick: () => setShowAddForm(true)
    },
    "Add Your First Goal"
  )) : /* @__PURE__ */ React8.createElement("div", { className: "list-group" }, goals.map((goal, index) => /* @__PURE__ */ React8.createElement("div", { key: index, className: "list-group-item" }, /* @__PURE__ */ React8.createElement("div", { className: "d-flex justify-content-between align-items-center" }, /* @__PURE__ */ React8.createElement("h5", { className: "mb-1" }, goal.goal_type), /* @__PURE__ */ React8.createElement("span", { className: "badge bg-primary rounded-pill" }, "Target: ", goal.target_value)), /* @__PURE__ */ React8.createElement("div", { className: "d-flex justify-content-between mb-2" }, /* @__PURE__ */ React8.createElement("small", { className: "text-muted" }, "Start: ", goal.start_date ? new Date(goal.start_date).toLocaleDateString() : ""), /* @__PURE__ */ React8.createElement("small", { className: "text-muted" }, "Due: ", goal.end_date ? new Date(goal.end_date).toLocaleDateString() : "")), /* @__PURE__ */ React8.createElement("div", { className: "progress mb-2", style: { height: "20px" } }, /* @__PURE__ */ React8.createElement(
    "div",
    {
      className: `progress-bar${goal.progress >= 100 ? " bg-success" : ""}`,
      role: "progressbar",
      style: { width: `${Math.min(goal.progress || 0, 100)}%` },
      "aria-valuenow": goal.progress || 0,
      "aria-valuemin": "0",
      "aria-valuemax": "100"
    },
    Math.round(goal.progress || 0),
    "%"
  )), /* @__PURE__ */ React8.createElement("button", { className: "btn btn-sm btn-danger ms-2", onClick: () => handleDeleteGoal(goal.id) }, "Delete"))))) : /* @__PURE__ */ React8.createElement("form", { onSubmit: handleSubmit }, /* @__PURE__ */ React8.createElement("div", { className: "mb-3" }, /* @__PURE__ */ React8.createElement("label", { className: "form-label" }, "Goal Type"), /* @__PURE__ */ React8.createElement(
    "select",
    {
      className: "form-select",
      name: "goal_type",
      value: newGoal.goal_type,
      onChange: handleInputChange,
      required: true
    },
    /* @__PURE__ */ React8.createElement("option", { value: "" }, "Select a goal type"),
    /* @__PURE__ */ React8.createElement("option", { value: "daily_steps" }, "Daily Steps"),
    /* @__PURE__ */ React8.createElement("option", { value: "distance" }, "Distance"),
    /* @__PURE__ */ React8.createElement("option", { value: "calories" }, "Calories"),
    /* @__PURE__ */ React8.createElement("option", { value: "workouts" }, "Workouts")
  )), /* @__PURE__ */ React8.createElement("div", { className: "mb-3" }, /* @__PURE__ */ React8.createElement("label", { className: "form-label" }, "Target Value"), /* @__PURE__ */ React8.createElement(
    "input",
    {
      type: "number",
      className: "form-control",
      name: "target_value",
      value: newGoal.target_value,
      onChange: handleInputChange,
      required: true,
      min: "1"
    }
  )), /* @__PURE__ */ React8.createElement("div", { className: "mb-3" }, /* @__PURE__ */ React8.createElement("label", { className: "form-label" }, "Start Date"), /* @__PURE__ */ React8.createElement(
    "input",
    {
      type: "date",
      className: "form-control",
      name: "start_date",
      value: newGoal.start_date,
      onChange: handleInputChange,
      required: true
    }
  )), /* @__PURE__ */ React8.createElement("div", { className: "mb-3" }, /* @__PURE__ */ React8.createElement("label", { className: "form-label" }, "End Date"), /* @__PURE__ */ React8.createElement(
    "input",
    {
      type: "date",
      className: "form-control",
      name: "end_date",
      value: newGoal.end_date,
      onChange: handleInputChange,
      required: true
    }
  )), /* @__PURE__ */ React8.createElement("div", { className: "d-flex justify-content-end gap-2" }, /* @__PURE__ */ React8.createElement(
    "button",
    {
      type: "button",
      className: "btn btn-secondary",
      onClick: () => setShowAddForm(false)
    },
    "Cancel"
  ), /* @__PURE__ */ React8.createElement("button", { type: "submit", className: "btn btn-primary" }, "Save Goal"))))))));
}
var GoalModal_default = GoalModal;

// app/javascript/components/Goals.jsx
function Goals({ goals = [], onAddGoal, isLoggedIn }) {
  const [showModal, setShowModal] = useState6(false);
  const displayGoals = isLoggedIn || goals.length > 0 ? goals : dummyData_default.goals;
  return /* @__PURE__ */ React9.createElement(React9.Fragment, null, /* @__PURE__ */ React9.createElement("div", { className: "card mb-4", style: { cursor: "pointer" }, onClick: () => setShowModal(true) }, /* @__PURE__ */ React9.createElement("div", { className: "card-header d-flex justify-content-between align-items-center" }, /* @__PURE__ */ React9.createElement("h3", { className: "mb-0" }, "Active Goals"), /* @__PURE__ */ React9.createElement("span", { className: "badge bg-primary rounded-pill" }, displayGoals.length)), /* @__PURE__ */ React9.createElement("div", { className: "card-body" }, displayGoals.length === 0 ? /* @__PURE__ */ React9.createElement("p", { className: "text-muted text-center mb-0" }, "No active goals") : /* @__PURE__ */ React9.createElement("div", { className: "list-group" }, displayGoals.slice(0, 3).map((goal, index) => /* @__PURE__ */ React9.createElement("div", { key: index, className: "list-group-item" }, /* @__PURE__ */ React9.createElement("div", { className: "d-flex justify-content-between align-items-center" }, /* @__PURE__ */ React9.createElement("h5", { className: "mb-1" }, goal.goal_type), /* @__PURE__ */ React9.createElement("span", { className: "badge bg-primary rounded-pill" }, "Target: ", goal.target_value)), /* @__PURE__ */ React9.createElement("div", { className: "d-flex justify-content-between" }, /* @__PURE__ */ React9.createElement("small", { className: "text-muted" }, "Due: ", goal.end_date ? new Date(goal.end_date).toLocaleDateString() : "")))), displayGoals.length > 3 && /* @__PURE__ */ React9.createElement("div", { className: "text-center mt-2" }, /* @__PURE__ */ React9.createElement("small", { className: "text-muted" }, "Click to view all ", displayGoals.length, " goals"))))), /* @__PURE__ */ React9.createElement(
    GoalModal_default,
    {
      show: showModal,
      onClose: () => setShowModal(false),
      goals: displayGoals,
      onAddGoal
    }
  ));
}
var Goals_default = Goals;

// app/javascript/components/Dashboard.jsx
var Dashboard = class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      showLoginForm: false,
      showSignupForm: false,
      userData: null,
      lifetimeStats: dummyData_default.lifetimeStats,
      badges: dummyData_default.badges,
      steps: dummyData_default.steps,
      distance: dummyData_default.distance,
      workouts: dummyData_default.workouts,
      goals: dummyData_default.goals
    };
  }
  componentDidMount() {
    this.checkLoginStatus();
  }
  getCsrfToken = () => {
    return document.querySelector('meta[name="csrf-token"]').content;
  };
  checkLoginStatus = async () => {
    try {
      const response = await fetch("/api/profile", {
        headers: {
          "X-CSRF-Token": this.getCsrfToken(),
          "Accept": "application/json"
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
          ...dummyData_default
        });
      }
    } catch (error) {
      console.error("Error checking login status:", error);
      this.setState({
        isLoggedIn: false,
        userData: null,
        ...dummyData_default
      });
    }
  };
  fetchUserData = async () => {
    try {
      const headers = {
        "X-CSRF-Token": this.getCsrfToken(),
        "Accept": "application/json"
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
        fetchData("/api/lifetime_stats"),
        fetchData("/api/badges"),
        fetchData("/api/steps"),
        fetchData("/api/distance"),
        fetchData("/api/workouts"),
        fetchData("/api/goals")
      ]);
      this.setState({
        lifetimeStats: lifetimeStats || dummyData_default.lifetimeStats,
        badges: badges || dummyData_default.badges,
        steps: steps || dummyData_default.steps,
        distance: distance || dummyData_default.distance,
        workouts: Array.isArray(workouts) ? workouts : dummyData_default.workouts,
        goals: Array.isArray(goals) ? goals : dummyData_default.goals
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
      this.setState({
        ...dummyData_default
      });
    }
  };
  handleAddWorkout = async (workoutData) => {
    try {
      const response = await fetch("/api/workouts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": this.getCsrfToken()
        },
        body: JSON.stringify({ workout: workoutData })
      });
      if (response.ok) {
        const workoutsResponse = await fetch("/api/workouts", {
          headers: {
            "X-CSRF-Token": this.getCsrfToken(),
            "Accept": "application/json"
          }
        });
        const workouts = await workoutsResponse.json();
        const lifetimeStatsResponse = await fetch("/api/lifetime_stats", {
          headers: {
            "X-CSRF-Token": this.getCsrfToken(),
            "Accept": "application/json"
          }
        });
        const lifetimeStats = await lifetimeStatsResponse.json();
        this.setState((prevState) => ({
          workouts: workouts || prevState.workouts,
          lifetimeStats: lifetimeStats || prevState.lifetimeStats
        }));
      } else {
        console.error("Failed to add workout");
      }
    } catch (error) {
      console.error("Error adding workout:", error);
    }
  };
  handleAddGoal = async (goalData) => {
    try {
      const response = await fetch("/api/goals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": this.getCsrfToken()
        },
        body: JSON.stringify({ goal: goalData })
      });
      if (response.ok) {
        const goalsResponse = await fetch("/api/goals", {
          headers: {
            "X-CSRF-Token": this.getCsrfToken(),
            "Accept": "application/json"
          }
        });
        const goals = await goalsResponse.json();
        this.setState((prevState) => ({
          goals: Array.isArray(goals) ? goals : prevState.goals
        }));
      } else {
        console.error("Failed to add goal");
      }
    } catch (error) {
      console.error("Error adding goal:", error);
    }
  };
  handleLogin = () => {
    this.setState({ showLoginForm: true, showSignupForm: false });
  };
  handleShowSignup = () => {
    this.setState({ showSignupForm: true, showLoginForm: false });
  };
  handleSignupSuccess = (userData) => {
    this.handleLoginSuccess(userData);
  };
  handleCancelSignup = () => {
    this.setState({ showSignupForm: false, showLoginForm: true });
  };
  handleLoginSuccess = (userData) => {
    this.setState({
      isLoggedIn: true,
      showLoginForm: false,
      showSignupForm: false,
      userData
    });
    this.fetchUserData();
  };
  handleLogout = async () => {
    try {
      await fetch("/logout", {
        method: "DELETE",
        headers: {
          "X-CSRF-Token": this.getCsrfToken(),
          "Accept": "application/json"
        }
      });
      this.setState({
        isLoggedIn: false,
        userData: null,
        ...dummyData_default
      });
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  getLastNDates = (n) => {
    const dates = [];
    for (let i = n - 1; i >= 0; i--) {
      const d = /* @__PURE__ */ new Date();
      d.setDate(d.getDate() - i);
      dates.push(d.toISOString().split("T")[0]);
    }
    return dates;
  };
  getCaloriesChartData = (workouts) => {
    const last3 = this.getLastNDates(3);
    const map = {};
    (workouts || []).forEach((w) => {
      const date = w.date;
      map[date] = (map[date] || 0) + (w.calories || 0);
    });
    return last3.map((date) => ({
      dateTime: date,
      value: map[date] || 0
    }));
  };
  getDistanceChartData = (workouts) => {
    const last3 = this.getLastNDates(3);
    const map = {};
    (workouts || []).forEach((w) => {
      const date = w.date;
      map[date] = (map[date] || 0) + (w.distance || 0);
    });
    return last3.map((date) => ({
      dateTime: date,
      value: map[date] || 0
    }));
  };
  getCaloriesYMax = (workouts) => {
    const arr = this.getCaloriesChartData(workouts);
    return Math.max(100, ...arr.map((d) => d.value)) + 50;
  };
  getDistanceYMax = (workouts) => {
    const arr = this.getDistanceChartData(workouts);
    return Math.max(5, ...arr.map((d) => d.value)) + 1;
  };
  render() {
    const { isLoggedIn, showLoginForm, showSignupForm, lifetimeStats, badges, steps, distance, workouts, goals, userData } = this.state;
    if (showSignupForm) {
      return /* @__PURE__ */ React10.createElement(Signup_default, { onSignupSuccess: this.handleSignupSuccess, onCancel: this.handleCancelSignup });
    }
    if (showLoginForm) {
      return /* @__PURE__ */ React10.createElement(Login_default, { onLoginSuccess: this.handleLoginSuccess, onShowSignup: this.handleShowSignup });
    }
    return /* @__PURE__ */ React10.createElement("div", { className: "container-fluid py-4" }, /* @__PURE__ */ React10.createElement("div", { className: "d-flex justify-content-between align-items-center mb-4" }, /* @__PURE__ */ React10.createElement("h1", null, "ReactFit Dashboard"), isLoggedIn ? /* @__PURE__ */ React10.createElement("button", { className: "btn btn-outline-danger", onClick: this.handleLogout }, "Logout") : /* @__PURE__ */ React10.createElement("button", { className: "btn btn-primary", onClick: this.handleLogin }, "Login")), /* @__PURE__ */ React10.createElement("div", { className: "text-center mb-4" }, isLoggedIn && userData && /* @__PURE__ */ React10.createElement("p", { className: "text-muted mb-0" }, "Welcome back, ", userData.display_name, "!"), !isLoggedIn && /* @__PURE__ */ React10.createElement("div", { className: "alert alert-info mx-auto", style: { maxWidth: "900px" } }, /* @__PURE__ */ React10.createElement("i", { className: "fas fa-info-circle me-2" }), "You are not logged in. Showing demo data. Please login to track your own fitness journey!")), /* @__PURE__ */ React10.createElement("div", { className: "row g-4" }, /* @__PURE__ */ React10.createElement("div", { className: "col-md-3" }, /* @__PURE__ */ React10.createElement("div", { className: "d-flex flex-column h-100" }, /* @__PURE__ */ React10.createElement(Goals_default, { goals, onAddGoal: this.handleAddGoal, isLoggedIn }), /* @__PURE__ */ React10.createElement(Badges_default, { badges: isLoggedIn ? Array.isArray(badges) ? badges : [] : dummyData_default.badges }))), /* @__PURE__ */ React10.createElement("div", { className: "col-md-5" }, /* @__PURE__ */ React10.createElement("div", { className: "d-flex flex-column h-100" }, /* @__PURE__ */ React10.createElement(
      TimeSeriesBarChart_default,
      {
        data: this.getCaloriesChartData(workouts),
        title: "Calories",
        yMax: this.getCaloriesYMax(workouts)
      }
    ), /* @__PURE__ */ React10.createElement(
      TimeSeriesBarChart_default,
      {
        data: this.getDistanceChartData(workouts),
        title: "Distance (miles)",
        yMax: this.getDistanceYMax(workouts)
      }
    ))), /* @__PURE__ */ React10.createElement("div", { className: "col-md-4" }, /* @__PURE__ */ React10.createElement("div", { className: "d-flex flex-column h-100" }, /* @__PURE__ */ React10.createElement(Workouts_default, { workouts, onAddWorkout: this.handleAddWorkout }), /* @__PURE__ */ React10.createElement(LifetimeStats_default, { lifetimeStats })))));
  }
};
var Dashboard_default = Dashboard;

// app/javascript/components/Friends.jsx
import React11 from "react";

// app/javascript/application.js
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("root");
  if (container) {
    const root = createRoot(container);
    root.render(/* @__PURE__ */ React12.createElement(Dashboard_default, null));
  }
});

