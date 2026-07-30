import { useFetcher } from "react-router-dom";

const AddProduct = () => {
  const formFetcher = useFetcher();
  const isSubmitting = formFetcher.state !== "idle";

  return (
    <div className="page-shell auth-page add-product-page">
      <section className="auth-card auth-card--wide" aria-labelledby="add-product-title">
        <span className="eyebrow">Admin cutting docket</span>
        <h1 id="add-product-title">Add a piece to the rail.</h1>
        <p>Give shoppers enough detail to understand the garment before they open the card.</p>

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
              <option value="outerwear">Outerwear</option>
              <option value="shirt">Shirt</option>
              <option value="pants">Pants</option>
              <option value="skirts">Skirt</option>
              <option value="top">Top</option>
              <option value="cap">Cap</option>
              <option value="scarf">Scarf</option>
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
    </div>
  );
};

export default AddProduct;
