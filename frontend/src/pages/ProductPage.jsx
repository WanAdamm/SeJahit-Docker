import { Link, useFetcher, useLoaderData, useRouteLoaderData } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { formatPrice, getClotheImage, getTypeLabel } from "../helpers";

const ProductPage = () => {
  const formFetcher = useFetcher();
  const { username, isLoggedIn } = useRouteLoaderData("main");
  const { users, clothe, images } = useLoaderData();
  const user = users?.find((item) => item.username === username) || null;
  const isSubmitting = formFetcher.state !== "idle";

  if (Array.isArray(clothe)) {
    const type = clothe[0]?.type || "pieces";

    return (
      <div className="page-shell product-rack category-page">
        <div className="section-heading section-heading--wide">
          <span className="eyebrow">Rail section</span>
          <h1>{getTypeLabel(type)}</h1>
          <p>{clothe.length} pieces are cut into this section of the rail.</p>
        </div>

        {clothe.length > 0 ? (
          <div className="product-grid">
            {clothe.map((item) => (
              <ProductCard
                key={item.ClotheID}
                image={getClotheImage(item, images)}
                title={item.name}
                price={item.price}
                id={item.ClotheID}
                type={item.type}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h2>No pieces in this section yet.</h2>
            <Link to="/" className="sj-button sj-button--primary">
              Return to the rail
            </Link>
          </div>
        )}
      </div>
    );
  }

  if (!clothe) {
    return (
      <div className="page-shell">
        <div className="empty-state">
          <h1>That piece is no longer on the rail.</h1>
          <Link to="/" className="sj-button sj-button--primary">
            Browse available pieces
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell product-detail">
      <figure className="product-detail__image">
        <img src={getClotheImage(clothe, images)} alt={clothe.name} />
      </figure>

      <section className="product-detail__info" aria-labelledby="product-title">
        <span className="eyebrow">{getTypeLabel(clothe.type)}</span>
        <h1 id="product-title">{clothe.name}</h1>
        <p className="product-detail__price">{formatPrice(clothe.price)}</p>
        <p className="product-detail__note">{clothe.about || "One-of-one SeJahit find."}</p>

        <div className="product-detail__facts" aria-label="Product details">
          <span>Single piece</span>
          <span>Pre-loved</span>
          <span>Cart removes it from the public rail</span>
        </div>

        {isLoggedIn ? (
          <formFetcher.Form method="post" action="" className="cart-form">
            <input type="hidden" name="_action" value="addToCart" />
            <input type="hidden" name="UserID" value={user?.id || ""} />
            <input type="hidden" name="ClotheID" value={clothe.ClotheID} />
            <button type="submit" className="sj-button sj-button--primary" disabled={isSubmitting}>
              {isSubmitting ? "Adding" : "Add to cart"}
            </button>
          </formFetcher.Form>
        ) : (
          <Link to="/login" className="sj-button sj-button--primary">
            Log in to add to cart
          </Link>
        )}
      </section>
    </div>
  );
};

export default ProductPage;
