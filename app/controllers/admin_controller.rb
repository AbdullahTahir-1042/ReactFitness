class AdminController < ApplicationController
  before_action :require_admin
  layout 'admin'
  
  def dashboard
    @total_users = User.count
    @total_workouts = Workout.count
    @total_goals = Goal.count
    @completed_goals = Goal.where(completed: true).count
    @recent_users = User.order(created_at: :desc).limit(5)
    @recent_workouts = Workout.includes(:user).order(created_at: :desc).limit(10)
    @top_users = User.joins(:workouts)
                     .group('users.id')
                     .order('COUNT(workouts.id) DESC')
                     .limit(5)
    
    # Chart data
    @users_by_month = User.group("DATE_TRUNC('month', created_at)")
                          .count
                          .sort
                          .last(6)
                          .map { |date, count| [date.strftime('%B %Y'), count] }
    
    @workouts_by_type = Workout.group(:workout_type)
                               .count
                               .sort_by { |_, count| -count }
                               .first(5)
  end
  
  def users
    @users = User.includes(:workouts, :goals)
                 .order(created_at: :desc)
                 .page(params[:page])
                 .per(20)
  end
  
  def user_details
    @user = User.find(params[:id])
    @workouts = @user.workouts.order(created_at: :desc).limit(10)
    @goals = @user.goals.order(created_at: :desc)
    @stats = {
      total_workouts: @user.total_workouts_count,
      total_goals: @user.total_goals_count,
      completed_goals: @user.completed_goals_count,
      fitness_score: @user.fitness_score,
      last_activity: @user.last_activity
    }
  end
  
  def toggle_admin
    @user = User.find(params[:id])
    if @user == current_user
      redirect_to admin_users_path, alert: "You cannot modify your own admin status"
      return
    end
    
    if @user.admin?
      @user.remove_admin!
      message = "Admin privileges removed from #{@user.display_name}"
    else
      @user.make_admin!
      message = "Admin privileges granted to #{@user.display_name}"
    end
    
    redirect_to admin_users_path, notice: message
  end
  
  def delete_user
    @user = User.find(params[:id])
    if @user == current_user
      redirect_to admin_users_path, alert: "You cannot delete your own account"
      return
    end
    
    @user.destroy
    redirect_to admin_users_path, notice: "User #{@user.display_name} has been deleted"
  end
  
  def workouts
    @workouts = Workout.includes(:user)
                      .order(created_at: :desc)
                      .page(params[:page])
                      .per(20)
  end
  
  def goals
    @goals = Goal.includes(:user)
                 .order(created_at: :desc)
                 .page(params[:page])
                 .per(20)
  end
  
  def analytics
    # User engagement analytics
    @active_users_7d = User.recently_active.count
    @active_users_30d = User.where('updated_at > ?', 30.days.ago).count
    
    # Workout analytics
    @workouts_this_week = Workout.where('created_at > ?', 1.week.ago).count
    @workouts_this_month = Workout.where('created_at > ?', 1.month.ago).count
    
    # Goal completion analytics
    @goal_completion_rate = Goal.count > 0 ? (Goal.where(completed: true).count.to_f / Goal.count * 100).round(2) : 0
    
    # Top workout types
    @top_workout_types = Workout.group(:workout_type)
                                .count
                                .sort_by { |_, count| -count }
                                .first(5)
    
    # User growth chart data
    @user_growth = User.group("DATE_TRUNC('week', created_at)")
                       .count
                       .sort
                       .last(12)
                       .map { |date, count| [date.strftime('%b %d'), count] }
  end
end 