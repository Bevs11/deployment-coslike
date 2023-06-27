import Post from "../post/Post";
import PostForm from "../postForm/PostForm.jsx";
import "./feed.scss";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/authContext";
import Promotion from "../../components/adPromotion/Promotion.jsx";

const Feed = ({ username }) => {
  const URL = "https://coslike-backend.onrender.com";
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const fetchPosts = async () => {
      const response = username
        ? await axios.get(`${URL}/api/v1/posts/profile/${username}`)
        : await axios.get(`${URL}/api/v1/posts/timeline/${user._id}`);
      setPosts(
        response.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [username, user._id]);

  return (
    <div className="feed">
      <PostForm />
      <Promotion />
      {Array.isArray(posts) && posts.map((p) => <Post key={p._id} post={p} />)}
    </div>
  );
};
export default Feed;
