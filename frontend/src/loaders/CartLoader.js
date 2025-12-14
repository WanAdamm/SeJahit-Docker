import { fetchAllUsers, fetchData, getCartItem } from "../helpers";

// loader
export async function cartInfoLoader() {
  const users = await fetchAllUsers();

  const username = (await fetchData("username")) || null;
  const user = users.find((user) => user.username == username) || null;
  const cartInfos = await getCartItem({ UserID: user.id });

  return cartInfos;
}
