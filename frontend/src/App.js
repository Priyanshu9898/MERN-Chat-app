import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Register from './components/Authentication/Register.js';
import Login from './components/Authentication/Login.js';
import Chat from './components/Chat/Chat.js';
import SetAvatar from './components/Avatar/SetAvatar.js';
const App = () => {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Chat />} />
        <Route path="/setAvatar" element={<SetAvatar />} />
      </Routes>
    
    </BrowserRouter>
    </>
  )
}

export default App