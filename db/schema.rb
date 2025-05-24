# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_05_23_214850) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "goals", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "goal_type", null: false
    t.float "target_value", null: false
    t.float "current_value", default: 0.0
    t.date "start_date", null: false
    t.date "end_date", null: false
    t.boolean "completed", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_goals_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "fitbit_user_id"
    t.string "fitbit_access_token"
    t.string "fitbit_refresh_token"
    t.datetime "fitbit_token_expires_at"
    t.string "display_name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.jsonb "steps"
    t.jsonb "badges"
    t.jsonb "lifetime_stats", default: {}
    t.jsonb "distance", default: {}
    t.jsonb "friends", default: {}
    t.integer "daily_steps"
    t.float "daily_distance"
    t.integer "daily_calories"
    t.integer "total_workouts"
    t.text "achieved_badges"
    t.text "fitness_goals"
    t.string "email"
    t.string "password_digest"
  end

  create_table "workouts", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "workout_type", null: false
    t.integer "duration", null: false
    t.integer "calories", null: false
    t.float "distance", null: false
    t.date "date", null: false
    t.text "notes"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_workouts_on_user_id"
  end

  add_foreign_key "goals", "users"
  add_foreign_key "workouts", "users"
end
