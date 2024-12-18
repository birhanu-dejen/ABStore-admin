import { useEffect } from "react";

import {
  Avatar,
  Button,
  Space,
  Table,
  Tag,
  Tooltip,
  Typography,
  notification,
} from "antd";
import { useQuery } from "@tanstack/react-query";
import { EditOutlined, StarFilled } from "@ant-design/icons";
import { useNavigate, useSearchParams } from "react-router-dom";

import Delete from "./Delete";
import { getProducts } from "../../api/product";

const { Column } = Table;
const { Text } = Typography;
const { useNotification } = notification;

const ProductsTable = () => {
  const navigate = useNavigate();
  const [api, contextHolder] = useNotification();
  const [searchParams, setSearchParams] = useSearchParams();

  function showNotification(description: string) {
    api.error({
      message: "Error",
      description,
    });
  }

  const filter = {
    page: searchParams.get("page") || "1",
    category: searchParams.get("category") || undefined,
    rating: searchParams.get("rating") || undefined,
    search: searchParams.get("search") || undefined,
  };

  const { error, isLoading, isSuccess, data } = useQuery({
    queryKey: ["Products", { ...filter }],
    queryFn: () => getProducts(filter),
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
        loading={isLoading}
        dataSource={isSuccess ? data.data.products : []}
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
        rowKey={(record) => record._id}
      >
        <Column
          title="Product"
          key="product"
          render={(product) => {
            return (
              <Space>
                <Avatar src={`${import.meta.env.VITE_API_BACKEND_URL}${product.images[0]}`} shape="square" />
                <Text>{product.name}</Text>
              </Space>
            );
          }}
        />

        <Column
          title="Category"
          dataIndex="category"
          key="category"
          render={(category: string) => <Text>{category}</Text>}
        />
        <Column
          title="Variation"
          dataIndex="types"
          key="variation"
          render={(types: { color: string; quantity: number }[]) => (
            <Space>
              {types.length > 0 &&
                types.map((e, i) => (
                  <Tag key={i} color={e.color}>
                    {e.quantity}
                  </Tag>
                ))}
              {types.length === 0 && <Tag color="red">Out Of Stock</Tag>}
            </Space>
          )}
        />

        <Column
          title="Rating"
          dataIndex="rating"
          key="rating"
          render={(rating: number) => (
            <Tag
              style={{
                padding: "5px 10px",
                borderRadius: 20,
              }}
            >
              <StarFilled style={{ color: "#FADB14" }} /> {rating.toFixed(2)} Stars
            </Tag>
          )}
        />

        <Column
          title="Price"
          dataIndex="price"
          key="price"
          render={(price: number) => <Tag color="green">{price} ETB</Tag>}
        />
        <Column
          title="Action"
          key="action"
          dataIndex="_id"
          width={150}
          render={(key: string) => (
            <Space>
              <Tooltip title="Edit">
                <Button
                  icon={<EditOutlined />}
                  onClick={() => navigate(`./${key}`)}
                />
              </Tooltip>
              <Tooltip title="Delete">
                <div>
                  <Delete id={key} />
                </div>
              </Tooltip>
            </Space>
          )}
        />
      </Table>
    </>
  );
};

export default ProductsTable;
