
import classes from './Navbar.module.css';
import avtar from   '../assets/img/avtar.jpg';
import { signOut } from 'firebase/auth';
import { auth } from '../Firebase';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
const Navbar = (props) =>{
    const {currentUser} = useContext(AuthContext);
    return (
        <div className={classes.header+" "+classes["left-header"]}>
            <div className={classes["left-header-container"]}>
                <span>Shikha Chat</span>
                <div>
                    <img height = "23" width="23" src={currentUser.photoURL} alt="avtar" />
                    <span>{currentUser.displayName?currentUser.displayName:"None"}</span>
                    <span onClick={() => signOut(auth)}>logout</span>
                </div>
            </div>
        </div>
    );
};
export default Navbar;