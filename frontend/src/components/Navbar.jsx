import React from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { CgProfile } from "react-icons/cg";

const Navbar = (props) => {
  let isLoggedIn = props.isLoggedIn;
  let setIsLoggedIn = props.setIsLoggedIn;

  const logOutHandler = async () => {
    const response = await fetch("http://localhost:3000/blinkit/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (response.ok) {
      setIsLoggedIn(false);
      toast.success("Logged Out");
    }
  };

  return (
    <div className="flex justify-between items-center w-11/12 max-w-[1160px] py-4 mx-auto ">
      <Link to="/">
        <p className=" text-zinc-100 font-bold">Image_Gallery</p>
      </Link>
      <nav>
        <ul className=" text-white flex gap-x-6">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/">About</Link>
          </li>
          <li>
            <Link to="/">Contact</Link>
          </li>
        </ul>
      </nav>
      <div className="flex item-center gap-x-4 text-white">
        {!isLoggedIn && (
          <Link to="/login">
            <button
              className=" bg-gray-600 py-[8px] px-[12px]
            rounded-[8px] border border-gray-600"
            >
              Login
            </button>
          </Link>
        )}
        {!isLoggedIn && (
          <Link to="/signup">
            <button
              className=" bg-gray-600 py-[8px] px-[12px]
            rounded-[8px] border border-gray-600"
            >
              Signup
            </button>
          </Link>
        )}
        {isLoggedIn && (
          <Link to="/">
            <button
              onClick={logOutHandler}
              className=" bg-gray-600 py-[8px] px-[12px]
            rounded-[8px] border border-gray-600"
            >
              Logout
            </button>
          </Link>
        )}
        {isLoggedIn && (
          <div className="flex gap-7 items-center">
            <Link to="/dashboard">
              <button
                className=" bg-gray-600 py-[8px] px-[12px]
            rounded-[8px] border border-gray-600"
              >
                Dashboard
              </button>
            </Link>

            <Link to="/upload">
              <FaCloudUploadAlt size={34} />
            </Link>
            <Link to="/profile">
              <CgProfile size={34} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
