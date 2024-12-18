import { Col, Row, Typography } from "antd";

import Today from "./Today";
import Graph from "./Graph";
import TopRated from "./TopRated";
import PieChart from "./PieChart";

const { Title } = Typography;

const Dashboard = () => {
  return (
    <div>
      <Title level={4}>Dashboard</Title>

      <br />
      <Row gutter={16}>
        <Col span={18}>
          <Today />
          <Graph />
        </Col>
        <Col span={6}>
          <TopRated />
          <PieChart />
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
