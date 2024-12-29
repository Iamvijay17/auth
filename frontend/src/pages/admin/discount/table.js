import { BarsOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, Form, message, Modal, Space, Table, Tag, Typography } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Toolbar from "../../../components/toolbar";
import { fetchAllDiscounts } from "../../../store/discountSlice";
import { generateId, getColorFromName } from "../../../utils";
import { AdminServiceAPI } from "../admin.service";
import DiscountCrud from "./crud";

const { Paragraph } = Typography;

const DiscountTable = () => {

  const dispatch = useDispatch();

  const { filteredData: discountFilteredData } = useSelector((state) => state.discounts);
  const { filteredData: userFilteredData } = useSelector((state) => state.users);
  const [form] = Form.useForm();
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isOpenDiscountModal, setIsOpenDiscountModal] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);


  useEffect(() => {
    dispatch(fetchAllDiscounts());
  }, [dispatch]);

  useEffect(() => {
    form.resetFields();
  }, [isOpenDiscountModal]);



  const handleSubmit = (values) => {
    console.log("Form values: ", values);


    if(!values.codeId) {
      values["codeId"] = generateId("COD");
    }
    form.resetFields();
    setIsOpenDiscountModal(false);
    AdminServiceAPI.createDiscount(values).then((res) => {
      message.success("Discount created successfully");
    });
  };

  const handleEdit = (record) => {
    console.log("Editing user:", record);
    setIsOpenDiscountModal(true);
  };

  const handleDelete = (record) => {
    setIsDeleteModalVisible(true);
  };

  const menuItems = [
    {
      label: "Edit",
      key: "edit",
      icon: <EditOutlined />,
      onClick: handleEdit
    },
    {
      label: "Delete",
      key: "delete",
      icon: <DeleteOutlined />,
      onClick: handleDelete
    }
  ];

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
      title: "Percentage",
      dataIndex: "discountPercentage",
      key: "discountPercentage",
      render: (text) => <Paragraph>{text} %</Paragraph>
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
    },{
      title: "Validity",
      dataIndex: "validTo",
      key: "validTo",
      render: (text) => {
        return moment(text).format("DD-MMM-YYYY");
      }
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Dropdown
            menu={{
              items: menuItems
            }}
            onClick={(e) => setCurrentRecord(record)}
            trigger={["click"]}>
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
      <Toolbar
        extraRight={
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
              {currentRecord ? "Update" : "Create"}
            </Button>
          </>
        }
      >
        <DiscountCrud form={form} initialValues={currentRecord} onFinish={handleSubmit}/>
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
