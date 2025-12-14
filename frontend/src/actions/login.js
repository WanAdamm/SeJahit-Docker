import { redirect } from "react-router-dom";
import { login } from "../helpers";
import { toast } from "react-toastify";

export async function loginAction({ request }) {
  // Parse form data from the request
  const formData = await request.formData();
  const { _action, ...values } = Object.fromEntries(formData);

  if (_action === "login") {
    // Access specific fields by name
    const username = values.username; // Matches the name attribute in the form
    const password = values.password; // Matches the name attribute in the form

    // Call the login helper function
    const { success, message } = await login({ username, password });

    if (success) {
      // Save the username in the context
       localStorage.setItem("username", JSON.stringify(username)) // Save username in localStorage

      toast.success(message); // Show success message
      return redirect("/"); // Redirect to the homepage or dashboard
    } else {
      toast.error(message); // Show error message
      return null; // Stay on the same page
    }
  }
}
