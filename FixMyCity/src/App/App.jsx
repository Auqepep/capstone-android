import React from "react";
import Navbar from "../components/Navbar"; // Fixed path from src/App to src/components
import LandingPage from "../App/LandingPage"; // Fixed path

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 p-8 max-w-6xl mx-auto w-full">
        <LandingPage />
      </main>
    </div>
  );
}

export default App;
