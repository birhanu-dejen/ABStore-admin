import Cookies from "js-cookie";

import useAdminStore from "../store/Admin";
import { useNavigate } from "react-router-dom";

export function fetchUser() {
  const navigate = useNavigate();
  const sign = useAdminStore((state) => state.sign);

  const token = Cookies.get("token");
  const id = localStorage.getItem("id");
  const role = localStorage.getItem("role");
  const email = localStorage.getItem("email");
  const lastName = localStorage.getItem("lastName");
  const firstName = localStorage.getItem("firstName");

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
    navigate("/auth/signin", { replace: true });
  }
}
