import React from "react";
import { useState } from "react"; 
import { Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar"; 
import LandingPage from "../App/pages/LandingPage"; 
import Laporan from "../App/pages/Laporan";
import Login from "../App/pages/Login";
import Dashboard from "../App/pages/Dashboard";


// function App() {

//   const [isLoggedIn, setIsLoggedIn] = useState(true); 


//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50">
//       <Navbar isLoggedIn={isLoggedIn} />
      

//       <main className="flex-1 p-8 max-w-6xl mx-auto w-full">
//         <LandingPage />
//       </main>
//     </div>
//   );
// }

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar isLoggedIn={isLoggedIn} />
      
      <main className="flex-1 p-8 max-w-6xl mx-auto w-full">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/laporan" element={<Laporan />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

