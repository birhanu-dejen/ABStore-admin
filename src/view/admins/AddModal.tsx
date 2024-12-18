import { useState } from "react";

import { Button, Form, Input, Modal, notification } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addAdmins } from "../../api/admin";

const { useNotification } = notification;

interface IValues {
  firstName: string;
  lastName: string;
  email: string;
}

const AddModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const [api, contextHolder] = useNotification();

  const { mutate ,isPending} = useMutation({
    mutationFn: addAdmins,
    onSuccess: () => {
      form.resetFields();
      hideModal();
      queryClient.invalidateQueries({
        queryKey: ["Admins"],
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

  const modify = (values: IValues) => {
    mutate(values);
  };

  return (
    <>
      {contextHolder}
      <Button type="primary" onClick={showModal}>
        Add Admin
      </Button>
      <Modal
        title={"Add Admin"}
        open={isOpen}
        okText={"Add"}
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
        <Form form={form} layout="vertical" name={"addAdmin"}>
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[
              {
                required: true,
                message: "Please input the first name of admin!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[
              {
                required: true,
                message: "Please input the last name of admin!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: "Please input the email of admin!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddModal;
