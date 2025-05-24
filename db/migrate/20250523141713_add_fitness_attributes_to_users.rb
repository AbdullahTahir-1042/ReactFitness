class AddFitnessAttributesToUsers < ActiveRecord::Migration[8.0]
  def change
    add_column :users, :daily_steps, :integer
    add_column :users, :daily_distance, :float
    add_column :users, :daily_calories, :integer
    add_column :users, :total_workouts, :integer
    add_column :users, :achieved_badges, :text
    add_column :users, :fitness_goals, :text
  end
end
