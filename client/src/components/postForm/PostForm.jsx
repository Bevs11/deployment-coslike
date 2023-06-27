import "../postForm/postForm.scss";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { Link, useAsyncError } from "react-router-dom";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import MoodIcon from "@mui/icons-material/Mood";
import defaultAvatar from "../../assets/default/avatar.jpg";
import axios from "axios";
import Button from "@mui/material/Button";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { storage } from "../../firebase";

const PostForm = ({ addPost }) => {
  let styles = {
    upload: {
      width: "200px",
      height: "200px",
      position: "absolute",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white",
      border: "1px solid black",
      borderRadius: "10px",
    },
  };

  const URL = "https://coslike-backend.onrender.com";
  const [post, setPost] = useState("");
  const { user } = useContext(AuthContext);
  const desc = useRef();
  const [file, setFile] = useState(null);
  const [uploadAlert, setUploadAlert] = useState(false);
  const [image, setImage] = useState(null);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
      img: image,
    };

    try {
      await axios
        .post(`${URL}/api/v1/posts`, newPost)
        .then(() => {
          alert("Post successfully added");
        })
        .catch((error) => {
          console.log("error:", error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const uploadImage = () => {
    if (file == null) return;
    const fileName = `trialUpload/${file.name + v4()}`;
    const imageRef = ref(storage, fileName);
    uploadBytes(imageRef, file).then((item) => {
      getDownloadURL(item.ref).then((url) => {
        setImage(url);
        setUploadAlert(false);
        setFile(null);
      });
    });
  };

  useEffect(() => {
    if (file !== null) {
      setUploadAlert(true);
    }
  }, [file]);

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
        <div style={{ textAlign: "center", margin: "1rem 0" }}>
          {image && <img src={image} />}
        </div>
        <hr />
        <div className="options">
          <div className="item-nonClick">
            <LiveTvIcon />
            Live video
          </div>
          <label htmlFor="file" className="item">
            {uploadAlert && (
              <div style={styles.upload}>
                <div style={{ margin: "1rem 0" }}>Upload Photo?</div>
                <Button variant="contained" onClick={uploadImage}>
                  Upload
                </Button>
              </div>
            )}
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
          <div className="item-nonClick">
            <MoodIcon />
            Mood
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostForm;
