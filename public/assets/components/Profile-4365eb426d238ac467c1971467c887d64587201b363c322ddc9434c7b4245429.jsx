import React, { useState, useEffect } from 'react';

function getInitials(name) {
  if (!name) return '';
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function Profile() {
  const [profile, setProfile] = useState({ display_name: '', email: '' });
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetch('/api/profile', {
      headers: {
        'Accept': 'application/json',
        'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
      }
    })
      .then(res => res.json())
      .then(data => {
        setProfile({
          display_name: data.display_name || '',
          email: data.email || ''
        });
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');
    try {
      const response = await fetch('/api/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
        },
        body: JSON.stringify({
          user: {
            display_name: profile.display_name,
            email: profile.email,
            password: password || undefined,
            password_confirmation: passwordConfirmation || undefined
          }
        })
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setSuccess('Profile updated successfully!');
        setPassword('');
        setPasswordConfirmation('');
      } else {
        setError(data.error || 'Failed to update profile.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-bg py-5" style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-7 col-lg-6">
            <div className="card shadow-lg border-0">
              <div className="card-header bg-primary text-white text-center position-relative" style={{ borderTopLeftRadius: '0.5rem', borderTopRightRadius: '0.5rem', minHeight: 120 }}>
                <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: 120 }}>
                  <div className="avatar mb-2" style={{ width: 70, height: 70, borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, fontWeight: 700, color: '#0d6efd', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                    {getInitials(profile.display_name)}
                  </div>
                  <h3 className="mb-0" style={{ fontWeight: 600 }}>{profile.display_name || 'Your Name'}</h3>
                  <small className="text-white-50">{profile.email}</small>
                </div>
              </div>
              <div className="card-body p-4">
                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}
                <form onSubmit={handleSubmit} autoComplete="off">
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light"><i className="bi bi-person"></i></span>
                      <input
                        type="text"
                        className="form-control"
                        name="display_name"
                        value={profile.display_name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light"><i className="bi bi-envelope"></i></span>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={profile.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">New Password</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light"><i className="bi bi-lock"></i></span>
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Leave blank to keep current password"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Confirm New Password</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light"><i className="bi bi-lock-fill"></i></span>
                      <input
                        type="password"
                        className="form-control"
                        name="password_confirmation"
                        value={passwordConfirmation}
                        onChange={e => setPasswordConfirmation(e.target.value)}
                        placeholder="Leave blank to keep current password"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary w-100 shadow-sm"
                    disabled={saving}
                    style={{ fontWeight: 600, fontSize: 18 }}
                  >
                    {saving ? (
                      <span><span className="spinner-border spinner-border-sm me-2"></span>Saving...</span>
                    ) : (
                      <span><i className="bi bi-save me-2"></i>Save Changes</span>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile; 