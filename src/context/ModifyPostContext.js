import React, {createContext, useState} from "react";
import outfyApi from "../api/outfyApi";
import {useDispatch} from "react-redux";

const ModifyPostContext = createContext();

export const ModifyPostProvider = ({children}) => {
  const [loadingModifyContext, setLoadingModifyContext] = useState(false);
  const dispatch = useDispatch();

  const likePost = async (postId) => {
    setLoadingModifyContext(true);

    try {
      const response = await outfyApi.post(`posts/${postId}/like`);
      console.log("Post liked successfully", response.data);
    } catch (error) {
      console.log("Error liking post", error);
    } finally {
      setLoadingModifyContext(false);
    }
  };

  const fetchUserData = async (userId) => {
    try {
      const response = await outfyApi.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      console.log("Error fetching user data", error);
      return null;
    }
  };

  return (
    <ModifyPostContext.Provider
      value={{
        loadingModifyContext,
        likePost,
        fetchUserData,
      }}
    >
      {children}
    </ModifyPostContext.Provider>
  );
};

export default ModifyPostContext;
