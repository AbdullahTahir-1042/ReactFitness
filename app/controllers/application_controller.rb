class ApplicationController < ActionController::Base
    protect_from_forgery with: :exception
    
    helper_method :current_user, :logged_in?, :admin?
    
    before_action :require_user

    protected
    
    def current_user
      @current_user ||= User.find_by(id: session[:user_id]) if session[:user_id]
    end
    
    def logged_in?
      !!current_user
    end
    
    def admin?
      current_user&.admin?
    end
    
    def require_user
      unless logged_in?
        respond_to do |format|
          format.html { redirect_to root_path, alert: "You must be logged in to access this page" }
          format.json { render json: { error: "Not authorized" }, status: :unauthorized }
        end
      end
    end
    
    def require_admin
      unless admin?
        respond_to do |format|
          format.html { redirect_to root_path, alert: "You must be an admin to access this page" }
          format.json { render json: { error: "Admin access required" }, status: :forbidden }
        end
      end
    end
  end