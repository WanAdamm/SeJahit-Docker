import { redirect } from "react-router-dom";
import { register } from "../helpers";
import { toast } from "react-toastify";

export async function registerAction({ request }) {
  // Parse form data from the request
  const formData = await request.formData();
  const { _action, ...values } = Object.fromEntries(formData);

  if (_action === "register") {
    // Access specific fields by name
    const username = values.username; // Matches the name attribute in the form
    const password = values.password; // Matches the name attribute in the form
    const name = values.name; // Matches the name attribute in the form

    const { success, message } = await register({ username, password, name });

    if (success) {
      toast.success(message);
      return redirect("/login");
    } else {
      toast.error(message);
      return null;
    }
  }
}
