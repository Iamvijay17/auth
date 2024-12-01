import React, { useState } from "react";
import loginFormBg from "../../../assets/loginFormBg.png";
import { AccountServiceAPI } from "../account.service";
import SignupForm from "./signUpForm";
import styles from "./styles.module.css";
import Loader from "../../../components/loader";
import OtpForm from "./otpForm";
import SigninForm from "./signInForm";
import ForgotForm from "./forgotForm";
import ChangePasswordForm from "./changePasswordForm";
import { Alert, Form } from "antd";

const Signup = () => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [showFrom, setShowFrom] = useState('forgot');

  const handleCreateFinish = (values) => {
    setIsLoading(true);
    AccountServiceAPI.createAccount(values)
      .then((res) => {
        setIsLoading(false);
        setShowFrom('otp');
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const handleSigninFinish = (values) => {
    setIsLoading(true);
    AccountServiceAPI.login(values)
      .then((res) => {
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const handleOtpFinish = (values) => {
    setIsLoading(true);
    AccountServiceAPI.verifyOtp(values)
      .then((res) => {
        setIsLoading(false);
        <Alert message="Success" type="success" showIcon />;
      })
      .catch((err) => {
        setIsLoading(false);
        <Alert message="Error" type="error" showIcon />;
      });
  };

  const handleForgotFinish = (values) => {
    setIsLoading(true);
    AccountServiceAPI.forgotPassword(values)
      .then((res) => {
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const handleChangePasswordFinish = (values) => {
    setIsLoading(true);
    AccountServiceAPI.changePassword(values)
      .then((res) => {
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <div className="bg-white ">
        {isLoading && <Loader />}
        <div className="shadow-2xl rounded-2xl grid grid-cols-2 overflow-hidden">
          <div
            className="text-center bg-cover bg-no-repeat h-full flex flex-col items-center px-4"
            style={{ backgroundImage: `url(${loginFormBg})` }}
          >
            <h1 className="font-dancingScript text-5xl text-white font-bold pt-6">
              Wanderlust Voyages
            </h1>
            <h2 className="text-white pt-6 w-[75%] text-center leading-relaxed font-light">
              Travel is the only purchase that enriches you in ways beyond
              material wealth
            </h2>
          </div>

          <div className={`${styles.left} ${styles.right}`}>
            <div className="flex justify-center h-[100%] p-5">
              {
                showFrom === 'signin' && <SigninForm handleFinish={handleSigninFinish} setShowFrom={setShowFrom} form={form}/>
              }
              {
                showFrom === 'signup' && <SignupForm handleFinish={handleCreateFinish} setShowFrom={setShowFrom} form={form}/>
              }
              {
                showFrom === 'otp' && <OtpForm handleFinish={handleOtpFinish} setShowFrom={setShowFrom} form={form}/>
              }
              {
                showFrom === 'forgot' && <ForgotForm handleFinish={handleForgotFinish} setShowFrom={setShowFrom} form={form}/>
              }
              {
                showFrom === 'changepassword' && <ChangePasswordForm handleFinish={handleChangePasswordFinish} setShowFrom={setShowFrom} form={form}/>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
