import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider,Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Main from "./pages/main.tsx";
import ThemeConfig from "./theme.tsx";
import SignIn from "./pages/signin.tsx";
import Order from "./view/order/Order.tsx";
import Users from "./view/users/Users.tsx";
import Orders from "./view/orders/Orders.tsx";
import Admins from "./view/admins/Admins.tsx";
import Drivers from "./view/drivers/Drivers.tsx";
import Product from "./view/product/Product.tsx";
import Settings from "./view/settings/Settings.jsx";
import Dashboard from "./view/dashboard/Dashboard.tsx";
import AddProduct from "./view/add_product/AddProduct.tsx";
import AllProducts from "./view/all_products/AllProducts.tsx";

import "./index.css";
import NotFound from "./pages/NotFound.tsx";

const router = createBrowserRouter([
  {
    path: "/auth/signin",
    element: <SignIn />,
  },
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "",
        element: <Navigate to="dashboard"/>,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        children: [
          {
            path: "all-products/",
            element: <AllProducts />,
          },
          {
            path: "all-products/:id",
            element: <Product />,
          },
        ],
      },
      {
        path: "add-product",
        element: <AddProduct />,
      },
      {
        children: [
          {
            path: "orders",
            element: <Orders />,
          },
          {
            path: "orders/:id",
            element: <Order />,
          },
        ],
      },
      {
        path: "admins",
        element: <Admins />,
      },
      {
        path: "drivers",
        element: <Drivers />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
  {
    path: "/*",
    element: <NotFound />,
  }
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeConfig>
        <RouterProvider router={router} />
      </ThemeConfig>
    </QueryClientProvider>
  </React.StrictMode>
);
