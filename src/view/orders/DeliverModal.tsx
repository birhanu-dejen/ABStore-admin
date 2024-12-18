import { CarOutlined } from "@ant-design/icons";
import { Button, Form, Modal, Select, Tooltip, notification } from "antd";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getDrivers } from "../../api/driver";
import { assignDriver } from "../../api/order";

const { useNotification } = notification;

const DeliverModal = ({ id }: { id: string }) => {
  const [name, setName] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const [api, contextHolder] = useNotification();

  const filter = {
    page: "1",
    search: name || undefined,
  };

  const { error, isSuccess, data } = useQuery({
    queryKey: ["Drivers", { ...filter }],
    queryFn: () => getDrivers(filter),
    enabled: isOpen,
  });

  const { mutate,isPending } = useMutation({
    mutationFn: assignDriver,
    onSuccess: () => {
      form.resetFields();
      hideModal();
      queryClient.invalidateQueries({
        queryKey: ["Orders"],
      });
    },
    onError: (error) => {
      showNotification(error.message);
    },
  });

  function showModal() {
    setIsOpen(true);
  }
  function hideModal() {
    setIsOpen(false);
  }
  function onSearch(value: string) {
    setName(value);
  }

  useEffect(() => {
    if (error) {
      showNotification(error.message);
    }
  }, [error]);

  function showNotification(description: string) {
    api.error({
      message: "Error",
      description,
    });
  }

  const modify = ({ driver }: { driver: string }) => {
    mutate({ id, driverId: driver });
  };
  return (
    <>
      {contextHolder}
      <Tooltip title={"Deliver"}>
        <Button icon={<CarOutlined />} onClick={showModal} />
      </Tooltip>
      <Modal
        title="Deliver Order"
        open={isOpen}
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
        onCancel={hideModal}
        okText="Deliver"
        okButtonProps={{
          disabled: isPending,
          loading: isPending,
        }}
      >
        <Form form={form} layout="vertical" name={"addAdmin"}>
          <Form.Item
            name="driver"
            label="Driver"
            rules={[
              {
                required: true,
                message: "Please select driver",
              },
            ]}
          >
            <Select
              showSearch
              placeholder="Select a driver"
              onSearch={onSearch}
              options={isSuccess ? transformData(data.data.drivers) : []}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default DeliverModal;

function transformData(data: { key: string; fullName: string }[]) {
  return data.map((e: { key: string; fullName: string }) => ({
    value: e.key,
    label: e.fullName,
  }));
}
