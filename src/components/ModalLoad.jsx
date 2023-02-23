import React, {useState} from "react";
import "../styles/modal.scss";
// import { BsFillPlusCircleFill } from "react-icons/bs";
import {MdOutlineCancel} from "react-icons/md";
import {UploadOutlined} from "@ant-design/icons";
import {Button, message, Upload} from "antd";
// import axios from "../api/axios";

const LoudFileExe = ({getResult}) => {
    const [modal, setModal] = useState(false); // for model

    const toggleModal = () => {
        setModal(!modal);
    };
    if (modal) {
        document.body.classList.add("active__modal");
    } else {
        document.body.classList.remove("active__modal");
    }
    //load file
    const [fileList, setFileList] = useState([]);
    const [uploading, setUploading] = useState(false);
    const handleUpload = () => {
        console.log(fileList);
        const formData = new FormData();
        fileList.forEach((file) => {
            formData.append("file", file);
        });
        setUploading(true);
        // You can use any AJAX library you like
        fetch("https://rewardof.pythonanywhere.com/number/upload/", {
            method: "POST",
            body: formData,
        })
            .then((res) => res.json())
            .then(() => {
                setFileList([]);
                message.success("upload successfully.");
                getResult();
            })
            .catch(() => {
                message.error("upload failed.");
            })
            .finally(() => {
                setUploading(false);
            });
    };
    const props = {
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: (file) => {
            setFileList([...fileList, file]);
            return false;
        },
        fileList,
    };
    return (
        <>
            <Button type="primary" onClick={toggleModal}>
                Fayldan yuklash
            </Button>

            {modal && (
                <div className="modal">
                    <div className="overlay">
                        <div className="model__content">
                            <div className="nav_model">
                                <h1 className="title">Upload file</h1>
                                <MdOutlineCancel className="btn__cacel" onClick={toggleModal}/>
                            </div>
                            <div className="card__load">
                                <Upload {...props}>
                                    <Button icon={<UploadOutlined/>}>Select File</Button>
                                </Upload>
                                <Button
                                    type="primary"
                                    onClick={handleUpload}
                                    disabled={fileList.length === 0}
                                    loading={uploading}
                                    style={{
                                        marginTop: 16,
                                    }}
                                >
                                    {uploading ? "Uploading" : "Start Upload"}
                                </Button>
                                <h2>Supported files</h2>
                                <h5>EXE</h5>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default LoudFileExe;
