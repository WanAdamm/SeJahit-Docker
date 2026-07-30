import { redirect } from "react-router-dom";
import { fetchAllUsers, fetchData, getCartItem } from "../helpers";

export async function cartInfoLoader() {
  const username = fetchData("username") || null;

  if (!username) {
    return redirect("/login");
  }

  const users = await fetchAllUsers();
  const user = users.find((user) => user.username == username) || null;

  if (!user) {
    return [];
  }

  const cartInfos = await getCartItem({ UserID: user.id });

  return cartInfos;
}
