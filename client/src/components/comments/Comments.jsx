import { AuthContext } from '../../context/authContext';
import './comments.scss';
import CommentForm from '../commentForm/CommentForm.jsx';
import Comment from '../comment/Comment.jsx';
import React, { useContext, useState } from 'react';

const Comments = () => {

    const { user } = useContext(AuthContext);
    const [ content, setContent ]  = useState('');

    const addContent = ( comment ) => {
        let newComment = {
            name: `${user.username}`,
            userId: 1,
            profilePic:`${user.profilePicture}`,
            desc: comment,
            img: ''
        }
        setContent([
            newComment, 
            ...content
        ]);
    }

    return (
        <div className='comments'>
            <CommentForm addComment={addContent}/>
            {content && content.map(comment => (
               <Comment comment={comment} key={comment.id}/>
            ))}
        </div>
    );
};

export default Comments;