import { useContext } from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import './App.css';
import { AuthContext } from './components/context/AuthContext';
import Home from './components/Pages/Home';
import Login from './components/Pages/Login';
import Register from './components/Pages/Register';
function App() {
  const {currentUser} = useContext(AuthContext);
  console.log("**currentUser**",currentUser); 
  const ProtectedRoute = ({children}) => {
    if(!currentUser){
      console.log("**protected route", "");
      return <Navigate to="/login"/>
    } 
      return children; 
  } 
  return (
      <div className="App">
        <Routes>
          <Route path='/'>
            <Route index  element = {<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route  path="/login" element = {<Login   />} />
            <Route  path="/register" element = {<Register />} />
            <Route path="*" element={<h1>404: Page Not Found</h1>} />
          </Route>
        </Routes>
      </div>
  );
}

export default App;
