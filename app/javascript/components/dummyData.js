export default {
  loggedIn: false,
  user: null,
  lifetimeStats: {
    lifetime: {
      total: {
        steps: 1234567,
        distance: 567.89,
        floors: 1234
      }
    }
  },
  badges: {
    badges: [
      {
        name: "10,000 Steps",
        image50px: "https://static0.fitbit.com/images/badges_new/100px/badge_daily_steps10k.png"
      },
      {
        name: "5K Steps",
        image50px: "https://static0.fitbit.com/images/badges_new/100px/badge_daily_steps5k.png"
      }
    ]
  },
  steps: {
    "activities-steps": [
      { dateTime: "2024-01-01", value: 8000 },
      { dateTime: "2024-01-02", value: 10000 },
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
        steps: 12000
      }
    ]
  }
}; 