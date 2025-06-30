module Api
  module Admin
    class AdminController < ApplicationController
      before_action :require_admin
      
      def profile
        Rails.logger.info "Admin profile called by user: #{current_user.email}, admin: #{current_user.admin?}"
        render json: {
          id: current_user.id,
          display_name: current_user.display_name,
          email: current_user.email,
          admin: current_user.admin?,
          created_at: current_user.created_at
        }
      end
      
      def dashboard_stats
        Rails.logger.info "Admin dashboard_stats called by user: #{current_user.email}, admin: #{current_user.admin?}"
        stats = {
          total_users: User.count,
          total_workouts: Workout.count,
          total_goals: Goal.count,
          completed_goals: Goal.where(completed: true).count,
          active_users_7d: User.recently_active.count,
          active_users_30d: User.where('updated_at > ?', 30.days.ago).count,
          workouts_this_week: Workout.where('created_at > ?', 1.week.ago).count,
          goal_completion_rate: Goal.count > 0 ? (Goal.where(completed: true).count.to_f / Goal.count * 100).round(2) : 0
        }
        
        render json: stats
      end
      
      def user_stats
        user = User.find(params[:id])
        today = Date.current
        todays_workouts = user.workouts.where(date: today)

        stats = {
          total_workouts: user.total_workouts_count,
          total_goals: user.total_goals_count,
          completed_goals: user.completed_goals_count,
          fitness_score: user.fitness_score,
          last_activity: user.last_activity,
          daily_distance: todays_workouts.sum(:distance),
          daily_calories: todays_workouts.sum(:calories)
        }

        render json: stats
      rescue ActiveRecord::RecordNotFound
        render json: { error: 'User not found' }, status: :not_found
      end
      
      def search_users
        query = params[:q]
        if query.blank?
          users = User.includes(:workouts, :goals).order(created_at: :desc)
        else
          users = User.where("display_name ILIKE ? OR email ILIKE ?", "%#{query}%", "%#{query}%")
                      .includes(:workouts, :goals)
                      .order(created_at: :desc)
        end
        
        render json: users.map do |user|
          {
            id: user.id,
            display_name: user.display_name,
            email: user.email,
            admin: user.admin?,
            created_at: user.created_at,
            total_workouts: user.total_workouts_count,
            total_goals: user.total_goals_count,
            last_activity: user.last_activity
          }
        end
      end
      
      def all_users
        Rails.logger.info "Admin all_users called by user: #{current_user.email}, admin: #{current_user.admin?}"
        Rails.logger.info "Current user session: #{session[:user_id]}"
        Rails.logger.info "Request headers: #{request.headers.to_h.select { |k, v| k.start_with?('HTTP_') }}"
        
        users = User.includes(:workouts, :goals).order(created_at: :desc)
        Rails.logger.info "Found #{users.count} users"
        
        render json: users.map do |user|
          {
            id: user.id,
            display_name: user.display_name,
            email: user.email,
            admin: user.admin?,
            created_at: user.created_at,
            total_workouts: user.total_workouts_count,
            total_goals: user.total_goals_count,
            last_activity: user.last_activity
          }
        end
      end
      
      def workout_analytics
        analytics = {
          by_type: Workout.group(:workout_type).count,
          by_month: Workout.group("DATE_TRUNC('month', created_at)").count,
          recent_workouts: Workout.includes(:user).order(created_at: :desc).limit(10).map do |workout|
            {
              id: workout.id,
              workout_type: workout.workout_type,
              duration: workout.duration,
              calories: workout.calories,
              distance: workout.distance,
              date: workout.date,
              user: {
                id: workout.user.id,
                display_name: workout.user.display_name
              }
            }
          end
        }
        
        render json: analytics
      end
      
      def goal_analytics
        analytics = {
          completion_rate: Goal.count > 0 ? (Goal.where(completed: true).count.to_f / Goal.count * 100).round(2) : 0,
          by_type: Goal.group(:goal_type).count,
          by_status: {
            completed: Goal.where(completed: true).count,
            active: Goal.where(completed: false).count
          },
          recent_goals: Goal.includes(:user).order(created_at: :desc).limit(10).map do |goal|
            {
              id: goal.id,
              goal_type: goal.goal_type,
              target_value: goal.target_value,
              current_value: goal.current_value,
              completed: goal.completed,
              end_date: goal.end_date,
              user: {
                id: goal.user.id,
                display_name: goal.user.display_name
              }
            }
          end
        }
        
        render json: analytics
      end

      def delete_user
        user = User.find(params[:id])
        
        if user.admin?
          render json: { error: 'Cannot delete admin users' }, status: :forbidden
          return
        end

        if user.destroy
          render json: { message: 'User deleted successfully' }
        else
          render json: { error: 'Failed to delete user' }, status: :unprocessable_entity
        end
      rescue ActiveRecord::RecordNotFound
        render json: { error: 'User not found' }, status: :not_found
      end
    end
  end
end 