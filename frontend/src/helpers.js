import FlexSearch from "flexsearch";

// Local storage
export const fetchData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

// delete item from local storage
export const deleteItem = ({ key, id }) => {
  // Fetch existing data from localStorage
  const existingData = JSON.parse(localStorage.getItem(key)) || [];

  // Check if `id` is provided and filter out the item with the matching id
  if (id) {
    const newData = existingData.filter((item) => item.id !== id);

    // Save the updated data back to localStorage
    localStorage.setItem(key, JSON.stringify(newData));
    return true; // Indicate successful deletion
  }

  // If `id` is not provided, optionally handle the case or throw an error
  console.warn("No ID provided for deletion");
  return false; // Indicate no action was taken
};

// general fetch function

export const fetchFromAPI = async (url) => {
  try {
    const response = await fetch(url); // Make the API call
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`); // Handle non-OK responses
    }
    const data = await response.json(); // Parse the JSON data
    return data; // Return the fetched data
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error.message);
    throw error; // Propagate the error to handle it in the calling code
  }
};

export const apiHelper = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error in API call to ${url}:`, error.message);
    throw error;
  }
};

// User helper

const BASE_URL = "http://localhost:8080/api/users";

export const fetchAllUsers = async () => {
  return await apiHelper(BASE_URL);
};

export const createUser = async (user) => {
  return await apiHelper(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: user,
  });
};

export const updateUser = async (id, user) => {
  return await apiHelper(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
};

export const deleteUser = async (id) => {
  return await apiHelper(`${BASE_URL}/${id}`, { method: "DELETE" });
};

// image helper
const IMAGE_URL = "http://localhost:8080/api/images";

export const fetchAllImages = async () => {
  return await apiHelper(IMAGE_URL);
};

export const createImage = async (imageData) => {
  console.log(imageData); //TODO:remove
  return await apiHelper(IMAGE_URL, {
    method: "POST",
    body: imageData, // FormData object
  });
};

export const deleteImage = async (id) => {
  return await apiHelper(`${IMAGE_URL}/${id}`, { method: "DELETE" });
};

// clothe helper

const CLOTHE_URL = "http://localhost:8080/api/clothes";

export const fetchAllClothes = async () => {
  return await apiHelper(CLOTHE_URL);
};

export const createClothe = async (clothe) => {
  return await apiHelper(CLOTHE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(clothe),
  });
};

export const updateClothe = async (id, clothe) => {
  return await apiHelper(`${CLOTHE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(clothe),
  });
};

export const deleteClothe = async (id) => {
  return await apiHelper(`${CLOTHE_URL}/${id}`, { method: "DELETE" });
};

export const getMatchingClothe = async (clothes, parameter) => {
  if (!Array.isArray(clothes) || !parameter) {
    throw new Error("Invalid input: clothes must be an array and param must be defined");
  }

  // Find clothes with a matching ClotheID
  const byId = clothes.find((clothe) => clothe.ClotheID == parameter);
  if (byId) {
    return byId;
  }

  // Find clothes with a matching type
  const byType = clothes.filter((clothe) => clothe.type == parameter);
  return byType.length > 0 ? byType : [];
};

// cart helper

const CART_URL = "http://localhost:8080/api/cart";

export const fetchAllCarts = async () => {
  return await apiHelper(CART_URL);
};

export const createCart = async (cart) => {
  return await apiHelper(CART_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: cart,
  });
};

export const updateCart = async (id, cart) => {
  return await apiHelper(`${CART_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cart),
  });
};

export const deleteCart = async (id) => {
  if (!id) {
    throw new Error("Cart ID is required.");
  }
  const url = `${CART_URL}?id=${id}`;
  return await apiHelper(url, { method: "DELETE" });
};

// cartinfo helper

const CARTINFO_URL = "http://localhost:8080/api/cartinfo";

export const fetchAllCartInfo = async () => {
  return await apiHelper(CARTINFO_URL);
};

export const deleteCartInfo = async (id) => {
  return await apiHelper(`${CARTINFO_URL}/${id}`, { method: "DELETE" });
};

// login
export const login = async ({ username, password }) => {
  try {
    // Fetch all users from the database
    const users = await fetchAllUsers(BASE_URL);

    // Check if the username exists in the users array
    const user = users.find((user) => user.username === username);

    if (!user) {
      // Username not found
      return { success: false, message: "Username not found" };
    }

    // Check if the password matches the user
    if (user.password === password) {
      // Successful login
      return { success: true, message: "Login successful", user };
    } else {
      // Incorrect password
      return { success: false, message: "Incorrect password" };
    }
  } catch (error) {
    // Handle errors during the fetch
    console.error("Error during login:", error);
    return { success: false, message: "An error occurred during login" };
  }
};

