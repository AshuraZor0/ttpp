import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const SignupForm = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function changeHandler(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }
  const submitHandler = async (e) => {
    try {
      e.preventDefault();

      if (formData.password !== formData.confirmPassword) {
        toast.error("Password is not matching");
        return;
      }

      // Remove confirmPassword field from accountData
      const { confirmPassword, ...accountData } = formData;

      console.log("Printing final data");
      console.log(typeof accountData);

      const response = await fetch("http://localhost:3000/blinkit/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(accountData),
      });
      console.log(response);
      const responseData = await response.json();

      //   console.log(responseData.message);
      // Move navigate("/dashboard") inside the fetch completion block

      if (response.ok) {
        setIsLoggedIn(true);
        toast.success("Account Created");
        navigate("/login");
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      console.log("Error in registering", error);
    }
  };

  return (
    <div className="">
      <form onSubmit={submitHandler}>
        <div className="flex gap-4 mt-4 ">
          {/* " contain first name and LastName" */}
          <label className="w-full ">
            <p className="text-[0.875rem] text-white mb-1 leading-[1.375rem]">
              First Name <sup className=" text-pink-600">*</sup>
            </p>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={changeHandler}
              placeholder="Enter your first name"
              className="bg-gray-600 rounded-[0.5rem] text-white w-full p-[12px]"
            />
          </label>

          <label className="w-full">
            <p className="text-[0.875rem] text-white mb-1 leading-[1.375rem]">
              Last Name <sup className=" text-pink-600">*</sup>
            </p>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={changeHandler}
              placeholder="Enter your last name"
              className="bg-gray-600 rounded-[0.5rem] text-white w-full p-[12px]"
            />
          </label>
        </div>

        <label className="w-full ">
          <p className="text-[0.875rem] text-white mb-1 leading-[1.375rem] mt-4 ">
            Email Adress<sup className=" text-pink-600">*</sup>
          </p>
          <input
            required
            type="email"
            name="email"
            value={formData.email}
            onChange={changeHandler}
            placeholder="Enter your email id"
            className="bg-gray-600 rounded-[0.5rem] text-white w-full p-[12px]"
          />
        </label>

        <div className="flex gap-4 mt-4 ">
          <label className="w-full relative">
            <p className="text-[0.875rem] text-white mb-1 leading-[1.375rem]">
              Create Password<sup className=" text-pink-600">*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={changeHandler}
              placeholder="Enter password"
              className="bg-gray-600 rounded-[0.5rem] text-white w-full p-[12px]"
            />

            <span
              className="absolute right-3 top-[38px] cursor-pointer "
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible size={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye size={24} fill="#AFB2BF" />
              )}
            </span>
          </label>

          <label className=" w-full relative">
            <p className="text-[0.875rem] text-white mb-1 leading-[1.375rem]">
              Confirm Password<sup className=" text-pink-600">*</sup>
            </p>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={changeHandler}
              placeholder="Enter password"
              className="bg-gray-600 rounded-[0.5rem] text-white w-full p-[12px]"
            />

            <span
              className="absolute right-3 top-[38px] cursor-pointer "
              onClick={() => {
                setShowConfirmPassword(!showConfirmPassword);
              }}
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible size={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye size={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
        </div>
        <button className="bg-yellow-500 w-full rounded-[8px] font-medium text-black px-[12px] py-[8px] mt-10">
          Create Account
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
