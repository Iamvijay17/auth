import { EditOutlined, EnvironmentOutlined, MailOutlined, PhoneOutlined, UploadOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Col, Form, Input, Layout, message, Row, Select, Space, Switch, Typography, Upload } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const { Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [avatar, setAvatar] = useState(null);

  const [form] = Form.useForm();

  const userById = useSelector((state) => state.userById); // You can replace this with the user data from the Redux store or API response


  const handleFinish = (values) => {
    console.log("Updated Values: ", values);
    setIsEditing(false);
    message.success("Profile updated successfully!");
  };

  const handleAvatarChange = (info) => {
    if (info.file.status === "done") {
      // Successfully uploaded file
      message.success(`${info.file.name} uploaded successfully`);
      setAvatar(URL.createObjectURL(info.file.originFileObj)); // Update the avatar
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} upload failed`);
    }
  };

  return (
    <Layout style={{ minHeight: "90vh" }}>
      {/* Content */}
      <Content
        style={{
          padding: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#f0f2f5"
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            width: "100%",
            padding: "10px",
            background: "#fff",
            borderRadius: "8px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
          }}
        >
          {/* Profile Header */}
          <Card
            style={{
              marginBottom: "20px",
              textAlign: "center",
              background: "#ffffff",
              border: "none"
            }}
            cover={
              <div
                style={{
                  padding: "20px",
                  background: "linear-gradient(135deg, #1890ff, #87e8de)",
                  borderRadius: "8px 8px 0 0"
                }}
              >
                <Upload
                  showUploadList={false}
                  beforeUpload={() => false} // Prevent upload to the server
                  onChange={handleAvatarChange} // Handle avatar upload change
                >
                  <Avatar
                    size={120}
                    icon={<UserOutlined />}
                    src={avatar || userById["data"]?.avatar} // Show updated avatar or default
                    style={{ border: "4px solid white", position: "relative" }}
                  />
                  {isEditing && (
                    <Button
                      icon={<UploadOutlined />}
                      style={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        background: "#1890ff",
                        color: "#fff",
                        borderRadius: "50%",
                        border: "none",
                        padding: "5px"
                      }}
                      shape="circle"
                    />
                  )}
                </Upload>
              </div>
            }
            actions={[
              <Button
                key="edit"
                type="primary"
                icon={<EditOutlined />}
                onClick={() => setIsEditing(!isEditing)}
                style={{
                  background: isEditing ? "#ff4d4f" : "#1890ff",
                  borderColor: isEditing ? "#ff4d4f" : "#1890ff"
                }}
              >
                {isEditing ? "Cancel" : "Edit Profile"}
              </Button>
            ]}
          >
            <Title level={3} style={{ margin: "0" }}>
              {userById["data"]?.name}
            </Title>
            <Text type="secondary">
              {userById["data"]?.role.toUpperCase()} •{" "}
              {userById["data"]?.isVerified ? "Verified" : "Not Verified"}
            </Text>
            <div style={{ marginTop: "10px" }}>
              <Text>
                <MailOutlined /> {userById["data"]?.email}
              </Text>
              <br />
              <Text>
                <PhoneOutlined /> {userById["data"]?.phone}
              </Text>
              <br />
              <Text>
                <EnvironmentOutlined /> {userById["data"]?.address}
              </Text>
            </div>
          </Card>

          {/* Profile Edit Form */}
          {isEditing && (
            <Card
              style={{
                background: "#ffffff",
                border: "none"
              }}
            >
              <Form
                form={form}
                layout="vertical"
                initialValues={userById["data"]}
                onFinish={handleFinish}
              >
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={12} md={8}>
                    <Form.Item
                      name="name"
                      label={<Text strong>Full Name</Text>}
                      rules={[{ required: true, message: "Please enter your name" }]}
                    >
                      <Input placeholder="Enter your name" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12} md={8}>
                    <Form.Item
                      name="email"
                      label={<Text strong>Email</Text>}
                      rules={[
                        { required: true, message: "Please enter your email" },
                        { type: "email", message: "Enter a valid email" }
                      ]}
                    >
                      <Input placeholder="Enter your email" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12} md={8}>
                    <Form.Item
                      name="phone"
                      label={<Text strong>Phone Number</Text>}
                      rules={[{ required: true, message: "Please enter your phone" }]}
                    >
                      <Input placeholder="Enter your phone number" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12} md={8}>
                    <Form.Item
                      name="address"
                      label={<Text strong>Address</Text>}
                      rules={[{ required: true, message: "Please enter your address" }]}
                    >
                      <Input placeholder="Enter your address" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12} md={8}>
                    <Form.Item
                      name="role"
                      label={<Text strong>Role</Text>}
                      rules={[{ required: true, message: "Please select a role" }]}
                    >
                      <Select placeholder="Select role">
                        <Option value="user">User</Option>
                        <Option value="admin">Admin</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12} md={8}>
                    <Form.Item
                      name="notificationsEnabled"
                      label={<Text strong>Notifications</Text>}
                      valuePropName="checked"
                    >
                      <Switch />
                    </Form.Item>
                  </Col>
                </Row>
                <Space
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "20px"
                  }}
                >
                  <Button type="primary" htmlType="submit">
                    Save Changes
                  </Button>
                  <Button onClick={() => setIsEditing(false)}>Cancel</Button>
                </Space>
              </Form>
            </Card>
          )}
        </div>
      </Content>
    </Layout>
  );
};

export default ProfilePage;
