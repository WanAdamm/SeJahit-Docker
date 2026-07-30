import { Link, useFetcher, useLoaderData } from "react-router-dom";
import { formatPrice, getClotheImage } from "../helpers";

const CartPage = () => {
  const formFetcher = useFetcher();
  const cartInfos = useLoaderData();
  const subtotal = cartInfos.reduce((sum, item) => sum + Number(item.price || 0), 0);

  return (
    <div className="page-shell cart-page">
      <section className="section-heading section-heading--wide">
        <span className="eyebrow">Cart docket</span>
        <h1>Your saved pieces</h1>
        <p>Pieces here are held out of the public rail while you decide.</p>
      </section>

      {cartInfos.length > 0 ? (
        <div className="cart-layout">
          <div className="cart-list">
            {cartInfos.map((cartItem) => (
              <article key={cartItem.CartID} className="cart-item">
                <img
                  src={getClotheImage({ ...cartItem, name: cartItem.clotheName })}
                  alt={cartItem.clotheName}
                />
                <div>
                  <span className="eyebrow">Piece #{cartItem.ClotheID}</span>
                  <h2>{cartItem.clotheName}</h2>
                  <p>{cartItem.about}</p>
                  <strong>{formatPrice(cartItem.price)}</strong>
                </div>
                <formFetcher.Form method="post" action="" className="cart-item__remove">
                  <input type="hidden" name="CartID" value={cartItem.CartID} />
                  <input type="hidden" name="_action" value="deleteCartItem" />
                  <button type="submit" className="sj-text-button">
                    Remove
                  </button>
                </formFetcher.Form>
              </article>
            ))}
          </div>

          <aside className="cart-summary" aria-label="Order summary">
            <span className="cart-summary__label">Order summary</span>
            <div>
              <span>{cartInfos.length} item(s)</span>
              <strong>{formatPrice(subtotal)}</strong>
            </div>
            <div>
              <span>Checkout total</span>
              <strong>{formatPrice(subtotal)}</strong>
            </div>
            <p>Payment is not collected in this prototype. Use the cart to review and remove pieces.</p>
            <Link to="/" className="sj-button sj-button--primary">
              Keep browsing
            </Link>
          </aside>
        </div>
      ) : (
        <div className="empty-state">
          <h2>Your cart is empty.</h2>
          <p>Add a piece from the rail to start a fitting docket.</p>
          <Link to="/" className="sj-button sj-button--primary">
            Browse the rail
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;
