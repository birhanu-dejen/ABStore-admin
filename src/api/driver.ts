import Cookies from "js-cookie";

import axiosInstance from "./main";

interface IDriverFilter {
  search?: string;
  page: string;
}

export function getDrivers(filter: IDriverFilter) {
  const token = Cookies.get("token");
  return axiosInstance
    .get("/drivers", {
      params: { ...filter },
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

export function addDriver(data: ICreate) {
  const token = Cookies.get("token");
  return axiosInstance
    .post("/drivers/create", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      throw error.response.data;
    });
}

export function deleteDriver({ id }: { id: string }) {
  const token = Cookies.get("token");
  return axiosInstance
    .delete(`/drivers/${id}/delete`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      throw error.response.data;
    });
}
