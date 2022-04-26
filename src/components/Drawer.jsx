import React from "react";
import { Drawer } from "antd";

const CustomDrawer = ({ children, visible, onClose, title }) => {
  return (
    <Drawer
      title={title}
      placement="right"
      onClose={onClose}
      visible={visible}
      width={500}
    >
      {children}
    </Drawer>
  );
};

export default CustomDrawer;
