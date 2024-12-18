import { useNavigate, useSearchParams } from "react-router-dom";
import { Button, Flex, Input, Select, Space, Typography } from "antd";

import ProductsTable from "./ProductsTable";
import { catagories } from "../../constants/constant";
import { PlusOutlined } from "@ant-design/icons";

const { Search } = Input;
const { Title } = Typography;

const AllProducts = () => {
  const navigate = useNavigate();
  const [_, setSearchParams] = useSearchParams({
    category: "",
    search: "",
    page: "1",
  });

  const handleChange = (value: string) => {
    setSearchParams(
      (prev) => {
        prev.set("category", value);
        prev.set("page", "1");
        return prev;
      },
      { replace: true }
    );
  };

  function onSearch(value: string) {
    setSearchParams(
      (prev) => {
        prev.set("search", value);
        prev.set("page", "1");
        return prev;
      },
      { replace: true }
    );
  }

  return (
    <div>
      <Title level={4}>All Products</Title>
      <br />
      <Flex gap={15} vertical>
        <Flex justify="space-between">
          <Space>
            <Select
              defaultValue={""}
              placeholder="select category"
              style={{ width: 150 }}
              onChange={handleChange}
              options={[{ value: "", label: "All" }, ...catagories]}
            />
            <Search
              placeholder="input search text"
              style={{ width: 300 }}
              onSearch={onSearch}
            />
          </Space>
          <Button type="primary" icon={<PlusOutlined/>} onClick={() => navigate("/add-product")}>
            Add Product
          </Button>
        </Flex>
        <ProductsTable />
      </Flex>
    </div>
  );
};

export default AllProducts;
