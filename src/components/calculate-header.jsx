import { Col, message, Row, Tag } from "antd";
import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import {
  RightOutlined,
  DeleteOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import axios from "../api/axios";
const Header = ({ getResult, togglePage }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [deleteData, setDelete] = useState(false);
  const [download, setDownload] = useState(false);

  const onFinish = (values) => {
    setLoading(true);
    let formData = new FormData();
    formData.append("number", values.number);
    formData.append("load_weight", values.load_weight);
    axios
      .post("/number/", formData)
      .then(() => {
        getResult();
        form.resetFields();
        setLoading(false);
      })
      .catch((error) => {
        message.error(error.response.data.error_message[0]);
        setLoading(false);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const handleDownload = () => {
    setDownload(true);
    axios({
      url: "/export-vagons-data/",
      method: "GET",
      responseType: "blob", // important
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "vagon.xls"); //or any other extension
      document.body.appendChild(link);
      link.click();
      setDownload(false);
    });
  };
  const handleDelete = () => {
    setDelete(true);
    axios
      .delete("/delete-vagons-data/")
      .then((res) => {
        setDelete(false);
        getResult();
      })
      .catch((error) => {
        setDelete(false);
        console.log(error);
      });
  };
  return (
    <>
      <Row gutter={24}>
        <Col span={12}>
          <Tag color="blue" style={{ marginBottom: "20px", fontSize: "14px" }}>
            Manyovr tarkibining to‘xtash yo‘li uzunligini hisoblash uchun dastur
          </Tag>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Form
            layout="inline"
            form={form}
            initialValues={{}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              name="number"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input placeholder="Vagon raqami" />
            </Form.Item>
            <Form.Item
              name="load_weight"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input placeholder="Yuk og'irligi" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col span={12} style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            type="danger"
            style={{ marginRight: "5px" }}
            icon={<DeleteOutlined />}
            onClick={handleDelete}
            loading={deleteData}
          >
            Tozalash
          </Button>
          <Button
            type="primary"
            style={{ marginRight: "5px" }}
            icon={<DownloadOutlined />}
            onClick={handleDownload}
            loading={download}
          >
            Yuklab Olish
          </Button>
          <Button type="primary" onClick={() => togglePage(true)}>
            Natijani olish <RightOutlined />
          </Button>
        </Col>
      </Row>
    </>
  );
};
export default Header;
