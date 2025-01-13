import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Rate, Typography, Spin, Avatar } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

// Sample data
const reviewsData = [
  {
    id: 1,
    reviewer: 'John Doe',
    rating: 4,
    comment: 'Amazing city! Loved the culture and the food.',
    location: 'Paris',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
  },
  {
    id: 2,
    reviewer: 'Jane Smith',
    rating: 5,
    comment: 'A wonderful experience, the Eiffel Tower is stunning!',
    location: 'Paris',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
  },
  {
    id: 3,
    reviewer: 'Samuel Jackson',
    rating: 3,
    comment: 'It was a good experience, but a bit crowded.',
    location: 'Paris',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg'
  }
];

const Reviews = () => {
  const [loading, setLoading] = useState(false);

  // Simulate data fetching
  useEffect(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000); // Simulating 1 second load
  }, []);

  return (
    <div className="text-gray-600 dark:text-gray-300 pt-8 dark:bg-gray-900" id="reviews">
      <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
        <div className="mb-10 space-y-4 px-6 md:px-0">
          <Title level={2} className="text-center font-bold text-gray-800 dark:text-white md:text-4xl">
            We have some fans.
          </Title>
        </div>

        <Row gutter={[16, 16]}>
          {loading ? (
            <Col span={24} className="text-center">
              <Spin indicator={<LoadingOutlined />} />
            </Col>
          ) : (
            reviewsData.map((review) => (
              <Col key={review.id} xs={24} sm={12} lg={8}>
                <Card
                  hoverable
                  bordered={false}
                  cover={<Avatar src={review.avatar} size={64} className="mx-auto mt-4" />}
                  className="shadow-lg dark:bg-gray-800"
                >
                  <div className="text-center">
                    <Title level={4} className="text-gray-700 dark:text-white">{review.reviewer}</Title>
                    <Rate disabled defaultValue={review.rating} className="mt-2" />
                    <Paragraph className="text-gray-500 dark:text-gray-300 mt-4">{review.comment}</Paragraph>
                    <Paragraph className="text-sm text-gray-400 dark:text-gray-500">{review.location}</Paragraph>
                  </div>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </div>
    </div>
  );
};

export default Reviews;
