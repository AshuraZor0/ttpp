import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";

const Card = ({ post }) => {

  const [liked, setLiked] = useState(0);
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-96 w-96  justify-center">
      <a href="#">
        <img
          className="rounded-t-lg mx-auto  w-96   h-72"
          src={post.imageURL}
          alt=""
        />
      </a>
      <div className="flex justify-evenly items-center">

      <div className="p-5">
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-center">
          uploaded by {post.name}😎
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-center">
          ON {post.uploadedAt}😎
        </p>
      </div>
      <div>
        <button onClick={() => setLiked(1 ^ liked)}>
          {liked ? <FaHeart size={24} color="red" /> : <FaRegHeart size={24} color="red" />}
        </button>
      </div>
      </div>
    
      
    </div>
  );
};

export default Card;
