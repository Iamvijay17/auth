import React, { useState } from "react";

const OtpForm = ({handleFinish}) => {
    const [otp, setOtp] = useState('')

  const handleChange = (newValue) => {
    setOtp(newValue)
  }

  const handleSubmit = () => {
    handleFinish(otp)
  }

  return (
    <div className="flex flex-col w-[60%]">
      <h1 className="text-center p-2 text-6xl font-bold text-primary-color font-inter">Welcome</h1>
      <h6 className="text-center text-gray-400 text-sm">Enter your OTP</h6>
      <div className="py-7">
        {/* <MuiOtpInput value={otp} onChange={handleChange} /> */}
      </div>
      
      <div className="flex justify-center py-2">
        <button className="bg-primary-color text-secondary-color px-4 py-2 rounded-md hover:opacity-90 active:opacity-70" onClick={handleSubmit}>Verify</button>
      </div>
    
    </div>
  );
};

export default OtpForm;
