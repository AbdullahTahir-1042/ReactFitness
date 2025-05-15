import React from 'react';

function Friends({ friends }) {
  if (!friends || friends.length === 0) return null;

  
  return (
    <div className="card">
      <div className="card-header">
        <h3>Friends</h3>
      </div>
      <div className="card-body">
        <div className="list-group">
          {friends.map((friend, index) => (
            <div key={index} className="list-group-item">
              <div className="d-flex align-items-center">
                <img 
                  src={friend.avatar} 
                  alt={friend.displayName}
                  className="rounded-circle me-2"
                  style={{ width: '32px', height: '32px' }}
                />
                <div>
                  <h6 className="mb-0">{friend.displayName}</h6>
                  <small className="text-muted">{friend.steps} steps</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Friends; 