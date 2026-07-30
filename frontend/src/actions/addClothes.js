import { redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { addProduct, fetchAllUsers, fetchData, removeProduct, updateProduct } from "../helpers";

export async function addClothesAction({ request }) {
  // Parse form data from the request
  const formData = await request.formData();
  const { _action, ...values } = Object.fromEntries(formData);

  try {
    const username = fetchData("username") || null;
    const users = await fetchAllUsers();
    const user = users.find((item) => item.username === username);

    if (!user?.isAdmin) {
      toast.error("Only admins can manage pieces.", { position: "top-center" });
      return redirect("/");
    }

    const result =
      _action === "addClothe"
        ? await addProduct(values)
        : _action === "updateClothe"
          ? await updateProduct(values)
          : _action === "deleteClothe"
            ? await removeProduct(values)
            : { success: false, message: "Unknown admin action." };

    toast[result.success ? "success" : "error"](result.message, { position: "top-center" });
    return result.success ? redirect("/add-product") : null;
  } catch {
    toast.error("The product could not be saved.", { position: "top-center" });
    return null;
  }
}
