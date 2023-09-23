import classes from './Chats.module.css';
import fallbackImg from '../assets/img/fallbackImg.png';
import { Fragment, useState } from 'react';
const Chats = ({msg_class,user_img, msg_text}) => {
    console.log("user chat img",user_img);
    const [userImg, setUserImg] = useState(user_img);
     function handleImageError(){
        setUserImg(fallbackImg);
     }
      
    return(
        <Fragment>
        <li className={classes["li-message"] + " "+classes[msg_class]} >
            <div className={classes["message-container"]}>
                <img className={classes["profile-img"]} height="30" width="30" src={userImg }     onError= {handleImageError}  />
                <div className={classes["message"]}>{msg_text}</div>
            </div>
        </li>
        
    </Fragment>
    );
};

 
export default Chats;