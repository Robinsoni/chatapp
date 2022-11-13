import { Link } from 'react-router-dom';
import avatar from '../../assets/img/addAvatar.png';
import {  createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth,storage, db}  from '../../Firebase';
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { useState } from 'react';
const Register = () => {
    const [ERR,setErr] = useState(false);
    async function formSubmitHandeler(e){
        e.preventDefault();
        var username    =  e.target[0].value;
        var email       =  e.target[1].value;
        var password    =  e.target[2].value;
        var file     =  e.target[3].files[0];
        console.log(username,email, password);
        try{
            const res = await createUserWithEmailAndPassword(auth, email, password);
            console.log("**Result **",res.user.uid);
            const storageRef = ref(storage, username);
            await uploadBytesResumable(storageRef, file).then(  () => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                    try{
                        console.log('File available at', downloadURL);
                        await updateProfile(res.user,{
                            displayName : username,
                            photoURL:downloadURL,
                        });
                        await setDoc(doc(db,"users",res.user.uid),{
                            uid: res.user.uid,
                            displayName: username,
                            email,
                            photoURL:downloadURL,
                        });
                        await setDoc(doc(db,"userChat",res.user.uid),{});
                    }catch(err){
                        console.log("errdfsdf1 ** ",err);
                        setErr(true);
                    }
                });
            });
        }
        catch(err){
            console.log("errdfsdf ** ",err);
            setErr(true);
        }        
    };
    return (
        <form className="register" onSubmit = {formSubmitHandeler}>
            <div className="container">
            {ERR && <p style={{color:"red"}}>Something went wrong</p>}
                <h3>Robin Chat</h3>
                    Register
                <input onFocus = {() => {setErr(false);}} type="text" className="username" placeholder="Username"/>
                <input onFocus = {() => {setErr(false);}} type="email" className="email" placeholder="Email"/>
                <input onFocus = {() => {setErr(false);}} type="password" className="password"  placeholder="Password"/>
                <input type="file"   className="file" id="file" />
                
                <label htmlFor="file" className='avtar' >
                    <img height="30px" src={avatar} alt="avatar" />
                    <span>Add an avatar</span>
                </label>   
                <button type="submit">Sign up</button>
                <p>You do have an account? <Link to="/login">Login</Link></p>  
            </div>
        </form>
    );
};
export default Register;
