import { redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { addProduct } from "../helpers";

export async function addClothesAction({ request }) {
  // Parse form data from the request
  const formData = await request.formData();
  const { _action, ...values } = Object.fromEntries(formData);

  if (_action === "addClothe") {
    // Extract form data
    const name = values.name;
    const price = values.price;
    const about = values.about;
    const type = values.type;

    try {

      // Add the product with the returned ImageID
      const { success, message } = await addProduct({
        name,
        price,
        about,
        type,
      });

      if (success) {
        toast.success(message, {
          position: "top-center",
        }); // Show success message

        return redirect("/"); // Redirect the user after adding the item
      } else {
        toast.error(message, {
          position: "top-center",
        }); // Show error message
        return null; // Stay on the same page
      }
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("An unexpected error occurred.", {
        position: "top-center",
      });
      return null;
    }
  }
}
