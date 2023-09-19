import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../../Firebase";
import { useState } from 'react';
const Login = (props) => {
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
            console.log("errdfsdf ** ",err);
            setErr(true);
        }        
    };
    return (
        <form  onSubmit={handleSubmit} className="register">
            <div className="container">
                {ERR && <p style={{color:"red"}}>Login error</p>}
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