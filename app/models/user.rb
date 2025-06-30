class User < ApplicationRecord
  has_secure_password
  
  # Associations
  has_many :workouts, dependent: :destroy
  has_many :goals, dependent: :destroy
  
  # Validations
  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password, length: { minimum: 6 }, if: -> { new_record? || !password.nil? }
  
  # Scopes
  scope :admins, -> { where(admin: true) }
  scope :regular_users, -> { where(admin: false) }
  scope :recently_active, -> { where('updated_at > ?', 7.days.ago) }
  
  # Fitness tracking attributes
  attribute :daily_steps, :integer, default: 0
  attribute :daily_distance, :float, default: 0.0
  attribute :daily_calories, :integer, default: 0
  attribute :total_workouts, :integer, default: 0
  attribute :achieved_badges, :text, default: []
  attribute :fitness_goals, :text, default: {}
  attribute :lifetime_stats, :json, default: {}
  
  # BADGES
  BADGES = [
    {
      key: 'distance_pro',
      name: 'Distance Pro',
      description: 'Complete a distance goal',
      condition: ->(user) { user.goals.where(goal_type: ['distance', 'monthly_distance']).any?(&:completed?) },
      progress: ->(user) {
        total = user.goals.where(goal_type: ['distance', 'monthly_distance']).count
        completed = user.goals.where(goal_type: ['distance', 'monthly_distance']).select(&:completed?).count
        total > 0 ? (completed.to_f / total * 100).clamp(0, 100) : 0
      }
    },
    {
      key: 'calorie_crusher',
      name: 'Calorie Crusher',
      description: 'Complete a calories goal',
      condition: ->(user) { user.goals.where(goal_type: 'calories').any?(&:completed?) },
      progress: ->(user) {
        total = user.goals.where(goal_type: 'calories').count
        completed = user.goals.where(goal_type: 'calories').select(&:completed?).count
        total > 0 ? (completed.to_f / total * 100).clamp(0, 100) : 0
      }
    },
    {
      key: 'workout_warrior',
      name: 'Workout Warrior',
      description: 'Complete 5 workout goals',
      condition: ->(user) { user.goals.where(goal_type: ['workouts', 'weekly_workouts']).select(&:completed?).count >= 5 },
      progress: ->(user) {
        completed = user.goals.where(goal_type: ['workouts', 'weekly_workouts']).select(&:completed?).count
        (completed.to_f / 5 * 100).clamp(0, 100)
      }
    },
    {
      key: 'goal_master',
      name: 'Goal Master',
      description: 'Complete any 10 goals',
      condition: ->(user) { user.goals.select(&:completed?).count >= 10 },
      progress: ->(user) {
        completed = user.goals.select(&:completed?).count
        (completed.to_f / 10 * 100).clamp(0, 100)
      }
    },
    {
      key: 'consistency_star',
      name: 'Consistency Star',
      description: 'Complete a goal 3 weeks in a row',
      condition: ->(user) {
        # Check if user completed at least one goal in each of 3 consecutive weeks
        completed = user.goals.select(&:completed?)
        return false if completed.empty?
        weeks = completed.map { |g| g.end_date.cweek }.uniq.sort
        weeks.each_cons(3).any? { |a, b, c| b == a + 1 && c == b + 1 }
      },
      progress: ->(user) {
        completed = user.goals.select(&:completed?)
        weeks = completed.map { |g| g.end_date.cweek }.uniq.sort
        streak = 1
        weeks.each_cons(2) { |a, b| streak = (b == a + 1) ? streak + 1 : 1 }
        (streak.to_f / 3 * 100).clamp(0, 100)
      }
    }
  ]
  
  # Admin methods
  def admin?
    admin == true
  end
  
  def make_admin!
    update!(admin: true)
  end
  
  def remove_admin!
    update!(admin: false)
  end
  
  # User statistics for admin panel
  def total_workouts_count
    workouts.count
  end
  
  def total_goals_count
    goals.count
  end
  
  def completed_goals_count
    goals.where(completed: true).count
  end
  
  def last_activity
    workouts.maximum(:created_at) || created_at
  end
  
  def fitness_score
    score = 0
    score += total_workouts_count * 10
    score += completed_goals_count * 20
    score += (daily_steps / 1000).to_i * 5
    score += (daily_distance * 10).to_i
    score
  end
  
  # Methods for fitness tracking
  def add_steps(steps)
    self.daily_steps += steps
    self.daily_distance = calculate_distance(steps)
    self.daily_calories = calculate_calories(steps)
    save
  end
  
  def add_workout(workout_data)
    self.total_workouts += 1
    self.daily_calories += workout_data[:calories].to_i
    
    # Initialize lifetime stats if empty
    self.lifetime_stats ||= {}
    
    # Update lifetime stats with new workout data
    self.lifetime_stats = {
      'total_distance' => (lifetime_stats['total_distance'] || 0) + workout_data[:distance].to_f,
      'total_calories' => (lifetime_stats['total_calories'] || 0) + workout_data[:calories].to_i,
      'total_workouts' => total_workouts,
      'average_duration' => calculate_average_duration,
      'average_calories' => calculate_average_calories,
      'average_distance' => calculate_average_distance
    }
    
    check_and_award_badges
    save!
  end

  def lifetime_stats
    ws = workouts
    {
      'total_distance' => ws.sum(:distance),
      'total_calories' => ws.sum(:calories),
      'total_workouts' => ws.count,
      'average_duration' => ws.average(:duration).to_f.round(1),
      'average_calories' => ws.average(:calories).to_f.round(1),
      'average_distance' => ws.average(:distance).to_f.round(2)
    }
  end
  
  def set_goal(goal_type, target)
    self.fitness_goals[goal_type] = target
    save
  end
  
  def badge_data
    BADGES.map do |badge|
      {
        key: badge[:key],
        name: badge[:name],
        description: badge[:description],
        progress: badge[:progress].call(self),
        earned: badge[:condition].call(self)
      }
    end
  end
  
  private
  
  def calculate_distance(steps)
    # Average step length is about 0.762 meters
    (steps * 0.762 / 1000).round(2) # Convert to kilometers
  end
  
  def calculate_calories(steps)
    # Rough estimate: 0.04 calories per step
    (steps * 0.04).round
  end

  def calculate_average_duration
    return 0 if total_workouts.zero?
    workouts.average(:duration).to_f.round(1)
  end

  def calculate_average_calories
    return 0 if total_workouts.zero?
    workouts.average(:calories).to_f.round(1)
  end

  def calculate_average_distance
    return 0 if total_workouts.zero?
    workouts.average(:distance).to_f.round(2)
  end
  
  def check_and_award_badges
    badges = []
    
    # Example badge conditions
    badges << 'first_workout' if total_workouts == 1
    badges << 'step_master' if daily_steps >= 10000
    badges << 'distance_warrior' if daily_distance >= 5
    badges << 'calorie_crusher' if daily_calories >= 500
    badges << 'workout_warrior' if total_workouts >= 10
    
    self.achieved_badges = (achieved_badges + badges).uniq
  end
end