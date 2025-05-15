require 'net/http'
require 'uri'

class AuthController < ApplicationController
  def fitbit
    redirect_to '/auth/fitbit'
  end

  def fitbit_callback
    code = params[:code]
    uri = URI('https://api.fitbit.com/oauth2/token')
    req = Net::HTTP::Post.new(uri)
    req.basic_auth(ENV['FITBIT_CLIENT_ID'], ENV['FITBIT_CLIENT_SECRET'])
    req.set_form_data(
      'client_id' => ENV['FITBIT_CLIENT_ID'],
      'grant_type' => 'authorization_code',
      'redirect_uri' => 'http://localhost:3000/auth/fitbit/callback',
      'code' => code
    )
    res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }
    data = JSON.parse(res.body)

    access_token = data['access_token']
    refresh_token = data['refresh_token']
    user_id = data['user_id']
    expires_in = data['expires_in']

    # Fetch profile
    profile_data = fetch_fitbit_data('https://api.fitbit.com/1/user/-/profile.json', access_token)
    display_name = profile_data.dig('user', 'displayName')

    # Fetch steps
    steps_data = fetch_fitbit_data('https://api.fitbit.com/1/user/-/activities/steps/date/today/1w.json', access_token)

    # Fetch badges
    badges_data = fetch_fitbit_data('https://api.fitbit.com/1/user/-/badges.json', access_token)

    # Fetch lifetime stats
    lifetime_stats = fetch_fitbit_data('https://api.fitbit.com/1/user/-/activities.json', access_token)

    # Fetch distance
    distance_data = fetch_fitbit_data('https://api.fitbit.com/1/user/-/activities/distance/date/today/1w.json', access_token)

    # Fetch friends
    friends_data = fetch_fitbit_data('https://api.fitbit.com/1/user/-/friends/leaderboard.json', access_token)

    # Store or update user
    user = User.find_or_initialize_by(fitbit_user_id: user_id)
    user.update!(
      fitbit_access_token: access_token,
      fitbit_refresh_token: refresh_token,
      fitbit_token_expires_at: Time.now + expires_in.to_i.seconds,
      display_name: display_name,
      steps: steps_data,
      badges: badges_data,
      lifetime_stats: lifetime_stats,
      distance: distance_data,
      friends: friends_data
    )

    session[:user_id] = user.id
    redirect_to root_path, notice: "Fitbit connected!"
  end

  def failure
    redirect_to root_path, alert: "Authentication failed: #{params[:message]}"
  end

  private

  def fetch_fitbit_data(url, token)
    uri = URI(url)
    req = Net::HTTP::Get.new(uri)
    req['Authorization'] = "Bearer #{token}"
    res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }
    JSON.parse(res.body)
  end
end