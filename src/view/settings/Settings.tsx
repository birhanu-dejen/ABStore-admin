import { Row, Col, Flex, theme, Select, Divider, Typography } from "antd";
import {
  KeyOutlined,
  MailOutlined,
  UserOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import NameButton from "./NameModal";
import DeleteModal from "./DeleteModal";
import Description from "./Description";
import ModalButton from "./PasswordModal";
import useThemeStore from "../../store/Store";
import useAdminStore from "../../store/Admin";

const { useToken } = theme;
const { Title, Text } = Typography;

const Settings = () => {
  const { token } = useToken();
  const mode = useThemeStore((state) => state.mode);
  const admin = useAdminStore((state) => state.admin);
  const changeMode = useThemeStore((state) => state.changeMode);

  return (
    <div>
      <Title level={4}>Settings</Title>
      <br />
      <div>
        <Flex justify="space-between" align="center">
          <Description
            title="Name"
            message="personalize your first and last name"
            icon={<UserOutlined />}
          />

          <div style={{ width: "60%" }}>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Flex
                  style={{
                    height: 40,
                    padding: 10,
                    fontSize: 15,
                    backgroundColor: token.colorBgContainer,
                    borderRadius: 5,
                    border: "1px solid #1677ff",
                    borderColor: token.colorBorder,
                  }}
                  align="center"
                >
                  <Text type="secondary">{admin ? admin.firstName : ""}</Text>
                </Flex>
              </Col>
              <Col span={12}>
                <Flex
                  style={{
                    height: 40,
                    padding: 10,
                    fontSize: 15,
                    backgroundColor: token.colorBgContainer,
                    borderRadius: 5,
                    border: "1px solid #1677ff",
                    borderColor: token.colorBorder,
                  }}
                  align="center"
                >
                  <Text type="secondary">{admin ? admin.lastName : ""}</Text>
                </Flex>
              </Col>
              <Col span={12}></Col>
              <Col span={12}>
                <Flex justify="flex-end">
                  <NameButton />
                </Flex>
              </Col>
            </Row>
          </div>
        </Flex>
        <Divider />

        <Flex justify="space-between" align="center">
          <Description
            title="Email"
            message="personalize your email address"
            icon={<MailOutlined />}
          />

          <div style={{ width: "60%" }}>
            <Row gutter={[16, 16]}>
              <Col span={12}></Col>
              <Col span={12}>
                <Flex
                  style={{
                    height: 40,
                    padding: 10,
                    fontSize: 15,
                    backgroundColor: token.colorBgContainer,
                    borderRadius: 5,
                    border: "1px solid #1677ff",
                    borderColor: token.colorBorder,
                  }}
                  align="center"
                >
                  <Text type="secondary">{admin ? admin.email : ""}</Text>
                </Flex>
              </Col>
            </Row>
          </div>
        </Flex>

        <Divider />
        <Flex justify="space-between" align="center">
          <Description
            title="Password"
            message="personalize your security"
            icon={<KeyOutlined />}
          />
          <ModalButton />
        </Flex>
        <Divider />
        <Flex justify="space-between" align="center">
          <Description
            title="Appearance and Display"
            message="customize how it looks on your device"
            icon={<EditOutlined />}
          />
          <Select
            defaultValue={mode}
            style={{ width: 140 }}
            onChange={(e) => changeMode(e)}
            options={[
              { value: "light", label: "Light" },
              { value: "dark", label: "Dark" },
            ]}
          />
        </Flex>
        <Divider />
        {(admin ? admin.role : "") === "Admin" && (
          <Flex justify="space-between" align="center">
            <Description
              title="Deactivate Your Account"
              message="delete your account permanently"
              icon={<DeleteOutlined />}
            />
            <DeleteModal />
          </Flex>
        )}
      </div>
    </div>
  );
};

export default Settings;
