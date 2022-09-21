import Chatbox from '../Chatbox';
import Navbar from '../Navbar';
import Users from '../Users';
import classes from './Home.module.css';

const Home = (props) => {
    return(
        <div className={classes.container}>
            <div className={classes.sidebar}>
                <Navbar />
                <Users />
            </div>
            <Chatbox />
        </div>
    );
};

export default Home;