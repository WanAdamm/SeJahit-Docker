import { Link, useFetcher } from "react-router-dom";

const LoginPage = () => {
  const formFetcher = useFetcher();
  const isSubmitting = formFetcher.state !== "idle";

  return (
    <div className="page-shell auth-page">
      <section className="auth-card" aria-labelledby="login-title">
        <span className="eyebrow">Member rail</span>
        <h1 id="login-title">Log in to hold a piece.</h1>
        <p>Saved pieces leave the public rail until you remove them from your cart.</p>

        <formFetcher.Form method="post" action="" className="studio-form">
          <label>
            Username
            <input type="text" name="username" autoComplete="username" required />
          </label>

          <label>
            Password
            <input type="password" name="password" autoComplete="current-password" required />
          </label>

          <input type="hidden" name="_action" value="login" />

          <button type="submit" className="sj-button sj-button--primary" disabled={isSubmitting}>
            {isSubmitting ? "Logging in" : "Log in"}
          </button>
        </formFetcher.Form>

        <Link to="/register" className="auth-card__link">
          Create an account
        </Link>
      </section>
    </div>
  );
};

export default LoginPage;
