import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { formatPrice, getTypeLabel } from "../helpers";

const ProductCard = ({ image, title, price, id, type }) => {
  return (
    <Link to={`/clothe/${id}`} className="product-card">
      <span className="product-card__pin" aria-hidden="true" />
      <figure className="product-card__image">
        <img src={image} alt={title} loading="lazy" />
      </figure>
      <div className="product-card__body">
        <span className="product-card__type">{getTypeLabel(type)}</span>
        <h2>{title}</h2>
        <p>{formatPrice(price)}</p>
      </div>
    </Link>
  );
};

ProductCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  type: PropTypes.string,
};

export default ProductCard;
