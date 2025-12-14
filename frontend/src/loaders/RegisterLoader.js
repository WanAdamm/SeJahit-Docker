import { fetchAllUsers } from "../helpers";

// loader
export async function registerLoader() {
  const users = await fetchAllUsers();
  return users;
}
