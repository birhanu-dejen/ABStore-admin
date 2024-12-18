import Cookies from "js-cookie";

import axiosInstance from "./main";

interface ISignIn {
  email: string;
  password: string;
}

export function adminSignIn(admin: ISignIn) {
  return axiosInstance
    .post("/admins/signin", admin)
    .then((res: any) => res.data)
    .catch((error: any) => {
      throw error.response.data;
    });
}

export function getAdmins(page: string) {
  const token = Cookies.get("token");
  return axiosInstance
    .get("/admins", {
      params: { page },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      throw error.response.data;
    });
}

interface ICreate {
  firstName: string;
  lastName: string;
  email: string;
}

export function addAdmins(data: ICreate) {
  const token = Cookies.get("token");
  return axiosInstance
    .post("/admins/create", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      throw error.response.data;
    });
}

export function deleteAdmin({ id }: { id: string }) {
  const token = Cookies.get("token");
  return axiosInstance
    .delete(`/admins/${id}/delete`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      throw error.response.data;
    });
}

interface IAdminChangePassword {
  id: string;
  password: string;
  confirmPassword: string;
}

export function adminChangePassword(changePassword: IAdminChangePassword) {
  const token = Cookies.get("token");
  return axiosInstance
    .patch(`/admins/${changePassword.id}/changePassword`, changePassword, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res: any) => res.data)
    .catch((error: any) => {
      throw error.response.data;
    });
}

interface IUpdate {
  id: string;
  firstName: string;
  lastName: string;
}

export function updateAdmin(update: IUpdate) {
  const token = Cookies.get("token");
  return axiosInstance
    .patch(`/admins/${update.id}/update`, update, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res: any) => res.data)
    .catch((error: any) => {
      throw error.response.data;
    });
}

export function forgotPasswordAdmin(email: string) {
  return axiosInstance
    .patch(`/admins/forgotPassword`, { email })
    .then((res: any) => res.data)
    .catch((error: any) => {
      throw error.response.data;
    });
}
