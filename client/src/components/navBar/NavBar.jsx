import './navBar.scss'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { DarkModeContext } from '../../context/darkModeContext';
import { AuthContext } from '../../context/authContext';
import defaultAvatar from '../../assets/default/avatar.jpg';

const NavBar = () => {

    const { toggle, darkMode } = useContext(DarkModeContext);
    const { user } = useContext(AuthContext);

    return(
        <div className='navbar'>
            <div className='left'>
            <Link to='/home' style={{textDecoration:'none'}}>
                <span>Coslike</span>
            </Link>
        </div>
            <div className='right'>
                {darkMode ? (
                    <LightModeOutlinedIcon onClick={toggle} /> 
                ) : (
                    <DarkModeOutlinedIcon onClick={toggle} />
                )}    
                <div className='user'>
                <Link to={`/profile/${user.username}`}>
                    <img 
                    src={user.profilePicture || defaultAvatar}
                    alt='Profile Picture' />
                </Link>     
                    <span>{user.username}</span>
                </div>
            </div>
        </div>
    );
};

export default NavBar;