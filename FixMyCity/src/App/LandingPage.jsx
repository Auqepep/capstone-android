import React from "react";
import Button from "../components/Button";

const LandingPage = () => {
  return (
    <div className="relative z-10">
      <div className="max-w-4xl">
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
          <Button variant="primary">Login</Button>
          <Button variant="secondary">Sign Up</Button>
        </div>
      </div>

      {/* Decorative background */}
      <div
        className="absolute top-0 right-0 w-2/5 h-full bg-no-repeat bg-right-center opacity-50 -z-10"
        style={{ backgroundImage: "url('/wavy-bg.svg')" }}
      />
    </div>
  );
};

export default LandingPage;
