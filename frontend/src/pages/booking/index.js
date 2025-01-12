import { CalendarOutlined, CreditCardOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { Button, Card, Col, DatePicker, Divider, Form, Input, Row, Typography, notification } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { PageServiceAPI } from "../page.service";
import { useParams } from "react-router-dom";

const { Title, Paragraph } = Typography;

const Booking = () => {
  const [isLoading, setLoading] = useState(false);
  const [designationData, setDesignationData] = useState();
  const [couponCode, setCouponCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(0);
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

  const onFinish = (values) => {
    setLoading(true);
    console.log(values);
  };

  const applyCoupon = () => {
    // Simulating coupon logic
    if (couponCode === "DISCOUNT10") {
      const discount = designationData?.price * 0.1;
      setDiscountApplied(discount);
      notification.success({
        message: "Coupon Applied!",
        description: "You've received a 10% discount."
      });
    } else {
      notification.error({
        message: "Invalid Coupon Code",
        description: "The coupon code you entered is not valid."
      });
    }
  };

  const totalPrice = (designationData?.price || 0) + (designationData?.tax || 0) - (designationData?.discount || 0) - discountApplied;

  const handleDateChange = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <div className="checkout-page" style={{ padding: "40px", backgroundColor: "#f1f5f9" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: "40px" }}>Checkout</Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card
            title="Booking Summary"
            bordered={false}
            style={{
              borderRadius: "16px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              marginBottom: "24px",
              padding: "20px"
            }}
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} md={12}>
                <img
                  src={designationData?.images && designationData.images.length > 0 ? designationData.images[0] : "fallback-image-url"}
                  alt="Destination"
                  style={{ width: "100%", borderRadius: "16px", objectFit: "cover" }}
                />
              </Col>
              <Col xs={24} md={12} style={{ paddingLeft: "20px" }}>
                <Title level={4}>{designationData?.name}</Title>
                <Paragraph><EnvironmentOutlined style={{ marginRight: "8px" }} /> {designationData?.location}</Paragraph>
                <Paragraph><CalendarOutlined style={{ marginRight: "8px" }} /> Date:   <DatePicker onChange={handleDateChange} style={{ border: "none" }} suffixIcon={null}/></Paragraph>
                <Paragraph>{designationData?.description}</Paragraph>
              </Col>
            </Row>
          </Card>

          <Card
            title="Price Details"
            bordered={false}
            style={{
              borderRadius: "16px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              marginBottom: "24px",
              padding: "20px"
            }}
          >
            <div style={{ marginBottom: "8px" }}>
              <strong>Base Price:</strong> ${designationData?.price}
            </div>
            <div style={{ marginBottom: "8px" }}>
              <strong>Tax:</strong> ${designationData?.tax}
            </div>
            <div style={{ marginBottom: "8px" }}>
              <strong>Discount:</strong> -${designationData?.discount}
            </div>
            <div style={{ marginBottom: "8px", display: "flex", alignItems: "center" }}>
              <strong>Apply Coupon:</strong>
              <Input
                style={{ marginLeft: "10px", width: "160px" }}
                placeholder="Enter code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <Button
                type="primary"
                style={{ marginLeft: "10px", borderRadius: "8px" }}
                onClick={applyCoupon}
              >
                Apply
              </Button>
            </div>
            <Divider />
            <div style={{ fontSize: "20px", fontWeight: "bold", color: "#1890ff" }}>
              <strong>Total:</strong> ${totalPrice}
            </div>
          </Card>
        </Col>

        {/* Right Column: Form */}
        <Col xs={24} lg={8}>
          <Card
            title="Billing Details"
            bordered={false}
            style={{
              borderRadius: "16px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              padding: "20px"
            }}
          >
            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item
                label="Full Name"
                name="name"
                rules={[{ required: true, message: "Please input your name!" }]}>
                <Input size="large" placeholder="John Doe" />
              </Form.Item>

              <Form.Item
                label="Email Address"
                name="email"
                rules={[{ required: true, type: "email", message: "Please input a valid email!" }]}>
                <Input size="large" placeholder="youremail@example.com" />
              </Form.Item>

              <Form.Item
                label="Phone Number"
                name="phone"
                rules={[{ required: true, message: "Please input your phone number!" }]}>
                <Input size="large" placeholder="+123 456 7890" />
              </Form.Item>

              <Form.Item
                label="Billing Address"
                name="address"
                rules={[{ required: true, message: "Please input your billing address!" }]}>
                <Input.TextArea rows={4} size="large" placeholder="123 Main St, City, Country" />
              </Form.Item>

              <Form.Item
                label="Payment Method"
                name="paymentMethod"
                rules={[{ required: true, message: "Please select a payment method!" }]}>
                <Input
                  size="large"
                  prefix={<CreditCardOutlined />}
                  placeholder="Credit Card / Debit Card"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  size="large"
                  htmlType="submit"
                  block
                  loading={isLoading}
                  style={{
                    borderRadius: "8px",
                    fontWeight: "bold"
                  }}
                >
                  Confirm Booking
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Booking;
