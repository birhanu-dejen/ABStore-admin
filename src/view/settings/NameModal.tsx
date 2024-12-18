import { useState } from "react";
import { Button, Modal, Input, Form, notification } from "antd";
import { useMutation } from "@tanstack/react-query";
import { updateAdmin } from "../../api/admin";
import useAdminStore from "../../store/Admin";

const { useNotification } = notification;

const NameButton = () => {
  const [open, setOpen] = useState(false);

  const [api, contextHolder] = useNotification();
  const sign = useAdminStore((state) => state.sign);
  const admin = useAdminStore((state) => state.admin);

  const { mutate, isPending } = useMutation({
    mutationFn: updateAdmin,
    onSuccess: ({ message, data }) => {
      showNotification("success", message);
      sign({
        id: data.id,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        role: data.role,
      });
      setOpen(false);
    },
    onError: (error) => {
      showNotification("error", error.message);
    },
  });

  function showNotification(message: "success" | "error", description: string) {
    api[message]({
      message: message.toUpperCase(),
      description,
    });
  }

  const onCreate = (values: Values) => {
    mutate({ id: admin ? admin.id : "", ...values });
  };

  return (
    <div>
      {contextHolder}
      <Button
        style={{ width: 140 }}
        onClick={() => {
          setOpen(true);
        }}
      >
        Change Name
      </Button>
      <NameForm
        open={open}
        isPending={isPending}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </div>
  );
};

export default NameButton;
interface Values {
  firstName: string;
  lastName: string;
}

interface INameFormProps {
  open: boolean;
  isPending: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
}

const NameForm: React.FC<INameFormProps> = ({
  open,
  isPending,
  onCreate,
  onCancel,
}) => {
  const [form] = Form.useForm();

  return (
    <Modal
      open={open}
      title="Change Name"
      okText="Change"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
      okButtonProps={{ disabled: isPending, loading: isPending }}
    >
      <Form form={form} layout="vertical" name="name">
        <Form.Item
          name="firstName"
          label="First Name"
          rules={[
            {
              required: true,
              message: "Please input the first name!",
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
              message: "Please input the last name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
