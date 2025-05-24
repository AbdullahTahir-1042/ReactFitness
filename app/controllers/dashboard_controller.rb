require 'ostruct'

class DashboardController < ApplicationController
    skip_before_action :require_user, only: [:index]
  
    def index
      if logged_in?
        @user = current_user
        @recent_workouts = @user.workouts.recent.limit(5)
        @active_goals = @user.goals.active
        @daily_stats = {
          steps: @user.daily_steps,
          distance: @user.daily_distance,
          calories: @user.daily_calories
        }
        @badges = @user.achieved_badges
      else
        # Demo data for non-authenticated users
        @daily_stats = {
          steps: 8500,
          distance: 6.2,
          calories: 450
        }
        @recent_workouts = [
          OpenStruct.new(
            workout_type: "Running",
            duration: 30,
            calories: 300,
            date: Date.today - 1,
            distance: 5.0
          ),
          OpenStruct.new(
            workout_type: "Cycling",
            duration: 45,
            calories: 250,
            date: Date.today - 2,
            distance: 15.0
          )
        ]
        @active_goals = [
          OpenStruct.new(
            goal_type: "daily_steps",
            target_value: 10000,
            progress: 85,
            end_date: Date.today + 7
          )
        ]
        @badges = ["first_workout", "step_master"]
      end
    end
  
    def update_steps
      return render json: { success: false, message: "Please login to track steps" } unless logged_in?
  
      @user = current_user
      if @user.add_steps(params[:steps].to_i)
        render json: { success: true, stats: @daily_stats }
      else
        render json: { success: false, errors: @user.errors.full_messages }
      end
    end
  
    def add_workout
      return redirect_to login_path, alert: "Please login to add workouts" unless logged_in?
  
      @user = current_user
      workout = @user.workouts.build(workout_params)
  
      if workout.save
        @user.add_workout(workout.attributes)
        redirect_to dashboard_path, notice: 'Workout added successfully!'
      else
        redirect_to dashboard_path, alert: 'Failed to add workout'
      end
    end
  
    private
  
    def workout_params
      params.require(:workout).permit(:workout_type, :duration, :calories, :distance, :date, :notes)
    end
  end  