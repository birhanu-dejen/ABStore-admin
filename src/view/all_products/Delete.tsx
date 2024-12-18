import { useState } from "react";

import { DeleteOutlined } from "@ant-design/icons";
import { Button, Modal, Typography, notification } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteProduct } from "../../api/product";

const { Text } = Typography;
const { useNotification } = notification;

const Delete = ({ id }: { id: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  const queryClient = useQueryClient();
  const [api, contextHolder] = useNotification();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: (data) => {
      showNotification("success", data.message);
      hideModal();
      queryClient.invalidateQueries({
        queryKey: ["Products"],
      });
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

  function handleDelete() {
    mutate({ id });
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
      <Button danger onClick={showModal} icon={<DeleteOutlined />} />
      <Modal
        title="Delete Product"
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
        <Text>Are you sure you want to delete this product ?</Text>
      </Modal>
    </>
  );
};

export default Delete;
