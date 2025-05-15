class ApiController < ApplicationController
  before_action :require_login

  def profile
    render json: current_user.slice(:display_name)
  end

  def steps
    render json: current_user.steps
  end

  def badges
    render json: current_user.badges
  end

  def lifetime_stats
    render json: current_user.lifetime_stats
  end

  def distance
    render json: current_user.distance
  end

  def friends
    render json: current_user.friends
  end

  private

  def require_login
    unless current_user
      render json: { error: 'Not authorized' }, status: :unauthorized
    end
  end

  def current_user
    @current_user ||= User.find_by(id: session[:user_id])
  end
end
