import React, { useState } from 'react';

function WorkoutModal({ show, onClose, workouts = [], onAddWorkout }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newWorkout, setNewWorkout] = useState({
    workout_type: '',
    duration: '',
    distance: '',
    date: new Date().toISOString().split('T')[0]
  });

  const calculateCalories = (type, duration, distance) => {
    // Base MET (Metabolic Equivalent of Task) values for different activities
    const metValues = {
      'Running': 10,
      'Cycling': 8,
      'Swimming': 8,
      'Walking': 4,
      'Weight Training': 6,
      'Yoga': 3
    };

    // Average weight in kg (can be made dynamic based on user profile)
    const weight = 70;
    
    // Calculate calories burned using the formula: Calories = MET * weight * duration/60
    const met = metValues[type] || 5; // Default to 5 if type not found
    const calories = Math.round(met * weight * (duration / 60));
    
    return calories;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedWorkout = {
      ...newWorkout,
      [name]: value
    };
    
    // Calculate calories whenever workout type, duration, or distance changes
    if (name === 'workout_type' || name === 'duration' || name === 'distance') {
      updatedWorkout.calories = calculateCalories(
        updatedWorkout.workout_type,
        updatedWorkout.duration,
        updatedWorkout.distance
      );
    }
    
    setNewWorkout(updatedWorkout);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ensure calories are calculated before submitting
    const workoutWithCalories = {
      ...newWorkout,
      calories: calculateCalories(newWorkout.workout_type, newWorkout.duration, newWorkout.distance)
    };
    onAddWorkout(workoutWithCalories);
    setNewWorkout({
      workout_type: '',
      duration: '',
      distance: '',
      date: new Date().toISOString().split('T')[0]
    });
    setShowAddForm(false);
  };

  const handleDeleteWorkout = async (id) => {
    if (!window.confirm('Are you sure you want to delete this workout?')) return;
    try {
      const response = await fetch(`/api/workouts/${id}`, {
        method: 'DELETE',
        headers: {
          'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
        }
      });
      if (response.ok) {
        window.location.reload();
      } else {
        alert('Failed to delete workout');
      }
    } catch (error) {
      alert('Error deleting workout');
    }
  };

  if (!show) return null;

  return (
    <>
      <div className="modal-backdrop fade show" style={{ zIndex: 1040 }}></div>
      <div className="modal fade show" style={{ display: 'block', zIndex: 1050 }} tabIndex="-1">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Workouts</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              {!showAddForm ? (
                <>
                  <div className="d-flex justify-content-end mb-3">
                    <button 
                      className="btn btn-primary"
                      onClick={() => setShowAddForm(true)}
                    >
                      Add Workout
                    </button>
                  </div>
                  {workouts.length === 0 ? (
                    <div className="text-center py-4">
                      <p className="text-muted">No workouts recorded yet</p>
                      <button 
                        className="btn btn-outline-primary"
                        onClick={() => setShowAddForm(true)}
                      >
                        Add Your First Workout
                      </button>
                    </div>
                  ) : (
                    <div className="list-group">
                      {workouts.map((workout, index) => (
                        <div key={index} className="list-group-item">
                          <div className="d-flex justify-content-between align-items-center">
                            <h5 className="mb-1">{workout.workout_type}</h5>
                            <span className="badge bg-primary rounded-pill">{workout.duration} min</span>
                          </div>
                          <div className="d-flex justify-content-between">
                            <small className="text-muted">{workout.calories} calories</small>
                            <small className="text-muted">{workout.distance} km</small>
                          </div>
                          <small className="text-muted">{new Date(workout.date).toLocaleDateString()}</small>
                          <button className="btn btn-sm btn-danger ms-2" onClick={() => handleDeleteWorkout(workout.id)}>Delete</button>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Workout Type</label>
                    <select 
                      className="form-select"
                      name="workout_type"
                      value={newWorkout.workout_type}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select a workout type</option>
                      <option value="Running">Running</option>
                      <option value="Cycling">Cycling</option>
                      <option value="Swimming">Swimming</option>
                      <option value="Walking">Walking</option>
                      <option value="Weight Training">Weight Training</option>
                      <option value="Yoga">Yoga</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Duration (minutes)</label>
                    <input
                      type="number"
                      className="form-control"
                      name="duration"
                      value={newWorkout.duration}
                      onChange={handleInputChange}
                      required
                      min="1"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Distance (km)</label>
                    <input
                      type="number"
                      className="form-control"
                      name="distance"
                      value={newWorkout.distance}
                      onChange={handleInputChange}
                      required
                      min="0"
                      step="0.1"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Date</label>
                    <input
                      type="date"
                      className="form-control"
                      name="date"
                      value={newWorkout.date}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  {newWorkout.calories > 0 && (
                    <div className="alert alert-info">
                      Estimated calories burned: {newWorkout.calories} calories
                    </div>
                  )}
                  <div className="d-flex justify-content-end gap-2">
                    <button 
                      type="button" 
                      className="btn btn-secondary"
                      onClick={() => setShowAddForm(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Save Workout
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WorkoutModal; 