import React, { useState } from "react";

import {
  BellOutlined,
  SafetyOutlined,
  SettingOutlined,
  TeamOutlined,
  UserOutlined,
  WalletOutlined
} from '@ant-design/icons';
import { Form, Menu, Typography } from 'antd';
import AccountSettings from "./AccountSettings";
import ProfileSettings from "./ProfileSettings";
import { useSelector } from "react-redux";
import BillingSettings from "./BillingSettings";
import NotificationSettings from "./NotificationSettings";
import PreferenceSettings from "./PreferenceSettings";

const { Title, Paragraph } = Typography;

const Settings = () => {
  const userById = useSelector((state) => state.userById);
  const [selectedKey, setSelectedKey] = useState("accounts");

  const [form] = Form.useForm();

  const menuItems = [
    { key: 'teams', icon: <TeamOutlined />, label: 'Teams', disabled: true },
    { key: 'accounts', icon: <UserOutlined />, label: 'Accounts' },
    { key: 'profile', icon: <SettingOutlined />, label: 'Profile' },
    { key: 'billing', icon: <WalletOutlined />, label: 'Billing' },
    { key: 'notifications', icon: <BellOutlined />, label: 'Notifications' },
    { key: 'preference', icon: <BellOutlined />, label: 'Preference' },
    { key: 'integrations', icon: <SafetyOutlined />, label: 'Integrations', disabled: true }
  ];


  const renderContent = () => {
    switch (selectedKey) {
    case "accounts":
      return <AccountSettings form={form} userById={userById["data"]}/>;
    case "profile":
      return <ProfileSettings form={form} userById={userById["data"]}/>;
    case "billing":
      return <BillingSettings form={form} userById={userById["data"]}/>;
    case "preference":
      return <PreferenceSettings form={form} userById={userById["data"]}/>;
    case "notifications":
      return <NotificationSettings form={form} userById={userById["data"]}/>;
    default:
      return (
        <Paragraph>
            Please select a menu item to view the settings.
        </Paragraph>
      );
    }
  };

  return (
    <>
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
            onClick={(e) => setSelectedKey(e.key)}
          />
          {renderContent()}
        </div>
      </div>

    </>
  );
};

export default Settings;
