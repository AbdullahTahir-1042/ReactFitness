class CreateGoalsTable < ActiveRecord::Migration[8.0]
  def change
    create_table :goals do |t|
      t.references :user, null: false, foreign_key: true
      t.string :goal_type, null: false
      t.float :target_value, null: false
      t.float :current_value, default: 0
      t.date :start_date, null: false
      t.date :end_date, null: false
      t.boolean :completed, default: false

      t.timestamps
    end
  end
end 