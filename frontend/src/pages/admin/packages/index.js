import { IdcardOutlined, TableOutlined, UserOutlined } from '@ant-design/icons';
import { Modal, Radio, Rate, Space, Table, Typography } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import Toolbar from '../../../components/toolbar';
import AccommodationCard from './card';
import PackagesCrud from './crud';
import { FaEdit, FaRegEye } from "react-icons/fa";

const { Text } = Typography;

const Packages = () => {
  const [view, setView] = React.useState("card");
  const designations = useSelector((state) => state.designations);

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [currentRecord, setCurrentRecord] = React.useState(null);

  const handleSearch = (query) => {
    // Handle search logic here
  };

  const handleMenuClick = ({ key }) => {
    console.log(key);
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
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: 350,
      ellipsis: true,
      render: (description) => (
        <Text ellipsis={{ tooltip: description }}>
          {description}
        </Text>
      )
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating) => <Rate disabled defaultValue={rating} />
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price'
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status'
    },
    {
      title: '',
      key: 'action',
      fixed: 'right',
      render: (_, record) => (
        <Space size="middle" onClick={() => setCurrentRecord(record)}>
          <a href={`/destination/${record.destinationId}`}><FaRegEye /></a>
          <a onClick={() => setIsModalOpen(true)}><FaEdit /></a>
        </Space>
      )
    }
  ];

  return (
    <div>
      <Toolbar filter placeholder="Search Designation" items={items} onChange={handleSearch} handleMenuClick={handleMenuClick} enterButton
        extraLeft={
          <Space>
            <Radio.Group value={view} onChange={(e) => setView(e.target.value)}>
              <Radio.Button value="card"><IdcardOutlined /></Radio.Button>
              <Radio.Button value="list"><TableOutlined /></Radio.Button>
            </Radio.Group>
          </Space>
        }
      />


      <div>
        {view === "list" && <Table columns={columns} dataSource={designations["data"]} />}
        {view === "card" && designations["data"].length > 0 && (
          <section className="p-6" key="packages">
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {designations["data"].map((designation) => (
                <AccommodationCard key={designation.destinationId} data={designation} setIsModalOpen={setIsModalOpen} setCurrentRecord={setCurrentRecord}/>
              ))}
            </div>
          </section>
        ) }
      </div>

      <Modal
        title={currentRecord?.name || "Default Title"}
        open={isModalOpen}
        afterClose={() => setCurrentRecord(null)}
        onCancel={() => {
          setIsModalOpen(false);
          setCurrentRecord(null);
        }}
        footer={null}
        centered
      >
        <PackagesCrud currentRecord={currentRecord} />
      </Modal>


    </div>
  );
};

export default Packages;
