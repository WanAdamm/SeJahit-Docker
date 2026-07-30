import { deleteCartItem } from "../helpers";
import { toast } from "react-toastify";

export async function cartAction({ request }) {
  // Parse form data from the request
  const formData = await request.formData();
  const { _action, ...values } = Object.fromEntries(formData);

  if (_action === "deleteCartItem") {
    // Access specific fields by name
    const CartID = values.CartID; // Matches the name attribute in the form

    // Call the login helper function
    const { success, message } = await deleteCartItem({ CartID });

    if (success) {
      toast.success(message, {
        position: "top-center",
      });
      return null;
    } else {
      toast.error(message, {
        position: "top-center",
      });
      return null;
    }
  }
}
