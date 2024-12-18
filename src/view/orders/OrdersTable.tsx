import { useEffect } from "react";

import {
  Tag,
  Space,
  Table,
  Avatar,
  Button,
  Tooltip,
  Typography,
  notification,
} from "antd";
import { PhoneFilled, EyeOutlined, PushpinFilled } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";

import { getOrders } from "../../api/order";
import DeliverModal from "./DeliverModal";

const { Column } = Table;
const { Text } = Typography;
const { useNotification } = notification;

const OrderTable = () => {
  const navigate = useNavigate();
  const [api, contextHolder] = useNotification();
  const [searchParams, setSearchParams] = useSearchParams();
  const status = searchParams.get("status") || "Processing";

  function showNotification(description: string) {
    api.error({
      message: "Error",
      description,
    });
  }

  const filter = {
    page: searchParams.get("page") || "1",
    orderStatus: status,
  };

  const { error, isLoading, isSuccess, data } = useQuery({
    queryKey: ["Orders", { ...filter }],
    queryFn: () => getOrders(filter),
  });

  useEffect(() => {
    if (error) {
      showNotification(error.message);
    }
  }, [error]);

  return (
    <>
      {contextHolder}
      <Table
        dataSource={isSuccess ? data.data.orders : []}
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
          dataIndex="userInfo"
          key="fullName"
          render={(userInfo) => (
            <Space>
              <Avatar style={{ backgroundColor: "#1677ff" }}>
                {userInfo.length !== 0 ? userInfo[0].firstName[0] : "."}
              </Avatar>
              <Text>
                {userInfo.length !== 0
                  ? `${userInfo[0].firstName} ${userInfo[0].lastName}`
                  : "..."}
              </Text>
            </Space>
          )}
        />
        <Column
          title="Phone Number"
          dataIndex="userInfo"
          key="phoneNumber"
          render={(userInfo) => (
            <Space>
              <PhoneFilled style={{ color: "#52c41a" }} />
              <Text>
                +251{userInfo.length !== 0 ? userInfo[0].phoneNumber : "..."}
              </Text>
            </Space>
          )}
        />
        <Column
          title="Address"
          dataIndex="userInfo"
          key="address"
          render={(userInfo) => {
            return (
              <Space>
                <PushpinFilled style={{ color: "#FF4D4F" }} />
                <Text>
                  {userInfo.length !== 0 ? userInfo[0].location : "..."}
                </Text>
              </Space>
            );
          }}
        />
        <Column
          title="Status"
          dataIndex="status"
          key="status"
          render={(text: string) => (
            <Space>
              <Tag color="warning">{text}</Tag>
            </Space>
          )}
        />
        <Column
          title="Product Count"
          dataIndex="productCount"
          key="productCount"
          render={(text: string) => <Text>{text}</Text>}
        />
        <Column
          title="Total Price"
          dataIndex="totalPrice"
          key="totalPrice"
          render={(text: string) => (
            <Space>
              <Tag color="green">{text} ETB</Tag>
            </Space>
          )}
        />
        <Column
          title="View"
          key="view"
          dataIndex="key"
          render={(key: string) => (
            <Tooltip title="Detail">
              <Button
                icon={<EyeOutlined />}
                onClick={() => navigate(`./${key}`)}
              />
            </Tooltip>
          )}
        />
        {status === "Processing" && (
          <Column
            title="Action"
            key="actions"
            dataIndex="key"
            width={150}
            render={(key: string) => <DeliverModal id={key} />}
          />
        )}
      </Table>
    </>
  );
};

export default OrderTable;