// register

export const register = async ({ username, password, name }) => {
  try {
    // Fetch all users from the database
    const newUser = `{"username": "${username}", "password": "${password}", "name": "${name}"}`;
    await createUser(newUser);
    return { success: true, message: "Register successful" };
  } catch (error) {
    // Handle errors during the fetch
    console.error("Error during register:", error);
    return { success: false, message: "Error occurred during registration" };
  }
};

// add image

export const addImage = async ({ ImageData }) => {
  try {
    // Prepare the payload for insertion
    const formData = new FormData();
    formData.append("ImageData", ImageData); // Directly append the File object

    // Send the FormData to the server
    const response = await createImage(formData);

    // Extract and return the ImageID
    const { ImageID } = await response.json();
    return { ImageID };
  } catch (error) {
    console.error("Error during adding image: ", error);
    return {
      success: false,
      message: "An error occurred during adding image",
    };
  }
};

// add new product

export const addProduct = async ({ name, price, about, type }) => {
  try {
    const newClothe = `{"name": "${name}", "price": ${price}, "about": "${about}", "ImageID": ${1}, "type": "${type}"}`;
    await createClothe(newClothe);
    return { success: true, message: "Product added" };
  } catch (error) {
    console.error("Error during adding new product: ", error);
    return {
      success: false,
      message: "An error occured during adding the product",
    };
  }
};

// add to cart

export const addToCart = async ({ UserID, ClotheID }) => {
  try {
    const newCart = `{"UserID": ${UserID}, "ClotheID": ${ClotheID}}`;
    await createCart(newCart);
    return { success: true, message: "Item added to cart" };
  } catch (error) {
    console.error("Error during adding to cart: ", error);
    return {
      success: false,
      message: "An error occured during adding the item to cart",
    };
  }
};

// item in cart

export const totalItemInCart = async ({ username }) => {
  const users = await fetchAllUsers();

  // Find the user or set user to null if not found
  const user = users.find((user) => user.username === username) || null;

  // Handle case where no user is logged in
  if (!user) {
    return 0; // Return 0 if user is not logged in
  }

  const UserID = user.id;

  const carts = await fetchAllCarts();
  const totalCartItem = carts.filter((cart) => cart.UserID === UserID).length;

  return totalCartItem;
};

// user personal cart item

export const getCartItem = async ({ UserID }) => {
  const cartInfos = await fetchAllCartInfo();
  const itemInCart = cartInfos.filter((cart) => cart.id === UserID);
  return itemInCart;
};

// remove item from cart
export const deleteCartItem = async ({ CartID }) => {
  try {
    await deleteCart(CartID);
    return { success: true, message: "Item removed from cart" };
  } catch (error) {
    console.error("Error during removing item from cart: ", error);
    return {
      success: false,
      message: "An error occured during removing item from cart",
    };
  }
};

// image selector

//TODO: fix image selecton and use backend to get image and clothe table joined.
export const selectImage = () => {
  const image = "src/assets/placeholder.webp"; //TODO: remove this

  return image;
};

// search functionality
// Create a global FlexSearch index
const index = new FlexSearch.Index({
  tokenize: "forward", // Valid options: "forward", "reverse", "full"
  encode: (str) => str.toLowerCase(),
  threshold: 0.5, // Default is 0; adjust for leniency
  cache: true, // Enable caching for faster searches
});

export const searchClothes = ({ query, clothes }) => {
  if (!query || !clothes || clothes.length === 0) {
    console.error("Query or clothes data is missing");
    return [];
  }

  const results = index.search(query);
  if (results.length === 0) {
    console.warn("No results found for the query");
    return [];
  }

  return results.map((id) =>
    clothes.find((clothe) => clothe.ClotheID === parseInt(id, 10))
  );
};

export const fetchAndIndexClotheData = async () => {
  try {
    const data = await fetchAllClothes();

    // Populate FlexSearch index
    data.forEach((clothe) => {
      if (clothe.ClotheID && clothe.name) {
        index.add(clothe.ClotheID, clothe.name);
      }
    });

    return data; // Return the fetched data for further use
  } catch (error) {
    console.error("Error fetching and indexing data:", error);
    return []; // Return an empty array on error
  }
};

export const getSearchResult = async () => {
  const results = await fetchData("searchResult");
  return results;
};
