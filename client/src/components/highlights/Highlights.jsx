import { useContext } from 'react';
import './highlights.scss';
import { AuthContext } from '../../context/authContext';
import defaultAvatar from '../../assets/default/avatar.jpg';

const Highlights = () => {

    const { user } = useContext(AuthContext);

    //TEMPORARY DATA
    const highlights = [
        {
            id: 1,
            name: 'Renee',
            img: 'https://hips.hearstapps.com/hmg-prod/images/small-fuffy-dog-breeds-1623362663.jpg?crop=1.00xw:0.753xh;0,0.0719xh&resize=1200:*'
        },
        {
            id: 2,
            name: 'R4SY4N',
            img: 'https://images.unsplash.com/photo-1517232115160-ff93364542dd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FzaW5vfGVufDB8fDB8fA%3D%3D&w=1000&q=80'
        },
        {
            id: 3,
            name: 'Jagger85',
            img: 'https://www.codingdojo.com/blog/wp-content/uploads/react.jpg'
        },
        {
            id: 4,
            name: 'JC',
            img: 'https://cdn.thewirecutter.com/wp-content/media/2023/03/mechanicalkeyboards-2048px-4984.jpg?auto=webp&quality=75&width=1024'
        },
    ];
    return(
        <div className='highlights'>
            <div className="highlight">
                    <img src={user.profilePicture || defaultAvatar } alt="" />
                    <span>{user.username}</span>
                    <button>+</button>
                </div>
            {highlights.map(highlight=>(
                <div className="highlight" key={highlight.id}>
                    <img src={highlight.img} alt="" />
                    <span>{highlight.name}</span>
                </div>
            ))}
        </div>
    );
};

export default Highlights;