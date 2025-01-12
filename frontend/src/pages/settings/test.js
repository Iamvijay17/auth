import React from 'react';
import { Menu, Input, Button, Typography, Divider, Alert } from 'antd';
import {
  UserOutlined,
  TeamOutlined,
  BellOutlined,
  SettingOutlined,
  WalletOutlined,
  SafetyOutlined,
  WarningOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

const Test = () => {
  const menuItems = [
    { key: 'teams', icon: <TeamOutlined />, label: 'Teams' },
    { key: 'accounts', icon: <UserOutlined />, label: 'Accounts' },
    { key: 'users', icon: <UserOutlined />, label: 'Users' },
    { key: 'profile', icon: <SettingOutlined />, label: 'Profile' },
    { key: 'billing', icon: <WalletOutlined />, label: 'Billing' },
    { key: 'notifications', icon: <BellOutlined />, label: 'Notifications' },
    { key: 'integrations', icon: <SafetyOutlined />, label: 'Integrations' }
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: 'auto', padding: '16px', minHeight: '100vh' }}>
      <Title level={1} style={{ borderBottom: '2px solid #f0f0f0', paddingBottom: '16px' }}>
        Settings
      </Title>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '16px', marginTop: '24px' }}>
        <Menu
          style={{ width: 256 }}
          defaultSelectedKeys={['accounts']}
          mode="inline"
          items={menuItems}
        />
        <div style={{ background: '#fff', padding: '24px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <Title level={2}>Account Settings</Title>
          <Paragraph>Lorem ipsum dolor sit amet consectetur adipisicing elit.</Paragraph>
          <Divider />

          <Title level={4}>Email Address</Title>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text>
              Your email address is <strong>john.doe@company.com</strong>
            </Text>
            <Button type="link">Change</Button>
          </div>
          <Divider />

          <Title level={4}>Password</Title>
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '16px' }}>
              <Input.Password placeholder="Current Password" />
              <Input.Password placeholder="New Password" />
            </div>
            <Text>
              Cant remember your current password?{' '}
              <Button type="link" href="#">
                Recover Account
              </Button>
            </Text>
            <Button type="primary" style={{ marginTop: '16px' }}>
              Save Password
            </Button>
          </div>
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
      </div>
    </div>
  );
};

export default Test;
