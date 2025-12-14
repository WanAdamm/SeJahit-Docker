import "../styles/Footer.css";
import { BsInstagram, BsTiktok, BsFacebook, BsYoutube } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>EXPLORE</h4>
          <ul>
            <li>
              <a href="#about-us">About Us</a>
            </li>
            <li>
              <a href="#stores">Physical Stores</a>
            </li>
            <li>
              <a href="#care">Care Instructions</a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>CUSTOMER SERVICE</h4>
          <ul>
            <li>
              <a href="#faq">FAQ</a>
            </li>
            <li>
              <a href="https://www.tracking.my/">Track Your Order</a>
            </li>
            <li>
              <a href="#contact-us">Contact Us</a>
            </li>
            <li>
              <a href="#guideline">Purchase Guideline</a>
            </li>
            <li>
              <a href="#shipping-policy">Shipping Policy</a>
            </li>
            <li>
              <a href="#return-policy">Return Policy</a>
            </li>
            <li>
              <a href="#refund-policy">Refund Policy</a>
            </li>
            <li>
              <a href="#terms-service">Terms of Service</a>
            </li>
            <li>
              <a href="#privacy-policy">Privacy Policy</a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>SIGN UP FOR OUR NEWSLETTER</h4>
          <p>
            Subscribe and get to know the latest launches and exclusive deals
          </p>
          <form className="newsletter-form">
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Subscribe</button>
          </form>
          <div className="social-icons flex">
            <a href="#instagram">
              <i className="fab fa-instagram"><BsInstagram size={25}/></i>
            </a>
            <a href="#facebook">
              <i className="fab fa-facebook"><BsFacebook size={25}/></i>
            </a>
            <a href="#youtube">
              <i className="fab fa-youtube"><BsYoutube size={25}/></i>
            </a>
            <a href="#tiktok">
              <i className="fab fa-tiktok"><BsTiktok size={25}/></i>
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          © 2024 SeJahit by SJ (M) SDN BHD (2564651036631). All Rights
          Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
