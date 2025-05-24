import React, { useState } from 'react';
import GoalModal from './GoalModal';
import dummyData from './dummyData.js';

function Goals({ goals = [], onAddGoal, isLoggedIn, cardStyle }) {
  const [showModal, setShowModal] = useState(false);
  // Show demo goals if not logged in and no goals
  const displayGoals = (isLoggedIn || goals.length > 0) ? goals : dummyData.goals;

  return (
    <>
      <div className="card mb-4" style={cardStyle || {}} onClick={() => setShowModal(true)}>
        <div className="card-header d-flex justify-content-between align-items-center" style={cardStyle || {}}>
          <h3 className="mb-0">Active Goals</h3>
          <span className="badge bg-primary rounded-pill">{displayGoals.length}</span>
        </div>
        <div className="card-body" style={cardStyle || {}}>
          {displayGoals.length === 0 ? (
            <p className="text-muted text-center mb-0">No active goals</p>
          ) : (
            <div className="list-group">
              {displayGoals.slice(0, 3).map((goal, index) => (
                <div key={index} className="list-group-item" style={cardStyle || {}}>
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-1">{goal.goal_type}</h5>
                    <span className="badge bg-primary rounded-pill">Target: {goal.target_value}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <small className="text-muted">Due: {goal.end_date ? new Date(goal.end_date).toLocaleDateString() : ''}</small>
                  </div>
                </div>
              ))}
              {displayGoals.length > 3 && (
                <div className="text-center mt-2">
                  <small className="text-muted">Click to view all {displayGoals.length} goals</small>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <GoalModal
        show={showModal}
        onClose={() => setShowModal(false)}
        goals={displayGoals}
        onAddGoal={onAddGoal}
      />
    </>
  );
}

export default Goals; 