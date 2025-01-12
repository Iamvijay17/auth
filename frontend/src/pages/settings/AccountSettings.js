import { WarningOutlined } from '@ant-design/icons';
import { Alert, Button, Divider, Form, Typography } from 'antd';
import FormBuilder from 'antd-form-builder';
import React from 'react';
const { Title, Text, Paragraph } = Typography;

const AccountSettings = ({form, userById}) => {

  const handleSubmit = (values) => {
    console.log("Form values: ", values);
  };

  const passwordMeta = {
    columns: 6,
    // initialValues: initialValues,
    formItemLayout: null,
    colon: true,
    fields: [
      {
        key: "password",
        label: "Current Password",
        type: "password",
        required: true,
        colSpan: 2
      },
      {
        key: "confirmPassword",
        label: "Confirm Password",
        type: "password",
        required: true,
        colSpan: 2
      }
    ]
  };

  return (
    <div style={{ background: '#fff', padding: '24px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      <Title level={2}>Account Settings</Title>
      <Paragraph>Lorem ipsum dolor sit amet consectetur adipisicing elit.</Paragraph>
      <Divider />

      <Title level={4}>Email Address</Title>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text>
              Your email address is <strong>{userById?.email}</strong>
        </Text>
        <Button type="link">Change</Button>
      </div>
      <Divider />

      <Title level={4}>Password</Title>
      <div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '16px' }}>
          <Form layout="vertical" form={form} onFinish={handleSubmit}>
            <FormBuilder meta={passwordMeta} />
          </Form>
        </div>
        <Text>
              Cant remember your current password?{' '}
          <Button type="link" href="#">
                Recover Account
          </Button>
        </Text>
      </div>
      <Button type="primary" style={{ marginTop: '16px' }} onClick={() => form.submit()}>
              Save Password
      </Button>
      <Divider />

      <Title level={4}>Delete Account</Title>
      <Alert
        message="Proceed with caution"
        description="Make sure you have taken a backup of your account in case you ever need to get access to your data. We will completely wipe your data. There is no way to access your account after this action."
        type="error"
        showIcon
        icon={<WarningOutlined />}
        style={{ marginBottom: '16px' }}
      />
      <Button type="link" danger>
            Continue with deletion
      </Button>
    </div>
  );
};

export default AccountSettings;
