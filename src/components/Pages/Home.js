import { useContext } from 'react';
import Chatbox from '../Chatbox';
import Navbar from '../Navbar';
import Users from '../Users';
import classes from './Home.module.css';
import { CommonContext } from '../context/CommonContext';
const Home = (props) => {
    const {data} = useContext(CommonContext);
    console.log("Homestate =**",data); 
    return(
        <div className={classes.container}>
            {
                data.toggle_sidebar && 
                <div className={classes.sidebar}>
                    <Navbar />
                    <Users />
                </div>
            }
            <Chatbox />
        </div>
    );
};

export default Home;