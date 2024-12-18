import { Tabs, TabsProps, Typography } from "antd";
import { useSearchParams } from "react-router-dom";

import UsersTable from "./UsersTable";

const { Title } = Typography;

const items: TabsProps["items"] = [
  {
    key: "Active",
    label: "Active",
    children: <UsersTable />,
  },
  {
    key: "Banned",
    label: "Banned",
    children: <UsersTable />,
  },
];

const Users = () => {
  const [_, setSearchParams] = useSearchParams({
    status: "",
    page: "",
  });

  const onChange = (key: string) => {
    setSearchParams(
      (prev) => {
        prev.set("status", key);
        prev.set("page", "1");
        return prev;
      },
      { replace: true }
    );
  };
  return (
    <div>
      <Title level={4}>Users</Title>
      <br />

      <div>
        <Tabs defaultActiveKey="Active" items={items} onChange={onChange} />
      </div>
    </div>
  );
};

export default Users;
