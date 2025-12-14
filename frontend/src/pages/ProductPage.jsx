import {
  useFetcher,
  useLoaderData,
  useRouteLoaderData,
} from "react-router-dom";
import { selectImage } from "../helpers";
import ProductCard from "../components/ProductCard";

const ProductPage = () => {
  const formFetcher = useFetcher();

  const { username, isLoggedIn } = useRouteLoaderData("main");

  // eslint-disable-next-line no-unused-vars
  const { users, clothe, images } = useLoaderData(); // TODO: fix this later
  const image = "/src/assets/logo2.png"; // TODO: fix this later

  const user = users?.find((user) => user.username === username) || null;

  // Check if `clothe` contains multiple items
  const isMultipleClothes = Array.isArray(clothe) && clothe.length > 1;

  if (!isMultipleClothes) {
    const singleClothe = Array.isArray(clothe) ? clothe[0] : clothe;

    if (!singleClothe) {
      return <p>No product data available.</p>;
    }

    return (
      <div className="flex flex-wrap justify-center p-6">
        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img src={image} alt="Product" className="rounded-lg shadow-md" />
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2 p-6">
          <h1 className="text-2xl font-bold">{singleClothe.name}</h1>
          <p className="text-2xl font-semibold text-gray-800">
            RM {singleClothe.price}
          </p>
          <p className="text-sm text-gray-500">Shipping calculated at checkout.</p>

          <formFetcher.Form method="post" action="">
            {/* Hidden Input */}
            <input type="hidden" name="_action" value="addToCart" />
            <input
              type="hidden"
              name="UserID"
              value={user?.id || ""}
              disabled={!user?.id}
            />
            <input type="hidden" name="ClotheID" value={singleClothe.ClotheID} />
            {/* Add to Cart Button */}
            <button
              type="submit"
              className={`w-full mt-0 py-3 font-semibold rounded shadow-md transition ${
                !isLoggedIn
                  ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
              disabled={!isLoggedIn}
            >
              Add To Cart
            </button>
          </formFetcher.Form>

          {/* Description */}
          <div className="mt-6">
            <h3 className="font-semibold text-lg">Description</h3>
            <p className="text-sm text-gray-600 mt-2">{singleClothe.about}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="row g-4">
        {clothe.map((item) => (
          <div className="col-md-3" key={item.ClotheID}>
            <ProductCard
              image={selectImage()} // Using selectImage as placeholder
              title={item.name}
              price={item.price}
              id={item.ClotheID}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
