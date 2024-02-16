import React, { useEffect } from "react";

const Home = ({ isLoggedIn }) => {
  return (
    <div className="flex flex-col  items-center justify-center text-white text-3xl h-full">
      <p>Home</p>

      <p>TO see the images go to Dashboard</p>
      <br />
      <p>you can also see you profile and images Uploaded by you</p>
    </div>
  );
};

export default Home;
