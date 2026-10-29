import { Link } from 'react-router'

function RegisterPage() {
  console.log('RegisterPage rendered')
  return (
    <section className="auth-card auth-card--register" aria-labelledby="register-title">
      <div className="auth-card__intro">
        <h1 id="register-title">Sign up to start listening</h1>
      </div>

      <form className="auth-form" onSubmit={(event) => event.preventDefault()}>
        <label className="auth-field">
          <span>Email address</span>
          <input type="email" name="email" placeholder="name@domain.com" autoComplete="email" required />
        </label>
        <button className="auth-submit" type="submit">Next</button>
      </form>

      <div className="auth-divider"><span>or</span></div>
      <div className="auth-socials" aria-label="Other sign up options">
        <button className="auth-social" type="button"><span className="auth-social__icon auth-social__icon--google">G</span>Sign up with Google</button>
        <button className="auth-social" type="button"><span className="auth-social__icon auth-social__icon--apple">●</span>Sign up with Apple</button>
      </div>

      <div className="auth-card__switch">
        <span>Already have an account?</span>
        <Link to="/login">Log in</Link>
      </div>
    </section>
  )
}

export default RegisterPage
