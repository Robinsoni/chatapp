import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import { AuthContextProvider } from './components/context/AuthContext';
import { ChatContextProvider } from './components/context/ChatContext';
import { CommonContextProvider } from './components/context/CommonContext'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <ChatContextProvider>
    <CommonContextProvider>
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    </CommonContextProvider>
    </ChatContextProvider>
  </AuthContextProvider>
);

 
