# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

# Create admin user
admin_user = User.find_or_create_by(email: 'admin@reactfit.com') do |user|
  user.display_name = 'Admin User'
  user.password = 'password123'
  user.admin = true
end

puts "Admin user created: #{admin_user.email} (password: password123)"

# Create some regular users for testing
5.times do |i|
  user = User.find_or_create_by(email: "user#{i+1}@example.com") do |u|
    u.display_name = "User #{i+1}"
    u.password = 'password123'
    u.admin = false
  end
  
  # Add some sample data for each user
  if user.workouts.count == 0
    3.times do |j|
      user.workouts.create!(
        workout_type: ['Running', 'Cycling', 'Swimming', 'Walking', 'Gym'].sample,
        duration: rand(20..60),
        calories: rand(100..500),
        distance: rand(1.0..10.0).round(2),
        date: Date.current - rand(0..30),
        notes: "Sample workout #{j+1}"
      )
    end
  end
  
  if user.goals.count == 0
    2.times do |j|
      user.goals.create!(
        goal_type: ['daily_steps', 'weekly_workouts', 'monthly_distance'].sample,
        target_value: rand(1000..10000),
        current_value: rand(0..1000),
        start_date: Date.current - rand(0..7),
        end_date: Date.current + rand(7..30),
        completed: [true, false].sample
      )
    end
  end
end

puts "Sample users and data created successfully!"
