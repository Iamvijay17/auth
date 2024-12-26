import { Avatar, Dropdown, Layout, theme } from "antd";
import React, { useEffect } from "react";
import { IoLogOutOutline, IoSettingsOutline } from "react-icons/io5";
import { MdOutlineDashboard } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { fetchUserById } from "../store/userByIdSlice";
import { fetchAllUsers } from "../store/userSlice";
import { getColorFromName } from "../utils";
import { deleteCookie, getCookie } from "../utils/cookies";

const { Header, Content } = Layout;

const CommonLayout = () => {
  const { token } = theme.useToken();
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

export default CommonLayout;
