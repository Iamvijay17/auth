import React from "react";
import { Button, Empty, Typography, Space, Image } from "antd";

const EmptyPage = ({ status }) => {
  // Conditional rendering based on status prop
  if (status === "underconstruction") {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "70vh",
          flexDirection: "column",
          textAlign: "center",
          padding: "20px"
        }}
      >
        <Image
          src="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
          alt="Under Construction"
          width={200}
          height={200}
          preview={false}
          style={{ marginBottom: 20 }}
        />
        <Typography.Text
          style={{
            fontSize: "18px",
            color: "#888",
            marginBottom: "20px"
          }}
        >
          This page is under construction. Please check back later!
        </Typography.Text>
        <Space>
          <Button type="default" size="large" style={{ fontWeight: "bold" }}>
            Go Back
          </Button>
        </Space>
      </div>
    );
  }

  // Default Empty Page UI (when not under construction)
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "70vh",
        flexDirection: "column",
        textAlign: "center",
        padding: "20px"
      }}
    >
      {/* Image centered with appropriate size */}
      <Image
        src="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
        alt="Empty"
        width={200}
        height={200}
        preview={false}
        style={{ marginBottom: 20 }} // Space between image and text
      />
      
      {/* Empty description with a link */}
      <Empty
        image={false}
        description={
          <Typography.Text style={{ fontSize: "16px", color: "#888" }}>
            It seems there is nothing here yet. You can{" "}
            <a href="#API" style={{ color: "#1890ff" }}>
              create something now
            </a>{" "}
            to get started!
          </Typography.Text>
        }
      >
        {/* Action button */}
        <Space>
          <Button type="primary" size="large" style={{ fontWeight: "bold" }}>
            Create Now
          </Button>
        </Space>
      </Empty>
    </div>
  );
};

export default EmptyPage;
