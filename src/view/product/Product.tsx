import { Breadcrumb, Typography } from "antd";
import { useNavigate, useParams } from "react-router-dom";

import ProductForm from "./ProductForm";

const { Title, Text } = Typography;

const Product = () => {
  const params = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <Title level={4}>Product</Title>
      <Breadcrumb
        items={[
          {
            title: (
              <Text
                type="secondary"
                onClick={() => navigate("/all-products")}
                style={{ cursor: "pointer" }}
              >
                All Products
              </Text>
            ),
          },
          { title: params.id },
        ]}
      />
      <br />
      <ProductForm id={params.id}/>
    </div>
  );
};

export default Product;
