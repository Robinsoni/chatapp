
import Search from './Search';
import User from './User';
import classes from './Users.module.css';
import userImg from '../assets/img/user-image1.jpg';
import { Fragment, useContext, useEffect, useState } from 'react';
import {db} from "../Firebase";
import { 
    collection, 
    query, 
    where,
    getDocs, 
    getDoc, 
    setDoc, 
    updateDoc, 
    doc, 
    serverTimestamp,  
    onSnapshot
} from "firebase/firestore"; 
import { ChatContext } from './context/ChatContext';
import { AuthContext } from './context/AuthContext';

import { CommonContext } from './context/CommonContext';
var searchedUsers = [];
const hr = <hr key="unique"/>;
const Users = (props) => {
    const {dispatch:commonContextDispatch} = useContext(CommonContext);
    const {data:friends_details,dispatch} = useContext(ChatContext);
    const {currentUser} = useContext(AuthContext);
    const [userChats,setUserChats] = useState([]);
    const [searchedUsersList, setSearchedUsers] = useState(searchedUsers);
    const [isLoading,setIsLoding] = useState(false);
    useEffect(() => {
        if(currentUser.uid ){
            const unsub = onSnapshot(doc(db,"userChat",currentUser.uid),(doc) =>{
                console.log("***** docc", doc.data());
                setUserChats(doc.data());
            });  
            return () => {
                unsub();
            }
        }
    }, [currentUser.uid]);
    
    const userSelectHandler = async (user) => {
       
        setSearchedUsers([]); 
       const combinedId =  currentUser.uid > user.uid
                            ?(currentUser.uid + user.uid)
                            :(user.uid + currentUser.uid);
                            commonContextDispatch({type:"toggle_sidebar"});
       try{
            const res = await getDoc(doc(db,"chats",combinedId));
            dispatch({type:"user_change",payload:user});
            console.log("*** chats try block");
            if(!res.exists()){
                // create a chats collection
                await setDoc(doc(db,"chats", combinedId), {messages:[]});
                // create userChat collection
                await updateDoc(doc(db,"userChat",currentUser.uid),{
                    [combinedId + ".userInfo"]:{
                        uid: user.uid,
                        displayName:user.displayName,
                        photoURL:user.photoURL
                    },
                    [combinedId+".date"]:serverTimestamp(),
                });
                await updateDoc(doc(db,"userChat",user.uid),{
                    [combinedId + ".userInfo"]:{
                        uid: currentUser.uid,
                        displayName:currentUser.displayName,
                        photoURL:currentUser.photoURL, 
                    },
                    [combinedId+".date"]:serverTimestamp(),
                    
                });
            }else{
                /* const userChatDoc = await getDoc(doc(db,"userChat",user.uid))  Pending*/
            }
        } catch(err){console.log("error while creating the userChats ** ", err);}
    };
    const handleQueryResult = async (res) =>{
        setIsLoding(true);
            try{
                    console.log("queryResult",res);
                    const citiesRef = collection(db, "users");
                    const q = query(citiesRef, where("displayName", "==", res));
                    const querySnapshot = await getDocs(q);
                    searchedUsers = [];   
                    setSearchedUsers([]);
                    querySnapshot.forEach((doc) => {
                        searchedUsers.push(
                            <User 
                                key= {doc.data().uid} 
                                profileImg ={doc.data().photoURL} 
                                displayName = {doc.data().displayName} 
                                LastMessage = "" 
                                payload = {doc.data()}
                                userSelectHandler = {userSelectHandler}
                                isSearched = {true}
                            />
                        );
                        console.log(doc.id, " => ", doc.data(), searchedUsers);
                        setSearchedUsers(searchedUsers);
                    });
                    setIsLoding(false);
            }catch(err){
                console.log("**err",err);
                setIsLoding(false);
            };
    }
    console.log("**users list**",searchedUsersList );
    console.log("robins user chat",userChats);
    /* console.log("robins user chat",Object.entries(userChats)); */
    var usersList;
    
        usersList = (userChats? Object.entries(userChats):[]).sort((a,b) => a[1].date - b[1].date ? -1 : 1).map(
            (a) => {
                var unread = a[1].lastMessage && a[1].lastMessage.unread?a[1].lastMessage.unread:false;
                if(friends_details.user.uid == a[1].userInfo.uid){
                    unread = false;
                }
                  return (
                        <User 
                                key = {a[1].userInfo.uid} 
                                profileImg ={a[1].userInfo.photoURL} 
                                displayName={a[1].userInfo.displayName} 
                                LastMessage = {a[1].lastMessage?a[1].lastMessage.text?a[1].lastMessage.text:"":"" } 
                                unread = {unread}
                                payload = {a[1].userInfo}
                                userSelectHandler = {userSelectHandler} 
                                isSearched = {false}
                            />
                  );  
                }
        );
    
    return(
        <div className={classes["users-list"]}>
            <Search handleQueryString = {handleQueryResult} isLoading={isLoading}/>
            <ul>
                {searchedUsersList.length > 0 && [...searchedUsersList,hr] }
                { usersList }
               
            </ul>
        </div>
    );
};
export default Users;