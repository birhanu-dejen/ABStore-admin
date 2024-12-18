import { Flex, Typography } from "antd";

import AddModal from "./AddModal";
import DriversTable from "./DriversTable";

const { Title } = Typography;

const Drivers = () => {
  return (
    <Flex vertical style={{ height: "100%" }}>
      <Title level={4}>Drivers</Title>
      <br />
      <Flex vertical gap={15}>
        <Flex justify="flex-end">
          <AddModal />
        </Flex>
        <DriversTable />
      </Flex>
    </Flex>
  );
};

export default Drivers;
