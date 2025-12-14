import { fetchAllUsers } from "../helpers";

// loader
export async function testLoader() {
  const users = await fetchAllUsers();
  return users;
}
