import outfyApi from "../api/outfyApi";

export const SET_POSTS = "SET_POSTS";

export const setPosts = (posts) => ({
  type: SET_POSTS,
  payload: posts,
});

export const fetchPosts = () => async (dispatch) => {
  try {
    const response = await outfyApi.get("/posts/listAllPosts");
    dispatch(setPosts(response.data.data));
  } catch (error) {
    console.error("Error fetching posts", error);
  }
};
