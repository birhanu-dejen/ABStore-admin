import Cookies from "js-cookie";

import axiosInstance from "./main";

interface IProductFilter {
  category?: string;
  rating?: string;
  search?: string;
  page: string;
}

export function getProducts(filter: IProductFilter) {
  return axiosInstance
    .get("/products", { params: { ...filter } })
    .then((res) => res.data)
    .catch((error) => {
      throw error.response.data;
    });
}

export function findOneProduct(id: string) {
  return axiosInstance
    .get(`/products/${id}`)
    .then((res) => res.data)
    .catch((error) => {
      throw error.response.data;
    });
}

export function addProduct(formData: FormData) {
  const token = Cookies.get("token");

  return axiosInstance
    .post("/products/create", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      throw error.response.data;
    });
}

export function editProduct({
  formData,
  id,
}: {
  formData: FormData;
  id: string;
}) {
  const token = Cookies.get("token");

  return axiosInstance
    .patch(`/products/${id}/edit`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      throw error.response.data;
    });
}

export function deleteProduct({ id }: { id: string }) {
  const token = Cookies.get("token");
  return axiosInstance
    .delete(`/products/${id}/delete`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      throw error.response.data;
    });
}

export function getTopRatedProducts() {
  return axiosInstance
    .get("/products/topRated")
    .then((res) => res.data)
    .catch((error) => {
      throw error.response.data;
    });
}
