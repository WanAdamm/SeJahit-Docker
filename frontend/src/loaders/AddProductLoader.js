import { redirect } from "react-router-dom";
import { fetchAllUsers, fetchData } from "../helpers";

export async function addProductLoader() {
  const username = fetchData("username") || null;

  if (!username) {
    return redirect("/login");
  }

  const users = await fetchAllUsers();
  const user = users.find((item) => item.username === username);

  if (!user?.isAdmin) {
    return redirect("/");
  }

  return { user };
}
