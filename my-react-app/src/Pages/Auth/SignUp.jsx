import React from 'react';
import './Auth.css';
import SaveToggle from '../../Components/AuthToggle/SaveToggle.jsx';

function SignUp() {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleComplete = () => {
    window.location.hash = '#/dashboard';
  };

  return (
    <div className="auth">
      <div className="auth-brand">
        <a href="#/" className="logo auth-logo">Hacka<span className="logo-accent">Mate</span></a>
        <div className="auth-brand-body">
          <h1 className="auth-heading">Get started.</h1>
          <p className="auth-tagline">Looking for the best, uniting the rest</p>
          <a href="#/login" className="auth-switch-btn">Log in</a>
        </div>
      </div>

      <div className="auth-form-wrap">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2 className="auth-form-title">Create account</h2>

          <div className="auth-field">
            <label className="auth-label" htmlFor="signup-email">Email</label>
            <input className="auth-input" id="signup-email" type="email" required />
          </div>

          <div className="auth-field">
            <label className="auth-label" htmlFor="signup-password">Password</label>
            <input className="auth-input" id="signup-password" type="password" required />
          </div>

          <div className="auth-field">
            <label className="auth-label" htmlFor="signup-name">Full name</label>
            <input className="auth-input" id="signup-name" type="text" required />
          </div>

          <p className="auth-agree">I agree and will follow the rules of this website</p>

          <SaveToggle
            size="md"
            idleText="Create account"
            savedText="Account created!"
            loadingDuration={950}
            successDuration={750}
            onComplete={handleComplete}
          />

          <p className="auth-alt">Already have an account? <a href="#/login">Log in</a></p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
