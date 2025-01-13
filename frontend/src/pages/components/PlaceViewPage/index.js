import React, { useState, useRef, useEffect, useCallback } from "react";
import { Row, Col, Card, Button, Descriptions, Rate, Carousel, Typography, Badge, Space } from "antd";
import { EnvironmentOutlined, CalendarOutlined, DollarOutlined, CarOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { PageServiceAPI } from "../../page.service";
import Loader from "../../../components/loader";

const { Title, Paragraph } = Typography;

const PlaceViewPage = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [designationData, setDesignationData] = useState({});
  const carouselRef = useRef(null);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { designationId } = useParams();
  
  const getDesignationData = useCallback(() => {
    setLoading(true);
    PageServiceAPI.getDesignations(designationId).then(
      (res) => {
        setLoading(false);
        setDesignationData(res);
      },
      (err) => {
        setLoading(false);
      });
  }, [designationId]);

  useEffect(() => {
    getDesignationData();
  }, [getDesignationData]);

  const handleThumbnailClick = useCallback((index) => {
    setCurrentImage(index);
    carouselRef.current.goTo(index);
  }, []);

  const buttonStyles = {
    position: "relative",
    overflow: "hidden",
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
    fontSize: "30px",
    color: "#fff",
    transition: "left 1s ease, transform 1s ease"
  };

  const hoverButtonStyles = {
    // backgroundColor: "#0056b3"
  };

  const handleBookNowClick = (designationId) => {
    console.log(designationId);
    navigate(`/destination/book-now/${designationId}`);
  };

  if (isLoading) {
    return <Loader />;
  }

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
                  {designationData.images?.map((image, index) => (
                    <div key={index}>
                      {image && (
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
                      )}
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
                  {designationData.images?.map((image, index) => (
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
                  {designationData.name}
                </Title>
                <Paragraph type="secondary" style={{ fontSize: "16px", marginBottom: "4px" }}>
                  {designationData.location}
                </Paragraph>
              </div>

              <Paragraph style={{ lineHeight: "1.8" }}>{designationData.description}</Paragraph>

              <Descriptions bordered column={1} size="middle">
                <Descriptions.Item label={<><EnvironmentOutlined /> Location</>}>
                  {designationData.location}
                </Descriptions.Item>
                <Descriptions.Item label={<><CalendarOutlined /> Duration</>}>
                  {designationData.duration}
                </Descriptions.Item>
                <Descriptions.Item label={<><DollarOutlined /> Price</>}>
                  <span style={{ color: "#52c41a", fontWeight: "bold" }}>${designationData.price}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Features">
                  <ul style={{ paddingLeft: "20px", margin: 0 }}>
                    {designationData.features?.map((feature, index) => (
                      <li key={index} style={{ marginBottom: "5px" }}>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </Descriptions.Item>
                <Descriptions.Item label="Rating">
                  <Rate value={designationData.rating} allowHalf disabled /> ({designationData.rating})
                </Descriptions.Item>
              </Descriptions>

              <div style={{ textAlign: "center", marginTop: "30px" }}>
                <Button
                  type="primary"
                  size="large"
                  style={buttonStyles}
                  onClick={() => handleBookNowClick(designationData?.destinationId)}
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
