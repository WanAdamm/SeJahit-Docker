import "bootstrap/dist/css/bootstrap.min.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProductCard = ({ image, title, price, id }) => {
  // Define prop types
  ProductCard.propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  };

  return (
    <Link to={`/clothe/${id}`} className="no-underline">
      <div className="card" style={{ width: "18rem" }}>
        <img src={image} className="card-img-top" alt={title} />
        <div className="card-body text-center">
          <h5 className="card-title">{title}</h5>
          <p className="card-text text-l font-bold">RM {price}</p>
          <div className="d-flex justify-content-center gap-2">
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
