import { fetchAllCarts, fetchAllClothes, fetchAllImages, fetchAllUsers, fetchData } from "../helpers";

// loader
export async function homeLoader() {
  try {
    const carts = await fetchAllCarts();
    const clothes = await fetchAllClothes();
    const images = await fetchAllImages();

    const users = await fetchAllUsers();
    const username = (await fetchData("username")) || null;
    const user = users.find((user) => user.username == username) || null;

    const userCart = carts.filter((cart) => cart.UserID === user?.id);

    // Get all ClotheIDs from the cart
    const cartClotheIDs = new Set(userCart.map((cart) => cart.ClotheID));

    // Filter clothes that are not in the cart
    const filteredClothes = clothes.filter(
      (clothe) => !cartClotheIDs.has(clothe.ClotheID)
    );

    return { clothes: filteredClothes, images };
  } catch (error) {
    console.error("Error in homeLoader:", error);
    return { clothes: [], images: [] }; // Fallback in case of error
  }
}
