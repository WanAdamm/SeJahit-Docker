import { toast } from "react-toastify";
import { addToCart } from "../helpers";
import { redirect } from "react-router-dom";

export async function productAction({ request }) {
  // Parse form data from the request
  const formData = await request.formData();
  const { _action, UserID, ClotheID } = Object.fromEntries(formData);

  if (_action === "addToCart") {
    // Call the login helper function
    const { success, message } = await addToCart({ UserID, ClotheID });

    if (success) {
      toast.success(message, {
        position: "top-center",
      }); // Show success message

      return redirect("/"); // redirect the user after adding item to cart to ensure the user can only add it once
    } else {
      toast.error(message, {
        position: "top-center",
      }); // Show error message
      return null; // Stay on the same page
    }
  }
}
