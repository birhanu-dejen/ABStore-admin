import { useEffect } from "react";

import { useQuery } from "@tanstack/react-query";
import { PushpinFilled, PhoneFilled } from "@ant-design/icons";
import { Space, Avatar, Tag, Table, Typography, notification } from "antd";

import ModifyModal from "./ModifyModal";
import { getUsers } from "../../api/user";
import { useSearchParams } from "react-router-dom";

const { Column } = Table;
const { Text } = Typography;
const { useNotification } = notification;

const UsersTable = () => {
  const [api, contextHolder] = useNotification();
  const [searchParams, setSearchParams] = useSearchParams();
  const status: string = searchParams.get("status") || "Active";
  const page: string = searchParams.get("page") || "1";

  function showNotification(description: string) {
    api.error({
      message: "Error",
      description,
    });
  }

  const filter = {
    page,
    banned: status === "Banned",
  };

  const { error, isLoading, isSuccess, data } = useQuery({
    queryKey: ["Users", { ...filter }],
    queryFn: () => getUsers(filter),
  });

  useEffect(() => {
    if (error) {
      showNotification(error.message);
    }
  }, [error]);

  return (
    <div>
      {contextHolder}
      <Table
        dataSource={isSuccess ? data.data.users : []}
        loading={isLoading}
        pagination={{
          onChange: (newPage: number) => {
            setSearchParams(
              (prev) => {
                prev.set("page", newPage.toString());
                return prev;
              },
              { replace: true }
            );
          },
          total: isSuccess ? data.data.totalCount : 10,
          pageSize: 10,
          current: Number(searchParams.get("page")) || 1,
        }}
      >
        <Column
          title="Full Name"
          dataIndex="fullName"
          key="fullName"
          render={(text: string) => (
            <Space>
              <Avatar style={{ backgroundColor: "#1677ff" }}>{text[0]}</Avatar>
              <Text>{text}</Text>
            </Space>
          )}
        />
        <Column
          title="Address"
          dataIndex="address"
          key="address"
          render={(text: string) => (
            <Space>
              <PushpinFilled style={{ color: "#FF4D4F" }} /> <Text>{text}</Text>
            </Space>
          )}
        />
        <Column
          title="Phone Number"
          dataIndex="phoneNumber"
          key="phoneNumber"
          render={(text: string) => (
            <Space>
              <PhoneFilled style={{ color: "#52c41a" }} />
              <Text>+251{text}</Text>
            </Space>
          )}
        />
        <Column
          title="Status"
          dataIndex="status"
          key="status"
          render={(isBanned: boolean) => (
            <Space>
              <Tag color="warning">{isBanned ? "Banned" : "Active"}</Tag>
            </Space>
          )}
        />
        {status === "Banned" && (
          <Column
            title="Ban Reason"
            dataIndex="banReason"
            key="banReason"
            render={(text: string) => <Text>{text}</Text>}
          />
        )}
        <Column
          title="Action"
          key="action"
          dataIndex="key"
          render={(id: string) => (
            <ModifyModal
              action={status === "Banned" ? "UnBan" : "Ban"}
              id={id}
            />
          )}
        />
      </Table>
    </div>
  );
};

export default UsersTable;
