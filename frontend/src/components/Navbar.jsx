import PropTypes from "prop-types";
import { Form, Link } from "react-router-dom";
import { GoPerson, GoSearch } from "react-icons/go";
import { IoCartOutline } from "react-icons/io5";

const categories = [
  { label: "Outerwear", path: "/outerwear" },
  { label: "Shirts", path: "/shirt" },
  { label: "Pants", path: "/pants" },
];

const Navbar = ({ username, isLoggedIn, totalCartItem, isAdmin }) => {
  return (
    <header className="sj-nav-shell">
      <nav className="sj-nav" aria-label="Primary navigation">
        <Link to="/" className="sj-brand" aria-label="SeJahit home">
          <span className="sj-brand__mark">SJ</span>
          <span className="sj-brand__text">
            <span>SeJahit</span>
            <small>one-off clothing rail</small>
          </span>
        </Link>

        <div className="sj-nav__links" aria-label="Shop categories">
          {categories.map((category) => (
            <Link key={category.path} to={category.path}>
              {category.label}
            </Link>
          ))}
          {isAdmin ? <Link to="/add-product">Add piece</Link> : null}
        </div>

        <Form method="get" action="/search" className="sj-search" role="search">
          <GoSearch aria-hidden="true" />
          <input
            type="search"
            name="search"
            placeholder="Search linen, denim, jacket"
            aria-label="Search SeJahit clothing"
          />
        </Form>

        <div className="sj-nav__actions">
          {isLoggedIn ? (
            <div className="sj-account">
              <span className="sj-account__name">
                <GoPerson aria-hidden="true" />
                {username}
              </span>
              <Form method="post" action="/logout">
                <button type="submit" className="sj-text-button">
                  Log out
                </button>
              </Form>
            </div>
          ) : (
            <Link to="/login" className="sj-account-link">
              <GoPerson aria-hidden="true" />
              Log in
            </Link>
          )}

          <Link
            to={isLoggedIn ? "/cart" : "/login"}
            className="sj-cart-link"
            aria-label={`Cart with ${totalCartItem || 0} items`}
          >
            <IoCartOutline aria-hidden="true" />
            {totalCartItem > 0 ? <span>{totalCartItem}</span> : null}
          </Link>
        </div>
      </nav>
    </header>
  );
};

Navbar.propTypes = {
  username: PropTypes.string,
  isLoggedIn: PropTypes.bool,
  totalCartItem: PropTypes.number,
  isAdmin: PropTypes.bool,
};

export default Navbar;
