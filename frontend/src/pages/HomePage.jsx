import { Link, useLoaderData } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { formatPrice, getClotheImage } from "../helpers";

const categories = ["outerwear", "shirt", "pants"];

const HomePage = () => {
  const { clothes, images } = useLoaderData();
  const featured = clothes[0];

  return (
    <div className="page-shell home-page">
      <section className="hero-panel" aria-labelledby="home-title">
        <div className="hero-panel__copy">
          <span className="eyebrow">SeJahit current rail</span>
          <h1 id="home-title">Second-hand clothes, catalogued like a tailor&apos;s cutting table.</h1>
          <p>
            Browse one-off shirts, pants, and outerwear before they disappear into another wardrobe.
          </p>
          <div className="hero-panel__actions">
            <a href="#current-rail" className="sj-button sj-button--primary">
              Browse the rail
            </a>
            <Link to="/search?search=jacket" className="sj-button sj-button--ghost">
              Find jackets
            </Link>
          </div>
        </div>

        <div className="cutting-board" aria-label="Featured SeJahit piece">
          <div className="cutting-board__ruler" aria-hidden="true" />
          {featured ? (
            <Link to={`/clothe/${featured.ClotheID}`} className="featured-swatch">
              <img src={getClotheImage(featured, images)} alt={featured.name} />
              <span>Fresh on the rail</span>
              <strong>{featured.name}</strong>
              <em>{formatPrice(featured.price)}</em>
            </Link>
          ) : (
            <div className="featured-swatch featured-swatch--empty">
              <span>The rail is empty</span>
              <strong>Add the first piece</strong>
            </div>
          )}
        </div>
      </section>

      <section className="rail-categories" aria-label="Browse by garment type">
        {categories.map((category) => {
          const count = clothes.filter((item) => item.type === category).length;
          return (
            <Link key={category} to={`/${category}`}>
              <span>{category}</span>
              <strong>{count} on rail</strong>
            </Link>
          );
        })}
      </section>

      <section className="product-rack" id="current-rail" aria-labelledby="current-rail-title">
        <div className="section-heading">
          <span className="eyebrow">Current rail</span>
          <h2 id="current-rail-title">Pieces not yet in your cart</h2>
        </div>

        {clothes.length > 0 ? (
          <div className="product-grid">
            {clothes.map((clothe) => (
              <ProductCard
                key={clothe.ClotheID}
                image={getClotheImage(clothe, images)}
                title={clothe.name}
                price={clothe.price}
                id={clothe.ClotheID}
                type={clothe.type}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h2>No pieces are available right now.</h2>
            <p>Check your cart or add a new product if you are an admin.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
