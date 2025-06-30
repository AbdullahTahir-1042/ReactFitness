module Api
  class UsersController < ApplicationController
    skip_before_action :verify_authenticity_token
    before_action :require_user, except: [:create]

    def create
      user = User.new(user_params)
      if user.save
        session[:user_id] = user.id
        render json: { success: true, user: user.slice(:id, :email, :display_name) }
      else
        render json: { error: user.errors.full_messages.join(', ') }, status: :unprocessable_entity
      end
    end

    def profile
      render json: current_user
    end

    def all_users
      return render json: { error: 'Unauthorized' }, status: :unauthorized unless current_user&.admin?
      
      users = User.includes(:workouts, :goals).order(created_at: :desc)
      render json: users.map { |user|
        {
          id: user.id,
          display_name: user.display_name,
          email: user.email,
          admin: user.admin?,
          created_at: user.created_at,
          total_workouts: user.workouts.count,
          total_goals: user.goals.count
        }
      }
    end

    def check_admin
      if current_user
        render json: { 
          is_admin: current_user.admin?,
          user_id: current_user.id,
          email: current_user.email
        }
      else
        render json: { error: 'Not logged in' }, status: :unauthorized
      end
    end

    def lifetime_stats
      render json: current_user.lifetime_stats
    end

    def badges
      render json: current_user.badge_data
    end

    def steps
      render json: current_user.steps
    end

    def distance
      render json: current_user.distance
    end

    def friends
      render json: current_user.friends
    end

    def workouts
      render json: current_user.workouts.recent.limit(5)
    end

    def create_workout
      workout = current_user.workouts.build(workout_params)
      if workout.save
        current_user.add_workout(workout.attributes)
        render json: workout, status: :created
      else
        render json: { error: workout.errors.full_messages.join(', ') }, status: :unprocessable_entity
      end
    end

    def goals
      render json: current_user.goals.active.map { |goal| goal.as_json.merge(progress: goal.progress) }
    end

    def create_goal
      goal = current_user.goals.build(goal_params)
      if goal.save
        render json: goal, status: :created
      else
        render json: { error: goal.errors.full_messages.join(', ') }, status: :unprocessable_entity
      end
    end

    def destroy_workout
      workout = current_user.workouts.find_by(id: params[:id])
      if workout&.destroy
        render json: { success: true }
      else
        render json: { error: 'Workout not found or could not be deleted' }, status: :unprocessable_entity
      end
    end

    def destroy_goal
      goal = current_user.goals.find_by(id: params[:id])
      if goal&.destroy
        render json: { success: true }
      else
        render json: { error: 'Goal not found or could not be deleted' }, status: :unprocessable_entity
      end
    end

    def update
      if current_user.update(user_update_params)
        render json: { success: true, user: current_user.slice(:id, :email, :display_name) }
      else
        render json: { error: current_user.errors.full_messages.join(', ') }, status: :unprocessable_entity
      end
    end

    private

    def user_params
      params.require(:user).permit(:display_name, :email, :password)
    end

    def workout_params
      params.require(:workout).permit(:workout_type, :duration, :calories, :distance, :date, :notes)
    end

    def goal_params
      params.require(:goal).permit(:goal_type, :target_value, :start_date, :end_date)
    end

    def user_update_params
      params.require(:user).permit(:display_name, :email, :password, :password_confirmation)
    end
  end
end 