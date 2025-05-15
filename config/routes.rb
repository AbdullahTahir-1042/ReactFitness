Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Fitbit Authentication Routes
  get '/auth/fitbit', to: 'auth#fitbit'
  get '/auth/fitbit/callback', to: 'auth#fitbit_callback'
  get '/auth/failure', to: 'auth#failure'

  # Serve React App
  root 'home#index'
  get '*path', to: 'home#index', constraints: ->(request) { !request.xhr? && request.format.html? }

  get '/callback', to: 'auth#fitbit_callback'

  get '/api/profile', to: 'api#profile'
  get '/api/steps', to: 'api#steps'
  get '/api/badges', to: 'api#badges'
  get '/api/lifetime_stats', to: 'api#lifetime_stats'
  get '/api/distance', to: 'api#distance'
  get '/api/friends', to: 'api#friends'

end
