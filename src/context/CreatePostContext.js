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

    try {
      const response = await outfyApi.post("posts/createPost", payload);

      setTitle("");
      setDescription("");
      setClothes([]);
      setImage(null);
    } catch (error) {
      // console.log("Error creating post", error);
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
