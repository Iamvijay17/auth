import React, { useState, useRef } from "react";
import { Row, Col, Card, Button, Descriptions, Rate, Carousel, Typography, Badge, Space } from "antd";
import { EnvironmentOutlined, CalendarOutlined, DollarOutlined, CarOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const productData = {
  title: "Tropical Paradise Tour",
  images: [
    "https://images.unsplash.com/photo-1461301214746-1e109215d6d3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1507373318898-766a0e260b51?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1502147704994-6bfb9b28d71d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  ],
  location: "Maldives",
  duration: "5 Days / 4 Nights",
  price: "$1500",
  rating: 4.5,
  description: `
    Escape to paradise with our exclusive Maldives Tropical Paradise Tour. 
    Enjoy luxurious stays, crystal-clear lagoons, white sandy beaches, and unforgettable adventures.
  `,
  features: ["Luxury Accommodation", "Guided Tours", "All-Inclusive Meals"]
};

const PlaceViewPage = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const carouselRef = useRef(null);

  const handleThumbnailClick = (index) => {
    setCurrentImage(index);
    carouselRef.current.goTo(index);
  };



  const buttonStyles = {
    position: "relative",
    overflow: "hidden",
    // backgroundColor: "#1890ff",
    border: "none",
    fontWeight: "bold",
    color: "#fff",
    width: "100%",
    height: "50px",
    fontSize: "16px",
    textTransform: "uppercase",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: "background-color 1s ease",
    cursor: "pointer"
  };

  const iconStyles = {
    position: "absolute",
    left: "-50px",
    top: "25%",
    // transform: "translateY(-5%)",
    fontSize: "30px",
    color: "#fff",
    transition: "left 1s ease, transform 1s ease"
  };

  const hoverButtonStyles = {
    // backgroundColor: "#0056b3"
  };

  return (
    <div style={{ padding: "40px", backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      <Card style={{ maxWidth: "1200px", margin: "auto", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}>
        <Row gutter={[30, 30]}>
          {/* Carousel Section */}
          <Col xs={24} lg={12}>
            <Badge.Ribbon text="Top Pick" color="red">
              <div style={{ position: "relative" }}>
                {/* Main Carousel */}
                <Carousel
                  autoplay={true}
                  ref={carouselRef}
                  afterChange={(current) => setCurrentImage(current)}
                >
                  {productData.images.map((image, index) => (
                    <div key={index}>
                      <img
                        src={image}
                        alt={`Slide ${index + 1}`}
                        style={{
                          width: "100%",
                          borderRadius: "10px",
                          height: "350px",
                          objectFit: "cover"
                        }}
                      />
                    </div>
                  ))}
                </Carousel>

                {/* Thumbnails */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "10px",
                    overflowX: "auto",
                    padding: "10px"
                  }}
                >
                  {productData.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      onClick={() => handleThumbnailClick(index)}
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "cover",
                        borderRadius: "5px",
                        border: index === currentImage ? "2px solid #1890ff" : "2px solid #ddd",
                        cursor: "pointer"
                      }}
                    />
                  ))}
                </div>
              </div>
            </Badge.Ribbon>
          </Col>

          {/* Product Details Section */}
          <Col xs={24} lg={12}>
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              <div>
                <Title level={2} style={{ marginBottom: 0 }}>
                  {productData.title}
                </Title>
                <Paragraph type="secondary" style={{ fontSize: "16px", marginBottom: "4px" }}>
                  {productData.location} | {productData.duration}
                </Paragraph>
              </div>

              <Paragraph style={{ lineHeight: "1.8" }}>{productData.description}</Paragraph>

              <Descriptions bordered column={1} size="middle">
                <Descriptions.Item label={<><EnvironmentOutlined /> Location</>}>
                  {productData.location}
                </Descriptions.Item>
                <Descriptions.Item label={<><CalendarOutlined /> Duration</>}>
                  {productData.duration}
                </Descriptions.Item>
                <Descriptions.Item label={<><DollarOutlined /> Price</>}>
                  <span style={{ color: "#52c41a", fontWeight: "bold" }}>{productData.price}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Features">
                  <ul style={{ paddingLeft: "20px", margin: 0 }}>
                    {productData.features.map((feature, index) => (
                      <li key={index} style={{ marginBottom: "5px" }}>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </Descriptions.Item>
                <Descriptions.Item label="Rating">
                  <Rate value={productData.rating} allowHalf disabled /> ({productData.rating})
                </Descriptions.Item>
              </Descriptions>
           
              <div style={{ textAlign: "center", marginTop: "30px" }}>
                <Button
                  type="primary"
                  size="large"
                  style={buttonStyles}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = hoverButtonStyles.backgroundColor;
                    const icon = e.currentTarget.querySelector(".vehicle-icon");
                    if (icon) {
                      icon.style.left = "calc(100% - 40px)";
                      icon.style.transform = "rotate(0deg)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = buttonStyles.backgroundColor;
                    const icon = e.currentTarget.querySelector(".vehicle-icon");
                    if (icon) {
                      icon.style.left = "-50px";
                      icon.style.transform = "rotate(0deg)";
                    }
                  }}
                >
                  <span style={{ position: "relative", zIndex: 2 }}>Book Now</span>
                  <CarOutlined className="vehicle-icon" style={iconStyles} />
                </Button>
              </div>
             
            </Space>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default PlaceViewPage;
