import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar></Navbar>

        <Routes>
          <Route path="/" element={<Home></Home>} />
          <Route path="/login" element={<Login></Login>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
