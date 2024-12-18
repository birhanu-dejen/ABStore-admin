import { useEffect } from "react";

import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  SwapOutlined,
} from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  Flex,
  List,
  Skeleton,
  Statistic,
  Typography,
  notification,
} from "antd";

import { getDashboard } from "../../api/dashboard";

const { Text } = Typography;
const { useNotification } = notification;

const Today = () => {
  const [api, contextHolder] = useNotification();

  const { error, isLoading, isSuccess, data } = useQuery({
    queryKey: ["TodayDashBoard"],
    queryFn: () => getDashboard(),
  });

  function showNotification(description: string) {
    api.error({
      message: "Error",
      description,
    });
  }

  useEffect(() => {
    if (error) {
      showNotification(error.message);
    }
  }, [error]);
  return (
    <>
      {contextHolder}
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 1,
          md: 2,
          lg: 2,
          xl: 3,
          xxl: 4,
        }}
        loading={isLoading}
        dataSource={isSuccess ? data.data : [1, 2, 3]}
        renderItem={(item: {
          title: string;
          count: number;
          change: number;
        }) => (
          <List.Item>
            <Card>
              <Skeleton
                loading={isLoading}
                title={{ width: 200 }}
                paragraph={{ rows: 2, width: [100, 200] }}
              >
                <Statistic title={item.title} value={item.count} />
                <Flex gap={5} align="center">
                  {item.change < 0 ? (
                    <ArrowDownOutlined style={{ color: "#FF4D4F" }} />
                  ) : item.change > 0 ? (
                    <ArrowUpOutlined style={{ color: "#52c41a" }} />
                  ) : (
                    <SwapOutlined style={{ color: "#FAAD14" }} />
                  )}

                  <Text
                    strong
                    type={
                      item.change < 0
                        ? "danger"
                        : item.change > 0
                        ? "success"
                        : "warning"
                    }
                  >
                    {item.change}%
                  </Text>
                  <Text type="secondary">vs yesterday</Text>
                </Flex>
              </Skeleton>
            </Card>
          </List.Item>
        )}
      />
    </>
  );
};

export default Today;
