import React from "react";
import { AppleIcon, FacebookIcon, GoogleIcon } from "../../../components/icons";
import { Divider } from "antd";

const SigninForm = ({ handleFinish, setShowFrom }) => {
  return (
    <div className="flex flex-col w-[60%]">
      <h1 className="text-center p-2 text-6xl font-bold text-primary-color font-inter">Welcome</h1>
      <h6 className="text-center text-gray-400 text-sm">Login with Email</h6>
      <div className="py-7">

      </div>
      <div>

       

        <a href="#f" className="float-right text-slate-300 p-2 text-sm" onClick={() => setShowFrom("forgot")}>
          Forgot Password?
        </a>
      </div>
      <div className="flex justify-center py-2">
        <button className="bg-primary-color text-secondary-color px-4 py-2 rounded-md hover:opacity-90 active:opacity-70">Login</button>
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
        <h6>Don't have an account?</h6>
        <a href="#forgot-password" className="text-slate-300 ml-2" onClick={() => setShowFrom("signup")}>
          Register Now?
        </a>
      </div>
    </div>
  );
};

export default SigninForm;
