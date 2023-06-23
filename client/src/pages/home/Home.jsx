import Highlights from '../../components/highlights/Highlights';
import Feed from '../../components/feed/Feed';
import './home.scss';

const Home = () => {

    return(
        <div className='home'>
            <Highlights/>
            <Feed/>
        </div>
    );
};

export default Home;