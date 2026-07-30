import { Outlet, useLoaderData } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Main = () => {
  const { username, isLoggedIn, totalCartItem, isAdmin } = useLoaderData();
  return (
    <div className="layout">
      <Navbar
        username={username}
        isLoggedIn={isLoggedIn}
        totalCartItem={totalCartItem}
        isAdmin={isAdmin}
      />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Main;
