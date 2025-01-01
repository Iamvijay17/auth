import {
  PaperClipOutlined,
  PlusOutlined,
  SendOutlined,
  SmileOutlined,
  UserOutlined
} from "@ant-design/icons";
import {
  Avatar,
  Badge,
  Button,
  Divider,
  Input,
  Layout,
  List,
  Menu,
  Modal,
  Upload
} from "antd";
import { Picker } from "emoji-mart";
import moment from "moment";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { fetchAllUsers } from "../../../store/userSlice";
import { generateId } from "../../../utils";
import { getCookie } from "../../../utils/cookies";
import UnreadIcon from "../../../assets/icons/unreadIcon";

const accessToken = getCookie("accessToken");
const { Header, Content, Sider } = Layout;

const ChatAdminPage = () => {
  const [socket, setSocket] = useState(null);
  const [recentChats, setRecentChats] = useState([]);
  const [typingStatus, setTypingStatus] = useState({});
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [activeChat, setActiveChat] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [users, setUsers] = useState([]);
  const [showUserList, setShowUserList] = useState(false);
  const [emojiPickerPosition, setEmojiPickerPosition] = useState({ top: 0, left: 0 });

  const dispatch = useDispatch();
  const { filteredData } = useSelector((state) => state.users);

  const currentUserId = getCookie("userId");
  const scrollRef = useRef(null);

  // Socket initialization
  useEffect(() => {
    const socketInstance = io("http://localhost:5000/api/v1/notifications", {
      transports: ["websocket"],
      auth: { token: accessToken }
    });

    setSocket(socketInstance);

    socketInstance.on("connect", () => console.log("Connected to server"));
    socketInstance.on("recentChats", setRecentChats);

    // Listen for the typing status event
    socketInstance.on("typingStatus", ({ userId, isTyping }) => {
      setTypingStatus((prev) => ({ ...prev, [userId]: isTyping }));
    });

    socketInstance.on("receiveMessage", (newMessage) => {
      setMessages((prevMessages) => {
        return [...prevMessages, newMessage]; // Append new message
      });
    });

    socketInstance.on("messageStatus", ({ messageId, status }) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.messageId === messageId ? { ...msg, status } : msg
        )
      );
    });
    socketInstance.on("error", (err) => console.error("Socket error:", err));

    return () => socketInstance.disconnect();
  }, [accessToken]);

  useEffect(() => {
    if (socket) socket.emit("getRecentChats");
  }, [socket]);

  useEffect(() => {
    setUsers(filteredData);
  }, [filteredData]);

  const handleSelectChat = useCallback(
    (chatWith) => {
      const selectedChat = recentChats.find((chat) => chat.chatWith === chatWith);
      if (selectedChat) {
        setCurrentChat({
          chatWith: chatWith,
          chatUser: selectedChat.chatUser || []
        });
      }
      setActiveChat(chatWith);
      setMessages([]);
      socket?.emit("getChatHistory", { receiverId: chatWith }, (chatHistory) => {
        console.log("Received chat history:", chatHistory);
        setMessages(chatHistory); // Set the chat history
      });
    },
    [recentChats, socket]
  );

  const handleAddNewChat = () => {
    setShowUserList(true);
    dispatch(fetchAllUsers());
  };

  const handleSelectUser = (user) => {
    socket?.emit("getChatHistory", { receiverId: user.userId }, (chatHistory) => {
      console.log("Received chat history:", chatHistory);
      setMessages(chatHistory); // Set the chat history
    });

    setCurrentChat({
      chatWith: user.userId,
      chatUser: user // Ensure it's an array for consistency
    });

    setActiveChat(user.userId);
    setShowUserList(false);
  };

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;

    const newMessage = {
      message: messageInput,
      messageId: generateId("MSG"),
      senderId: currentUserId,
      receiverId: currentChat.chatWith,
      timestamp: new Date()
    };

    socket?.emit("sendMessage", newMessage);
    socket?.emit("messageStatus", {
      messageId: newMessage.messageId,
      status: "sent"
    });

    // Emit "typingStatus" with false after sending the message
    socket?.emit("typingStatus", {
      receiverId: currentChat.chatWith,
      isTyping: false
    });

    // Append the sent message to the messages state
    setMessages((prev) => [...prev, newMessage]);
    setMessageInput("");
  };

  const handleEmojiSelect = (emoji) => {
    setMessageInput((prev) => prev + emoji.native);
    setShowEmojiPicker(false);
  };

  const toggleEmojiPicker = (event) => {
    setShowEmojiPicker(!showEmojiPicker);
    const { top, left } = event.target.getBoundingClientRect();
    setEmojiPickerPosition({ top: top + 30, left: left }); // Position emoji picker below the input
  };

  const filteredChats = recentChats.filter((chat) =>
    chat.chatWith.toLowerCase().includes(searchText.toLowerCase())
  );

  // Utility function to format the message timestamp
  const formatMessageDate = (timestamp) => {
    const messageDate = moment(timestamp);
    const today = moment().startOf("day");
    const yesterday = moment().subtract(1, "days").startOf("day");
    const twoDaysAgo = moment().subtract(2, "days").startOf("day");
    const sevenDaysAgo = moment().subtract(7, "days").startOf("day");

    if (messageDate.isSame(today, "day")) {
      return "Today";
    } else if (messageDate.isSame(yesterday, "day")) {
      return "Yesterday";
    } else if (messageDate.isSame(twoDaysAgo, "day")) {
      return messageDate.format("dddd");
    } else if (messageDate.isAfter(sevenDaysAgo)) {
      return messageDate.format("dddd");
    } else {
      return messageDate.format("DD-MM-YYYY");
    }
  };

  // Function to group messages by date
  const groupMessagesByDate = (messages) => {
    return messages.reduce((groups, message) => {
      const dateKey = formatMessageDate(message.timestamp);
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(message);
      return groups;
    }, {});
  };

  // Group messages by date
  const groupedMessages = groupMessagesByDate(messages);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typingStatus]); // Trigger after messages update

  useEffect(() => {
    if (socket) {
      socket.on("typingStatus", ({ senderId, isTyping }) => {
        setTypingStatus((prev) => ({
          ...prev,
          [senderId]: isTyping
        }));
      });

      return () => {
        socket.off("typingStatus");
      };
    }
  }, [socket]);
  let typingStatusTimeout = useRef(null);
  const handleTyping = useCallback(() => {
    if (currentChat?.chatWith) {
      socket?.emit("typingStatus", {
        receiverId: currentChat.chatWith,
        isTyping: messageInput.trim() !== ""
      });
    }

    if (messageInput.trim() === "") {
      clearTimeout(typingStatusTimeout);
    } else {
      typingStatusTimeout = setTimeout(() => {
        socket?.emit("typingStatus", {
          receiverId: currentChat.chatWith,
          isTyping: false // Clear typing status
        });
      }, 1000);
    }
  

  }, [currentChat, messageInput, socket]);

  console.log("Typing status:", typingStatus);

  return (
    <Layout className="h-[80vh]">
      <Sider className="bg-gray-100" width={300}>
        <div className="p-4 bg-white text-center">
          <Input
            placeholder="Search chats"
            onChange={(e) => setSearchText(e.target.value)}
            className="mt-2"
          />
        </div>
        <Menu
          mode="inline"
          selectedKeys={[String(activeChat)]}
          className="h-[80vh] border-0"
        >
          {filteredChats.map((chat) => (
            <Menu.Item
              key={chat.chatWith}
              onClick={() => handleSelectChat(chat.chatWith)}
              className="flex items-center py-3 hover:bg-gray-200"
            >
              <Badge dot={chat.chatUser?.onlineStatus} color="green" offset={[-18, 35]}>
                <Avatar icon={<UserOutlined />} src={chat.chatUser?.avatar} className="mr-3" />
              </Badge>
              <span className="text-lg">{chat.chatUser?.name}</span>
            </Menu.Item>
          ))}
          <Menu.Item
            icon={<PlusOutlined />}
            className="mt-auto py-3 text-center"
            onClick={handleAddNewChat}
          >
            Add New Chat
          </Menu.Item>
        </Menu>

      </Sider>

      <Layout>
        <Header className="bg-white text-center shadow-md" style={{ height: "2rem" }}>
          <h3 className="text-xl">
            {currentChat ? `Chat with ${currentChat.chatUser?.name}` : ""}
          </h3>
        </Header>
        <Content className="px-4 flex flex-col bg-gray-50">
          {currentChat ? (
            <>
              <div className="flex flex-col flex-1 overflow-y-auto" ref={scrollRef}>
                {Object.keys(groupedMessages).map((date) => (
                  <div key={date} className="mb-4">
                    <div className="text-center text-gray-500 text-sm">{date}</div>
                    <List
                      dataSource={groupedMessages[date]} // Use groupedMessages[date] instead of messages
                      renderItem={(msg) => (
                        <List.Item
                          key={msg.messageId}
                          className={`flex ${msg.senderId === currentUserId ? "justify-end" : "justify-start"}`}
                        >
                          <div className="">
                            {/* Message bubble */}
                            <div
                              className={`p-3 rounded-lg ${msg.senderId === currentUserId
                                ? "bg-primary-color text-white"
                                : "bg-gray-300 text-black"
                              }`}
                            >
                              <p>{msg.message}</p>
                            </div>
                            {/* Timestamp */}
                            <div
                              className={`text-xs mt-1 flex items-center ${msg.senderId === currentUserId ? "text-gray-500 text-right" : "text-gray-500 text-left"}`}
                            >
                              <span>{moment(msg.timestamp).format("hh:mm A")}</span>
  
                              {msg.senderId === currentUserId && msg.status === "sent" && (
                                <UnreadIcon width={17} height={17} className="ml-2" />
                              )}
                            </div>

                            
                          
                          </div>
                        </List.Item>
                      )}
                    />
                    {/* Typing Indicator */}
                    {typingStatus[currentChat?.chatWith] && (
                      <div className="flex items-center justify-start mt-2 text-gray-500 text-sm">
                        <span>{currentChat?.chatUser?.name} is typing...</span>
                      </div>
                    )}


                  </div>
                ))}
              </div>
              <div className="flex items-center py-4 bg-white shadow-md px-4">
                <Button
                  icon={<SmileOutlined />}
                  type="text"
                  disabled
                  onClick={toggleEmojiPicker}
                  className="mr-2"
                />
                {showEmojiPicker && (
                  <div
                    style={{
                      position: "absolute",
                      top: emojiPickerPosition.top,
                      left: emojiPickerPosition.left,
                      zIndex: 1000
                    }}
                  >
                    <Picker onSelect={handleEmojiSelect} />
                  </div>
                )}
                <Upload>
                  <Button icon={<PaperClipOutlined />} type="text" className="mr-2" />
                </Upload>
                <Input
                  placeholder="Type a message"
                  value={messageInput}
                  onPressEnter={handleSendMessage}
                  size="large"
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyUp={handleTyping}
                  className="flex-1"
                />
                <Button
                  type="primary"
                  size="large"
                  icon={<SendOutlined />}
                  onClick={handleSendMessage}
                  disabled={!messageInput.trim()}
                  className="ml-2"
                />
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center flex-1 text-center text-gray-500">
              <span>Select a chat to start messaging</span>
            </div>
          )}
        </Content>
      </Layout>


      <Modal
        title="Add New Chat"
        open={showUserList}
        onCancel={() => setShowUserList(false)}
        footer={null}
        width={400}
        centered
      >
        <div className="p-4">
          {/* Search input */}
          <Input
            placeholder="Search users"
            value={searchText}
            // onChange={handleSearch}
            className="mb-4"
          />

          {/* User list */}
          <div className="user-list">
            <List
              dataSource={users}
              renderItem={(user) => (
                <List.Item
                  key={user.userId}
                  onClick={() => handleSelectUser(user)}
                  className="cursor-pointer hover:bg-gray-100 p-3 rounded-lg transition-all"
                >
                  <div className="flex justify-items-start gap-4 items-center w-full">
                    <Avatar icon={<UserOutlined />} src={user.avatar} className="ml-3" />
                    <span className="font-medium">{user.name}</span>
                  </div>
                </List.Item>
              )}
            />
          </div>

          {/* Divider */}
          <Divider className="mt-4" />
        </div>
      </Modal>



    </Layout>
  );
};

export default ChatAdminPage;
