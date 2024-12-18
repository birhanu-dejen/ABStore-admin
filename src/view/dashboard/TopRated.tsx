import { useEffect } from "react";

import {
  Tag,
  Card,
  Flex,
  List,
  Space,
  Avatar,
  Typography,
  notification,
} from "antd";
import { StarFilled } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";

import { getTopRatedProducts } from "../../api/product";

const { Title, Text } = Typography;
const { useNotification } = notification;

const TopRated = () => {
  const [api, contextHolder] = useNotification();

  function showNotification(description: string) {
    api.error({
      message: "Error",
      description,
    });
  }

  const { error, isLoading, isSuccess, data } = useQuery({
    queryKey: ["Products", "Top Rated"],
    queryFn: () => getTopRatedProducts(),
  });

  useEffect(() => {
    if (error) {
      showNotification(error.message);
    }
  }, [error]);

  return (
    <>
      {contextHolder}
      <Card style={{ marginBottom: 16, height: "calc(50% - 8px)" }}>
        <Title level={5}>Top Rated Products</Title>
        <List
          loading={isLoading}
          dataSource={isSuccess ? data.data.products.slice(0, 5) : []}
          renderItem={(item: {
            name: string;
            images: string[];
            rating: number;
          }) => (
            <List.Item>
              <Flex justify="space-between" align="center" flex={1}>
                <Space>
                  <Avatar
                    src={`${import.meta.env.VITE_API_BACKEND_URL}${
                      item.images[0]
                    }`}
                    shape="square"
                  />
                  <Text>{item.name}</Text>
                </Space>
                <Tag
                  style={{
                    padding: "5px 10px",
                    borderRadius: 20,
                  }}
                >
                  <StarFilled style={{ color: "#FADB14" }} />
                  {item.rating.toFixed(2)}
                  Stars
                </Tag>
              </Flex>
            </List.Item>
          )}
        />
      </Card>
    </>
  );
};

export default TopRated;
