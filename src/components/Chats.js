import classes from './Chats.module.css';

import { Fragment } from 'react';
const Chats = ({msg_class,user_img, msg_text}) => {
     
    return(
        <Fragment>
        <li className={classes["li-message"] + " "+classes[msg_class]} >
            <div className={classes["message-container"]}>
                <img className={classes["profile-img"]} height="30" width="30" src={user_img} alt="friend's image" />
                <div className={classes["message"]}>{msg_text}</div>
            </div>
        </li>
        
    </Fragment>
    );
};

 
export default Chats;