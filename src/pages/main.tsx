import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

import AppLayout from "../layout/Layout";
import useAdminStore from "../store/Admin";

export default function Main() {
  const sign = useAdminStore((state) => state.sign);

  const token = Cookies.get("token");
  const id = localStorage.getItem("id");
  const role = localStorage.getItem("role");
  const email = localStorage.getItem("email");
  const lastName = localStorage.getItem("lastName");
  const firstName = localStorage.getItem("firstName");

  const authenticated = token && id && email && firstName && lastName && role;

  if (token && id && email && firstName && lastName && role) {
    sign({
      id,
      role,
      email,
      lastName,
      firstName,
    });
  } else {
    sign(null);
    localStorage.clear();
    Cookies.remove("token");
  }

  return authenticated ? (
    <AppLayout>
      <Outlet />
    </AppLayout>
  ) : (
    <Navigate to="auth/signin" />
  );
}
