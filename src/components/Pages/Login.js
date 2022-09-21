import { Link } from 'react-router-dom';
const Login = (props) => {
    return (
        <form  onSubmit={props.login} className="register">
            <div className="container">
                <h3>Robin Chat</h3>
                    Login
                <input type="text" className="email" placeholder="Email"/>
                <input type="password" className="password"  placeholder="Password"/>  
                <button type="submit">Login</button>
                <p>
                    Don't have an account? <Link to="/register">Sign Up</Link>
                </p>
            </div>
        </form>
    );
};
export default Login;