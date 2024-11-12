import React, {createContext, useState} from "react";
import outfyApi from "../api/outfyApi";
import {useDispatch} from "react-redux";
import {setUserPosts} from "../actions/userActions";

const CreatePostContext = createContext();

export const CreatePostProvider = ({children}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [clothes, setClothes] = useState([]);
  const [image, setImage] = useState(null);
  const [loadingPostContext, setLoadingPostContext] = useState(false);
  const [posts, setPosts] = useState(null);
  const dispatch = useDispatch();
  const [postCreated, setPostCreated] = useState(false); // State variable to track post creation

  const createPost = async (title, description, clothes, imageUrl) => {
    setLoadingPostContext(true);
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
      setPostCreated(true);
    } catch (error) {
      // console.log("Error creating post", error);
    } finally {
      setLoadingPostContext(false);
    }
  };

  const fetchMyPosts = async () => {
    setLoadingPostContext(true);
    try {
      const response = await outfyApi.get("posts/listMyPosts");
      const postsData = response.data;

      setPosts(postsData);
      dispatch(setUserPosts(postsData));
    } catch (error) {
      console.log("error in listMyPosts", error);
    } finally {
      setLoadingPostContext(false);
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
        loadingPostContext,
        fetchMyPosts,
        postCreated,
        setPostCreated,
      }}
    >
      {children}
    </CreatePostContext.Provider>
  );
};

export default CreatePostContext;
