import {
  FileOutlined,
  HomeOutlined,
  MessageOutlined,
  TeamOutlined,
  UserOutlined
} from "@ant-design/icons";
import { Avatar, Badge, Dropdown, Layout, Menu, theme, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { IoLogOutOutline, IoSettingsOutline } from "react-icons/io5";
import { MdOutlineDashboard } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { fetchAllBookings } from "../store/bookingSlice";
import { fetchAllDiscounts } from "../store/discountSlice";
import { fetchUserById } from "../store/userByIdSlice";
import { fetchAllUsers } from "../store/userSlice";
import { getColorFromName } from "../utils";
import { deleteCookie, getCookie } from "../utils/cookies";

const { Header, Content, Sider } = Layout;
const { Text } = Typography;

function getItem(label, key, icon, path, children) {
  return { key, icon, path, children, label };
}

const menuItems = [
  getItem("Dashboard", "dashboard", <HomeOutlined />, "/admin/dashboard"),
  getItem("Users", "users", <MdOutlineDashboard />, "/admin/users"),
  getItem("Booking", "bookings", <UserOutlined />, "/admin/bookings"),
  getItem("Discount", "discounts", <FileOutlined />, "/admin/discounts"),
  getItem("Team", "team", <TeamOutlined />, "/admin/team"),
  getItem("Chat", "chat", <MessageOutlined />, "/admin/chat")
];

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { token } = theme.useToken();
  const navigate = useNavigate();
  const location = useLocation();
  const accessToken = getCookie("accessToken");
  const userById = useSelector((state) => state.userById);
  const dispatch = useDispatch();

  const myCurrentStatus = userById?.data?.onlineStatus;
  const currentKey = menuItems.find((item) => item.path === location.pathname)?.key || "dashboard";

  useEffect(() => {
    if (!accessToken) {
      navigate("/");
      return;
    }

    dispatch(fetchUserById());
    dispatch(fetchAllUsers());
    dispatch(fetchAllBookings());
    dispatch(fetchAllDiscounts());
  }, [dispatch, accessToken, navigate]);

  const handleLogOut = () => {
    deleteCookie("accessToken");
    deleteCookie("userId");
    navigate("/");
  };

  const dropdownItems = [
    {
      key: "1",
      label: <Link to="/profile">Profile</Link>,
      icon: <VscAccount size={16} />
    },
    {
      key: "2",
      label: <Link to="/settings">Settings</Link>,
      icon: <IoSettingsOutline size={16} />
    },
    ...(userById?.data?.role === "admin"
      ? [
        {
          key: "3",
          label: <Link to="/admin/dashboard">Admin Dashboard</Link>,
          icon: <MdOutlineDashboard size={16} />
        }
      ]
      : []),
    { type: "divider" },
    {
      key: "4",
      label: "Logout",
      danger: true,
      icon: <IoLogOutOutline size={18} />,
      onClick: handleLogOut
    }
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed} theme="light">
        <div className="logo" style={{ padding: "16px", textAlign: "center" }}>
          <Avatar size={collapsed ? 32 : 64} alt="User" src={userById["data"]?.avatar} />
          {!collapsed && (
            <div style={{ marginTop: 8 }}>
              <Text strong>{userById["data"]?.name.toUpperCase()}</Text>
              <br />
              <Text type="secondary" style={{ fontSize: "12px" }}>
                {userById["data"]?.role.toUpperCase()}
              </Text>
            </div>
          )}
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={[currentKey]}
          selectedKeys={[currentKey]}
          items={menuItems}
          onClick={({ key }) => navigate(menuItems.find((item) => item.key === key)?.path)}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 16px",
            background: token.colorBgContainer
          }}
        >
          <Link to="/" className="logo" style={{ fontSize: "18px", fontWeight: "bold" }}>
            Wanderlust Voyages
          </Link>
          {accessToken && userById?.data?.name && (
            <Dropdown menu={{ items: dropdownItems }} trigger={["click"]}>
              <Badge dot={myCurrentStatus} color={myCurrentStatus ? "green" : "red"} offset={[-4, 45]}>
                <Avatar
                  size={34}
                  shape="circle"
                  alt="User"
                  src={userById.data.avatar}
                  style={{
                    backgroundColor: getColorFromName(userById.data.name),
                    cursor: "pointer"
                  }}
                >
                  {userById.data.avatar ? "" : userById.data.name.charAt(0).toUpperCase()}
                </Avatar>
              </Badge>
            </Dropdown>
          )}
        </Header>
        <Content
          style={{
            margin: "16px",
            padding: 24,
            minHeight: 360,
            background: token.colorBgContainer,
            borderRadius: token.borderRadiusLG
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
