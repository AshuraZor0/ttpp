import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
const LoginForm = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [accountData, setaccountData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  function changeHandler(e) {
    setaccountData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  const submitHandler = async (e) => {
    try {
      e.preventDefault();

      console.log("printing the accountData");
      console.log(accountData);

      const response = await fetch("http://localhost:3000/blinkit/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(accountData),
      });
      console.log(response);
      const responseData = await response.json();

      //   console.log(responseData.message);
      // Move navigate("/dashboard") inside the fetch completion block

      if (response.ok) {
        setIsLoggedIn(true);
        toast.success("Logged In");
        navigate("/dashboard");
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      console.log("Error in registering", error);
    }

    navigate("/dashboard");
  };

  return (
    <form
      onSubmit={submitHandler}
      className="flex flex-col w-full gap-y-4 mt-6"
    >
      <label className="w-full">
        <p className="text-[0.875rem] text-white mb-1 leading-[1.375rem]">
          Email Adress<sup className=" text-pink-600">*</sup>
        </p>
        <input
          required
          type="email"
          name="email"
          value={accountData.email}
          onChange={changeHandler}
          placeholder="Enter your email id"
          className=" bg-gray-600 rounded-[0.5rem] text-white w-full p-[12px]"
        />
      </label>

      <label className="w-full relative">
        <p className="text-[0.875rem] text-white mb-1 leading-[1.375rem]">
          Password <sup className=" text-pink-600">*</sup>
        </p>
        <input
          required
          type={showPassword ? "text" : "password"}
          name="password"
          value={accountData.password}
          onChange={changeHandler}
          placeholder="Enter password"
          className="  bg-gray-600 rounded-[0.5rem] text-white w-full p-[12px]"
        />

        <span
          className="absolute right-3 top-[38px] cursor-pointer "
          onClick={() => {
            setShowPassword(!showPassword);
          }}
        >
          {showPassword ? (
            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
          ) : (
            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
          )}
        </span>
        <Link to="/">
          <p className="text-xs mt-1 text-blue-300 max-w-max ml-auto">
            Forget PassWord
          </p>
        </Link>
      </label>

      <div>
        <button className="bg-yellow-500 w-full rounded-[8px] font-medium text-black px-[12px] py-[8px] mt-5">
          Sign In
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
