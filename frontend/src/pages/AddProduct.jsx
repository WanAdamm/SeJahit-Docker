import { useFetcher, useLoaderData } from "react-router-dom";
import { formatPrice, getClotheImage } from "../helpers";

const types = ["outerwear", "shirt", "pants", "skirts", "top", "cap", "scarf"];

const AddProduct = () => {
  const { clothes, images } = useLoaderData();
  const formFetcher = useFetcher();
  const isSubmitting = formFetcher.state !== "idle";

  return (
    <div className="page-shell add-product-page">
      <section className="auth-card auth-card--wide" aria-labelledby="add-product-title">
        <span className="eyebrow">Admin dashboard</span>
        <h1 id="add-product-title">Manage the rail.</h1>
        <p>Add, update, or delete second-hand pieces.</p>

        <formFetcher.Form method="post" action="" className="studio-form studio-form--grid">
          <label>
            Product name
            <input type="text" name="name" placeholder="Leather jacket" required />
          </label>

          <label>
            Price in RM
            <input type="number" name="price" min="1" step="1" placeholder="75" required />
          </label>

          <label className="studio-form__full">
            Short note
            <textarea name="about" rows="4" placeholder="Lightly worn, structured shoulder, best for cool evenings." required />
          </label>

          <label>
            Type
            <select name="type" required defaultValue="outerwear">
              {types.map((type) => <option key={type} value={type}>{type}</option>)}
            </select>
          </label>

          <label>
            Image URL
            <input type="url" name="imagePath" placeholder="https://example.com/piece.jpg" />
          </label>

          <input type="hidden" name="_action" value="addClothe" />

          <button type="submit" className="sj-button sj-button--primary studio-form__full" disabled={isSubmitting}>
            {isSubmitting ? "Adding piece" : "Add piece"}
          </button>
        </formFetcher.Form>
      </section>

      <section className="admin-list" aria-labelledby="available-items-title">
        <div className="section-heading">
          <span className="eyebrow">Available items</span>
          <h2 id="available-items-title">{clothes.length} pieces</h2>
        </div>

        {clothes.map((clothe) => (
          <article className="admin-item" key={clothe.ClotheID}>
            <img src={getClotheImage(clothe, images)} alt="" />
            <formFetcher.Form method="post" className="studio-form studio-form--grid">
              <input type="hidden" name="_action" value="updateClothe" />
              <input type="hidden" name="ClotheID" value={clothe.ClotheID} />
              <input type="hidden" name="ImageID" value={clothe.ImageID || 0} />

              <label>
                Product name
                <input type="text" name="name" defaultValue={clothe.name} required />
              </label>
              <label>
                Price in RM
                <input type="number" name="price" min="1" step="1" defaultValue={clothe.price} required />
              </label>
              <label className="studio-form__full">
                Short note
                <textarea name="about" rows="3" defaultValue={clothe.about || ""} />
              </label>
              <label>
                Type
                <select name="type" defaultValue={clothe.type || "outerwear"} required>
                  {types.map((type) => <option key={type} value={type}>{type}</option>)}
                </select>
              </label>
              <label>
                New image URL
                <input type="url" name="imagePath" placeholder="Leave blank to keep current image" />
              </label>
              <div className="admin-item__actions studio-form__full">
                <strong>{formatPrice(clothe.price)}</strong>
                <button type="submit" className="sj-button sj-button--primary" disabled={isSubmitting}>Update</button>
              </div>
            </formFetcher.Form>
            <formFetcher.Form method="post" className="admin-item__delete">
              <input type="hidden" name="_action" value="deleteClothe" />
              <input type="hidden" name="ClotheID" value={clothe.ClotheID} />
              <button type="submit" className="sj-text-button" disabled={isSubmitting}>Delete</button>
            </formFetcher.Form>
          </article>
        ))}
      </section>
    </div>
  );
};

export default AddProduct;
