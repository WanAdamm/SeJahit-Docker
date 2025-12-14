import { useLoaderData } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { selectImage, fetchData } from "../helpers";

const SearchResultPage = () => {
  // eslint-disable-next-line no-unused-vars
  const searchResult = useLoaderData(); // bitch swear gonna fix this later
  const results = fetchData("searchResult")|| null;

  return (
    <div className="container my-5">
      <div className="row g-4">
        {results.map((clothes) => (
          <div className="col-md-3" key={clothes.ClotheID}>
            <ProductCard
              image={selectImage()}
              title={clothes.name}
              price={clothes.price}
              id={clothes.ClotheID}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResultPage;
