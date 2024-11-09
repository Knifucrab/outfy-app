import React, {createContext, useState} from "react";
import outfyApi from "../api/outfyApi";

const CreatePostContext = createContext();

export const CreatePostProvider = ({children}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [clothes, setClothes] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const createPost = async (title, description, clothes, imageUrl) => {
    setLoading(true);
    const payload = {
      title: title,
      description: description,
      imageUrl: imageUrl,
      clothes: clothes,
    };
    console.log("Creating post with payload:", payload); // Log the payload
    try {
      const response = await outfyApi.post("posts/createPost", payload);
      console.log("Post created successfully", response.data);
      setTitle("");
      setDescription("");
      setClothes([]);
      setImage(null);
    } catch (error) {
      console.log("Error creating post", error);
      if (error.response) {
        console.log("Response data:", error.response.data); // Log the response data
        console.log("Response status:", error.response.status); // Log the response status
        console.log("Response headers:", error.response.headers); // Log the response headers
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <CreatePostContext.Provider
      value={{
        title,
        setTitle,
        description,
        setDescription,
        clothes,
        setClothes,
        image,
        setImage,
        createPost,
        loading,
      }}
    >
      {children}
    </CreatePostContext.Provider>
  );
};

export default CreatePostContext;
