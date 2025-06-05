import React from "react";
import { useState } from "react"; 
import { Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar"; 
import LandingPage from "../App/pages/LandingPage"; 
import Laporan from "../App/pages/Laporan";
import Login from "../App/pages/Login";
import Dashboard from "../App/pages/Dashboard";
import SignUp  from "./pages/SignUp"; 
import SocialFeed from "../App/pages/laporan-social";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#F7FBFA]">
      <Navbar isLoggedIn={isLoggedIn} />
      
      <main className="flex-1 p-2 mx-auto w-full">
        <Routes>
          <Route path="/" element={<LandingPage isLoggedIn={false}/>} />
          <Route path="/laporan" element={<Laporan />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/laporan-social" element={<SocialFeed />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

