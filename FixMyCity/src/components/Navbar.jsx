import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-white shadow">
      <div className="flex items-center gap-2">
        <img src="/logo.svg" alt="FixMyCity Logo" className="h-6 w-6" />
        <h1 className="text-lg font-semibold">FixMyCity</h1>
      </div>
      <div>
        <button className="flex items-center gap-1 px-4 py-2 border border-gray-200 rounded-full hover:bg-gray-50">
          <span className="inline-flex items-center justify-center w-5 h-5 bg-gray-100 rounded-full text-sm">
            ?
          </span>
          <span>Help</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
