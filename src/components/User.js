import { doc, updateDoc } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';

import fallbackImg from '../assets/img/fallbackImg.png';
import { db } from '../Firebase';
import { AuthContext } from './context/AuthContext';
import { ChatContext } from './context/ChatContext';
import classes from './User.module.css';
const User = ({displayName,LastMessage,profileImg,userSelectHandler,payload, unread,isSearched}) => {
    
    const [userImg, setUserImg] = useState(profileImg);
    const [isImageLoaded, setIsImageLoaded] =  useState(false);
     function handleImageError(){
        setUserImg(fallbackImg);
     }
     function imgLoaded(){
     
        setIsImageLoaded(true);
     }
    console.log("unread**",unread);
    var Imgsrc = isImageLoaded?userImg:fallbackImg;
    return(
        <li  onClick = {() => userSelectHandler(payload)}>
            <img src={Imgsrc} alt="" width="40" height="40"  onLoad = {imgLoaded} onError= {handleImageError}/>
            <div>
                <div className={classes["user-name"]}>{displayName}</div>
                <div className={classes["last-message"]}><i>{LastMessage.length>30?LastMessage.slice(0,30)+"...":LastMessage}</i></div>
                {  unread &&
                    <div className={classes.notif}> 
                        <div className={classes["blue-dot"]}></div>
                    </div>
                }
                {isSearched && <span>Add User</span>}
            </div>
        </li>
    );
};
export default User;