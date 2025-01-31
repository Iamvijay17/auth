import {
  FileOutlined,
  HomeOutlined,
  MessageOutlined,
  TeamOutlined
} from "@ant-design/icons";
import { Avatar, Badge, Dropdown, Layout, Menu, theme, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { FiPackage } from "react-icons/fi";
import { IoLogOutOutline, IoSettingsOutline } from "react-icons/io5";
import { LuLayoutList, LuUsers } from "react-icons/lu";
import { MdOutlineDashboard, MdOutlineDiscount, MdOutlineModeOfTravel } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { fetchAllBookings } from "../store/bookingSlice";
import { fetchAllDiscounts } from "../store/discountSlice";
import { fetchUserById } from "../store/userByIdSlice";
import { fetchAllUsers } from "../store/userSlice";
import { getColorFromName } from "../utils";
import { deleteCookie, getCookie } from "../utils/cookies";
import { fetchAllDestinations } from "../store/destinationSlice";


const { Header, Content, Sider } = Layout;
const { Text } = Typography;

function getItem(label, key, icon, path, children) {
  return { key, icon, path, children, label };
}

const menuItems = [
  getItem("Dashboard", "dashboard", <HomeOutlined />, "/admin/dashboard"),
  getItem("Users", "users", <LuUsers  />, "/admin/users"),
  getItem("Booking", "bookings", <LuLayoutList />, "/admin/bookings"),
  getItem("Discount", "discounts", <MdOutlineDiscount />, "/admin/discounts"),
  getItem("Packages", "packages", <FiPackage />, "/admin/packages"),
  { type: "divider" },
  getItem("Travel", "travel", <MdOutlineModeOfTravel  />, "/admin/travel/dashboard", [
    getItem("Dashboard", "travel-dashboard", <FileOutlined />, "/admin/travel/dashboard"),
    getItem("Vehicles", "travel-vehicles", <FileOutlined />, "/admin/travel/vehicles"),
    getItem("Packages", "travel-packages", <FileOutlined />, "/admin/travel/packages")
  ]),
  getItem("Team", "team", <TeamOutlined />, "/admin/team"),
  getItem("Chat", "chat", <MessageOutlined />, "/admin/chat")
];



const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(true);
  const { token } = theme.useToken();
  const navigate = useNavigate();
  const location = useLocation();
  const accessToken = getCookie("accessToken");
  const userById = useSelector((state) => state.userById);
  const dispatch = useDispatch();

  const myCurrentStatus = userById?.data?.onlineStatus;

  useEffect(() => {
    if (!accessToken) {
      navigate("/");
      return;
    }

    dispatch(fetchUserById());
    dispatch(fetchAllUsers());
    dispatch(fetchAllBookings());
    dispatch(fetchAllDiscounts());
    dispatch(fetchAllDestinations());
  }, [dispatch, accessToken]);

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


  const findActiveKey = (items, path) => {
    for (const item of items) {
      if (item.path === path) return item.key;
      if (item.children) {
        const childKey = findActiveKey(item.children, path);
        if (childKey) return childKey;
      }
    }
    return null;
  };

  const currentKey = findActiveKey(menuItems, location.pathname) || "dashboard";

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed} theme="light">
        <div className="logo" style={{ padding: "16px", textAlign: "center" }}>
          {accessToken && userById?.data?.name && (
            <Dropdown menu={{ items: dropdownItems }} trigger={["click"]}>
              <Badge dot={myCurrentStatus} color={myCurrentStatus ? "green" : "red"} offset={[-4, 45]}>
                <Avatar
                  size={collapsed ? 32 : 64}
                  shape="circle"
                  alt="User"
                  src={userById.data.avatar}
                  style={{
                    backgroundColor: userById.data.avatar ? "" : getColorFromName(userById.data.name),
                    cursor: "pointer"
                  }}
                >
                  {userById.data.avatar ? "" : userById.data.name.charAt(0).toUpperCase()}
                </Avatar>
              </Badge>
            </Dropdown>
          )}
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
          onClick={({ key }) => {
            const findPath = (items, key) => {
              for (let item of items) {
                if (item.key === key) return item.path;
                if (item.children) {
                  const childPath = findPath(item.children, key);
                  if (childPath) return childPath;
                }
              }
              return null;
            };

            const path = findPath(menuItems, key);
            if (path) navigate(path);
          }}
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
