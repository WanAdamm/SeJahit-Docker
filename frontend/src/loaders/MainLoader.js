import { fetchAllUsers, fetchData, totalItemInCart } from "../helpers";

// loader
export async function mainLoader() {
  const users = await fetchAllUsers();

  const username = (await fetchData("username")) || null;
  const user = users.find((user) => user.username == username) || null;
  const isLoggedIn = !!username; // Converts username to a boolean (true if not null/undefined)
  const totalCartItem = await totalItemInCart({ username });
  const isAdmin = user?.isAdmin ?? false;

  return { username, isLoggedIn, totalCartItem, user, isAdmin };
}
