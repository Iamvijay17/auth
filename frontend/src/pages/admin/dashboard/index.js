import { Card, Col, Layout, Row, Statistic } from 'antd';
import { ArcElement, CategoryScale, Chart as ChartJS, Legend, BarElement, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { FaMoneyBillWave, FaUserAlt } from 'react-icons/fa';
import CountUp from 'react-countup';
import { AdminServiceAPI } from '../admin.service';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  BarElement,
  Tooltip,
  Legend,
  ArcElement
);

const { Content } = Layout;

const Dashboard = () => {

  const [statistics, setStatistics] = useState();

  useEffect(() => {
    getStatistics();
  }, []);

  const getStatistics = () => {
    AdminServiceAPI.getStatistics().then((res) => {
      setStatistics(res);
    });
  };


  // Line chart data
  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Total Bookings',
        data: [30, 45, 60, 50, 70, 90, 100],
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: .4
      }
    ]
  };

  // Doughnut chart data
  const doughnutData = {
    labels: ['Active Users', 'Inactive Users', 'New Users'],
    datasets: [
      {
        data: [300, 50, 150],
        backgroundColor: ['#4caf50', '#f44336', '#ffeb3b'],
        hoverOffset: 10
      }
    ]
  };


  // Stacked Bar chart data
  const stackedBarData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Active Users',
        data: [50, 100, 150, 200, 250],
        backgroundColor: '#4caf50'
      },
      {
        label: 'Inactive Users',
        data: [20, 30, 40, 50, 60],
        backgroundColor: '#f44336'
      },
      {
        label: 'New Users',
        data: [10, 20, 30, 40, 50],
        backgroundColor: '#ffeb3b'
      }
    ]
  };

  const formatter = (value) => <CountUp end={value} />;

  return (
    <Layout style={{ minHeight: '100vh' }}>

      {/* Main Content */}
      <Content style={{ margin: '16px' }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Card bordered={false} hoverable>
              <Statistic title="Total Bookings" value={statistics?.bookingCount} prefix={<FaMoneyBillWave />} formatter={formatter} />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card bordered={false} hoverable>
              <Statistic title="Total Destinations" value={statistics?.destinationCount} prefix="$" formatter={formatter} />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card bordered={false} hoverable>
              <Statistic title="Total Users" value={statistics?.userCount} prefix={<FaUserAlt />} formatter={formatter} />
            </Card>
          </Col>
        </Row>


        {/* Doughnut Chart */}
        <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
          <Col xs={24} lg={12}>
            <Card title="Bookings Growth" bordered={false} hoverable >
              <Line data={lineData} options={{ responsive: true, maintainAspectRatio: false }} style={{ height: '37vh' }} />
            </Card>
          </Col>
          <Col xs={24} md={12} lg={6}>
            <Card title="User Status Distribution" bordered={false} hoverable>
              <div style={{ height: '37vh' }}>
                <Doughnut data={doughnutData} />
              </div>
            </Card>
          </Col>

          <Col xs={24} md={12} lg={6}>
            <Card title="User Growth by Month" bordered={false} hoverable>
              <div>
                <Bar
                  data={stackedBarData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: 'top'
                      },
                      tooltip: {
                        callbacks: {
                          label: (context) => {
                            const value = context.raw;
                            return `${context.dataset.label}: ${value}`;
                          }
                        }
                      }
                    },
                    scales: {
                      x: {
                        stacked: true
                      },
                      y: {
                        stacked: true
                      }
                    }
                  }}
                />
              </div>
            </Card>
          </Col>
        </Row>



      </Content>
    </Layout>
  );
};

export default Dashboard;
