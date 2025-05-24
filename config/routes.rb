Rails.application.routes.draw do
  # Set root to React dashboard
  root 'home#index'
  
  # Authentication routes
  post 'login', to: 'sessions#create'
  delete 'logout', to: 'sessions#destroy'

  
  # API routes
  namespace :api do
    resources :users, only: [:create]
    get 'profile', to: 'users#profile'
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
  end
  
  # Workout routes
  resources :workouts, only: [:create, :index, :show]
  
  # Goal routes
  resources :goals, only: [:create, :index, :show, :update]
end