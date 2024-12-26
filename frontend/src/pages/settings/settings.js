import { Button, Col, Form, Row } from "antd";
import FormBuilder from "antd-form-builder";
import React from "react";
import { SettingsInput } from "./components";

const SettingsForm = ({ form, initialValues, onFinish }) => {
  const meta = {
    columns: 12,
    initialValues,
    formItemLayout: null,
    fields: [
      {
        key: "name",
        label: "Full Name",
        widget: SettingsInput,
        placeholder: "Enter your full name",
        rules: [{ required: true, message: "Please enter your full name" }]
      },
      {
        key: "email",
        label: "Email",
        type: "email",
        widget: SettingsInput,
        placeholder: "Enter your email",
        rules: [{ required: true, message: "Please enter your email" }]
      },
      {
        key: "email",
        label: "Email",
        type: "email",
        widget: SettingsInput,
        placeholder: "Enter your email",
        rules: [{ required: true, message: "Please enter your email" }]
      }
    ]
  };

  const handleSubmit = (values) => {
    console.log("Form values: ", values);
  };

  return (
   
    <Form
      layout="vertical"
      form={form}
      onFinish={handleSubmit}
      style={{ width: "100%" }}
    >
      <Row gutter={[16, 16]}>
        {meta.fields.map((field, index) => (
          <Col
            xs={24} // Full width on small screens
            sm={12} // Half width on medium screens
            lg={8} // One-third width on larger screens
            key={index}
          >
            <FormBuilder meta={field} form={form} />
          </Col>
        ))}
      </Row>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Button
          type="primary"
          htmlType="submit"
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            borderRadius: "5px"
          }}
        >
            Save Settings
        </Button>
      </div>
    </Form>
  );
};

export default SettingsForm;
