import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../../Firebase";
import { useContext, useState } from 'react';
import { ChatContext } from '../context/ChatContext';
const Login = (props) => {
    const {_,dispatch} = useContext(ChatContext); 
    const [firebase_error,setErrorMessage] = useState("");       
    const [ERR,setErr] = useState(false);
    const navigate = useNavigate();
    async function handleSubmit(e){
        e.preventDefault();
        var email       =  e.target[0].value;
        var password    =  e.target[1].value;
        console.log( email, password);
        try{
            await signInWithEmailAndPassword(auth, email, password)
;           navigate("/");
        }catch(err){
            if(err.message.includes("invalid-email")){
                setErrorMessage("Invalid credentials");
            }else{
                setErrorMessage("Something error"); 
            }
            console.log("errdfsdf ** ",err);
            setErr(true);
        }
        dispatch({type:"remove_friend",payload:null});
    };
    return (
        <form  onSubmit={handleSubmit} className="register">
            <div className="container">
                {ERR && <p style={{color:"red"}}>{firebase_error}</p>}
                <h3>Firebase Chat</h3>
                    Login
                <input onFocus = {() => {setErr(false);}} type="text" className="email" placeholder="Email"/>
                <input  onFocus = {() => {setErr(false);}} type="password" className="password"  placeholder="Password"/>  
                <button onFocus = {() => {setErr(false);}} type="submit">Login</button>
                <p>
                    Don't have an account? <Link to="/register">Sign Up</Link>
                </p>
            </div>
        </form>
    );
};
export default Login;