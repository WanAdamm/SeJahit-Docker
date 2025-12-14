import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

export async function logoutAction()
{
    localStorage.removeItem("username"); 

    toast.success("You've logged out")
    return redirect("/")
}