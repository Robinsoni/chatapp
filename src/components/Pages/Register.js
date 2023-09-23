import { Link } from 'react-router-dom';
import avatar from '../../assets/img/addAvatar.png';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from '../../Firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useState } from 'react';
import MsgContainer from './MsgContainer';
import Spinner from '../Spinner';
const Register = () => {
    const [ERR, setMsg] = useState(false);
    const [firebase_msg, setMessage] = useState({ msg: "", color: "red" });
    const [isPending, setIsPending] = useState(false);

    async function formSubmitHandeler(e) {
        setIsPending(true);
        e.preventDefault();
        var username = e.target[0].value;
        var email = e.target[1].value;
        var password = e.target[2].value;
        var file = e.target[3].files[0];
        console.log(username, email, password);
        try {
            
            const res = await createUserWithEmailAndPassword(auth, email, password);
            console.log("**Result **", res.user.uid);
            const storageRef = ref(storage, username);
            await uploadBytesResumable(storageRef, file).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                    try {
                        console.log('File available at', downloadURL);
                        await updateProfile(res.user, {
                            displayName: username,
                            photoURL: downloadURL,
                        });
                        await setDoc(doc(db, "users", res.user.uid), {
                            uid: res.user.uid,
                            displayName: username,
                            email,
                            photoURL: downloadURL,
                        });
                        await setDoc(doc(db, "userChat", res.user.uid), {});
                        setMsg(true);
                        setMessage({ msg: "User created successfully, click on login link below.", color: "black" });
                        setIsPending(false);
                    } catch (err) {
                        setMsg(true);
                        setMessage({ msg: "You don't have permission to create new user", color: "red" });
                        console.log("errdfsdf1 ** ", err);
                        setIsPending(false);
                    }
                });
            });

        }
        catch (err) {
            if (err.message.includes("email-already-in-use")) {
                setMessage({ msg: "Email already in use", color: "red" });
            } else {
                setMessage({ msg: err.message.replaceAll("Firebase:", "").trim(), color: "red" });
            }
            console.log("errdfsdf ** ", err.message);
            setMsg(true);
            setIsPending(false);
        }
    };
    return (

        <form className="register" onSubmit={formSubmitHandeler} style={{ position: "relative" }}>
            <div className="container">
                {
                isPending?<Spinner />:    ERR &&
                    <MsgContainer msg={firebase_msg.msg} color={firebase_msg.color} />
                }
                <h3>Robin Chat</h3>
                Register
                <input onFocus={() => { setMsg(false); }} type="text" className="username" placeholder="Username" />
                <input onFocus={() => { setMsg(false); }} type="email" className="email" placeholder="Email" />
                <input onFocus={() => { setMsg(false); }} type="password" className="password" placeholder="Password" />
                <input type="file" className="file" id="file" />

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
