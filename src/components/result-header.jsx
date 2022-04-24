import {Col, Drawer, Input, Row, Switch, Form, Button, Select, Radio, Divider, Tag,} from "antd";
import React, {useState} from "react";
import {LeftOutlined, DownloadOutlined, PlusOutlined} from "@ant-design/icons";
import axios from "axios";

const {Option} = Select;
const Header = ({togglePage, locomotivs, getData, relChar, relSwitch, visible, setVisible,distance}) => {
    const [form] = Form.useForm();
    const onFinish = (values) => {
        getData(values);

    };


    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };
    const [download, setDownload] = useState(false);
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    const handleDownload = () => {
        setDownload(true);
        axios({
            url: "https://trainresapp.herokuapp.com/export-resistance-data/",
            method: "GET",
            responseType: "blob", // important
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "natijalar.xls"); //or any other extension
            document.body.appendChild(link);
            link.click();
            setDownload(false);
        });
    };
    return (
        <div>
            <Drawer title="Natijani Olish" placement="right" onClose={onClose} visible={visible} width={500}>
                <Form
                    form={form}
                    initialValues={{}}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
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
                        <Input placeholder="Nishablik" name="declivity"/>
                    </Form.Item>
                    <Form.Item name="radius">
                        <Input placeholder="Egrilik radiusi" name="radius"/>
                    </Form.Item>

                    <Form.Item name="length_curvature">
                        <Input placeholder="Egrilik uzunligi" name="length_curvature"
                        />
                    </Form.Item>
                    <Form.Item name="railway_switch_mark">
                        <Select placeholder="Yo'l xarakteristikasi">
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
                        <Input placeholder="Tashqi harorat" name="outside_temperature"
                        />
                    </Form.Item>
                    <Form.Item name="wind_capacity">
                        <Input placeholder="Shamol tezligi" name="wind_capacity"
                        />
                    </Form.Item>
                    <Form.Item name="railway_characteristic">
                        <Select placeholder="Strelkali o'tkazgich turi">
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
                        <Switch checkedChildren="oldinda" unCheckedChildren="orqada" defaultChecked/>
                    </Form.Item>
                    <Divider/>
                    <Form.Item name="is_magistral">
                        <Switch checkedChildren="Magistral" unCheckedChildren="Sanoat" defaultChecked/>
                    </Form.Item>
                    <Form.Item name="brake_capacity">
                        <Input type={'number'} placeholder="Boshlang'ich tezligi" name="brake_capacity"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            style={{width: "100%"}}
                            type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>
            <div className="header-box">
                <div><Button
                    type="primary"
                    icon={<PlusOutlined/>}
                    onClick={showDrawer}
                >
                    Qo'shish
                </Button>
                </div>
                <div className="btn-box">
                    {distance > 0 && <Tag color="green">Tormozlanish masofasi : {distance}</Tag>}
                    <Button
                        type="primary"
                        icon={<DownloadOutlined/>}
                        onClick={handleDownload}
                        loading={download}
                    >
                        Yuklab Olish
                    </Button>
                    <Button
                        type="primary"
                        icon={<LeftOutlined/>}
                        onClick={() => togglePage(false)}
                    >
                        Qaytish
                    </Button>
                </div>
            </div>
        </div>

    );
};
export default Header;
