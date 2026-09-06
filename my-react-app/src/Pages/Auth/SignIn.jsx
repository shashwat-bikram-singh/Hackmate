import React from 'react';
import './Auth.css';
import SaveToggle from '../../Components/AuthToggle/SaveToggle.jsx';

function SignIn() {
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
          <h1 className="auth-heading">Welcome back.</h1>
          <p className="auth-tagline">Looking for the best, uniting the rest</p>
          <a href="#/signup" className="auth-switch-btn">Sign up</a>
        </div>
      </div>

      <div className="auth-form-wrap">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2 className="auth-form-title">Log in</h2>

          <div className="auth-field">
            <label className="auth-label" htmlFor="login-email">Email</label>
            <input className="auth-input" id="login-email" type="email" required />
          </div>

          <div className="auth-field">
            <label className="auth-label" htmlFor="login-password">Password</label>
            <input className="auth-input" id="login-password" type="password" required />
          </div>

          <p className="auth-agree">Enter your details to continue</p>

          <SaveToggle
            size="md"
            idleText="Log in"
            savedText="Logged in!"
            loadingDuration={900}
            successDuration={700}
            onComplete={handleComplete}
          />

          <p className="auth-alt">New here? <a href="#/signup">Create an account</a></p>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
