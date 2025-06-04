import React from "react";
import Button from "@/components/Button.jsx";
// Remove useState import as it's not needed here anymore
// import { useState } from "react"; 
import { Link } from "react-router-dom"; // Keep Link if your Button component uses it internally
import imgbuilding from "../../assets/building.svg"; // Adjust the path as necessary

// isLoggedIn prop
const LandingPage = ({ isLoggedIn }) => {
  return (
    <div className="relative flex flex-col md:flex-row items-start justify-between container mx-auto px-4 mt-10">
      <div className="w-full md:w-3/5 z-10">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">
          Selamat datang{isLoggedIn ? " kembali!" : "!"}
        </h1>

        {isLoggedIn ? (
          <p className="max-w-xl mb-8 text-gray-700">
            Senang melihat Anda kembali! Siap membuat laporan perbaikan untuk lingkungan kita?
          </p>
        ) : (
          <p className="max-w-xl mb-8 text-gray-700">
            Hi City Fixers! Selamat datang ke website perbaikan infrastruktur
            lingkungan kita sekitar. Kita berharap kalian bisa update
            perihal-perihal negatif yang mengganggu day to day anda.
          </p>
        )}


        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Tempat Masyarakat Berkumpul dan Berkritis
        </h2>

        <p className="max-w-xl mb-8 text-gray-700">
          Website ini dibuat untuk menjaga integritas infrastruktur lingkungan
          sekitar kita. Ayo kita menjunjung tinggi integritas infrastruktur kita
          agar tetap terawat.
        </p>

        {/* Conditionally render based on isLoggedIn */}
        {isLoggedIn ? (
          // Content when logged in
          <>
            <h3 className="text-xl font-bold mb-6 text-gray-800">Siap membuat laporan baru?</h3>
            <div className="flex gap-4 flex-col sm:flex-row">
              {/* Button to create a report */}
              <Button title={"Buat Laporan"} condition={false} to={"/laporan"} className="px-50"/>
            </div>
          </>
        ) : (
          // Content when NOT logged in
          <>
            <h3 className="text-xl font-bold mb-6 text-gray-800">Mau bikin laporan? Lapor diri dulu</h3>
            <div className="flex gap-4 flex-col sm:flex-row">
              {/* Original Login button */}
              <Button title={"Login"} condition={false} to={"/login"} className="px-50"/>
            </div>
          </>
        )}
      </div>
      
      <div className="w-full md:w-2/5 flex justify-end">
        <img
          src={imgbuilding}
          alt="Background"
          className="w-100 p-10" // w-100 is likely not a valid Tailwind class, maybe w-full or a fixed size? p-10 is fine.
        />
      </div>
    </div>
  );
};

export default LandingPage;