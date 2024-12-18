import Cookies from "js-cookie";

import axiosInstance from "./main";

interface IOrderFilter {
  orderStatus: string;
  page: string;
}

export function getOrders(filter: IOrderFilter) {
  const token = Cookies.get("token");
  return axiosInstance
    .get("/orders/", {
      params: { ...filter },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res: any) => res.data)
    .catch((error: any) => {
      throw error.response.data;
    });
}

export function findOneOrder(id: string) {
  const token = Cookies.get("token");
  return axiosInstance
    .get(`/orders/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      throw error.response.data;
    });
}

interface IAssignDriver {
  id: string;
  driverId: string;
}

export function assignDriver({ id, driverId }: IAssignDriver) {
  const token = Cookies.get("token");
  return axiosInstance
    .patch(
      `/orders/${id}/assignDriver`,
      { driverId },
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
