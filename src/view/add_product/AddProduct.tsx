import { useState } from "react";

import {
  Button,
  Col,
  ColorPicker,
  Flex,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Typography,
  Upload,
  theme,
  notification,
} from "antd";
import ImgCrop from "antd-img-crop";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { addProduct } from "../../api/product";
import { catagories } from "../../constants/constant";

const { useToken } = theme;
const { useNotification } = notification;
const { Title } = Typography;

interface FieldType {
  productName: string;
  description: string;
  category: string;
  types: { quantity: number; color: any }[];
  price: number;
  image: any[];
}

const AddProduct = () => {
  const { token } = useToken();
  const [fileList, setFileList] = useState<any[]>([]);
  const [form] = Form.useForm();
  const [api, contextHolder] = useNotification();

  const { mutate, isPending } = useMutation({
    mutationFn: addProduct,
    onSuccess: (data) => {
      form.resetFields();
      setFileList([])
      showNotification("success", data.message);
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

  const onFinish = (values: FieldType) => {
    const formData = new FormData();
    formData.append("name", values.productName);
    formData.append("description", values.description);
    formData.append("category", values.category);
    formData.append("price", values.price.toString());

    values.types.forEach((type, index) => {
      formData.append(`types[${index}][color]`, `#${type.color.toHex()}`);
      formData.append(`types[${index}][quantity]`, type.quantity.toString());
    });

    fileList.forEach((image) => {
      formData.append("files", image);
    });

    mutate(formData);
  };

  return (
    <>
      {contextHolder}
      <Title level={4}>Add Product</Title>
      <br />
      <Form
        form={form}
        name="editProduct"
        onFinish={onFinish}
        layout="vertical"
      >
        <Flex gap={30}>
          <div style={{ width: "60%" }}>
            <Flex gap={20}>
              <Form.Item<FieldType>
                label="Product Name"
                name="productName"
                rules={[
                  { required: true, message: "Please input product name" },
                ]}
                style={{ flex: 1 }}
              >
                <Input size="large" placeholder="Please input product name" />
              </Form.Item>
              <Form.Item<FieldType>
                label="Price"
                name="price"
                rules={[
                  { required: true, message: "Please input product price" },
                ]}
                style={{ flex: 1 }}
              >
                <InputNumber
                  min={1}
                  size="large"
                  style={{ width: "100%" }}
                  placeholder="Please input product price"
                />
              </Form.Item>
            </Flex>
            <Form.Item<FieldType>
              label="Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Please input product description!",
                },
              ]}
            >
              <Input.TextArea
                size="large"
                placeholder="Please input product description"
                autoSize={{ minRows: 4, maxRows: 4 }}
              />
            </Form.Item>
            <Form.Item<FieldType>
              label="Category"
              name="category"
              rules={[
                { required: true, message: "Please input product category!" },
              ]}
            >
              <Select
                size="large"
                placeholder="Please select category"
                options={catagories}
              />
            </Form.Item>
            <Form.List
              name="types"
              rules={[
                {
                  validator: async (_, names) => {
                    if (!names || names.length < 1) {
                      return Promise.reject(
                        new Error("At least one type is required")
                      );
                    }
                  },
                },
              ]}
            >
              {(fields, { add, remove }, { errors }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Flex key={key} gap={20}>
                      <Form.Item
                        {...restField}
                        name={[name, "color"]}
                        rules={[{ required: true, message: "Missing color" }]}
                        style={{ flex: 1 }}
                      >
                        <ColorPicker
                          // format="hex"
                          size="large"
                          showText
                          style={{ width: "100%" }}
                        />
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        name={[name, "quantity"]}
                        rules={[
                          { required: true, message: "Missing quantity" },
                        ]}
                        style={{ flex: 1 }}
                      >
                        <InputNumber
                          min={1}
                          placeholder="Please input quantity"
                          size="large"
                          style={{ width: "100%" }}
                          inputMode="numeric"
                        />
                      </Form.Item>
                      <Button
                        icon={<MinusCircleOutlined />}
                        onClick={() => remove(name)}
                        size="large"
                      />
                    </Flex>
                  ))}

                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                      size="large"
                    >
                      Add Type
                    </Button>
                    <Form.ErrorList errors={errors} />
                  </Form.Item>
                </>
              )}
            </Form.List>
          </div>
          <div style={{ width: "40%" }}>
            <Form.Item
              label="Image"
              name="image"
              rules={[
                { required: true, message: "Please input product image!" },
              ]}
            >
              <Row gutter={[16, 16]}>
                {fileList.map((e, i) => {
                  return (
                    <Col
                      key={i}
                      xs={{ span: 24 }}
                      sm={{ span: 24 }}
                      md={{ span: 24 }}
                      lg={{ span: 12 }}
                      xl={{ span: 12 }}
                      xxl={{ span: 8 }}
                    >
                      <div
                        style={{
                          backgroundColor: token.colorBgContainer,
                          border: "1px solid #fff",
                          borderColor: token.colorBorder,
                          aspectRatio: 1,
                          borderRadius: 10,
                          padding: 10,
                        }}
                      >
                        <img
                          src={URL.createObjectURL(e)}
                          style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: 10,
                          }}
                        />
                      </div>
                    </Col>
                  );
                })}
                {fileList.length < 4 && (
                  <Col
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    md={{ span: 24 }}
                    lg={{ span: 12 }}
                    xl={{ span: 12 }}
                    xxl={{ span: 8 }}
                  >
                    <div
                      style={{
                        position: "relative",
                        aspectRatio: 1,
                      }}
                    >
                      <ImgCrop rotationSlider>
                        <Upload
                          maxCount={4}
                          showUploadList={false}
                          customRequest={(info) =>
                            setFileList((prev) => [...prev, info.file])
                          }
                        >
                          <Flex
                            vertical
                            gap={10}
                            align="center"
                            justify="center"
                            style={{
                              backgroundColor: token.colorBgContainer,
                              border: "1px dashed #ffffff",
                              borderColor: token.colorBorder,
                              borderRadius: 10,
                              cursor: "pointer",
                              position: "absolute",
                              top: 0,
                              bottom: 0,
                              left: 0,
                              right: 0,
                            }}
                          >
                            <PlusOutlined />
                            Upload
                          </Flex>
                        </Upload>
                      </ImgCrop>
                    </div>
                  </Col>
                )}
              </Row>
            </Form.Item>
          </div>
        </Flex>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            disabled={isPending}
            loading={isPending}
          >
            Add Product
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddProduct;
