import React from "react";
import {
  Card,
  Row,
  Col,
  Statistic,
  Table,
  List,
  Avatar,
  Typography
} from "antd";
import { Doughnut } from "react-chartjs-2";
import {
  UserOutlined,
  GlobalOutlined,
  ShoppingCartOutlined
} from "@ant-design/icons";
import "chart.js/auto";

const { Title } = Typography;

const TravelAdminDashboard = () => {
  const donutData = {
    labels: ["Flights", "Hotels", "Packages"],
    datasets: [
      {
        data: [45, 25, 30],
        backgroundColor: ["#3498db", "#2ecc71", "#f1c40f"],
        hoverBackgroundColor: ["#2980b9", "#27ae60", "#f39c12"]
      }
    ]
  };

  const chatData = [
    {
      name: "John Doe",
      message: "Can you help me with a flight booking?",
      avatar: ""
    },
    {
      name: "Jane Smith",
      message: "What packages are available for Bali?",
      avatar: ""
    },
    {
      name: "Michael Lee",
      message: "Need assistance with hotel reservations.",
      avatar: ""
    }
  ];

  const columns = [
    {
      title: "Customer Name",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Booking Type",
      dataIndex: "type",
      key: "type"
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date"
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status"
    }
  ];

  const tableData = [
    {
      key: "1",
      name: "Alice Johnson",
      type: "Flight",
      date: "2025-01-01",
      status: "Confirmed"
    },
    {
      key: "2",
      name: "Bob Brown",
      type: "Hotel",
      date: "2025-01-02",
      status: "Pending"
    },
    {
      key: "3",
      name: "Charlie Davis",
      type: "Package",
      date: "2025-01-03",
      status: "Cancelled"
    }
  ];

  return (
    <div style={{ padding: 24 }}>
      <Title level={3} style={{ marginBottom: 24 }}>
        Travel Admin Dashboard
      </Title>

      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Flights"
              value={145}
              prefix={<GlobalOutlined />}
              valueStyle={{ color: "#3498db" }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Destinations"
              value={84}
              prefix={<ShoppingCartOutlined />}
              valueStyle={{ color: "#2ecc71" }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Packages Sold"
              value={320}
              prefix={<UserOutlined />}
              valueStyle={{ color: "#f1c40f" }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} md={12} lg={6}>
          <Card title="Sales Distribution" style={{ height: "100%" }}>
            <Doughnut data={donutData} />
          </Card>
        </Col>

        <Col xs={24} md={12} lg={6}>
          <Card title="Recent Chats" style={{ height: "100%" }}>
            <List
              dataSource={chatData}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon={<UserOutlined />} />}
                    title={item.name}
                    description={item.message}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} md={12} lg={12}>
          <Card title="Recent Bookings">
            <Table columns={columns} dataSource={tableData} pagination={{ pageSize: 5 }} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default TravelAdminDashboard;
