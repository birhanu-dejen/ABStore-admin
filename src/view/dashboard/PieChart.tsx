import { useQuery } from "@tanstack/react-query";
import { Avatar, Card, Flex, Typography, notification } from "antd";
import { useEffect } from "react";
import { Pie, PieChart } from "recharts";
import { getUsersByStatus } from "../../api/user";

const { Title, Text } = Typography;
const { useNotification } = notification;

const CustomPieChart = () => {
  const [api, contextHolder] = useNotification();

  function showNotification(description: string) {
    api.error({
      message: "Error",
      description,
    });
  }

  const { error, isSuccess, data } = useQuery({
    queryKey: ["Users", "Status"],
    queryFn: () => getUsersByStatus(),
  });

  useEffect(() => {
    if (error) {
      showNotification(error.message);
    }
  }, [error]);

  return (
    <Card style={{ height: "calc(50% - 8px)" }}>
      {contextHolder}
      <Title level={5}>Users By Status</Title>
      <br />
      <Flex align="center" vertical>
        <PieChart width={200} height={200}>
          <Pie
            stroke="transparent"
            data={isSuccess ? data.data : []}
            innerRadius={50}
            outerRadius={100}
            dataKey="value"
          />
        </PieChart>
        <br />
        <Flex gap={20}>
          {isSuccess &&
            data.data.map((e: { name: string; fill: string }, i: number) => (
              <Flex key={i} gap={5} align="center">
                <Avatar
                  size={20}
                  shape="square"
                  style={{ backgroundColor: e.fill }}
                ></Avatar>
                <Text>{e.name}</Text>
              </Flex>
            ))}
        </Flex>
      </Flex>
    </Card>
  );
};

export default CustomPieChart;
