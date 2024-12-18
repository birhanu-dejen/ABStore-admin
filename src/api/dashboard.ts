import Cookies from "js-cookie";

import axiosInstance from "./main";

export function getDashboard() {
  const token = Cookies.get("token");
  return axiosInstance
    .get(`/dashboard`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      throw error.response.data;
    });
}

interface IFilterDashboard {
  startRange: string;
  endRange: string;
}

export function filterDashboard(filter: IFilterDashboard) {
  const token = Cookies.get("token");
  return axiosInstance
    .get(`/dashboard/filter`, {
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
