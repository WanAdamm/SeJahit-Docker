import FlexSearch from "flexsearch";

const API_ROOT = "http://localhost:8080/api";
const BASE_URL = `${API_ROOT}/users`;
const IMAGE_URL = `${API_ROOT}/images`;
const CLOTHE_URL = `${API_ROOT}/clothes`;
const CART_URL = `${API_ROOT}/cart`;
const CARTINFO_URL = `${API_ROOT}/cartinfo`;

const typePalettes = {
  outerwear: ["#1f3557", "#d7ebef", "#f28b5b"],
  shirt: ["#7fb8c7", "#11243d", "#f6d65b"],
  pants: ["#253b2f", "#c7d0b8", "#d77d4a"],
  skirts: ["#603c73", "#f0d9ed", "#f0a25d"],
  top: ["#314f7c", "#dfe6f1", "#c94d3d"],
  cap: ["#57432b", "#efe3c0", "#5ca6a6"],
  scarf: ["#7d3b4b", "#f2d0c9", "#315a6b"],
};

export const fetchData = (key) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

export const deleteItem = ({ key, id }) => {
  const existingData = JSON.parse(localStorage.getItem(key)) || [];

  if (id) {
    const newData = existingData.filter((item) => item.id !== id);
    localStorage.setItem(key, JSON.stringify(newData));
    return true;
  }

  return false;
};

const parseAPIResponse = async (response) => {
  const text = await response.text();
  let data = {};

  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { message: text };
  }

  if (!response.ok) {
    throw new Error(
      data.message || data.error || `HTTP error! status: ${response.status}`
    );
  }

  return data;
};

export const fetchFromAPI = async (url) => {
  const response = await fetch(url);
  return parseAPIResponse(response);
};

export const apiHelper = async (url, options = {}) => {
  const response = await fetch(url, options);
  return parseAPIResponse(response);
};

export const fetchAllUsers = async () => {
  return apiHelper(BASE_URL);
};

export const createUser = async (user) => {
  return apiHelper(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
};

export const updateUser = async (id, user) => {
  return apiHelper(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
};

export const deleteUser = async (id) => {
  return apiHelper(`${BASE_URL}/${id}`, { method: "DELETE" });
};

export const fetchAllImages = async () => {
  return apiHelper(IMAGE_URL);
};

export const createImage = async (image) => {
  return apiHelper(IMAGE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(image),
  });
};

export const deleteImage = async (id) => {
  return apiHelper(`${IMAGE_URL}/${id}`, { method: "DELETE" });
};

export const fetchAllClothes = async () => {
  return apiHelper(CLOTHE_URL);
};

const adminHeaders = () => ({
  "Content-Type": "application/json",
  "X-Username": fetchData("username") || "",
});

export const createClothe = async (clothe) => {
  return apiHelper(CLOTHE_URL, {
    method: "POST",
    headers: adminHeaders(),
    body: JSON.stringify(clothe),
  });
};

export const updateClothe = async (id, clothe) => {
  return apiHelper(`${CLOTHE_URL}/${id}`, {
    method: "PUT",
    headers: adminHeaders(),
    body: JSON.stringify(clothe),
  });
};

export const deleteClothe = async (id) => {
  return apiHelper(`${CLOTHE_URL}/${id}`, { method: "DELETE", headers: adminHeaders() });
};

export const getMatchingClothe = async (clothes, parameter) => {
  if (!Array.isArray(clothes) || !parameter) {
    throw new Error("Invalid clothing lookup.");
  }

  const byId = clothes.find(
    (clothe) => Number(clothe.ClotheID) === Number(parameter)
  );

  if (byId) {
    return byId;
  }

  return clothes.filter(
    (clothe) => String(clothe.type).toLowerCase() === String(parameter).toLowerCase()
  );
};

export const fetchAllCarts = async () => {
  return apiHelper(CART_URL);
};

export const createCart = async (cart) => {
  return apiHelper(CART_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cart),
  });
};

