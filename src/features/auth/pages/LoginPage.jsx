import { Link } from 'react-router'

function LoginPage() {
  return (
    <section className="auth-card" aria-labelledby="login-title">
      <div className="auth-card__intro">
        <h1 id="login-title">Welcome back</h1>
        <p>Log in to Spotify to continue.</p>
      </div>

      <form className="auth-form" onSubmit={(event) => event.preventDefault()}>
        <label className="auth-field">
          <span>Email or username</span>
          <input type="text" name="email" placeholder="Email or username" autoComplete="username" required />
        </label>
        <button className="auth-submit" type="submit">Continue</button>
      </form>

      <div className="auth-divider"><span>or</span></div>
      <div className="auth-socials" aria-label="Other sign in options">
        <button className="auth-social" type="button"><span className="auth-social__icon auth-social__icon--google">G</span>Continue with Google</button>
        <button className="auth-social" type="button"><span className="auth-social__icon auth-social__icon--facebook">f</span>Continue with Facebook</button>
        <button className="auth-social" type="button"><span className="auth-social__icon auth-social__icon--apple">●</span>Continue with Apple</button>
      </div>

      <div className="auth-card__switch">
        <span>Don’t have an account?</span>
        <Link to="/register">Sign up</Link>
      </div>
    </section>
  )
}

export default LoginPage
