import {  useState } from 'react';


type LoginForm = {
  email: string;
  password: string;
};

const initialForm: LoginForm = { email: '', password: '' };

export default function Login() {
  const [form, setForm] = useState<LoginForm>(initialForm);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');

  const submitLogin = () => {
    setMessage(`Welcome back! We sent a sign-in request to ${form.email}.`);
  };

  return (
    <main className="login-page">
      <section className="login-intro" aria-label="Hackmate introduction">
        <a className="brand" href="/">HACK<span>MATE</span></a>
        <div className="intro-copy">
          <p className="eyebrow">BUILD WHAT'S NEXT</p>
          <h1>Your next great build starts with the right team.</h1>
          <p>Join a community of makers, mentors, and problem-solvers turning bold ideas into real products.</p>
        </div>
        <div className="stats" aria-label="Community statistics">
          <div><strong>12k+</strong><span>builders</span></div>
          <div><strong>480+</strong><span>hackathons</span></div>
          <div><strong>82</strong><span>countries</span></div>
        </div>
      </section>

      <section className="login-panel">
        <div className="login-card">
          <div className="card-heading">
            <p className="eyebrow">WELCOME BACK</p>
            <h2>Sign in to Hackmate</h2>
            <p>Pick up where your last big idea left off.</p>
          </div>

          <form onSubmit={submitLogin}>
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              required
            />

            <div className="label-row">
              <label htmlFor="password">Password</label>
              <a href="/forgot-password">Forgot password?</a>
            </div>
            <div className="password-field">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="Enter your password"
                value={form.password}
                onChange={(event) => setForm({ ...form, password: event.target.value })}
                required
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Hide password' : 'Show password'}>
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>

            <label className="remember"><input type="checkbox" /> <span>Keep me signed in</span></label>
            <button className="sign-in" type="submit">Sign in <span>→</span></button>
            {message && <p className="form-message" role="status">{message}</p>}
          </form>

          <div className="divider"><span>or continue with</span></div>
          <button className="google-button" type="button"><b>G</b> Google</button>
          <p className="signup">New to Hackmate? <a href="/signup">Create an account</a></p>
        </div>
      </section>
    </main>
  );
}
