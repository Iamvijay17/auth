import { Button, Divider, Form, Select, Typography } from 'antd';
import FormBuilder from 'antd-form-builder';
import React, { useState } from 'react';

const { Title, Paragraph } = Typography;

const PreferenceSettings = ({ form, userById }) => {
  const [isChanged, setIsChanged] = useState(false); // State to track form changes

  const handleSubmit = (values) => {
    console.log("Form values: ", values);
  };

  // Options for various selects
  const themeOptions = [
    { value: 'light', label: 'Light Theme' },
    { value: 'dark', label: 'Dark Theme' },
    { value: 'system', label: 'System Default' }
  ];

  const currencyOptions = ['USD', 'EUR', 'GBP', 'INR', 'JPY', 'CAD'].map((currency) => ({
    value: currency,
    label: `${currency} - ${currency === 'INR' ? 'Indian Rupee' : currency}`
  }));

  const timezoneOptions = [
    'UTC-12:00', 'UTC-11:00', 'UTC-10:00', 'UTC-09:00',
    'UTC-08:00', 'UTC-07:00', 'UTC-06:00', 'UTC-05:00',
    'UTC+00:00', 'UTC+01:00', 'UTC+02:00', 'UTC+03:00',
    'UTC+04:00', 'UTC+05:30', 'UTC+08:00', 'UTC+09:00',
    'UTC+10:00', 'UTC+12:00'
  ].map((tz) => ({ value: tz, label: tz }));

  // Custom Select Components
  const ThemeSelect = ({ value, onChange }) => (
    <Select
      placeholder="Choose a theme"
      value={value}
      onChange={onChange}
      options={themeOptions}
    />
  );

  const CurrencySelect = ({ value, onChange }) => (
    <Select
      placeholder="Choose a currency"
      value={value}
      onChange={onChange}
      options={currencyOptions}
    />
  );

  const TimezoneSelect = ({ value, onChange }) => (
    <Select
      placeholder="Choose a timezone"
      value={value}
      onChange={onChange}
      options={timezoneOptions}
    />
  );

  const LanguageSelect = ({ value, onChange }) => (
    <Select
      placeholder="Select your preferred language"
      value={value}
      onChange={onChange}
      options={[
        { value: 'en', label: 'English' },
        { value: 'es', label: 'Spanish' },
        { value: 'fr', label: 'French' }
      ]}
    />
  );

  const meta = {
    columns: 6,
    initialValues: userById,
    formItemLayout: null,
    colon: true,
    fields: [
      {
        key: "settings.theme",
        label: "Theme",
        type: "text",
        required: true,
        colSpan: 2,
        widget: ThemeSelect
      },
      {
        key: "settings.language",
        label: "Language",
        type: "text",
        required: true,
        colSpan: 2,
        widget: LanguageSelect,
        placeholder: "Enter your preferred language"
      },
      {
        key: "settings.currency",
        label: "Currency",
        type: "text",
        required: true,
        colSpan: 2,
        widget: CurrencySelect
      },
      {
        key: "settings.timezone",
        label: "Timezone",
        type: "text",
        required: true,
        colSpan: 2,
        widget: TimezoneSelect
      }
    ]
  };

  // Track form changes
  const handleFormChange = (_, allValues) => {
    const hasChanges = JSON.stringify(allValues) !== JSON.stringify(meta.initialValues);
    setIsChanged(hasChanges);
  };

  return (
    <div style={{ background: '#fff', padding: '24px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      <Title level={2}>Preference Settings</Title>
      <Paragraph>
        Customize your preferences such as theme, currency, and timezone for a better experience.
      </Paragraph>
      <Divider />

      <div>
        <Form
          layout="vertical"
          form={form}
          onFinish={handleSubmit}
          onValuesChange={handleFormChange} // Detect form changes
        >
          <FormBuilder meta={meta} />
        </Form>
      </div>

      <Button
        type="primary"
        style={{ marginTop: '16px' }}
        onClick={() => form.submit()}
        disabled={!isChanged} // Disable button if no changes
      >
        Save Changes
      </Button>
    </div>
  );
};

export default PreferenceSettings;
