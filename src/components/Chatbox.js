import classes from './Chatbox.module.css';
import more from '../assets/img/more.png';
import add from '../assets/img/add.png';
import cam from '../assets/img/cam.png';
import attach from '../assets/img/attach.png';
import img from '../assets/img/img.png'; 
import Chats from './Chats';
const Chatbox = (props) => {
    return (
        <div className={classes.chatbox}>

            <div className={classes.header+" "+classes["right-header"]} >
                <div className={classes["user-name"]}>Robin</div>
                <div className={classes.actions}>
                    <img height="25" width="25" src={more} alt="more" />
                    <img height="25" width="25" src={add} alt="add" />
                    <img height="25" width="25" src={cam} alt="cam" />
                </div>
            </div>
            <ul className={classes.chats}>
                <Chats />
                 
            </ul>
            <div className={classes['user-actions']}>
                <input type="text"  placeholder='Type something...'/>
                <div className={classes['user-actions-button']}>
                    <input type="file" name="attachment" id='attachment'/>
                    <input type="file" name="image" id ="img"/>
                    <label htmlFor="attachment">
                        <img  height="25" src={attach} alt="attach" />
                    </label>
                    <label htmlFor="img">
                        <img  height="25" src={img} alt="img" />
                    </label>
                    <input type="submit"  value="Send"/>
                </div>
            </div>
        </div>
    );
};
export default Chatbox;