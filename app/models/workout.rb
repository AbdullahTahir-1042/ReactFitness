class Workout < ApplicationRecord
    belongs_to :user
    
    # Validations
    validates :workout_type, presence: true
    validates :duration, presence: true, numericality: { greater_than: 0 }
    validates :calories, presence: true, numericality: { greater_than_or_equal_to: 0 }
    validates :distance, presence: true, numericality: { greater_than_or_equal_to: 0 }
    validates :date, presence: true
    
    # Scopes
    scope :recent, -> { order(date: :desc) }
    scope :by_type, ->(type) { where(workout_type: type) }
    
    # Methods
    def self.total_calories_burned
      sum(:calories)
    end
    
    def self.total_distance
      sum(:distance)
    end
    
    def self.average_duration
      average(:duration)
    end
  end