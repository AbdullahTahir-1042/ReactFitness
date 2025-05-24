class CreateWorkoutsTable < ActiveRecord::Migration[8.0]
  def change
    create_table :workouts do |t|
      t.references :user, null: false, foreign_key: true
      t.string :workout_type, null: false
      t.integer :duration, null: false
      t.integer :calories, null: false
      t.float :distance, null: false
      t.date :date, null: false
      t.text :notes

      t.timestamps
    end
  end
end 