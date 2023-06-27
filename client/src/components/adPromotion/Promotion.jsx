import React, { useState, useEffect, useContext } from "react";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { Link } from "react-router-dom";
import axios from "axios";
import "./promotionStyle.scss";

const initialPost = {
  userId: "6461bf3e6f1deca292fd2fb8",
  desc: "SALE! SALE! SALE!",
  img: "https://th.bing.com/th/id/R.31ba7cc779eb847b2231c27ba7b2be40?rik=21iI%2biCnLzKSsQ&riu=http%3a%2f%2fwww.solidbackgrounds.com%2fimages%2f2560x1440%2f2560x1440-davys-grey-solid-color-background.jpg&ehk=fM5DszD01DvzSYshQkSdC25KEOswWGn%2fJrfKHGz%2b6LU%3d&risl=&pid=ImgRaw&r=0",
  likes: ["6461bf3e6f1deca292fd2fb8"],
};
const initialMerchant = {
  username: "",
  profilePicture:
    "https://th.bing.com/th/id/R.36c755049231a066e1f41dea9b1ca038?rik=6Svf43GgBaFxqQ&riu=http%3a%2f%2fwww.pixelstalk.net%2fwp-content%2fuploads%2f2016%2f04%2fGrey-backgrounds-free-download.jpg&ehk=rqHUZt4Pu3oi1y%2f32QPcFUelNSOXwhzBHZGTubXhXWU%3d&risl=&pid=ImgRaw&r=0",
};
const Promotion = () => {
  const [post, setPost] = useState(initialPost);
  const [merchant, setMerchant] = useState(initialMerchant);
  const URL = "https://coslike-backend.onrender.com";

  const fetchMerchant = async (id) => {
    try {
      const response = await axios.get(`${URL}/api/v1/users?userId=${id}`);
      setMerchant(response.data);
    } catch (error) {
      console.log(`error: merchant fetch failed ${error}`);
    }
  };

  const fetchPromotion = async () => {
    try {
      const response = await axios.get(`${URL}/api/v1/promotions`);
      if (response.status == 200) {
        console.log("ads fetch successful", response);
        setPost(response.data.promotions[response.data.promotions.length - 1]);
        fetchMerchant(
          response.data.promotions[response.data.promotions.length - 1].userId
        );
      } else {
        console.log("no promotions available");
      }
    } catch (error) {
      console.log("fetch data unsucessful", error);
    }
  };

  useEffect(() => {
    fetchPromotion();
  }, []);

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={merchant.profilePicture} alt="profile picture" />
            <div className="details">
              <Link
                to={`/profile/${merchant.username}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{merchant.username}</span>
              </Link>
              <span className="date">promoted</span>
            </div>
          </div>
          <MoreHorizOutlinedIcon />
        </div>
        <div className="content">
          <p>{post.desc}</p>
          {post.img && <img src={post.img} alt="An uploaded img" />}
        </div>
      </div>
    </div>
  );
};

export default Promotion;
