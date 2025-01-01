import {
  DesktopOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined
} from "@ant-design/icons";
import { Avatar, Badge, Dropdown, Layout, Menu, theme } from "antd";
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
const { SubMenu } = Menu;

// Helper function for menu items
function getItem(label, key, icon, path, children) {
  return { key, icon, path, children, label };
}

// Menu items definition
const items = [
  getItem("Dashboard", "dashboard", <DesktopOutlined />, "/admin/dashboard"),
  getItem("Users", "users", <MdOutlineDashboard />, "/admin/users"),
  getItem("Booking", "bookings", <UserOutlined />, "/admin/bookings"),
  getItem("Discount", "discounts", <UserOutlined />, "/admin/discounts"),
  getItem("Team", "team", <TeamOutlined />, "/admin/team"),
  getItem("Chat", "chat", <FileOutlined />, "/admin/chat")
];

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(true);
  const { token } = theme.useToken();
  const navigate = useNavigate();
  const location = useLocation();
  const accessToken = getCookie("accessToken");
  const userById = useSelector((state) => state.userById);
  const dispatch = useDispatch();

  const [socketUsers] = useState(null);

  const myCurrentStatus = socketUsers?.find((user) => user.userId === userById?.data?.userId)?.onlineStatus;


  useEffect(() => {
    if (!accessToken) {
      navigate("/"); // Redirect to login page if no token is present
      return; // Prevent further execution
    }

    dispatch(fetchUserById());
    dispatch(fetchAllUsers());
    dispatch(fetchAllBookings());
    dispatch(fetchAllDiscounts());
  }, [dispatch, accessToken, navigate]);


  const handleLogOut = () => {
    deleteCookie("accessToken");
    deleteCookie("userId");
    navigate("/"); // Redirect to the homepage or login page
  };

  const findCurrentKey = (menuItems, path) => {
    for (const item of menuItems) {
      if (item.path === path) return item.key;
      if (item.children) {
        const childKey = findCurrentKey(item.children, path);
        if (childKey) return childKey;
      }
    }
    return null;
  };

  const currentKey = findCurrentKey(items, location.pathname) || "dashboard";

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
    {
      key: "3",
      label: <Link to="/dashboard">Dashboard</Link>,
      icon: <MdOutlineDashboard size={16} />
    },
    ...(userById?.data?.role === "admin"
      ? [
        {
          key: "4",
          label: <Link to="/admin/dashboard">Admin Dashboard</Link>,
          icon: <MdOutlineDashboard size={16} />
        }
      ]
      : []),
    { type: "divider" },
    {
      key: "5",
      label: "Logout",
      danger: true,
      icon: <IoLogOutOutline size={18} />
    }
  ];

  const handleMenuClick = ({ key }) => {
    if (key === "5") {
      handleLogOut();
    } else {
      const selectedItem = items.find((item) => item.key === key);
      if (selectedItem && selectedItem.path) {
        navigate(selectedItem.path); // Navigate to the path of the selected item
      }
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[currentKey]}
          onClick={handleMenuClick}
        >
          {items.map((item) =>
            item.children ? (
              <SubMenu key={item.key} icon={item.icon} title={item.label}>
                {item.children.map((child) => (
                  <Menu.Item key={child.key} path={child.path}>
                    {child.label}
                  </Menu.Item>
                ))}
              </SubMenu>
            ) : (
              <Menu.Item key={item.key} icon={item.icon}>
                {item.label}
              </Menu.Item>
            )
          )}
        </Menu>
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
          <div className="logo" style={{ fontSize: "18px", fontWeight: "bold" }}>
            <Link to="/">Wanderlust Voyages</Link>
          </div>
          {accessToken && userById?.data?.name && (
            <Dropdown
              menu={{
                items: dropdownItems,
                onClick: ({ key }) => handleMenuClick({ key })
              }}
              trigger={["click"]}
            >
              
              <Badge dot={myCurrentStatus} color={myCurrentStatus ? "green" : "red"} size="large"
                offset={[-4, 45]}
              >
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
