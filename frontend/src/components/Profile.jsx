import React, { useEffect, useState } from "react";
import Card from "./Card";
import PROFILEIMG from "../assets/login.jpg";

const Profile = () => {
  const [data, setData] = useState(null);
  const [image_data, setImage_data] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/blinkit/getProfile",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const userdata = await response.json();
        setData(userdata.user);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    const imageHandler = async () => {
      try {
        const img = await fetch("http://localhost:3000/blinkit/getprofileimg", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!img.ok) {
          throw new Error(`HTTP error! Status: ${img.status}`);
        }

        const images = await img.json();

        setImage_data(images.user_image);

        // console.log(images.user_image);
      } catch (error) {
        console.error("Error fetching profile images:", error.message);
      }
    };

    fetchData();
    imageHandler();
  }, []);

  return (
    <div className="profile-container bg-white h-screen w-screen">
      <h2 className=" text-center text-[50px] pb-6">User Profile</h2>
      {data && (
        <div className=" shadow-md text-pretty text-lg p-10 flex justify-around">
          <div>
            <p>Username: {data.firstName}</p>
            <p>Email: {data.email}</p>
            <p>😉</p>
          </div>

          <div>
            <img
              src={PROFILEIMG}
              className=" border rounded-full w-36 h-32"
              alt=""
            />
          </div>
        </div>
      )}

      <h3 className="text-center first-letter:text-3xl  text-xl">
        User Images
      </h3>

      <div className="flex flex-wrap justify-center text-white text-sm gap-8 m-7">
        {image_data.map((img) => (
          <Card key={img._id} post={img} />
        ))}
      </div>
    </div>
  );
};

export default Profile;
