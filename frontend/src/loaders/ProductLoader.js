import { fetchAllClothes, fetchAllImages, fetchAllUsers } from "../helpers";
import { getMatchingClothe } from "../helpers";

// loader
export async function productLoader({ params }) {
  try {
    const clothes = await fetchAllClothes();
    const images = await fetchAllImages();
    const users = await fetchAllUsers();

    const clothe = await getMatchingClothe(clothes, params.id || params.type);

    return { users, clothe, images };
  } catch (error) {
    console.error("Error in homeLoader:", error);
    return { clothe: [], images: [] }; // Fallback in case of error
  }
}
