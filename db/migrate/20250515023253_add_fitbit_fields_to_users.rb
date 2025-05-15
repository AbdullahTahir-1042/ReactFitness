class AddFitbitFieldsToUsers < ActiveRecord::Migration[7.0]

  def down
    change_column :users, :steps, :text
    change_column :users, :badges, :text
    remove_column :users, :lifetime_stats
    remove_column :users, :distance
    remove_column :users, :friends
  end
  
  def up
    execute <<-SQL
      ALTER TABLE users
      ALTER COLUMN steps TYPE jsonb USING steps::jsonb;
    SQL

    execute <<-SQL
      ALTER TABLE users
      ALTER COLUMN badges TYPE jsonb USING badges::jsonb;
    SQL

    add_column :users, :lifetime_stats, :jsonb, default: {}
    add_column :users, :distance, :jsonb, default: {}
    add_column :users, :friends, :jsonb, default: {}
  end

  
end
