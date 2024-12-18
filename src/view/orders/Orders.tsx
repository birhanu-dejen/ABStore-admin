import type { TabsProps } from "antd";
import { Tabs, Typography } from "antd";
import { useSearchParams } from "react-router-dom";

import OrdersTable from "./OrdersTable";

const { Title } = Typography;

const items: TabsProps["items"] = [
  {
    key: "Processing",
    label: "Processing",
    children: <OrdersTable />,
  },
  {
    key: "Delivering",
    label: "Delivering",
    children: <OrdersTable />,
  },
  {
    key: "Delivered",
    label: "Delivered",
    children: <OrdersTable />,
  },
];

const Orders = () => {
  const [_, setSearchParams] = useSearchParams({
    status: "",
    page:"",
  });
  
  const onChange = (key: string) => {
    setSearchParams(
      (prev) => {
        prev.set("status", key);
        prev.set("page","1");
        return prev;
      },
      { replace: true }
    );
  };

  return (
    <div>
      <Title level={4}>Orders</Title>
      <br />

      <div>
        <Tabs defaultActiveKey="Processing" items={items} onChange={onChange}/>
      </div>
    </div>
  );
};

export default Orders;
