import { Link, useFetcher } from "react-router-dom";

const RegisterPage = () => {
  const formFetcher = useFetcher();
  const isSubmitting = formFetcher.state !== "idle";

  return (
    <div className="page-shell auth-page">
      <section className="auth-card" aria-labelledby="register-title">
        <span className="eyebrow">New wearer</span>
        <h1 id="register-title">Create your SeJahit rail account.</h1>
        <p>Use it to hold pieces in your cart while you compare what fits your wardrobe.</p>

        <formFetcher.Form method="post" action="" className="studio-form">
          <label>
            Name
            <input type="text" name="name" autoComplete="name" required />
          </label>

          <label>
            Username
            <input type="text" name="username" autoComplete="username" required />
          </label>

          <label>
            Password
            <input type="password" name="password" autoComplete="new-password" required />
          </label>

          <input type="hidden" name="_action" value="register" />

          <button type="submit" className="sj-button sj-button--primary" disabled={isSubmitting}>
            {isSubmitting ? "Creating account" : "Create account"}
          </button>
        </formFetcher.Form>

        <Link to="/login" className="auth-card__link">
          I already have an account
        </Link>
      </section>
    </div>
  );
};

export default RegisterPage;
