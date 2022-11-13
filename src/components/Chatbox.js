import classes from './Chatbox.module.css';
import more from '../assets/img/more.png';
import add from '../assets/img/add.png';
import cam from '../assets/img/cam.png';
import attach from '../assets/img/attach.png';
import img from '../assets/img/img.png'; 

import userImg from '../assets/img/user-image1.jpg';
import Chats from './Chats';
import { useContext, useEffect, useRef, useState } from 'react';
import { ChatContext } from './context/ChatContext';
import { AuthContext } from './context/AuthContext';
import { arrayUnion, doc, onSnapshot, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import { db } from '../Firebase';

import { v4 as uuid } from "uuid";
import { async } from '@firebase/util';
 
const Chatbox = (props) => {
    const [chatTexts, setChatTexts] = useState([]);
    const {data:friends_details} = useContext(ChatContext);
    const {currentUser} = useContext(AuthContext);
    const textInputRef = useRef();
    const messageContainerRef = useRef();
    
    const combinedId =  currentUser.uid > friends_details.user.uid
                        ?(currentUser.uid + friends_details.user.uid)
                        :(friends_details.user.uid + currentUser.uid);
        console.log("*** friends_details id", friends_details);
    useEffect(() => {
        const unsub = onSnapshot(doc(db,"chats",combinedId),(doc) =>{
        doc.exists() &&  setChatTexts(doc.data().messages);
        });
        return () => {
            console.log("calling useEffect cleanup function in Chantbox");
          unsub();
        }  
    }, [combinedId]);

    
    
    /* var observer = new IntersectionObserver(function(entries) {
        if(entries[0]['isIntersecting'] === true) {
            if(entries[0]['intersectionRatio'] === 1){
                console.log('Target is fully visible in the screen');
            }
        }
    }, {root:messageContainerRef.current, threshold: [1] });
    observer.observe(document.querySelector(messageContainerRef.current.lastElementChild)); */

    const userMsgHandler = async() => {
        console.log("send message handeler**",textInputRef.current.value);
        try{
            await updateDoc(doc(db,"chats",combinedId),{
                messages: arrayUnion({
                    id:uuid(),
                    text: textInputRef.current.value,
                    senderId: currentUser.uid,
                    date: Timestamp.now(),
                    photoURL : currentUser.photoURL
                })
            });
            await updateDoc(doc(db, "userChat", currentUser.uid), {
                [combinedId + ".lastMessage"]: {
                  text:textInputRef.current.value,
                  unread:false
                },
                [combinedId + ".date"]: serverTimestamp(),
              });
              await updateDoc(doc(db, "userChat", friends_details.user.uid), {
                [combinedId + ".lastMessage"]: {
                  text:textInputRef.current.value,
                  unread:true
                },
                [combinedId + ".date"]: serverTimestamp(),
              });
              textInputRef.current.value = "";
            }catch(err){
                console.log("chatbox** ",err);
            textInputRef.current.value = "";
        }
        
    }
    useEffect(() => {
        messageContainerRef.current.lastElementChild?.scrollIntoView({ behavior: "smooth" });
        if(chatTexts.length > 0){
            updateDoc(doc(db, "userChat", currentUser.uid), {
                [combinedId + ".lastMessage.unread"]: false,   
            });
        }
    }, [chatTexts]);

    
    return (
        <div className={classes.chatbox}>
            <div className={classes.header+" "+classes["right-header"]} >
                <div className={classes["user-name"]}> {friends_details.user.displayName}</div>
                <div className={classes.actions}>
                    <img height="25" width="25" src={more} alt="more" />
                    <img height="25" width="25" src={add} alt="add" />
                    <img height="25" width="25" src={cam} alt="cam" />
                </div>
            </div>
            <ul ref ={messageContainerRef} className={classes.chats}>
                {chatTexts.map(
                    (msg) => {
                         let msgClass = msg.senderId === currentUser.uid ? "yours-message":"friends-message";
                         return(
                             <Chats 
                                 id = {msg.id}
                                 msg_class = {msgClass}
                                 msg_text = {msg.text}
                                 user_img = {msg.photoURL}
                             />
                         );
                    })
                }
            </ul>
            <div className={classes['user-actions']}>
                <input  ref ={textInputRef} type="text"  placeholder='Type something...'/>
                <div className={classes['user-actions-button']}>
                    <input type="file" name="attachment" id='attachment'/>
                    <input type="file" name="image" id ="img"/>
                    <label htmlFor="attachment">
                        <img  height="25" src={attach} alt="attach" />
                    </label>
                    <label htmlFor="img">
                        <img  height="25" src={img} alt="img" />
                    </label>
                    <input type="submit"  onClick = {userMsgHandler} value="Send"/>
                </div>
            </div>
        </div>
    );
};
export default Chatbox;