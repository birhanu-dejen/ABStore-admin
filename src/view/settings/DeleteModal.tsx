import { useState } from "react";

import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { Button, Modal, Typography, notification } from "antd";

import { deleteAdmin } from "../../api/admin";
import useAdminStore from "../../store/Admin";

const { Text } = Typography;
const { useNotification } = notification;

const DeleteModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const [api, contextHolder] = useNotification();
  const sign = useAdminStore((state) => state.sign);
  const admin = useAdminStore((state) => state.admin);

  const { mutate,isPending } = useMutation({
    mutationFn: deleteAdmin,
    onSuccess: () => {
      hideModal();
      sign(null);
      Cookies.remove("token");
      navigate("/auth/signin", { replace: true });
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

  function handleDelete() {
    mutate({ id: admin ? admin.id : "" });
  }

  function showModal() {
    setIsOpen(true);
  }
  function hideModal() {
    setIsOpen(false);
  }

  return (
    <>
      {contextHolder}
      <Button danger icon={<DeleteOutlined />} onClick={showModal}>
        Deactivate
      </Button>
      <Modal
        title="Delete Admin"
        open={isOpen}
        onOk={handleDelete}
        onCancel={hideModal}
        okText="Delete"
        okButtonProps={{
          danger: true,
          disabled: isPending,
          loading: isPending,
        }}
      >
        <Text>This action can't be undone </Text>
        <br />
        <Text>Are you sure you want to delete this admin ?</Text>
      </Modal>
    </>
  );
};

export default DeleteModal;
