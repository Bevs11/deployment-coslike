import React, { useState, useEffect, useContext } from 'react';
import './post.scss';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import { Link } from 'react-router-dom';
import Comments from '../comments/Comments';
import axios from 'axios';
import { format } from 'timeago.js'
import { AuthContext } from '../../context/authContext';

const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [like, setLike] = useState(0);
  const [likeActive, setLikeActive] = useState(false);
  const [dislike, setDislike] = useState(0);
  const [dislikeActive, setDislikeActive] = useState(false);
  const [user, setUser] = useState({});
  const { user: currentUser } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  
  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`http://localhost:8080/api/v1/users?userId=${post.userId}`);
      setUser(response.data);
    };
    fetchUser();
  }, [post.userId]);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/posts/${post._id}/likes`);
        setLike(response.data.likes.length);
        setLikeActive(response.data.likes.includes(currentUser._id));
      } catch (error) {
        console.log(error);
      }
    };

    const fetchDislikes = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/posts/${post._id}/dislikes`);
        setDislike(response.data.dislikes.length);
        setDislikeActive(response.data.dislikes.includes(currentUser._id));
      } catch (error) {
        console.log(error);
      }
    };

    fetchLikes();
    fetchDislikes();
  }, [currentUser._id, post._id]);

  function toggleComment() {
    setCommentOpen(!commentOpen);
  }

  function likeHandler() {
    try {
      axios.put(`http://localhost:8080/api/v1/posts/${post._id}/like`, {userId: currentUser._id})
          .then(response => {
            setLike(prevLikes => {
              if (likeActive) {
                return prevLikes - 1;
              } else {
                return prevLikes + 1;
              }
            });
            setLikeActive(!likeActive);
          })
    } catch (error) {
      console.log(error)
    }
  }
  
  const dislikeHandler = async () => {
    try {
      axios.put(`http://localhost:8080/api/v1/posts/${post._id}/dislike`, {userId: currentUser._id})
          .then(response => {
            setDislike(prevDislikes => {
              if (dislikeActive) {
                return prevDislikes - 1;
              } else {
                return prevDislikes + 1;
              }
            });
            setDislikeActive(!dislikeActive);
          });
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='post'>
      <div className='container'>
        <div className='user'>
          <div className='userInfo'>
            <img src={user.profilePicture 
              ? user.profilePicture
              : PF + 'assets/default/avatar/jpg'
              } 
              alt='' 
              />
            <div className='details'>
              <Link to={`/profile/${user.username}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <span className='name'>{user.username}</span>
              </Link>
              <span className='date'>{format(post.createdAt)}</span>
            </div>
          </div>
          <MoreHorizOutlinedIcon  />
        </div>
        <div className='content'>
          <p>{post.desc}</p>
          { post.img && <img src={PF + post.img} alt='An uploaded img' />}
        </div>
        <div className='info'>
          <div className='item' onClick={likeHandler}>
            {likeActive ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
            {like}
          </div>
          <div className='item' onClick={dislikeHandler}>
            {dislikeActive ? <ThumbDownIcon /> : <ThumbDownOffAltIcon />}
            {dislike}
          </div>
          <div className='item' onClick={toggleComment}>
            <CommentIcon />
          </div>
          <div className='item'>
            <ShareIcon />
          </div>
        </div>
        {commentOpen && <Comments postId={post.id} />}
      </div>
    </div>
  );
};
export default Post;
