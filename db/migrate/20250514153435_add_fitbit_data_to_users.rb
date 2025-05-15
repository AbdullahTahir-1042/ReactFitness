class AddFitbitDataToUsers < ActiveRecord::Migration[8.0]
  def change
    add_column :users, :steps, :text
    add_column :users, :badges, :text
  end
end
