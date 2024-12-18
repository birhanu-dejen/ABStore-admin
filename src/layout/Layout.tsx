import { useState, createElement, ReactNode } from "react";

import Cookies from "js-cookie";
import { Divider, Flex, Layout, Menu, MenuProps, Typography } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CarOutlined,
  PlusOutlined,
  TeamOutlined,
  UserOutlined,
  ShopOutlined,
  LogoutOutlined,
  SettingOutlined,
  BarChartOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import useAdminStore from "../store/Admin";

import logo from "../assets/abLogo.svg";
const { Title } = Typography;
const { Sider, Content } = Layout;

interface IProps {
  children: ReactNode;
}

const AppLayout = ({ children }: IProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const sign = useAdminStore((state) => state.sign);
  const admin = useAdminStore((state) => state.admin);

  const items: MenuProps["items"] = [
    {
      key: "dashboard",
      icon: createElement(DashboardOutlined),
      label: "Dashboard",
    },
    {
      key: "all-products",
      icon: createElement(ShopOutlined),
      label: "All Products",
    },
    {
      key: "add-product",
      icon: createElement(PlusOutlined),
      label: "Add Product",
    },
    { key: "orders", icon: createElement(BarChartOutlined), label: "Orders" },
    {
      key: "admins",
      icon: createElement(TeamOutlined),
      label: "Admins",
      style: { display: admin!.role === "Owner" ? "block" : "none" },
    },
    {
      key: "drivers",
      icon: createElement(CarOutlined),
      label: "Drivers",
      style: { display: admin!.role === "Owner" ? "block" : "none" },
    },
    { key: "users", icon: createElement(UserOutlined), label: "Users" },
    {
      key: "settings",
      icon: createElement(SettingOutlined),
      label: "Settings",
    },
    { key: "logout", icon: createElement(LogoutOutlined), label: "Logout" },
  ];

  const handelNavigation: MenuProps["onClick"] = (e) => {
    if (e.key === "logout") {
      sign(null);
      localStorage.clear();
      Cookies.remove("token");
      navigate("/auth/signin", { replace: true });
    } else {
      navigate(`/${e.key}`);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        theme="light"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{
          position: "fixed",
          left: 0,
          height: "100vh",
        }}
      >
        {collapsed ? (
          <Flex align="center" justify="center">
            <img src={logo} style={{ height: 70 }} />
          </Flex>
        ) : (
          <Flex align="center" justify="center" style={{ padding: 10,overflow:"hidden" }}>
            <img src={logo} style={{ height: 70 }} />
            <Title
              level={4}
              style={{
                color: "#1677FF",
                margin: 0,
                fontWeight: "bold", 
                wordBreak:"keep-all"
              }} 
            >
              STORE
            </Title>
          </Flex>
        )}
        <Divider style={{margin:0,}} />
        <Menu
          mode="inline"
          defaultSelectedKeys={[pathname.slice(1).split("/")[0]]}
          selectedKeys={[pathname.slice(1).split("/")[0]]}
          items={items}
          onClick={handelNavigation}
        />
      </Sider>
      <Layout
        className="site-layout"
        style={{ marginLeft: collapsed ? 80 : 200, transition: ".2s" }}
      >
        <Content style={{ margin: "16px", padding: 24 }}>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
