import { useFetcher, useLoaderData } from "react-router-dom";

const CartPage = () => {
  const formFetcher = useFetcher();
  const cartInfos = useLoaderData();

  return (
    <div className="container mx-auto p-4">
      {/* Shopping Cart Header */}
      <h1 className="text-2xl font-bold mb-6">SHOPPING CART</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Section: Cart Items */}
        <div className="flex-1 max-h-96 overflow-y-auto">
          {cartInfos.length > 0 ? (
            cartInfos.map((cartItem) => (
              <div
                key={cartItem.CartID}
                className="flex flex-col lg:flex-row gap-8 mb-6"
              >
                <div className="flex-1">
                  <div className="flex items-start gap-6 border-b pb-6">
                    {/* Product Image */}
                    <div className="w-32 h-32">
                      <img
                        src={
                          cartItem.imageData || "src/assets/placeholder.webp"
                        }
                        alt={cartItem.clotheName || "Product Image"}
                        className="object-cover rounded w-full h-full"
                      />
                    </div>
                    {/* Product Info */}
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold">
                        {cartItem.clotheName || "Product Name"}
                      </h2>
                      <p>{cartItem.about}</p>
                      <p className="text-lg font-bold mt-2">
                        RM {cartItem.price || "0.00"}
                      </p>
                    </div>
                    {/* Remove Button */}
                    <formFetcher.Form method="post" action="">
                      {/* Hidden Input */}
                      <input
                        type="hidden"
                        name="CartID"
                        value={cartItem?.CartID || ""}
                        disabled={!cartItem?.CartID}
                      />
                      <input type="hidden" name="_action" value="deleteCartItem" />
                      <button
                        className="text-gray-500 hover:text-red-600 mr-10"
                        type="submit"
                      >
                        <span className="text-2xl">&times;</span>
                      </button>
                    </formFetcher.Form>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">Your cart is empty.</p>
          )}
        </div>

        {/* Right Section: Order Summary */}
        <div className="w-full lg:w-1/3">
          <div className="border p-4 rounded-md shadow">
            <h3 className="text-lg font-semibold border-b pb-2 mb-4">
              ORDER SUMMARY | {cartInfos.length} ITEM(S)
            </h3>
            <div className="flex justify-between mb-2">
              <p>Item(s) subtotal</p>
              <p>
                RM{" "}
                {cartInfos
                  .reduce((sum, item) => sum + item.price, 0)
                  .toFixed(2)}
              </p>
            </div>
            <div className="flex justify-between mb-2">
              <p>SUBTOTAL</p>
              <p>
                RM{" "}
                {cartInfos
                  .reduce((sum, item) => sum + item.price, 0)
                  .toFixed(2)}
              </p>
            </div>
            <div className="flex justify-between font-bold">
              <p>ORDER TOTAL</p>
              <p>
                RM{" "}
                {cartInfos
                  .reduce((sum, item) => sum + item.price, 0)
                  .toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
