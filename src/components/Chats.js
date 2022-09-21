import classes from './Chats.module.css';
import userImg from '../assets/img/user-image1.jpg';
import { Fragment } from 'react';
const Chat = () => {
    return(
        <Fragment>
        <li className={classes["li-message"] + " "+classes["friends-message"]} >
            <div className={classes["message-container"]}>
                <img className={classes["profile-img"]} height="30" width="30" src={userImg} alt="friend's image" />
                <div className={classes["message"]}>Hi what are you doing?</div>
            </div>
        </li>
        <li className={classes["li-message"] + " "+classes["yours-message"]} >
            <div className={classes["message-container"]}>
                <img className={classes["profile-img"]} height="30" width="30" src={userImg} alt="Your image" />
                <div className={classes["message"]}>I'm good, How are you now?</div>
            </div>
        </li>
         
    </Fragment>
    );
};

const Chats = () => {
return(
    <Chat />
);  
};
export default Chats;