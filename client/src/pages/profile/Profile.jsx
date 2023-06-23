import { useContext, useEffect, useState } from "react";
import "./profile.scss";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import Feed from "../../components/feed/Feed";
import axios from "axios";
import { useParams } from "react-router";
import { AuthContext } from "../../context/authContext";

const Profile = () => {
  const URL = "https://coslike-backend.onrender.com";
  const [user, setUser] = useState({});
  const username = useParams().username;
  const PF = "https://coslike-backend.onrender.com/images/";
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(
    currentUser.following.includes(user?.id)
  );
  const [followings, setFollowings] = useState([]);
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    // Update followed state when currentUser or user.id changes
    setFollowed(currentUser.following.includes(user?.id));
  }, [currentUser, user.id]);

  useEffect(() => {
    // Fetch user data on first render and when username changes
    const fetchUser = async () => {
      const response = await axios.get(
        `${URL}/api/v1/users?username=${username}`
      );
      setUser(response.data);
    };
    fetchUser();
  }, [username]);

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(
          `${URL}/api/v1/users/${user._id}/unfollow`,
          { userId: currentUser._id }
        );
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(
          `${URL}/api/v1/users/${user._id}/follow`,
          { userId: currentUser._id }
        );
        dispatch({ type: "FOLLOW", payload: user._id });
      }
    } catch (error) {
      console.log(error);
    }
    setFollowed(!followed);
  };

  useEffect(() => {
    // Fetch followings data when user._id changes
    const getFollowings = async () => {
      try {
        const followingList = await axios.get(
          `${URL}/api/v1/users/following/${user._id}`
        );
        setFollowings(followingList.data.followingList);
        console.log("follow:", followingList);
      } catch (error) {
        console.log("following list error");
      }
    };
    getFollowings();
  }, [user._id]);

  useEffect(() => {
    // Fetch followers data when user._id changes
    const getFollowers = async () => {
      try {
        const followerList = await axios.get(
          `${URL}/api/v1/users/followers/${user._id}`
        );
        setFollowers(followerList.data);
        //console.log(followerList.data)
      } catch (error) {
        console.log(error);
      }
    };
    getFollowers();
  }, [user._id]);

  return (
    <div className="profile">
      <div className="images">
        <img
          src={user.coverPicture || PF + "default/cover.png"}
          alt=""
          className="cover"
        />
        <img
          src={user.profilePicture || PF + "default/avatar.jpg"}
          alt=""
          className="profilePic"
        />
      </div>
      <div className="profileContainer">
        <div className="userProfileInfo">
          <div className="center">
            <span>{user.username}</span>
            <div className="info">
              <div className="item">
                <ExploreOutlinedIcon />
                <span>{user.location}</span>
              </div>
              <div className="item">
                <AlternateEmailIcon />
                <span>{user.alias}</span>
              </div>
            </div>
            <div className="follow">
              <div className="followers">
                <span> Followers: </span>
                <span>{followers && followers.length}</span>
              </div>
              <div className="followings">
                <span> Following: </span>
                <span>{followings && followings.length}</span>
                {console.log(followings)}
              </div>
            </div>
            {user.username !== currentUser.username && (
              <button onClick={handleClick}>
                {followed ? "Unfollow" : "Follow"}
              </button>
            )}
            {user.username !== currentUser.username && <EmailOutlinedIcon />}
          </div>
        </div>
        <Feed user={username} />
      </div>
    </div>
  );
};

export default Profile;
