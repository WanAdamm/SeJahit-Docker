import { useRouteError, Link, useNavigate } from "react-router-dom";

// library imports
import { HiArrowUturnLeft } from "react-icons/hi2";
import { IoHomeOutline } from "react-icons/io5";

// styling
import "../styles/Error.css"

const Error = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <div className="error-page">
      <div className="error-container">
        <h1 className="error-title">Uh oh! We’ve got a problem.</h1>
        <p className="error-message">{error?.message || "Not Found"}</p>
        <div className="error-actions">
          <button className="btn btn-dark d-flex" onClick={() => navigate(-1)}>
            <HiArrowUturnLeft size={20} />
            <span>Go Back</span>
          </button>
          <Link to="/" className="btn btn-dark d-flex">
            <IoHomeOutline size={20} />
            <span>Go home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Error;
