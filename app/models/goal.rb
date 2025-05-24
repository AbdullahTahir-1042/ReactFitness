class Goal < ApplicationRecord
    belongs_to :user
    
    # Validations
    validates :goal_type, presence: true
    validates :target_value, presence: true, numericality: { greater_than: 0 }
    validates :start_date, presence: true
    validates :end_date, presence: true
    validate :end_date_after_start_date
    
    # Goal types
    GOAL_TYPES = %w[daily_steps weekly_workouts monthly_distance weight_loss calories].freeze
    
    # Scopes
    scope :active, -> { where('end_date >= ?', Date.current) }
    scope :completed, -> { where('end_date < ?', Date.current) }
    
    # Methods
    def progress
      case goal_type
      when 'daily_steps'
        total_steps = user.workouts.where('date >= ?', start_date).sum(:duration) # Replace with actual steps if tracked
        (total_steps.to_f / target_value * 100).clamp(0, 100)
      when 'weekly_workouts', 'workouts'
        total_workouts = user.workouts.where('date >= ?', start_date).count
        (total_workouts.to_f / target_value * 100).clamp(0, 100)
      when 'monthly_distance', 'distance'
        total_distance = user.workouts.where('date >= ?', start_date).sum(:distance)
        (total_distance.to_f / target_value * 100).clamp(0, 100)
      when 'calories'
        total_calories = user.workouts.where('date >= ?', start_date).sum(:calories)
        (total_calories.to_f / target_value * 100).clamp(0, 100)
      else
        0
      end
    end
    
    def completed?
      progress >= 100
    end
    
    private
    
    def end_date_after_start_date
      return if end_date.blank? || start_date.blank?
      
      if end_date < start_date
        errors.add(:end_date, "must be after the start date")
      end
    end
  end