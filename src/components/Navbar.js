
import classes from './Navbar.module.css';
import avtar from   '../assets/img/avtar.jpg';
import { signOut } from 'firebase/auth';
import { auth } from '../Firebase';

import fallbackImg from '../assets/img/fallbackImg.png';
import { useContext, useState } from 'react';
import { AuthContext } from './context/AuthContext';
const Navbar = (props) =>{ 
    const {currentUser} = useContext(AuthContext);
    const [userImg, setUserImg] = useState(currentUser.photoURL);
     function handleImageError(){
        setUserImg(fallbackImg);
     }
    return (
        <div className={classes.header+" "+classes["left-header"]}>
            <div className={classes["left-header-container"]}>
                <span>Robin's Chat</span>
                <div>
                    <img height = "23" width="23" src={userImg} alt="avtar"  onError= {handleImageError}/>
                    <span>{currentUser.displayName?currentUser.displayName:"None"}</span>
                    <span onClick={() => signOut(auth)}>logout</span>
                </div>
            </div>
        </div>
    );
};
export default Navbar;