class CreateUsers < ActiveRecord::Migration[8.0]
  def change
    create_table :users do |t|
      t.string :fitbit_user_id
      t.string :fitbit_access_token
      t.string :fitbit_refresh_token
      t.datetime :fitbit_token_expires_at
      t.string :display_name

      t.timestamps
    end
  end
end
