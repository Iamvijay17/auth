import { PlusOutlined, SmileOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, Input, Layout, List, Menu, Row } from "antd";
import React, { useState } from "react";
import EmptyPage from "../../../components/empty";

const { Header, Content, Sider } = Layout;

const ChatAdminPage = () => {
  const [activeChat, setActiveChat] = useState(null);
  const [message, setMessage] = useState("");
  const [typing, setTyping] = useState(false);
  const [chatList, setChatList] = useState([
    {
      id: 1,
      name: "John Doe",
      messages: [{ text: "Hello! How can I help you?", sender: "customer", read: true }]
    },
    {
      id: 2,
      name: "Jane Smith",
      messages: [{ text: "I need help with my order.", sender: "customer", read: false }]
    }
  ]);

  const handleSelectChat = (id) => {
    setActiveChat(id);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const updatedChats = chatList.map((chat) =>
        chat.id === activeChat
          ? { ...chat, messages: [...chat.messages, { text: message, sender: "admin", read: false }] }
          : chat
      );
      setChatList(updatedChats);
      setMessage("");
      setTyping(false);
    }
  };

  const handleTyping = () => {
    if (!typing) {
      setTyping(true);
    }
    setTimeout(() => {
      setTyping(false);
    }, 1500);
  };

  const handleMessageRead = (msgIndex) => {
    const updatedChats = chatList.map((chat) =>
      chat.id === activeChat
        ? {
          ...chat,
          messages: chat.messages.map((msg, index) =>
            index === msgIndex ? { ...msg, read: true } : msg
          )
        }
        : chat
    );
    setChatList(updatedChats);
  };
  console.log(handleMessageRead);
  return (
    <Layout style={{ minHeight: "100vh", overflow: "hidden" }}>
      <Sider width={300} style={{ background: "#f0f2f5" }}>
        <div style={{ padding: "16px", background: "#fff", textAlign: "center" }}>
          <h2>Customer Support</h2>
        </div>
        <Menu mode="inline" selectedKeys={[activeChat ? String(activeChat) : ""]} style={{ height: "100%", borderRight: 0 }}>
          {chatList.map((chat) => (
            <Menu.Item key={chat.id} onClick={() => handleSelectChat(chat.id)}>
              <Avatar icon={<UserOutlined />} style={{ marginRight: 10 }} />
              {chat.name}
            </Menu.Item>
          ))}
          <Menu.Item icon={<PlusOutlined />} style={{ marginTop: "auto" }}>
            Add New Chat
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout style={{ padding: "0 24px 24px", display: "flex", flexDirection: "column" }}>
        <Header
          style={{
            padding: 0,
            background: "#fff",
            borderBottom: "1px solid #f0f0f0",
            textAlign: "center"
          }}
        >
          <h3>{activeChat ? `Chat with ${chatList.find((chat) => chat.id === activeChat)?.name}` : ""}</h3>
        </Header>

        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            flex: 1,
            display: "flex",
            flexDirection: "column-reverse",
            justifyContent: "flex-start",
            overflowY: "auto",
            maxHeight: "calc(100vh - 140px)"
          }}
        >
          {activeChat ? (
            <List
              dataSource={chatList.find((chat) => chat.id === activeChat)?.messages}
              renderItem={(msg, index) => (
                <List.Item
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: msg.sender === "admin" ? "flex-end" : "flex-start",
                    marginBottom: "10px",
                    padding: "0"
                  }}
                >
                  <div
                    style={{
                      maxWidth: "70%",
                      padding: "12px",
                      background: msg.sender === "admin" ? "#0078fe" : "#e4e6eb",
                      color: msg.sender === "admin" ? "#fff" : "#000",
                      borderRadius: "20px",
                      position: "relative",
                      wordBreak: "break-word"
                    }}
                  >
                    {msg.text}
                    <div
                      style={{
                        fontSize: "12px",
                        marginTop: "5px",
                        textAlign: msg.sender === "admin" ? "right" : "left"
                      }}
                    >
                      {msg.sender === "admin" && msg.read ? (
                        <span style={{ color: "green" }}>✔️✔️</span>
                      ) : (
                        <span style={{ color: "gray" }}>✔️</span>
                      )}
                    </div>
                    {msg.sender === "customer" && !msg.read && (
                      <div
                        style={{
                          position: "absolute",
                          top: "-4px",
                          right: "-4px",
                          background: "rgba(0, 0, 0, 0.4)",
                          color: "white",
                          padding: "2px 4px",
                          borderRadius: "50%",
                          fontSize: "10px"
                        }}
                      >
                        📖
                      </div>
                    )}
                  </div>
                </List.Item>
              )}
            />
          ) : (
            <div style={{ textAlign: "center" }}>
              <EmptyPage status={"underconstruction"} />
            </div>
          )}
        </Content>

        {activeChat && (
          <Row gutter={8} style={{ marginTop: "auto", alignItems: "center" }}>
            <Col span={1}>
              <Button
                type="text"
                size="large"
                icon={<PlusOutlined />}
                style={{ width: "100%", borderRadius: "5px" }}
              />
            </Col>
            <Col span={20}>
              <Input
                placeholder="Type a message"
                value={message}
                size="large"
                onChange={(e) => setMessage(e.target.value)}
                onPressEnter={handleSendMessage}
                allowClear
                prefix={
                  <Button
                    type="text"
                    size="large"
                    icon={<SmileOutlined />}
                    style={{
                      width: "30px",
                      borderRadius: "5px",
                      padding: 0
                    }}
                  />
                }
                onFocus={handleTyping}
              />
              {typing && <div style={{ fontStyle: "italic", color: "gray" }}>Typing...</div>}
            </Col>
            <Col span={3}>
              <Button
                type="primary"
                size="large"
                onClick={handleSendMessage}
                style={{
                  width: "100%",
                  borderRadius: "5px"
                }}
              >
                Send
              </Button>
            </Col>
          </Row>
        )}
      </Layout>
    </Layout>
  );
};

export default ChatAdminPage;
