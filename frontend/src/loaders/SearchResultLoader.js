import { fetchAllImages, fetchAndIndexClotheData, searchClothes } from "../helpers";

export async function searchResultLoader({ request }) {
  const url = new URL(request.url);
  const searchQuery = url.searchParams.get("search") || "";

  if (!searchQuery.trim()) {
    return { query: "", results: [], images: [] };
  }

  try {
    const clothes = await fetchAndIndexClotheData();
    const images = await fetchAllImages();
    const searchResult = searchClothes({ query: searchQuery, clothes });

    return { query: searchQuery, results: searchResult, images };
  } catch (error) {
    console.error("Error in searchResultLoader:", error);
    throw new Response("Failed to load search results", { status: 500 });
  }
}
