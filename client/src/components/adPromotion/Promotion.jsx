import React, { useState, useEffect, useContext } from "react";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { Link } from "react-router-dom";
import axios from "axios";
import "./promotionStyle.scss";

const initialPost = {
  userId: "6461bf3e6f1deca292fd2fb8",
  desc: "SALE! SALE! SALE!",
  img: "https://topflite.co.nz/wp-content/uploads/2019/09/Of-course-dogs-smile.jpg",
  likes: ["6461bf3e6f1deca292fd2fb8"],
};
const initialMerchant = {
  username: "Doogy Doo",
  profilePicture:
    "https://th.bing.com/th/id/OIP.0MgUU2M1C8f8vQUKG_Y47QHaEi?pid=ImgDet&rs=1",
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
