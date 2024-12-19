import { Avatar, Button, Dropdown, Modal, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Signup from "../../pages/account";
import styles from "./styles.module.css";
import { deleteCookie, getCookie } from "../../utils/cookies";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserById } from "../../store/userByIdSlice";
import { VscAccount } from "react-icons/vsc";
import { IoLogOutOutline } from "react-icons/io5";
import { MdOutlineDashboard } from "react-icons/md";

const { Title } = Typography;

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const accessToken = getCookie("accessToken");
  const userById = useSelector((state) => state.userById);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserById());
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

  const modalStyle = {
    padding: '0',
    borderRadius: '1rem',
    overflow: 'hidden'
  };

  return (
    <div className={styles.wrapper}>
      <div>Logo</div>
      <div className={styles.menu}>
        <div>
          {" "}
          <NavLink to="/">
            <Title level={5} className="hover:text-primary-color">
              Home
            </Title>
          </NavLink>
        </div>
        <div>
          <NavLink to="destination">
            {" "}
            <Title level={5} className="hover:text-primary-color">
              Destination
            </Title>
          </NavLink>
        </div>
        <div>
          <NavLink to="stories">
            <Title level={5} className="hover:text-primary-color">
              Stories
            </Title>
          </NavLink>
        </div>
        <div>
          <NavLink to="reviews">
            <Title level={5} className="hover:text-primary-color">
              Reviews
            </Title>
          </NavLink>
        </div>
      </div>
      <div className="flex align-center gap-10">
        <IoSearch className="text-xl mt-3 hover:text-primary-color cursor-pointer" />
        {accessToken ? (
          userById?.data?.name ? (
            <Dropdown
              menu={{
                items: [
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
                  ...( userById?.data?.role === "admin" ? [
                    {
                      key: "4",
                      label: <Link to="/admin/dashboard">Admin Dashboard</Link>,
                      icon: <MdOutlineDashboard size={16} />
                    }
                  ] : []),
                  {
                    type: "divider"
                  },
                  {
                    key: "3",
                    label: "Logout",
                    danger: true,
                    icon: <IoLogOutOutline size={18} />
                  }
                ],
                onClick: DropdownMenuHandleClick
              }}
              trigger={["click"]}
            >
              <Avatar size={34} shape="circle">
                {userById.data.name.charAt(0).toUpperCase() ?? ""}
              </Avatar>
            </Dropdown>
          ) : null
        ) : (
          <Button
            size="large"
            shape="round"
            className="hover:text-primary-color hover:border-primary-color font-semibold"
            onClick={() => setIsModalOpen(true)}
          >
            Login
          </Button>
        )}
      </div>

      <>
        <Modal
          style={modalStyle}
          wrapperClassName="custom-modal-wrapper"
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
          maskClosable={false}
          width={null}
          closeIcon={null}
          centered
        >
          <Signup setIsModalOpen={setIsModalOpen} />
        </Modal>
      </>
    </div>
  );
};

export default Navbar;
