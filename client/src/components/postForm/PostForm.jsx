import "../postForm/postForm.scss";
import React, { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { Link, useAsyncError } from "react-router-dom";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import MoodIcon from "@mui/icons-material/Mood";
import defaultAvatar from "../../assets/default/avatar.jpg";
import axios from "axios";

const PostForm = ({ addPost }) => {
  const [post, setPost] = useState("");
  const { user } = useContext(AuthContext);
  const desc = useRef();
  const [file, setFile] = useState(null);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      try {
        await axios.post("http://localhost:8080/api/v1/upload", data);
      } catch (error) {
        console.log(error);
      }
    }

    try {
      await axios.post("http://localhost:8080/api/v1/posts", newPost);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <Link
            className="profileBtn"
            to={`/profile/${user.username}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <img src={user.profilePicture || defaultAvatar} alt="" />
          </Link>
          <form onSubmit={onSubmitHandler}>
            <input
              type="text"
              ref={desc}
              value={post}
              placeholder={`Whats on your mind, ${user.username}?`}
              onChange={(e) => setPost(e.target.value)}
            />
            <button type="submit">Post</button>
          </form>
        </div>
        <hr />
        <div className="options">
          <div className="item">
            <LiveTvIcon />
            Live video
          </div>
          <label htmlFor="file" className="item">
            <InsertPhotoOutlinedIcon />
            Photo/Video
            <input
              style={{ display: "none" }}
              type="file"
              id="file"
              accept=".png,.jpeg,.jpg"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </label>
          <div className="item">
            <MoodIcon />
            Mood
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostForm;
