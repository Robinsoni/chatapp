import { doc, updateDoc } from 'firebase/firestore';
import { useContext, useEffect } from 'react';
import { db } from '../Firebase';
import { AuthContext } from './context/AuthContext';
import { ChatContext } from './context/ChatContext';
import classes from './User.module.css';
const User = ({displayName,LastMessage,profileImg,userSelectHandler,payload, unread}) => {
    console.log("unread**",unread);
    return(
        <li  onClick = {() => userSelectHandler(payload)}>
            <img src={profileImg} alt="" width="40" height="40"/>
            <div>
                <div className={classes["user-name"]}>{displayName}</div>
                <div className={classes["last-message"]}><i>{LastMessage.length>30?LastMessage.slice(0,30)+"...":LastMessage}</i></div>
                { unread &&
                    <div className={classes.notif}>
                        <div className={classes["notif-time"]}>just now</div>
                        <div className={classes["blue-dot"]}></div>
                    </div>
                }
            </div>
        </li>
    );
};
export default User;