import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Library
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// pages
import Main from "./layouts/Main";

// Actions
import { loginAction } from "./actions/login";
import { registerAction } from "./actions/register";
import { logoutAction } from "./actions/logout";
import { productAction } from "./actions/product";
import { addClothesAction } from "./actions/addClothes";

// Routes
import HomePage from "./pages/HomePage";
import TestPage from "./pages/TestPage";
import Error from "./pages/Error";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import SearchResultPage from "./pages/SearchResultPage";
import AddProduct from "./pages/AddProduct";

// Loaders
import { testLoader } from "./loaders/TestLoader";
import { loginLoader } from "./loaders/LoginLoader";
import { mainLoader } from "./loaders/MainLoader";
import { homeLoader } from "./loaders/HomeLoader";
import { registerLoader } from "./loaders/RegisterLoader";
import { productLoader } from "./loaders/ProductLoader";
import { cartInfoLoader } from "./loaders/CartLoader";
import { cartAction } from "./actions/cart";
import { searchResultLoader } from "./loaders/SearchResultLoader";

const router = createBrowserRouter([
  {
    path: "/",
    id: "main",
    element: <Main />,
    loader: mainLoader,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: homeLoader,
        errorElement: <Error />,
      },
      {
        path: "clothe/:id",
        element: <ProductPage />,
        loader: productLoader,
        action: productAction,
        errorElement: <Error />
      },
      {
        path: "/add product",
        element: <AddProduct/>,
        action: addClothesAction,
        errorElement: <Error />
      },
      {
        path: "/:type",
        element: <ProductPage />,
        loader: productLoader,
        action: productAction,
        errorElement: <Error />
      },
      {
        path: "search",
        element: <SearchResultPage />,
        loader: searchResultLoader,
        errorElement: <Error />
      },
      {
        path: "cart",
        element: <CartPage />,
        loader: cartInfoLoader,
        action: cartAction,
        errorElement: <Error />
      },
      {
        path: "register",
        element: <RegisterPage />,
        loader: registerLoader,
        action: registerAction,
        errorElement: <Error />,
      },
      {
        path: "login",
        element: <LoginPage />,
        loader: loginLoader,
        action: loginAction,
        errorElement: <Error />,
      },
      {
        path: "logout",
        action: logoutAction,
        errorElement: <Error />,
      },
      {
        path: "test",
        element: <TestPage />,
        loader: testLoader,
        errorElement: <Error />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;
