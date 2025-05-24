import React, { useState } from 'react';

function GoalModal({ show, onClose, goals = [], onAddGoal }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newGoal, setNewGoal] = useState({
    goal_type: '',
    target_value: '',
    start_date: new Date().toISOString().split('T')[0],
    end_date: new Date().toISOString().split('T')[0]
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGoal(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddGoal(newGoal);
    setNewGoal({
      goal_type: '',
      target_value: '',
      start_date: new Date().toISOString().split('T')[0],
      end_date: new Date().toISOString().split('T')[0]
    });
    setShowAddForm(false);
  };

  const handleDeleteGoal = async (id) => {
    if (!window.confirm('Are you sure you want to delete this goal?')) return;
    try {
      const response = await fetch(`/api/goals/${id}`, {
        method: 'DELETE',
        headers: {
          'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
        }
      });
      if (response.ok) {
        window.location.reload();
      } else {
        alert('Failed to delete goal');
      }
    } catch (error) {
      alert('Error deleting goal');
    }
  };

  if (!show) return null;

  return (
    <>
      <div className="modal-backdrop fade show" style={{ zIndex: 1040, background: '#000', opacity: 0.85 }}></div>
      <div className="modal fade show" style={{ display: 'block', zIndex: 1050, background: 'rgba(0,0,0,0.95)' }} tabIndex="-1">
        <div className="modal-dialog modal-lg">
          <div className="modal-content" style={{ background: '#181818', color: '#fff', border: 'none' }}>
            <div className="modal-header" style={{ background: '#111', color: '#fff', border: 'none' }}>
              <h5 className="modal-title">Goals</h5>
              <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              {!showAddForm ? (
                <>
                  <div className="d-flex justify-content-end mb-3">
                    <button 
                      className="btn btn-primary"
                      onClick={() => setShowAddForm(true)}
                    >
                      Add Goal
                    </button>
                  </div>
                  {goals.length === 0 ? (
                    <div className="text-center py-4">
                      <p className="text-muted">No goals set yet</p>
                      <button 
                        className="btn btn-outline-primary"
                        onClick={() => setShowAddForm(true)}
                      >
                        Add Your First Goal
                      </button>
                    </div>
                  ) : (
                    <div className="list-group">
                      {goals.map((goal, index) => (
                        <div key={index} className="list-group-item">
                          <div className="d-flex justify-content-between align-items-center">
                            <h5 className="mb-1">{goal.goal_type}</h5>
                            <span className="badge bg-primary rounded-pill">Target: {goal.target_value}</span>
                          </div>
                          <div className="d-flex justify-content-between mb-2">
                            <small className="text-muted">Start: {goal.start_date ? new Date(goal.start_date).toLocaleDateString() : ''}</small>
                            <small className="text-muted">Due: {goal.end_date ? new Date(goal.end_date).toLocaleDateString() : ''}</small>
                          </div>
                          <div className="progress mb-2" style={{ height: '20px' }}>
                            <div
                              className={`progress-bar${goal.progress >= 100 ? ' bg-success' : ''}`}
                              role="progressbar"
                              style={{ width: `${Math.min(goal.progress || 0, 100)}%` }}
                              aria-valuenow={goal.progress || 0}
                              aria-valuemin="0"
                              aria-valuemax="100"
                            >
                              {Math.round(goal.progress || 0)}%
                            </div>
                          </div>
                          <button className="btn btn-sm btn-danger ms-2" onClick={() => handleDeleteGoal(goal.id)}>Delete</button>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Goal Type</label>
                    <select 
                      className="form-select"
                      name="goal_type"
                      value={newGoal.goal_type}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select a goal type</option>
                      <option value="daily_steps">Daily Steps</option>
                      <option value="distance">Distance</option>
                      <option value="calories">Calories</option>
                      <option value="workouts">Workouts</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Target Value</label>
                    <input
                      type="number"
                      className="form-control"
                      name="target_value"
                      value={newGoal.target_value}
                      onChange={handleInputChange}
                      required
                      min="1"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Start Date</label>
                    <input
                      type="date"
                      className="form-control"
                      name="start_date"
                      value={newGoal.start_date}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">End Date</label>
                    <input
                      type="date"
                      className="form-control"
                      name="end_date"
                      value={newGoal.end_date}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="d-flex justify-content-end gap-2">
                    <button 
                      type="button" 
                      className="btn btn-secondary"
                      onClick={() => setShowAddForm(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Save Goal
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

export default GoalModal; 