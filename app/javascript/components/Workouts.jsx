import React, { useState } from 'react';
import WorkoutModal from './WorkoutModal';

function Workouts({ workouts = [] }) {
  const [showModal, setShowModal] = useState(false);

  const handleAddWorkout = async (workoutData) => {
    try {
      const response = await fetch('/api/workouts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
        },
        body: JSON.stringify({ workout: workoutData })
      });

      if (response.ok) {
        // Refresh the page to show new workout
        window.location.reload();
      } else {
        console.error('Failed to add workout');
      }
    } catch (error) {
      console.error('Error adding workout:', error);
    }
  };

  // Ensure workouts is an array
  const workoutList = Array.isArray(workouts) ? workouts : [];
  const recentWorkouts = workoutList.slice(0, 3);

  return (
    <>
      <div className="card mb-4" style={{ cursor: 'pointer' }} onClick={() => setShowModal(true)}>
        <div className="card-header d-flex justify-content-between align-items-center">
          <h3 className="mb-0">Recent Workouts</h3>
          <span className="badge bg-primary rounded-pill">{workoutList.length}</span>
        </div>
        <div className="card-body">
          {workoutList.length === 0 ? (
            <p className="text-muted text-center mb-0">No workouts recorded yet</p>
          ) : (
            <div className="list-group">
              {recentWorkouts.map((workout, index) => (
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
                </div>
              ))}
              {workoutList.length > 3 && (
                <div className="text-center mt-2">
                  <small className="text-muted">Click to view all {workoutList.length} workouts</small>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <WorkoutModal
        show={showModal}
        onClose={() => setShowModal(false)}
        workouts={workoutList}
        onAddWorkout={handleAddWorkout}
      />
    </>
  );
}

export default Workouts; 