import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from '../signin/Login';
import Register from '../signup/Register';
import Main from '../main_page/Main'
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/app" element={<Main />} />
        </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
