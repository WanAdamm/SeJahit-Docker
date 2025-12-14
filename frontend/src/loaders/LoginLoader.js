import { fetchAllUsers } from "../helpers";

// loader
export async function loginLoader() {
    const users = await fetchAllUsers();
    return users;
}