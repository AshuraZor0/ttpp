import React, { useState } from "react";
import { toast } from "react-hot-toast";
const Upload = () => {
  const [img, setImg] = useState(null);

  const fileHandler = (e) => {
    const file = e.target.files[0];
    setImg(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Image", img);

    try {
      const response = await fetch(
        "http://localhost:3000/blinkit/imageUpload",
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );

      //console.log("ye Upload27 line main", response);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      toast.success(data.message);
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={fileHandler} />
      <button type="submit">Upload</button>
    </form>
  );
};

export default Upload;
