class AddFieldsToUsers < ActiveRecord::Migration[8.0]
  def change
    add_column :users, :email, :string
    #add_column :users, :display_name, :string
    add_column :users, :password_digest, :string
  end
end
