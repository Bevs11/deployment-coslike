import './comment.scss';
import { Link } from 'react-router-dom';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { useState } from 'react';

const Comment = ({comment}) => {

    const [ upvote, setUpvote] = useState(0);
    const [ downvote, setDownvote] = useState(0);

    const [ upvoteActive, setUpvoteActive ] = useState(false);
    const [ downvoteActive, setDownvoteActive ] = useState(false);
    
    function upvotedB(){
        if(upvoteActive){
            setUpvoteActive(false)
            setUpvote(upvote - 1)
        }else{
            setUpvoteActive(true)
            setUpvote(upvote + 1)
            if(downvoteActive){
                setDownvoteActive(false)
                setUpvote(upvote + 1)
                setDownvote(downvote - 1)
            }
        }
    }

    function downvotedB(){
        if(downvoteActive){
            setDownvoteActive(false)
            setDownvote(downvote - 1)
        }else{
            setDownvoteActive(true)
            setDownvote(upvote + 1)
            if(upvoteActive){
                setUpvoteActive(false)
                setDownvote(downvote + 1)
                setUpvote(upvote - 1)
            }
        }
    }



    return(
        <div className='comment'>
            <div className='container'>
                <div className='user'>
                    <Link
                        to={`/profile/${comment.userId}`}
                        style={{textDecoration:'none', color:'inherit'}}
                        >
                        <img 
                        src={comment.profilePic} 
                        alt="" 
                        />
                    </Link> 
                </div>
                <div className='content'>
                    <Link
                        to={`/profile/${comment.userId}`}
                        style={{textDecoration:'none', color:'inherit'}}
                        >
                        <span className='name'>
                                {comment.name}
                        </span>
                    </Link>    
                        <p>
                                {comment.desc}
                        </p>
                </div> 
                <div className='info'>
                    <div className='item' onClick={upvotedB}>
                        {upvote ? <KeyboardDoubleArrowUpIcon/> : <KeyboardArrowUpIcon/> }
                        {upvote}
                    </div>
                    <div className='item' onClick={downvotedB}>
                        {downvote ? <KeyboardDoubleArrowDownIcon/> : <KeyboardArrowDownIcon/> }
                        {downvote}
                    </div>
                </div>  
            </div>
        </div>
    );
};

export default Comment;