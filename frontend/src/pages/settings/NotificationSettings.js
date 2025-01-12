import React from 'react';
import { SmileTwoTone } from '@ant-design/icons';
import { Button, Result } from 'antd';

const NotificationSettings = () => {
  return (
    <div>
      <Result
        icon={<SmileTwoTone twoToneColor='#009EE2'/>}
        title="Currently not available, coming soon!"
        extra={<Button type="primary">Next</Button>}
      />
    </div>
  );
};

export default NotificationSettings;
