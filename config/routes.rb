Rails.application.routes.draw do
  # Set root to React dashboard
  root 'home#index'
  
  # Authentication routes
  post 'login', to: 'sessions#create'
  delete 'logout', to: 'sessions#destroy'

  # Admin routes - handled by React
  get 'admin', to: 'home#index'
  get 'admin/*path', to: 'home#index'
  
  # API routes
  namespace :api do
    resources :users, only: [:create]
    get 'profile', to: 'users#profile'
    patch 'profile', to: 'users#update'
    get 'check_admin', to: 'users#check_admin'
    get 'lifetime_stats', to: 'users#lifetime_stats'
    get 'badges', to: 'users#badges'
    get 'steps', to: 'users#steps'
    get 'distance', to: 'users#distance'
    get 'friends', to: 'users#friends'
    get 'workouts', to: 'users#workouts'
    post 'workouts', to: 'users#create_workout'
    delete 'workouts/:id', to: 'users#destroy_workout'
    get 'goals', to: 'users#goals'
    post 'goals', to: 'users#create_goal'
    delete 'goals/:id', to: 'users#destroy_goal'
    get 'users/all', to: 'users#all_users'
    
    # Admin API routes
    namespace :admin do
      get 'profile', to: 'admin#profile'
      get 'dashboard_stats', to: 'admin#dashboard_stats'
      get 'all_users', to: 'admin#all_users'
      get 'users/:id/stats', to: 'admin#user_stats'
      get 'search_users', to: 'admin#search_users'
      get 'workout_analytics', to: 'admin#workout_analytics'
      get 'goal_analytics', to: 'admin#goal_analytics'
      delete 'users/:id', to: 'admin#delete_user'
    end
  end
  
  # Admin management routes (for actions)
  namespace :admin do
    patch 'users/:id/toggle_admin', to: 'admin#toggle_admin'
    delete 'users/:id', to: 'admin#delete_user'
  end
  
  # Workout routes
  resources :workouts, only: [:create, :index, :show]
  
  # Goal routes
  resources :goals, only: [:create, :index, :show, :update]

  # Catch-all route for React Router (must be last)
  get '*path', to: 'home#index', constraints: ->(req) { !req.xhr? && req.format.html? }
end