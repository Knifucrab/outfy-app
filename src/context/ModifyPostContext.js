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
      // console.log("Post liked successfully", response.data);
      return response.data.data; // Return the updated post data
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

  const unlikePost = async (postId) => {
    setLoadingModifyContext(true);

    try {
      const response = await outfyApi.post(`posts/${postId}/unlike`);
      // console.log("Post unliked successfully", response.data);
      return response.data.data; // Return the updated post data
    } catch (error) {
      console.log("Error unliking post", error);
    } finally {
      setLoadingModifyContext(false);
    }
  };

  const commentPost = async (postId, comment) => {
    setLoadingModifyContext(true);
    try {
      const response = await outfyApi.post(`posts/${postId}/comment`, {
        text: comment,
      });
      // console.log(response.data.comments);
      return response.data.comments;
    } catch (error) {
      console.log("error sending comment", error);
    } finally {
      setLoadingModifyContext(false);
    }
  };

  const fetchPostByID = async (postId) => {
    setLoadingModifyContext(true);

    try {
      const response = await outfyApi.get(`posts/${postId}`);
      // console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      console.log("error fetching post by id", error);
    } finally {
      setLoadingModifyContext(false);
    }
  };

  return (
    <ModifyPostContext.Provider
      value={{
        loadingModifyContext,
        likePost,
        unlikePost,
        fetchUserData,
        commentPost,
        fetchPostByID,
      }}
    >
      {children}
    </ModifyPostContext.Provider>
  );
};

export default ModifyPostContext;
