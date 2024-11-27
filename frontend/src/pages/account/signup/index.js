import React from "react";
import SignupForm from "./signForm";

const Signup = () => {
  return (
    <>
      <div className="flex justify-center items-center h-[100%] bg-white">
        <div className="shadow-2xl w-[60%] h-[60%] rounded-2xl grid grid-cols-2 overflow-hidden">
          <div>
            <img
              className="w-[100%] h-[100%] object-cover"
              src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              alt=""
            />
          </div>
          <div>
            <div className="flex justify-center h-[100%] p-5">
              <SignupForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
