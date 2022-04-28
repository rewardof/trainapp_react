import React, { useState } from "react";
import { Form, Input, Button, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "../api/axios";

const Demo = ({ setFindDistance, setVisible }) => {
  const [loading, setLoading] = useState(false);
  const [max_capacity, setMaxCap] = useState(0);
  const [coefficient1, setCoefficient1] = useState(0);
  const [coefficient2, setCoefficient2] = useState(0);
  const [distance, setDistance] = useState(0);
  const [declivity, setDeclivity] = useState(0);
  const [radius, setRadius] = useState(0);

  const [form] = Form.useForm();
  const onFinish = (values) => {
    setLoading(true);
    axios
      .post("/finding_distance/", values)
      .then((response) => {
        setFindDistance(response.data);
        form.resetFields();
        setLoading(false);
        setVisible(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <Form
      form={form}
      name="dynamic_form_nest_item"
      onFinish={onFinish}
      autoComplete="off"
    >
      <Space style={{ display: "flex", marginBottom: 8 }} align="baseline">
        <Form.Item
          name="max_capacity"
          rules={[{ required: true, message: "Maksimal quvvatni kiriting" }]}
          validateStatus={max_capacity > 6 ? "error" : ""}
          help={max_capacity > 6 ? "6 xonali sondan oshmasligi kerak" : ""}
        >
          <Input
            placeholder="Maksimal Quvvat"
            onChange={(e) => setMaxCap(e.target.value.length)}
          />
        </Form.Item>
        <Form.Item
          name="coefficient1"
          rules={[{ required: true, message: "Kayfitsent 1 ni kiriting" }]}
          validateStatus={coefficient1 > 3 ? "error" : ""}
          help={coefficient1 > 3 ? "3 xonali sondan oshmasligi kerak" : ""}
        >
          <Input
            placeholder="Kayfitsent 1"
            onChange={(e) => setCoefficient1(e.target.value.length)}
          />
        </Form.Item>
        <Form.Item
          name="coefficient2"
          rules={[{ required: true, message: "Kayfitsent 2 ni kiriting" }]}
          validateStatus={coefficient2 > 3 ? "error" : ""}
          help={coefficient2 > 3 ? "3 xonali sondan oshmasligi kerak" : ""}
        >
          <Input
            placeholder="Kayfitsent 2"
            onChange={(e) => setCoefficient2(e.target.value.length)}
          />
        </Form.Item>
      </Space>
      <Form.List name="values">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space
                key={key}
                style={{ display: "flex", marginBottom: 8 }}
                align="baseline"
              >
                <Form.Item
                  {...restField}
                  name={[name, "distance"]}
                  rules={[{ required: true }]}
                  validateStatus={distance > 6 ? "error" : ""}
                  help={distance > 6 ? "6 xonali sondan oshmasligi kerak" : ""}
                >
                  <Input
                    placeholder="Masofa"
                    onChange={(e) => setDistance(e.target.value.length)}
                  />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "declivity"]}
                  rules={[{ required: true }]}
                  validateStatus={declivity > 3 ? "error" : ""}
                  help={declivity > 3 ? "3 xonali sondan oshmasligi kerak" : ""}
                >
                  <Input
                    placeholder="declivity"
                    onChange={(e) => setDeclivity(e.target.value.length)}
                  />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "radius"]}
                  rules={[{ required: true }]}
                  validateStatus={radius > 6 ? "error" : ""}
                  help={radius > 6 ? "6 xonali sondan oshmasligi kerak" : ""}
                >
                  <Input
                    placeholder="Raduis"
                    onChange={(e) => setRadius(e.target.value.length)}
                  />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add field
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button loading={loading} type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Demo;
