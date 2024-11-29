import React, { useState } from "react";
import { AppleIcon, FacebookIcon, GoogleIcon } from "../../../components/icons";
import { Divider } from "antd";

const SignupForm = ({ handleFinish, setShowFrom }) => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };
  console.log(handleChange);
  const handleSubmit = (e) => {
    e.preventDefault();
    handleFinish(formData);
  };

  return (
    <div className="flex flex-col w-[60%]">
      <h1 className="text-center p-2 text-6xl font-bold text-primary-color font-inter">Welcome</h1>
      <h6 className="text-center text-gray-400 text-sm">Signup with Email</h6>
      <form onSubmit={handleSubmit}>
        <div className="py-2">
       
        </div>
        <div className="py-5">
        
        </div>
        <div>
       
        </div>
      </form>
      <div className="flex justify-center py-6">
        <button className="bg-primary-color text-secondary-color px-4 py-2 rounded-md hover:opacity-90 active:opacity-70" onClick={handleSubmit}>Signup</button>
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
        <h6>Already have an account?</h6>
        <a href="#forgot-password" className="text-slate-300 ml-2" onClick={() => setShowFrom("signin")}>
          Login?
        </a>
      </div>
    </div>
  );
};

export default SignupForm;