export const updateCart = async (id, cart) => {
  return apiHelper(`${CART_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cart),
  });
};

export const deleteCart = async (id) => {
  if (!id) {
    throw new Error("Cart ID is required.");
  }

  return apiHelper(`${CART_URL}?id=${id}`, { method: "DELETE" });
};

export const fetchAllCartInfo = async () => {
  return apiHelper(CARTINFO_URL);
};

export const deleteCartInfo = async (id) => {
  return apiHelper(`${CARTINFO_URL}/${id}`, { method: "DELETE" });
};

export const login = async ({ username, password }) => {
  try {
    const users = await fetchAllUsers();
    const user = users.find((item) => item.username === username);

    if (!user) {
      return { success: false, message: "No account uses that username." };
    }

    if (user.password !== password) {
      return { success: false, message: "The password does not match." };
    }

    return { success: true, message: "Logged in.", user };
  } catch {
    return { success: false, message: "Login could not reach SeJahit." };
  }
};

export const register = async ({ username, password, name }) => {
  try {
    const users = await fetchAllUsers();
    const usernameTaken = users.some((user) => user.username === username);

    if (usernameTaken) {
      return { success: false, message: "That username is already taken." };
    }

    await createUser({ username, password, name, isAdmin: false });
    return { success: true, message: "Account created." };
  } catch {
    return { success: false, message: "Registration could not reach SeJahit." };
  }
};

export const addImage = async ({ imagePath }) => {
  const trimmedPath = imagePath?.trim();

  if (!trimmedPath) {
    return { ImageID: 0, ImagePath: "" };
  }

  return createImage({ ImagePath: trimmedPath });
};

export const addProduct = async ({ name, price, about, type, imagePath }) => {
  try {
    const normalizedPrice = Number(price);

    if (!name?.trim() || Number.isNaN(normalizedPrice) || normalizedPrice <= 0) {
      return { success: false, message: "Add a name and a valid price." };
    }

    const image = await addImage({ imagePath });

    await createClothe({
      name: name.trim(),
      price: Math.round(normalizedPrice),
      about: about?.trim() || "One-of-one SeJahit find.",
      ImageID: image.ImageID || 0,
      type,
    });

    return { success: true, message: "Product added to the rail." };
  } catch {
    return {
      success: false,
      message: "The product could not be added.",
    };
  }
};

export const updateProduct = async ({ ClotheID, name, price, about, type, imagePath, ImageID }) => {
  try {
    const normalizedPrice = Number(price);

    if (!ClotheID || !name?.trim() || Number.isNaN(normalizedPrice) || normalizedPrice <= 0) {
      return { success: false, message: "Add a name and a valid price." };
    }

    const image = imagePath?.trim() ? await addImage({ imagePath }) : { ImageID };

    await updateClothe(ClotheID, {
      name: name.trim(),
      price: Math.round(normalizedPrice),
      about: about?.trim() || "One-of-one SeJahit find.",
      ImageID: Number(image.ImageID) || 0,
      type,
    });

    return { success: true, message: "Product updated." };
  } catch {
    return { success: false, message: "The product could not be updated." };
  }
};

export const removeProduct = async ({ ClotheID }) => {
  try {
    await deleteClothe(ClotheID);
    return { success: true, message: "Product deleted." };
  } catch {
    return { success: false, message: "The product could not be deleted." };
  }
};

export const addToCart = async ({ UserID, ClotheID }) => {
  try {
    if (!UserID) {
      return { success: false, message: "Log in before adding a piece." };
    }

    const carts = await fetchAllCarts();
    const alreadyInCart = carts.some(
      (cart) =>
        Number(cart.UserID) === Number(UserID) &&
        Number(cart.ClotheID) === Number(ClotheID)
    );

    if (alreadyInCart) {
      return { success: true, message: "That piece is already in your cart." };
    }

    await createCart({ UserID: Number(UserID), ClotheID: Number(ClotheID) });
    return { success: true, message: "Added to cart." };
  } catch {
    return {
      success: false,
      message: "The cart could not be updated.",
    };
  }
};

export const totalItemInCart = async ({ username }) => {
  if (!username) {
    return 0;
  }

  const users = await fetchAllUsers();
  const user = users.find((item) => item.username === username);

  if (!user) {
    return 0;
  }

  const carts = await fetchAllCarts();
  return carts.filter((cart) => Number(cart.UserID) === Number(user.id)).length;
};

export const getCartItem = async ({ UserID }) => {
  if (!UserID) {
    return [];
  }

  const cartInfos = await fetchAllCartInfo();
  return cartInfos.filter((cart) => Number(cart.id) === Number(UserID));
};

export const deleteCartItem = async ({ CartID }) => {
  try {
    await deleteCart(CartID);
    return { success: true, message: "Removed from cart." };
  } catch {
    return {
      success: false,
      message: "The item could not be removed.",
    };
  }
};

export const formatPrice = (price) => {
  const amount = Number(price);
  return `RM ${Number.isNaN(amount) ? "0.00" : amount.toFixed(2)}`;
};

export const getTypeLabel = (type) => {
  if (!type) {
    return "Found piece";
  }

  return String(type).charAt(0).toUpperCase() + String(type).slice(1);
};

const getPalette = (type) => {
  return typePalettes[String(type).toLowerCase()] || ["#233654", "#d8e5df", "#f2a25d"];
};

const getSeed = (value) => {
  return String(value || "sejahit")
    .split("")
    .reduce((sum, char) => sum + char.charCodeAt(0), 0);
};

const escapeSvgText = (value) => {
  return String(value)
    .replace(/&/g, "and")
    .replace(/</g, "")
    .replace(/>/g, "")
    .replace(/"/g, "'");
};

export const makeTextileSwatch = (clothe = {}) => {
  const [base, cloth, thread] = getPalette(clothe.type);
  const name = escapeSvgText(clothe.name || "SeJahit piece");
  const type = getTypeLabel(clothe.type);
  const seed = getSeed(name);
  const stripe = 18 + (seed % 18);
  const offset = seed % 36;

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 660" role="img">
      <rect width="520" height="660" fill="${cloth}"/>
      <path d="M0 ${120 + offset} C120 ${80 + offset}, 220 ${170 + offset}, 520 ${92 + offset}" fill="none" stroke="${base}" stroke-width="4" stroke-dasharray="10 12" opacity="0.5"/>
      <path d="M0 ${410 - offset} C110 ${350 - offset}, 240 ${520 - offset}, 520 ${390 - offset}" fill="none" stroke="${base}" stroke-width="3" stroke-dasharray="2 16" opacity="0.42"/>
      <g opacity="0.42">
        <path d="M${stripe} 0v660M${stripe * 3} 0v660M${stripe * 5} 0v660M${stripe * 7} 0v660M${stripe * 9} 0v660" stroke="${base}" stroke-width="2"/>
        <path d="M0 ${stripe * 2}h520M0 ${stripe * 4}h520M0 ${stripe * 6}h520M0 ${stripe * 8}h520M0 ${stripe * 10}h520" stroke="${base}" stroke-width="2"/>
      </g>
      <rect x="58" y="476" width="404" height="108" rx="0" fill="${base}"/>
      <rect x="74" y="492" width="372" height="76" rx="0" fill="none" stroke="${thread}" stroke-width="3" stroke-dasharray="8 10"/>
      <text x="86" y="526" font-family="IBM Plex Mono, monospace" font-size="20" letter-spacing="3" fill="${cloth}">${type.toUpperCase()}</text>
      <text x="86" y="556" font-family="Spline Sans, Arial, sans-serif" font-size="24" font-weight="700" fill="#ffffff">${name.slice(0, 24)}</text>
      <circle cx="438" cy="114" r="42" fill="${thread}" opacity="0.9"/>
      <circle cx="438" cy="114" r="18" fill="${cloth}" opacity="0.95"/>
    </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export const resolveImagePath = (imagePath) => {
  if (!imagePath) {
    return null;
  }

  const trimmedPath = imagePath.trim();

  if (/^(https?:|data:|\/)/.test(trimmedPath)) {
    return trimmedPath;
  }

  return `/${trimmedPath.replace(/^\/+/, "")}`;
};

export const getClotheImage = (clothe, images = []) => {
  const image = images.find(
    (item) => Number(item.ImageID) === Number(clothe?.ImageID)
  );

  return resolveImagePath(image?.ImagePath || clothe?.imagePath) || makeTextileSwatch(clothe);
};

export const selectImage = (clothe, images = []) => getClotheImage(clothe, images);

export const searchClothes = ({ query, clothes }) => {
  const cleanQuery = query?.trim().toLowerCase();

  if (!cleanQuery || !Array.isArray(clothes) || clothes.length === 0) {
    return [];
  }

  const index = new FlexSearch.Index({ tokenize: "forward", cache: true });
  const clothesById = new Map();

  clothes.forEach((clothe) => {
    const id = String(clothe.ClotheID);
    clothesById.set(id, clothe);
    index.add(
      id,
      [clothe.name, clothe.type, clothe.about, clothe.price].filter(Boolean).join(" ")
    );
  });

  const indexedResults = index
    .search(cleanQuery, { limit: 48 })
    .map((id) => clothesById.get(String(id)))
    .filter(Boolean);

  const directMatches = clothes.filter((clothe) =>
    [clothe.name, clothe.type, clothe.about]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes(cleanQuery)
  );

  return [...indexedResults, ...directMatches].filter(
    (clothe, index, list) =>
      list.findIndex((item) => item.ClotheID === clothe.ClotheID) === index
  );
};

export const fetchAndIndexClotheData = async () => {
  try {
    return await fetchAllClothes();
  } catch {
    return [];
  }
};

export const getSearchResult = async () => {
  return fetchData("searchResult") || [];
};
