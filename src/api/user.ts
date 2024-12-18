import Cookies from "js-cookie";

import axiosInstance from "./main";

export function getUsers({ page, banned }: { page: string; banned: boolean }) {
  const token = Cookies.get("token");
  return axiosInstance
    .get("/users", {
      params: { page, banned },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      throw error.response.data;
    });
}

interface IModifyUser {
  banned: boolean;
  id: string;
  banReason: string;
}

export function modifyUser({ id, banned, banReason }: IModifyUser) {
  return banned ? unBanUser(id) : banUser(id, banReason);
}

function banUser(id: string, banReason: string) {
  const token = Cookies.get("token");
  return axiosInstance
    .patch(
      `/users/${id}/ban`,
      { banReason },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => res.data)
    .catch((error) => {
      throw error.response.data;
    });
}

function unBanUser(id: string) {
  const token = Cookies.get("token");
  return axiosInstance
    .patch(
      `/users/${id}/unBan`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => res.data)
    .catch((error) => {
      throw error.response.data;
    });
}

export function getUsersByStatus() {
  const token = Cookies.get("token");
  return axiosInstance
    .get(`/users/status`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      throw error.response.data;
    });
}
