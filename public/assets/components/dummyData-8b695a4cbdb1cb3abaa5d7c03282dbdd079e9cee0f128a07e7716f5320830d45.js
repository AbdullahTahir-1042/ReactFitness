export default {
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
      key: 'distance_pro',
      name: 'Distance Pro',
      description: 'Complete a distance goal',
      progress: 80,
      earned: false
    },
    {
      key: 'calorie_crusher',
      name: 'Calorie Crusher',
      description: 'Complete a calories goal',
      progress: 100,
      earned: true
    },
    {
      key: 'workout_warrior',
      name: 'Workout Warrior',
      description: 'Complete 5 workout goals',
      progress: 60,
      earned: false
    },
    {
      key: 'goal_master',
      name: 'Goal Master',
      description: 'Complete any 10 goals',
      progress: 30,
      earned: false
    },
    {
      key: 'consistency_star',
      name: 'Consistency Star',
      description: 'Complete a goal 3 weeks in a row',
      progress: 50,
      earned: false
    }
  ],
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
  },
  workouts: [
    {
      workout_type: "Running",
      duration: 30,
      calories: 300,
      distance: 5.0,
      date: "2024-01-03"
    },
    {
      workout_type: "Cycling",
      duration: 45,
      calories: 250,
      distance: 15.0,
      date: "2024-01-02"
    },
    {
      workout_type: "Swimming",
      duration: 60,
      calories: 400,
      distance: 2.0,
      date: "2024-01-01"
    }
  ],
  goals: [
    {
      goal_type: "daily_steps",
      target_value: 10000,
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
