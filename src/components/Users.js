
import User from './User';
import classes from './Users.module.css';
const Users = (props) => {
    return(
        <div className={classes["users-list"]}>
            <div>Find a user</div>
            <ul>
                <User />
                <User />
                <User />
                <User />
                <User />
                <User />
                <User />
                <User />
                <User />
                <User />
                <User />
                <User />
                <User />
                <User />
                <User />
                <User />
                <User />
            </ul>
        </div>
    );
};
export default Users;