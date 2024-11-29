import { Form, Input } from "antd";
import React, { useState } from "react";
const {OTP} = Input;
const OtpForm = ({handleFinish, form}) => {
  const [otp, setOtp] = useState('');

  const handleSubmit = () => {
    handleFinish(otp);
    console.log(otp);
  };
  return (
    <div className="flex flex-col w-[60%]">
      <Form
        name="basic"
        initialValues={{
          remember: true
        }}
        form={form}
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <h1 className="text-center p-2 text-6xl font-bold text-primary-color font-inter">Welcome</h1>
        <h6 className="text-center text-gray-400 text-sm">Enter your OTP</h6>
        <div className="pt-[3rem]">
          <Form
            name="basic"
            onFinish={handleSubmit}
            autoComplete="off"
          >
            <Form.Item
              name="otp"
              rules={[
                {
                  required: true,
                  message: 'Please enter your OTP!'
                }
              ]}
            >
              <OTP name="otp" value={otp} variant="filled" onChange={(e) => setOtp(e)} length={6} size="large"/>
            </Form.Item>
          </Form>
        </div>
      
        <a href="#f" className=" text-slate-300 text-sm m-[-1rem] ml-auto hover:text-primary-color" disabled onClick={() => {}}>
          Resend
        </a>

        <div className="flex justify-center">
          <button disabled={!otp} className="bg-primary-color disabled:opacity-50 text-secondary-color px-4 py-2 rounded-md hover:opacity-90 active:opacity-70" onClick={()=> form.submit()}>Verify</button>
        </div>
      </Form>
    </div>
  );
};

export default OtpForm;
