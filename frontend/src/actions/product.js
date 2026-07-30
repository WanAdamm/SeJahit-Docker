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
      });

      return redirect("/cart");
    } else {
      toast.error(message, {
        position: "top-center",
      });
      return null;
    }
  }
}
