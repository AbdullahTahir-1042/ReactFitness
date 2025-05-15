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
            <div key={index} className="col-6 mb-3">
              <div className="badge-item text-center">
                <img 
                  src={badge.image50px} 
                  alt={badge.name}
                  className="img-fluid mb-2"
                  style={{ maxWidth: '50px' }}
                />
                <p className="mb-0">{badge.name}</p>
              </div>
            </div>
            
          ))}
        </div>
      </div>
    </div>
  );
}

export default Badges; 
