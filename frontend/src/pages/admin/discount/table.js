import { BarsOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, Form, Menu, Modal, Space, Table, Tag , Typography} from "antd";
import React, { useState } from "react";
import { generateId, getColorFromName } from "../../../utils";
import { useSelector } from "react-redux";
import Toolbar from "../../../components/toolbar";
import DiscountCrud from "./crud";
import { AdminServiceAPI } from "../admin.service";

const { Paragraph } = Typography;

const DiscountTable = () => {
  const { filteredData: discountFilteredData } = useSelector((state) => state.discounts);
  const { filteredData: userFilteredData } = useSelector((state) => state.users);
  const [form] = Form.useForm();
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const [isOpenDiscountModal, setIsOpenDiscountModal] = useState(false);



  const handleSubmit = (values) => {
    console.log("Form values: ", values);


    if(!values.codeId) {
      values["codeId"] = generateId("COD");
    }

    setIsOpenDiscountModal(false);
    AdminServiceAPI.createDiscount(values).then((res) => {
      console.log(res);
    });
  };

  const menu = (record) => (
    <Menu>
      <Menu.Item key="1" onClick={() => {}}>
        <Space>
          <EditOutlined />
          Edit
        </Space>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2" danger onClick={() =>{}}>
        <Space>
          <DeleteOutlined />
          Delete
        </Space>
      </Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: "Name",
      dataIndex: "createdBy",
      key: "createdBy",
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
      title: "Description",
      dataIndex: "description",
      key: "description"
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
      render: (text) => <Paragraph copyable>{text}</Paragraph>
    },
    {
      title: "Role",
      key: "isActive",
      dataIndex: "isActive",
      render: (_, { act }) => (
        <Tag color={"geekblue"} key={act}>
          {act ? "Active" : "Inactive"}
        </Tag>
      )
    },
    {
      title: "Verified Status",
      dataIndex: "isVerified",
      key: "isVerified",
      render: (verified) => (
        <Tag color={verified ? "green" : "red"} key={verified}>
          {verified ? "Verified" : "Not Verified"}
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
      <Toolbar extraRight={
        <Button type="primary" onClick={() => setIsOpenDiscountModal(true)}>Create Discount</Button>
      } />
      <Table columns={columns} dataSource={discountFilteredData} />

      <Modal
        title="Create Discount"
        open={isOpenDiscountModal}
        onCancel={() => setIsOpenDiscountModal(false)}
        width={700}
        footer={
          <>
            <Button onClick={() => setIsOpenDiscountModal(false)}>Cancel</Button>
            <Button type="primary" onClick={() => form.submit()}>
            Create
            </Button>
          </>
        }
      >
        <DiscountCrud form={form} initialValues={{}} onFinish={handleSubmit}/>
      </Modal>

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

export default DiscountTable;
