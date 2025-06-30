class SessionsController < ApplicationController
    skip_before_action :require_user, only: [:create]
    
    def create
      user = User.find_by(email: params[:email])
      if user&.authenticate(params[:password])
        session[:user_id] = user.id
        render json: { 
          success: true, 
          user: user.slice(:id, :email, :display_name, :admin)
        }
      else
        render json: { 
          success: false, 
          error: 'Invalid email or password' 
        }, status: :unauthorized
      end
    end
  
    def destroy
      session[:user_id] = nil
      render json: { success: true }
    end
  end