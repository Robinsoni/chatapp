
import classes from './Navbar.module.css';
import avtar from   '../assets/img/avtar.jpg';
const Navbar = (props) =>{
    return (
        <div className={classes.header+" "+classes["left-header"]}>
            <div className={classes["left-header-container"]}>
                <span>Shikha Chat</span>
                <div>
                    <img height = "23" width="23" src={avtar} alt="avtar" />
                    <span>John Norton</span>
                    <span>logout</span>
                </div>
            </div>
        </div>
    );
};
export default Navbar;