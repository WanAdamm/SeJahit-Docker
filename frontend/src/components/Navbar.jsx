import "../styles/Navbar.css";
import { GoPerson, GoSearch } from "react-icons/go";
import { IoCartOutline } from "react-icons/io5";
import { Link, Form, useFetcher, useNavigate } from "react-router-dom";
import { useState } from "react";
import PropTypes from "prop-types";

const Navbar = ({ username, isLoggedIn, totalCartItem, isAdmin }) => {
  const navigate = useNavigate();
  const searchFetcher = useFetcher();

  const [isDropdownLogoutButtonVisible, setIsDropdownLogoutButtonVisible] =
    useState(false);
  const [isDropdownSearchFieldVisible, setIsDropdownSearchFielVisible] =
    useState(false);

  const toggleSearchFieldDropDown = () => {
    setIsDropdownSearchFielVisible(!isDropdownSearchFieldVisible);
  };

  const handleMouseEnter = () => {
    setIsDropdownLogoutButtonVisible(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownLogoutButtonVisible(false);
  };

  const handleSubmit = () => {
    setIsDropdownSearchFielVisible(false);
    navigate("/search");
  };

  return (
    <nav className="navbar mt-2 mb-2">
      <Link to="/" className="navbar-left">
        <img src="src\assets\logo2.png" alt="Logo" />
      </Link>

      <ul className="navbar-menu pl-0 pr-0">
        <li>
          <Link to={`/outerwear`}>
            <span>Outerwear</span>
          </Link>
        </li>
        <li>
          <Link to={`/shirt`}>
            <span>Shirt</span>
          </Link>
        </li>
        <li>
          <Link to={`/pants`}>
            <span>Pants</span>
          </Link>
        </li>
        {isAdmin ? (
          <li>
            <Link to="/add product">
              <span>Add Product</span>
            </Link>
          </li>
        ) : null}
      </ul>

      <div className="navbar-icons">
        {isLoggedIn ? (
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Main Div */}
            <div className="user-icon flex bg-200 text-center cursor-pointer">
              <GoPerson size={25} />
              <p className="mr-2 ml-2 accent-slate-600 font-bold">{username}</p>
            </div>

            {/* Dropdown */}
            {isDropdownLogoutButtonVisible && (
              <div
                className="absolute left-0 bg-white border rounded shadow-lg p-2 text-center"
                style={{
                  width: 100,
                  zIndex: 9999, // Set a high z-index to ensure it's above other elements
                  position: "absolute", // Ensure the dropdown is positioned relative to the container
                }}
              >
                <Form
                  method="post"
                  action="/logout"
                  onSubmit={(event) => {
                    if (!confirm("Log out?")) {
                      event.preventDefault();
                    }
                  }}
                >
                  <button type="submit" className="flex btn btn-danger">
                    <span>Log Out</span>
                  </button>
                </Form>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="user-icon flex">
            <GoPerson size={25} />
            <p className="mr-2 ml-2 accent-slate-600">Login</p>
          </Link>
        )}

        <div className="relative inline-block">
          <div onClick={toggleSearchFieldDropDown} className="cursor-pointer">
            <GoSearch size={25} />
          </div>
        </div>

        <Link
          to={isLoggedIn ? "/cart" : "#"}
          className={`cart-icon mr-5 relative ${
            !isLoggedIn ? "opacity-50 hover:cursor-not-allowed" : ""
          }`}
          onClick={(e) => {
            if (!isLoggedIn) {
              e.preventDefault(); // Prevent navigation
            }
          }}
        >
          <IoCartOutline size={25} className="mr-5" />
          {totalCartItem > 0 && (
            <span className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {totalCartItem}
            </span>
          )}
        </Link>
      </div>
      {isDropdownSearchFieldVisible && (
        <div className="absolute left-0 top-full w-full bg-white shadow-md border-t z-50">
          <searchFetcher.Form
            method="get" // Use "get" to trigger a search query
            action="/search" // Define your search endpoint
            onSubmit={handleSubmit}
            className="absolute left-0 top-full w-full bg-white shadow-md border-t p-4 z-50"
          >
            <input
              type="text"
              name="search" // Name should match the query parameter you expect
              placeholder="Search..."
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            {/* Hidden Input */}
            <input type="hidden" name="_action" value="search" />
          </searchFetcher.Form>
        </div>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  username: PropTypes.any,
  isLoggedIn: PropTypes.any,
  totalCartItem: PropTypes.any,
  isAdmin: PropTypes.any,
};

export default Navbar;
