import { fetchAndIndexClotheData, searchClothes } from "../helpers";

// Loader
export async function searchResultLoader({ request }) {
  const url = new URL(request.url);
  const searchQuery = url.searchParams.get("search"); // Extract the search query from the URL

  if (!searchQuery) {
    // If no query is provided, return an empty array or appropriate default value
    return [];
  }

  try {
    // Fetch and index the clothing data
    const clothes = await fetchAndIndexClotheData();

    // Perform the search with the query and indexed clothing data
    const searchResult = searchClothes({ query: searchQuery, clothes });

    // Optionally store the result in localStorage (if necessary for client-side usage)
    localStorage.setItem("searchResult", JSON.stringify(searchResult));

    // Return the search result
    return searchResult;
  } catch (error) {
    console.error("Error in searchResultLoader:", error);
    // Handle the error gracefully, perhaps return a fallback value or rethrow the error
    throw new Response("Failed to load search results", { status: 500 });
  }
}
