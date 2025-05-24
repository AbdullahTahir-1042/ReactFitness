import React from 'react';

function Badges({ badges }) {
  if (!badges || badges.length === 0) return null;

  return (
    <div className="card">
      <div className="card-header">
        <h3>Badges</h3>
      </div>
      <div className="card-body">
        <div className="row">
          {badges.map((badge, index) => (
            <div key={badge.key} className="col-12 mb-3">
              <div className="d-flex align-items-center">
                <div style={{ minWidth: 60 }}>
                  {badge.earned ? (
                    <span className="badge bg-success p-2">Unlocked</span>
                  ) : (
                    <span className="badge bg-secondary p-2">Locked</span>
                  )}
                </div>
                <div className="flex-grow-1 ms-3">
                  <div className="fw-bold">{badge.name}</div>
                  <div className="text-muted small mb-1">{badge.description}</div>
                  <div className="progress" style={{ height: '16px' }}>
                    <div
                      className={`progress-bar${badge.earned ? ' bg-success' : ''}`}
                      role="progressbar"
                      style={{ width: `${Math.min(badge.progress || 0, 100)}%` }}
                      aria-valuenow={badge.progress || 0}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      {Math.round(badge.progress || 0)}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Badges; 
