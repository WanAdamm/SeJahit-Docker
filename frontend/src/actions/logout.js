import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

export async function logoutAction() {
  localStorage.removeItem("username");

  toast.success("Logged out.");
  return redirect("/");
}
