import { Button, Tag } from "antd";
import React, { useState } from "react";
import {
  LeftOutlined,
  DownloadOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import CustomDrawer from "./Drawer";
import ResultForm from "./ResultForm";
import DistanceForm from "./DistanceForm";
import axios from "../api/axios";

const Header = ({
  togglePage,
  locomotivs,
  getData,
  relChar,
  relSwitch,
  visible,
  setVisible,
  distance,
  breakingTime,
}) => {
  const showDrawer = (type) => {
    setVisible(true);
    setChildType(type);
  };

  const onClose = () => {
    setVisible(false);
  };
  const [download, setDownload] = useState(false);
  const [childType, setChildType] = useState(null);
  const [findDistance, setFindDistance] = useState(null);

  const handleDownload = () => {
    setDownload(true);
    axios({
      url: "/export-resistance-data/",
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
      <CustomDrawer
        title={childType === "result" ? "Natijani olish" : "Masofani aniqlash"}
        onClose={onClose}
        visible={visible}
      >
        {childType === "result" && (
          <ResultForm
            getData={getData}
            locomotivs={locomotivs}
            relChar={relChar}
            relSwitch={relSwitch}
          />
        )}
        {childType === "distance" && (
          <DistanceForm
            setFindDistance={setFindDistance}
            setVisible={setVisible}
          />
        )}
      </CustomDrawer>
      <div className="header-box">
        <div style={{ display: "flex", gap: "10px" }}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => showDrawer("result")}
          >
            Qo'shish
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => showDrawer("distance")}
          >
            Masofani aniqlash
          </Button>
        </div>
        <div className="btn-box">
          {distance > 0 && (
            <div className="tag">
              <div className="distance">Tormozlanish masofasi : {distance}</div>
              <div className="time">Vaqti : {breakingTime}</div>
            </div>
          )}
          {findDistance?.distance > 0 && (
            <div className="tag">
              <div className="distance">
                Yurgan yo'li : {findDistance?.distance}
              </div>
              <div className="time">
                Vaqti : {findDistance?.time.toString().slice(0, 5)}
              </div>
            </div>
          )}
          {findDistance?.distance > 0 && distance > 0 && (
            <div className="tag">
              <div className="distance">
                Umumiy masofa : {findDistance?.distance + distance}
              </div>
              <div className="time">
                Umumiy vaqt :
                {(findDistance?.time + breakingTime).toString().slice(0, 5)}
              </div>
            </div>
          )}
          <Button
            type="primary"
            icon={<DownloadOutlined />}
            onClick={handleDownload}
            loading={download}
          >
            Yuklab Olish
          </Button>
          <Button
            type="primary"
            icon={<LeftOutlined />}
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
