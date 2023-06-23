import '../commentForm/commentForm.scss';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import { Link } from 'react-router-dom';
import defaultAvatar from '../../assets/default/avatar.jpg';

const CommentForm = ({addComment}) => {
    
    const [ comment, setComment ] = useState('');
    const { user } = useContext (AuthContext);

    const onSubmitHandler = (event) => {
        event.preventDefault();
        addComment(comment);
    }

    return(
        <div className='comments'>
            <div className='container'>
                <div className='write'>
                    <Link
                        className='profileBtn'
                        to={`/profile/${user.username}`}
                        style={{textDecoration:'none', color:'inherit'}}>
                        <img 
                        src={user.profilePicture || defaultAvatar} 
                        alt="" />
                    </Link>
                    <form onSubmit={ onSubmitHandler }>
                        <input 
                        type='text'
                        value={ comment }
                        placeholder= 'Write a comment'
                        onChange={ e => setComment(e.target.value)} 
                        />
                        <button>Comment</button>
                    </form>
                </div>
            </div> 
        </div>
    );
};

export default CommentForm;