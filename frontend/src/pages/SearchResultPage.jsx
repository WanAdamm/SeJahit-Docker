import { Form, useLoaderData } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { getClotheImage } from "../helpers";

const SearchResultPage = () => {
  const { query, results, images } = useLoaderData();

  return (
    <div className="page-shell search-page">
      <section className="section-heading section-heading--wide">
        <span className="eyebrow">Search the rail</span>
        <h1>{query ? `Results for "${query}"` : "Find a piece by fabric, type, or note"}</h1>
        <Form method="get" action="/search" className="search-page__form" role="search">
          <input
            type="search"
            name="search"
            defaultValue={query}
            placeholder="Try denim, formal, leather"
            aria-label="Search clothing"
          />
          <button type="submit" className="sj-button sj-button--primary">
            Search
          </button>
        </Form>
      </section>

      {results.length > 0 ? (
        <div className="product-grid">
          {results.map((clothe) => (
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
          <h2>No matching pieces.</h2>
          <p>Try a garment type like shirt, pants, or outerwear.</p>
        </div>
      )}
    </div>
  );
};

export default SearchResultPage;
