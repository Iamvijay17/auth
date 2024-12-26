import {
  DesktopOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined
} from "@ant-design/icons";
import { Avatar, Dropdown, Layout, Menu, theme } from "antd";
import React, { useEffect, useState } from "react";
import { IoLogOutOutline, IoSettingsOutline } from "react-icons/io5";
import { MdOutlineDashboard } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { deleteCookie, getCookie } from "../utils/cookies";
import { getColorFromName } from "../utils";
import { fetchUserById } from "../store/userByIdSlice";
import { fetchAllUsers } from "../store/userSlice";

const { Header, Content, Sider } = Layout;

// Helper function for menu items
function getItem(label, key, icon, path, children) {
  return { key, icon, path, children, label };
}

// Menu items definition
const items = [
  getItem("Dashboard", "dashboard", <DesktopOutlined />, "/admin/dashboard"),
  getItem("Users", "users", <MdOutlineDashboard />, "/admin/users"),
  getItem("User", "user", <UserOutlined />, null, [
    getItem("Tom", "tom", null, "/user/tom"),
    getItem("Bill", "bill", null, "/user/bill"),
    getItem("Alex", "alex", null, "/user/alex")
  ]),
  getItem("Team", "team", <TeamOutlined />, null, [
    getItem("Team 1", "team1", null, "/team/1"),
    getItem("Team 2", "team2", null, "/team/2")
  ]),
  getItem("Chat", "chat", <FileOutlined />, "/admin/chat")
];

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { token } = theme.useToken();
  const navigate = useNavigate();
  const location = useLocation();
  const accessToken = getCookie("accessToken");
  const userById = useSelector((state) => state.userById);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserById());
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const handleLogOut = () => {
    deleteCookie("accessToken");
    deleteCookie("userId");
    navigate("/");
  };

  // Recursive function to find the key of the current path
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

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[currentKey]}
          onClick={({ key }) => {
            const selectedItem = items.find((item) => item.key === key) || {};
            if (selectedItem.path) {
              navigate(selectedItem.path);
            }
          }}
          items={items}
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
          <div className="logo" style={{ fontSize: "18px", fontWeight: "bold" }}>
            <Link to="/">Wanderlust Voyages</Link>
          </div>
          {accessToken && userById?.data?.name && (
            <Dropdown
              menu={{
                items: dropdownItems,
                onClick: ({ key }) => {
                  if (key === "5") handleLogOut();
                }
              }}
              trigger={["click"]}
            >
              <Avatar
                size={34}
                shape="circle"
                style={{
                  backgroundColor: getColorFromName(userById.data.name),
                  cursor: "pointer"
                }}
              >
                {userById.data.name.charAt(0).toUpperCase() ?? ""}
              </Avatar>
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
