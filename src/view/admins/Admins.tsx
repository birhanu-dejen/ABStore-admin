import { Flex, Typography } from "antd";

import AddModal from "./AddModal";
import AdminsTable from "./AdminsTable";

const { Title } = Typography;

const Admins = () => {
  return (
    <Flex vertical style={{ height: "100%" }}>
      <Title level={4}>Admins</Title>
      <br />
      <Flex vertical gap={15}>
        <Flex justify="flex-end">
          <AddModal />
        </Flex>
        <AdminsTable />
      </Flex>
    </Flex>
  );
};

export default Admins;
