import {Routes, Route, Navigate} from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
function App() {
  return (
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate replace to="/register" />}/>
          <Route index path="/register" element = {<Register />} />
          <Route index path="/login" element = {<Login />} />
          <Route path="*" element={<h1>404: Page Not Found</h1>} />
        </Routes>
      </div>
  );
}

export default App;
