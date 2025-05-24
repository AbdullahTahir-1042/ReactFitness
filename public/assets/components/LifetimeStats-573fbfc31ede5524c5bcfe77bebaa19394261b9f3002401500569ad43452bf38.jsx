import React from 'react';

function LifetimeStats({ lifetimeStats }) {
  // Use the direct stats from the backend with proper default values
  const stats = lifetimeStats || {};
  
  // Helper function to safely format numbers
  const formatNumber = (value, decimals = 0) => {
    if (value === undefined || value === null) return '0';
    return Number(value).toFixed(decimals);
  };

  const formatWithCommas = (value) => {
    if (value === undefined || value === null) return '0';
    return Number(value).toLocaleString();
  };

  return (
    <div className="card mb-4">
      <div className="card-header">
        <h3>Lifetime Stats</h3>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-6">
            <p><strong>Total Distance:</strong></p>
            <p><strong>Total Calories:</strong></p>
            <p><strong>Total Workouts:</strong></p>
            <p><strong>Average Duration:</strong></p>
            <p><strong>Average Calories:</strong></p>
            <p><strong>Average Distance:</strong></p>
          </div>
          <div className="col-6">
            <p>{formatNumber(stats.total_distance, 2)} miles</p>
            <p>{formatWithCommas(stats.total_calories)}</p>
            <p>{formatWithCommas(stats.total_workouts)}</p>
            <p>{formatNumber(stats.average_duration)} min</p>
            <p>{formatWithCommas(stats.average_calories)}</p>
            <p>{formatNumber(stats.average_distance, 2)} miles</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LifetimeStats; 