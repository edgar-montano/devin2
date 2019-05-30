import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_POSTS,
  GET_POST,
  POST_ERROR,
  PROFILE_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  ADD_COMMENT,
  REMOVE_COMMENT
} from "./types";

//get posts (pluaral)
export const getPosts = () => async dispatch => {
  try {
    const res = await axios.get("/api/posts");
    dispatch({ type: GET_POSTS, payload: res.data });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//get post (singular)
export const getPost = postId => async dispatch => {
  try {
    const res = await axios.get(`/api/posts/${postId}`);
    dispatch({ type: GET_POST, payload: res.data });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//add like
export const addLike = postId => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/like/${postId}`);
    dispatch({ type: UPDATE_LIKES, payload: { postId, likes: res.data } });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
//remove like
export const removeLike = postId => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/unlike/${postId}`);
    dispatch({ type: UPDATE_LIKES, payload: { postId, likes: res.data } });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//delete post
export const deletePost = postId => async dispatch => {
  try {
    const res = await axios.delete(`/api/posts/${postId}`);
    dispatch({ type: DELETE_POST, payload: { postId } });
    dispatch(setAlert("Post Removed", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
//add post
export const addPost = formData => async dispatch => {
  const config = {
    header: {
      "Content-Type": "application/json"
    }
  };

  try {
    const res = await axios.post("/api/posts", formData, config);
    dispatch({ type: ADD_POST, payload: res.data });
    dispatch(setAlert("Post Created", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
//add comment
export const addComment = (postId, formData) => async dispatch => {
  const config = {
    header: {
      "Content-Type": "application/json"
    }
  };

  try {
    const res = await axios.post(
      `/api/posts/comment/${postId}`,
      formData,
      config
    );
    dispatch({ type: ADD_COMMENT, payload: res.data });
    dispatch(setAlert("Comment Created", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
