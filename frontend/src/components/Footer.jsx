import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="sj-footer">
      <div className="sj-footer__story">
        <span className="sj-footer__stamp">Cut, kept, re-worn</span>
        <p>
          SeJahit keeps pre-loved clothes moving through another wardrobe instead of
          another landfill run.
        </p>
      </div>

      <div className="sj-footer__grid">
        <div>
          <h2>Shop the rail</h2>
          <Link to="/outerwear">Outerwear</Link>
          <Link to="/shirt">Shirts</Link>
          <Link to="/pants">Pants</Link>
        </div>
        <div>
          <h2>How to choose</h2>
          <p>Read the about note, check the type, and add only the pieces you would wear twice.</p>
        </div>
        <div>
          <h2>Care note</h2>
          <p>Wash gently, mend early, and let the next owner know what the garment has lived through.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
