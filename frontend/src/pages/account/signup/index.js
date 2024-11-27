import React, { useState } from "react";
import loginFormBg from "../../../assets/loginFormBg.png";
import { AccountServiceAPI } from "../account.service";
import SignupForm from "./signUpForm";
import styles from "./styles.module.css";
import Loader from "../../../components/loader";

const Signup = () => {
const [isLoading, setIsLoading] = useState(false);

  const handleFinish = (values) => {
    setIsLoading(true);
    AccountServiceAPI.createAccount(values)
      .then((res) => {
        setIsLoading(false);
        console.log(res);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  return (
    <>
      <div className="flex justify-center items-center h-[100%] bg-white">
      {isLoading && <Loader />}
        <div className="shadow-2xl w-[60%] h-[60%] rounded-2xl grid grid-cols-2 overflow-hidden">
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
              <SignupForm handleFinish={handleFinish} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
