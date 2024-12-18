import { useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, Modal, Typography, notification } from "antd";

import { modifyUser } from "../../api/user";

const { Text } = Typography;
const { useNotification } = notification;

interface IModifyModal {
  action: String;
  id: string;
}

const ModifyModal = ({ action, id }: IModifyModal) => {
  const [isOpen, setIsOpen] = useState(false);

  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const [api, contextHolder] = useNotification();

  const { mutate, isPending } = useMutation({
    mutationFn: modifyUser,
    onSuccess: () => {
      form.resetFields();
      hideModal();
      queryClient.invalidateQueries({
        queryKey: ["Users"],
      });
    },
    onError: (error) => {
      showNotification(error.message);
    },
  });

  function showNotification(description: string) {
    api.error({
      message: "Error",
      description,
    });
  }

  function showModal() {
    setIsOpen(true);
  }
  function hideModal() {
    setIsOpen(false);
  }

  const modify = ({ reason }: { reason: string }) => {
    mutate({ id, banReason: reason, banned: action === "UnBan" });
  };

  return (
    <>
      {contextHolder}
      <Button type="text" danger onClick={showModal}>
        {action}
      </Button>
      <Modal
        title={`${action} User`}
        open={isOpen}
        okText={action}
        onCancel={hideModal}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              modify(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
        okButtonProps={{
          disabled: isPending,
          loading: isPending,
        }}
      >
        <Text>Are sure you want to {action.toLowerCase()} this user?</Text>
        <Form
          form={form}
          layout="vertical"
          name={`banUser/${id}`}
          style={{ display: action === "Ban" ? "block" : "none" }}
        >
          {action === "Ban" && (
            <Form.Item
              name="reason"
              label="Reason"
              rules={[
                {
                  required: true,
                  message: "Please input the reason for banning user!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </>
  );
};

export default ModifyModal;
