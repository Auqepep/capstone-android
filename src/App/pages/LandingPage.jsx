import React from "react";
import Button from "../../components/button.jsx";
import { useState } from "react";
import { Link } from "react-router-dom";
import imgbuilding from "../../assets/building.svg"; // Adjust the path as necessary
import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const LandingPage = () => {
  return (
    <div className="relative flex flex-col md:flex-row items-start justify-between container mx-auto px-4 mt-10">
      <div className="w-full md:w-3/5 z-10">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">
          Selamat datang!
        </h1>

        <p className="max-w-xl mb-8 text-gray-700">
          Hi City Fixers! Selamat datang ke website perbaikan infrastruktur
          lingkungan kita sekitar. Kita berharap kalian bisa update
          perihal-perihal negatif yang mengganggu day to day anda.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Tempat Masyarakat Berkumpul dan Berkritis
        </h2>

        <p className="max-w-xl mb-8 text-gray-700">
          Website ini dibuat untuk menjaga integritas infrastruktur lingkungan
          sekitar kita. Ayo kita menjunjung tinggi integritas infrastruktur kita
          agar tetap terawat.
        </p>
        
        <h3 className="text-xl font-bold mb-6 text-gray-800">
          Mau bikin laporan? Lapor diri dulu
        </h3>

        <div className="flex gap-4 flex-col sm:flex-row">
          <Button title={"Login"} condition={false} to={"/login"} className="px-50"/>
        </div>
        
      </div>
      
      <div className="w-full md:w-2/5 flex justify-end">
        <img
          src={imgbuilding}
          alt="Background"
          className="w-100 p-10"
        />
      </div>
    </div>
  );
};

export default LandingPage;