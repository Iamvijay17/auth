import React from "react";
import { AppleIcon, FacebookIcon, GoogleIcon } from "../../components/icons";
import { Divider, Form, Input } from "antd";

const ChangePasswordForm = ({ handleFinish, setShowFrom, form }) => {

  const handleSubmit = (values) => {
    handleFinish(values);
  };


  return (
    <div className="flex flex-col">
      <Form
        name="basic"
        onFinish={handleSubmit}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <h1 className="text-center p-2 text-6xl font-bold text-primary-color font-inter">Welcome</h1>
        <h6 className="text-center text-gray-400 text-sm">Enter your new Password</h6>
        <div className="pt-7">
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please enter your password!'
              }
            ]}
          >
            <Input placeholder="Password" size="large"/>
          </Form.Item>
        </div>
        <div className="pb-3">
          <Form.Item
            name="newPassword"
            rules={[
              {
                required: true,
                message: 'Please enter your New Password!'
              }
            ]}
          >
            <Input placeholder="New Password" size="large" type="password"/>
          </Form.Item>
        </div>
        <div className="flex justify-center py-2">
          <button className="bg-primary-color text-secondary-color px-4 py-2 rounded-md hover:opacity-90 active:opacity-70">Next</button>
        </div>
        <Divider className="text-slate-300">OR</Divider>

        <div className="flex justify-center py-4 gap-7">
          <button disabled={true} className="bg-primary-color-light text-secondary-color px-4 py-2 rounded-md hover:opacity-90 active:opacity-70">
            {<GoogleIcon width={22} height={22} />}
          </button>
          <button className="bg-primary-color-light text-secondary-color px-4 py-2 rounded-md hover:opacity-90 active:opacity-70">
            {<FacebookIcon width={24} height={24} />}
          </button>
          <button className="bg-primary-color-light text-secondary-color px-4 py-2 rounded-md hover:opacity-90 active:opacity-70">
            {<AppleIcon width={24} height={24} />}
          </button>
        </div>

        <div className="flex justify-center text-sm">
          <h6>Dont have an account?</h6>
          <a href="#forgot-password" className="text-slate-300 ml-2" onClick={() => setShowFrom("signup")}>
          Register Now?
          </a>
        </div>
      </Form>
    </div>
  );
};

export default ChangePasswordForm;
