import { Button, Card, Col, Form, Row, Tabs } from "antd";
import React, { useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import SettingsForm from "./settings";
import { useSelector } from "react-redux";

const Settings = () => {
  const userById = useSelector((state) => state.userById);
  const [activeKey, setActiveKey] = useState("2");
  const [form] = Form.useForm();

  const items = [
    {
      key: "1",
      label: (
        <span style={{ display: "flex", alignItems: "center" }}>
          <IoSettingsOutline style={{ marginRight: 8 }} /> Profile
        </span>
      ),
      children: <div>hello</div>
    },
    {
      key: "2",
      label: (
        <span style={{ display: "flex", alignItems: "center" }}>
          <IoSettingsOutline style={{ marginRight: 8 }} /> Settings
        </span>
      ),
      children: <SettingsForm form={form} initialValues={userById["data"]} />
    }
  ];

  return (
    <div>
      {/* Banner Section */}
      <div
        style={{
          background: "linear-gradient(to right, #6a11cb 0%, #2575fc 100%)",
          color: "#fff",
          padding: "60px 20px",
          borderRadius: "10px",
          textAlign: "center",
          marginBottom: "40px",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)"
        }}
      >
        <h1 style={{ fontSize: "36px", fontWeight: "bold" }}>Settings</h1>
        <p style={{ fontSize: "18px", marginBottom: "30px" }}>
          Manage your account and personalize your settings.
        </p>
        <Button
          type="primary"
          size="large"
          style={{
            borderRadius: "30px",
            padding: "10px 30px",
            fontSize: "16px",
            backgroundColor: "#fff",
            color: "#2575fc",
            border: "none"
          }}
        >
          Update Settings
        </Button>
      </div>

      {/* Tabs Section */}
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card
            bordered={false}
            style={{
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
              borderRadius: "10px"
            }}
          >
            <Tabs
              defaultActiveKey="2"
              activeKey={activeKey}
              onChange={(key) => setActiveKey(key)}
              items={items}
              tabBarStyle={{
                fontSize: "16px",
                fontWeight: "500",
                color: "#4A4A4A"
              }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Settings;
