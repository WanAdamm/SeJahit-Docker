import { Link, useNavigate, useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <div className="error-page">
      <section className="error-card" aria-labelledby="error-title">
        <span className="eyebrow">Loose thread</span>
        <h1 id="error-title">This seam did not hold.</h1>
        <p>{error?.message || "The page could not be found."}</p>
        <div className="error-card__actions">
          <button className="sj-button sj-button--ghost" onClick={() => navigate(-1)}>
            Go back
          </button>
          <Link to="/" className="sj-button sj-button--primary">
            Go home
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Error;
