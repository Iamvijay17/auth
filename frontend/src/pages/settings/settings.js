import { Button, Form, Input, Select, Switch } from "antd";
import FormBuilder from "antd-form-builder";
import React, { useEffect } from "react";

const SettingsForm = ({ form, initialValues, onFinish }) => {


  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [initialValues]);



  const LanguageSelect = ({ value, onChange }) => {
    return (
      <Select
        placeholder="Select your preferred language"
        value={value}
        onChange={onChange}
        options={[
          { value: "en", label: "English" },
          { value: "es", label: "Spanish" },
          { value: "fr", label: "French" }
        ]}
      />
    );
  };

  // const GenderSelect = ({ value, onChange }) => {
  //   return (
  //     <Select
  //       placeholder="Select your gender"
  //       value={value}
  //       onChange={onChange}
  //       options={[
  //         { value: "male", label: "Male" },
  //         { value: "female", label: "Female" },
  //         { value: "other", label: "Other" }
  //       ]}
  //     />
  //   );
  // };

  
  const meta = {
    columns: 12,
    initialValues: initialValues,
    formItemLayout: null,
    colon: true,
    fields: [
      {
        key: "name",
        label: "Full Name",
        widget: Input,
        placeholder: "Enter your full name",
        colSpan: 3,
        rules: [{ required: true, message: "Please enter your full name" }]
      },
      {
        key: "email",
        label: "Email",
        type: "email",
        widget: Input,
        colSpan: 3,
        placeholder: "Enter your email",
        rules: [{ required: true, message: "Please enter your email" }]
      },
      {
        key: "settings.language",
        label: "Preferred Language",
        widget: LanguageSelect,
        colSpan: 3,
        rules: [
          { required: true, message: "Please select your preferred language" }
        ]
      },
      {
        key: "settings.notificationsEnabled",
        label: "Enable Notifications",
        widget: Switch,
        colSpan: 3,
        valuePropName: "checked", // Ensure Switch works properly
        rules: [
          { required: true, message: "Please enable or disable notifications" }
        ]
      },
      {
        key: "settings.theme",
        label: "Theme",
        widget: Select,
        colSpan: 3,
        placeholder: "Select your theme",
        rules: [{ required: true, message: "Please select a theme" }],
        options: [
          { value: "light", label: "Light" },
          { value: "dark", label: "Dark" }
        ]
      },
      {
        key: "settings.is2FAEnabled",
        label: "Enable Two-Factor Authentication",
        widget: Switch,
        colSpan: 3,
        valuePropName: "checked", // Ensure Switch works properly
        rules: [
          { required: true, message: "Please enable or disable 2FA" }
        ]
      },
      {
        key: "settings.profileVisibility",
        label: "Profile Visibility",
        widget: Select,
        colSpan: 3,
        placeholder: "Set your profile visibility",
        rules: [
          { required: true, message: "Please set your profile visibility" }
        ],
        options: [
          { value: "public", label: "Public" },
          { value: "private", label: "Private" }
        ]
      }
    ]
  };

  const handleSubmit = (values) => {
    console.log("Form values: ", values);
    onFinish(values);
  };

  return (
    <Form layout="vertical" form={form} onFinish={handleSubmit}>
      <FormBuilder meta={meta} />
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
