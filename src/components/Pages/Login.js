import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../../Firebase";
import { useContext, useState } from 'react';
import { ChatContext } from '../context/ChatContext';
import MsgContainer from './MsgContainer';
import Spinner from '../Spinner';
const Login = (props) => {
    const {_,dispatch} = useContext(ChatContext); 
    const [firebase_error,setErrorMessage] = useState("");       
    const [ERR,setErr] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const navigate = useNavigate();
    async function handleSubmit(e){
        setIsPending(true);
        e.preventDefault();
        var email       =  e.target[0].value;
        var password    =  e.target[1].value;
        console.log( email, password);
        try{
            await signInWithEmailAndPassword(auth, email, password)
;           navigate("/");
    setIsPending(false);
        }catch(err){
            if(err.message.includes("invalid-email")){
                setErrorMessage("Invalid credentials");
            }else{
                setErrorMessage(err.message.replaceAll("Firebase:","").trim()); 
            }
            console.log("errdfsdf ** ",err);
            setErr(true);
            setIsPending(false);
        }
        dispatch({type:"remove_friend",payload:null});
    };
    return (
        <form  onSubmit={handleSubmit} className="register" style={{position:"relative"}}>
            <div className="container">
                {isPending?<Spinner />: ERR && <MsgContainer msg={firebase_error} color="red"/>}
                <h3>Robin's Chat</h3>
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