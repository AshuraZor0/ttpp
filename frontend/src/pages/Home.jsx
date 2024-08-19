import React from "react";
import { Link } from "react-router-dom"; // Import Link
import uploaderIcon from "../assets/uploader.jpg"; // Correct path to your image

const Home = ({ isLoggedIn }) => {
  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-cover bg-center text-white"
      style={{
        backgroundImage: "url('/assets/background.jpg')", // Replace with the correct relative path
      }}
    >
      <div className="bg-black bg-opacity-60 p-10 rounded-lg shadow-lg text-center">
        <h1 className="text-5xl font-bold mb-6">Welcome to Media Uploader</h1>

        <p className="text-xl mb-6">
          A simple way to upload and manage your images and videos.
        </p>

        <Link to="/upload" className="block mb-6">
          <img
            src={uploaderIcon}
            alt="Media Icon"
            className="w-40 h-40 object-cover rounded-full mx-auto shadow-md"
          />
        </Link>

        {isLoggedIn ? (
          <>
            <div className="space-y-4 text-lg">
              <p>
                Go to the{" "}
                <Link to="/dashboard" className="text-blue-400 underline">
                  Dashboard
                </Link>{" "}
                to view and manage your uploads.
              </p>
              <p>
                Visit your{" "}
                <Link to="/profile" className="text-blue-400 underline">
                  Profile
                </Link>{" "}
                to see your uploaded media.
              </p>
              <p>
                Explore the{" "}
                <Link to="/gallery" className="text-blue-400 underline">
                  Gallery
                </Link>{" "}
                to view all media.
              </p>
            </div>
          </>
        ) : (
          <p className="text-lg">
            Please{" "}
            <Link to="/login" className="text-blue-400 underline">
              Log In
            </Link>{" "}
            to start uploading your media.
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
