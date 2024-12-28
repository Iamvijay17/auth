import { EditOutlined, EnvironmentOutlined, MailOutlined, PhoneOutlined, UploadOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Col, Form, Input, Layout, message, Row, Select, Space, Switch, Typography, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ProfileServiceAPI } from "./profile.service";

const { Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);

  const [form] = Form.useForm();
  const userById = useSelector((state) => state.userById);

  useEffect(() => {
    // Fetch the avatar when the component loads
    if (userById?.data?.avatar) {
      fetchAvatar(userById.data.avatar);
    }
  }, [userById]);

  // Function to handle form submission
  const handleFinish = (values) => {
    console.log("Updated Values: ", values);
    setIsEditing(false);
    message.success("Profile updated successfully!");
  };

  const fetchAvatar = async(filename) => {
    try {
      const response = await ProfileServiceAPI.getAvatar({
        responseType: "blob"
      });

      // Convert Blob to an Object URL and set it as the avatar URL
      const avatarObjectUrl = URL.createObjectURL(response.data);
      setAvatarUrl(avatarObjectUrl);
    } catch (err) {
      console.error("Error fetching avatar:", err);
      setAvatarUrl(""); // Set to empty string in case of an error
    }
  };

  const handleAvatarChange = async(info) => {
    const { file } = info;
    if (file.status === "uploading") {
      message.loading("Uploading avatar...");
      return;
    }

    if (file.status === "done") {
      try {
        // Prepare form data
        const formData = new FormData();
        formData.append("avatar", file.originFileObj);

        // Send file to the server
        const response = await ProfileServiceAPI.updateAvatar(formData);

        // Assuming response contains the new avatar URL
        setAvatarUrl(response.data.avatarUrl);

        // Show success message
        message.success("Avatar uploaded successfully!");
      } catch (err) {
        console.error("Error uploading avatar:", err);
        message.error("Failed to upload avatar.");
      }
    } else if (file.status === "error") {
      message.error("Avatar upload failed.");
    }
  };


  const props = {
    name: "files",
    action: "https://localhost:5000/api/v1/upload/upload-avatar",
    data:{service:"organization", module:"user"},
    headers: {
      // Authorization: `Bearer ${getCookie("accessToken")}`
    },
    onChange(info) {
      console.log(info);

      handleAvatarChange(info);
      if (info.file.status !== "uploading") {
      
      }
      if (info.file.status === "done") {
      } else if (info.file.status === "error") {
      }
    }
  };

  return (
    <Layout style={{ minHeight: "90vh" }}>
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
                <Upload {...props}
                  showUploadList={false}
                  beforeUpload={() => false}
                  // onChange={handleAvatarChange}
                >
                  <Avatar
                    size={120}
                    icon={<UserOutlined />}
                    src={avatarUrl || userById?.data?.avatar} // Show updated avatar or default
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
              {userById?.data?.name}
            </Title>
            <Text type="secondary">
              {userById?.data?.role.toUpperCase()} •{" "}
              {userById?.data?.isVerified ? "Verified" : "Not Verified"}
            </Text>
            <div style={{ marginTop: "10px" }}>
              <Text>
                <MailOutlined /> {userById?.data?.email}
              </Text>
              <br />
              <Text>
                <PhoneOutlined /> {userById?.data?.phone}
              </Text>
              <br />
              <Text>
                <EnvironmentOutlined /> {userById?.data?.address}
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
                initialValues={userById?.data}
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
