import React from "react";

const Card = ({ post }) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-96 w-96  justify-center">
      <a href="#">
        <img
          className="rounded-t-lg mx-auto  w-96   h-72"
          src={post.imageURL}
          alt=""
        />
      </a>
      <div className="p-5">
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-center">
          uploaded by {post.name}😎
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-center">
          ON {post.uploadedAt}😎
        </p>
      </div>
    </div>
  );
};

export default Card;
