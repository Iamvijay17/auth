import { BarsOutlined, CheckCircleTwoTone, CloseCircleTwoTone, DeleteOutlined, EditOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Dropdown, Menu, Modal, Space, Table, Tag } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Toolbar from '../../../components/toolbar';
import { setSearchQuery } from '../../../store/userSlice';
import { getColorFromName } from '../../../utils';

const AllUsers = () => {
  const dispatch = useDispatch();
  const {filteredData} = useSelector((state) => state.users);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = React.useState(false);

  // Define the menu for the dropdown
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

  // Handle edit action
  const handleEdit = (record) => {
    console.log('Editing user:', record);
    // Add your edit logic here
  };
  
  // Handle delete action
  const handleDelete = (record) => {
    setIsDeleteModalVisible(true);
    console.log('Deleting user:', record);
    // Add your delete logic here
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
      label: 'Users',
      key: 'user',
      icon: <UserOutlined />
    },
    {
      label: 'Admin',
      key: 'admin',
      icon: <UserOutlined />
    },
    {
      label: 'Vendors',
      key: 'vendor',
      icon: <UserOutlined />
    }
  ];

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => (
        <div className='flex items-center gap-2'>
          <Avatar size="small" style={{ backgroundColor: getColorFromName(text) }}>{text.charAt(0).toUpperCase()}</Avatar>
          {text}
        </div>
      )
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Role',
      key: 'role',
      dataIndex: 'role',
      render: (_, { role }) => (
        <Tag color={'geekblue'} key={role}>
          {role.toUpperCase()}
        </Tag>
      )
    },
    {
      title: 'Verified Status',
      dataIndex: 'isVerified',
      key: 'isVerified',
      render: (verified) => (
        <Tag color={verified ? 'green' : 'red'} key={verified} icon={verified ? <CheckCircleTwoTone twoToneColor="#52c41a" /> : <CloseCircleTwoTone twoToneColor={"#cf1322"}/>}>
          {verified ? 'Verified' : 'Not Verified'}
        </Tag>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Dropdown overlay={menu(record)} trigger={['click']}>
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
      <Toolbar placeholder="Search users..." items={items}  onChange={handleSearch} handleMenuClick={handleMenuClick} enterButton/>
      <div>
        <Table columns={columns} dataSource={filteredData} />
      </div>

      

      <Modal
        title="Delete User"
        open={isDeleteModalVisible}
        onOk={() => setIsDeleteModalVisible(false)}
        onCancel={() => setIsDeleteModalVisible(false)}
      >
        <p>Are you sure you want to delete this user?</p>
      </Modal>

    </div>
  );
};

export default AllUsers;
