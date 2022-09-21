import classes from './User.module.css';
import userImg from '../assets/img/user-image1.jpg';
const User = (props) => {
    return(
        <li>
            <img src={userImg} width="40" height="40"/>
            <div>
                <div className={classes["user-name"]}>Robin Soni</div>
                <div className={classes["last-message"]}>What's up</div>
            </div>
        </li>
    );
};
export default User;