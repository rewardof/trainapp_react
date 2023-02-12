import { Input, Switch, Form, Button, Select, Divider } from "antd";
const { Option } = Select;

const ResultForm = ({ getData, locomotivs, relChar, relSwitch }) => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    getData(values);
  };
  return (
    <Form form={form} initialValues={{}} onFinish={onFinish} autoComplete="off">
      <Form.Item
        name="id"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select placeholder="Lokomotiv turi">
          {locomotivs?.map((data) => {
            return (
              <Option value={data.id}>
                {data.locomotiv_seria + " " + data.locomotiv_number}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item name="declivity">
        <Input placeholder="Nishablik" name="declivity" />
      </Form.Item>
      <Form.Item name="radius">
        <Input placeholder="Egrilik radiusi" name="radius" />
      </Form.Item>

      <Form.Item name="length_curvature">
        <Input placeholder="Egrilik uzunligi" name="length_curvature" />
      </Form.Item>
      <Form.Item name="railway_switch_mark">
        <Select placeholder="Strelkali o'tkazgich turi">
          {relSwitch?.map((data, key) => {
            return (
              <Option key={key} value={data.id}>
                {data.mark}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item name="outside_temperature">
        <Input placeholder="Tashqi harorat" name="outside_temperature" />
      </Form.Item>
      <Form.Item name="wind_capacity">
        <Input placeholder="Shamol tezligi" name="wind_capacity" />
      </Form.Item>
      <Form.Item name="railway_characteristic">
        <Select placeholder="Yo'l xarakteristikasi">
          {relChar?.map((data, key) => {
            return (
              <Option key={key} value={data.id}>
                {data.title}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item name="is_ahead">
        <Switch
          checkedChildren="oldinda"
          unCheckedChildren="orqada"
          defaultChecked
        />
      </Form.Item>
      <Divider />
      <Form.Item name="is_magistral">
        <Switch
          checkedChildren="Magistral"
          unCheckedChildren="Sanoat"
          defaultChecked
        />
      </Form.Item>
      <Form.Item name="brake_capacity">
        <Input
          type={"number"}
          placeholder="Boshlang'ich tezligi"
          name="brake_capacity"
        />
      </Form.Item>
      <Form.Item>
        <Button style={{ width: "100%" }} type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ResultForm;
