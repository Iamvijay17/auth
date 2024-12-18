import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined
} from "@ant-design/icons";
import { Avatar, Dropdown, Layout, Menu, theme } from "antd";
import React, { useEffect, useState } from "react";
import { IoLogOutOutline } from "react-icons/io5";
import { MdOutlineDashboard } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { deleteCookie, getCookie } from "../utils/cookies";
import { getColorFromName } from "../utils";
import { fetchUserById } from "../store/userByIdSlice";
import { fetchAllUsers } from "../store/userSlice";

const { Header, Content, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label
  };
}

const items = [
  getItem("Option 1", "1", <PieChartOutlined />),
  getItem("Option 2", "2", <DesktopOutlined />),
  getItem("User", "sub1", <UserOutlined />, [
    getItem("Tom", "3"),
    getItem("Bill", "4"),
    getItem("Alex", "5")
  ]),
  getItem("Team", "sub2", <TeamOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8")
  ]),
  getItem("Files", "9", <FileOutlined />)
];

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken();
  const navigate = useNavigate();
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

  const DropdownMenuHandleClick = (e) => {
    if (e.key === "3") {
      handleLogOut();
    }
  };

  const dropdownItems = [
    {
      key: "1",
      label: <Link to="/profile">Profile</Link>,
      icon: <VscAccount size={16} />
    },
    {
      key: "2",
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
      key: "3",
      label: "Logout",
      danger: true,
      icon: <IoLogOutOutline size={18} />
    }
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline" items={items} />
      </Sider>
     
      <Layout>
        <Header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 16px",
            background: colorBgContainer
          }}
        >
          <div className="logo" style={{ fontSize: "18px", fontWeight: "bold" }}>
            <Link to="/">Wanderlust Voyages</Link>
          </div>
          {accessToken && userById?.data?.name && (
            <Dropdown
              menu={{
                items: dropdownItems,
                onClick: DropdownMenuHandleClick
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
            margin: "16px"
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
