import { BarsOutlined, DeleteOutlined, EditOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, Menu, Modal, Space, Table, Tag } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Toolbar from "../../../components/toolbar";
import { setSearchQuery } from "../../../store/userSlice";
import { getColorFromName } from "../../../utils";

const AllBookings = () => {
  const dispatch = useDispatch();
  const { filteredData: bookingFilteredData } = useSelector((state) => state.bookings);
  const { filteredData: userFilteredData } = useSelector((state) => state.users);
  
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const menu = (record) => (
    <Menu>
      <Menu.Item key="1" onClick={() => handleEdit(record)}>
        <Space>
          <EditOutlined />
          Edit
        </Space>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2" danger onClick={() => handleDelete(record)}>
        <Space>
          <DeleteOutlined />
          Delete
        </Space>
      </Menu.Item>
    </Menu>
  );


  const handleEdit = (record) => {
    console.log("Editing user:", record);
  };


  const handleDelete = (record) => {
    setIsDeleteModalVisible(true);
    console.log("Deleting user:", record);

  };

  const handleSearch = (query) => {
    dispatch(setSearchQuery(query));
  };

  const handleMenuClick = ({ key }) => {
    console.log(key);
    dispatch(setSearchQuery(key));
  };


  const items = [
    {
      label: "Users",
      key: "user",
      icon: <UserOutlined />
    },
    {
      label: "Admin",
      key: "admin",
      icon: <UserOutlined />
    },
    {
      label: "Vendors",
      key: "vendor",
      icon: <UserOutlined />
    }
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "userId",
      key: "userId",
      render: (userId) => {
        const user = userFilteredData?.find((user) => user.userId === userId);

        return (
          <div className='flex items-center gap-2'>
            <Avatar size="small" style={{ backgroundColor: getColorFromName(user?.name) }} src={user?.avatar}>
              {user?.name?.charAt(0).toUpperCase()}
            </Avatar>
            {user?.name || "Unknown User"}
          </div>
        );
      }
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email"
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (s) => (
        <Tag color={s === "confirmed" ? "green" : "red"} key={s}>
          {s.charAt(0).toUpperCase() + s.slice(1)}
        </Tag>
      )
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Dropdown overlay={menu(record)} trigger={["click"]}>
            <Button type="text">
              <BarsOutlined />
            </Button>
          </Dropdown>
        </Space>
      )
    }
  ];

  return (
    <div>
      <Toolbar placeholder="Search Bookings..." items={items} onChange={handleSearch} handleMenuClick={handleMenuClick} enterButton />
      <div>
        <Table columns={columns} dataSource={bookingFilteredData} />
      </div>



      <Modal
        title="Delete User"
        open={isDeleteModalVisible}
        onOk={() => setIsDeleteModalVisible(false)}
        onCancel={() => setIsDeleteModalVisible(false)}>
        <p>Are you sure you want to delete this user?</p>
      </Modal>

    </div>
  );
};

export default AllBookings;
