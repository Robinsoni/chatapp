import { Link } from 'react-router-dom';
import avatar from '../../assets/img/addAvatar.png';
const Register = () => {
    return (
        <form className="register">
            <div className="container">
                <h3>Robin Chat</h3>
                    Register
                <input type="text" className="username" placeholder="Username"/>
                <input type="email" className="email" placeholder="Email"/>
                <input type="password" className="password"  placeholder="Password"/>
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