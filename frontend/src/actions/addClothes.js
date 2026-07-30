import { redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { addProduct, fetchAllUsers, fetchData } from "../helpers";

export async function addClothesAction({ request }) {
  // Parse form data from the request
  const formData = await request.formData();
  const { _action, ...values } = Object.fromEntries(formData);

  if (_action === "addClothe") {
    const name = values.name;
    const price = values.price;
    const about = values.about;
    const type = values.type;
    const imagePath = values.imagePath;

    try {
      const username = fetchData("username") || null;
      const users = await fetchAllUsers();
      const user = users.find((item) => item.username === username);

      if (!user?.isAdmin) {
        toast.error("Only admins can add pieces.", {
          position: "top-center",
        });
        return redirect("/");
      }

      const { success, message } = await addProduct({
        name,
        price,
        about,
        type,
        imagePath,
      });

      if (success) {
        toast.success(message, {
          position: "top-center",
        });

        return redirect("/");
      } else {
        toast.error(message, {
          position: "top-center",
        });
        return null;
      }
    } catch {
      toast.error("The product could not be added.", {
        position: "top-center",
      });
      return null;
    }
  }
}
