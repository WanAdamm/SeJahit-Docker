import { useLoaderData } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { selectImage } from "../helpers";

const HomePage = () => {
  // eslint-disable-next-line no-unused-vars
  const {clothes, images} =  useLoaderData();
  //const image = "src/assets/placeholder.webp";

  return (
    <div className="container my-5">
      <div className="row g-4">
        {clothes.map((clothes) => (
          <div className="col-md-3" key={clothes.ClotheID}>
            <ProductCard
              image={selectImage()}
              title={clothes.name}
              price={clothes.price}
              id = {clothes.ClotheID}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
