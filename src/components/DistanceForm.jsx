import { Form, Input, Button, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const Demo = () => {
  const onFinish = (values) => {
    console.log("Received values of form:", values);
  };

  return (
    <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
      <Space style={{ display: "flex", marginBottom: 8 }} align="baseline">
        <Form.Item
          name="max_capacity"
          rules={[{ required: true, message: "Maksimal quvvatni kiriting" }]}
        >
          <Input placeholder="Maksimal Quvvat" />
        </Form.Item>
        <Form.Item
          name="coefficient1"
          rules={[{ required: true, message: "Kayfitsent 1 ni kiriting" }]}
        >
          <Input placeholder="Kayfitsent 1" />
        </Form.Item>
        <Form.Item
          name="coefficient2"
          rules={[{ required: true, message: "Kayfitsent 2 ni kiriting" }]}
        >
          <Input placeholder="Kayfitsent 2" />
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
                >
                  <Input placeholder="Masofa" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "declivity"]}
                  rules={[{ required: true }]}
                >
                  <Input placeholder="declivity" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "radius"]}
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Raduis" />
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
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Demo;
