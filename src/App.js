import {Routes, Route, Navigate} from 'react-router-dom';
import './App.css';
import Home from './components/Pages/Home';
import Login from './components/Pages/Login';
import Register from './components/Pages/Register';
function App() {
  function loginFormHandeler(e){
    e.preventDefault();
  };

  return (
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate replace to="/register" />}/>
          <Route index path="/home" element = {<Home />} />
          <Route index path="/register" element = {<Register />} />
          <Route index path="/login" element = {<Login login={loginFormHandeler} />} />
          <Route path="*" element={<h1>404: Page Not Found</h1>} />
        </Routes>
      </div>
  );
}

export default App;
