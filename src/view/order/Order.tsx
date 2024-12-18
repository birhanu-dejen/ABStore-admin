import { Breadcrumb, Typography } from "antd";
import { useNavigate, useParams } from "react-router-dom";

import OrderTable from "./OrderTable";

const { Title, Text } = Typography;

const Order = () => {
  const params = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <Title level={4}>Order</Title>
      <Breadcrumb
        items={[
          {
            title: (
              <Text
                type="secondary"
                onClick={() => navigate("/orders")}
                style={{ cursor: "pointer" }}
              >
                Orders
              </Text>
            ),
          },
          { title: params.id },
        ]}
      />
      <br />
      <div>
        <OrderTable />
      </div>
    </div>
  );
};

export default Order;
