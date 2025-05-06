import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.svg"; 


// const Navbar = ({ isLoggedIn }) => {
//   return (
//     <nav className="flex justify-between items-center px-8 py-4 bg-white shadow">
//       <Link href="/"> 
//         <img src={Logo} alt="FixMyCity Logo" className="h-8 w-auto" /> 
//       </Link>

      
//       <div className="flex items-center gap-4"> 
//         {isLoggedIn ?  (
//           <> 
//             <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 text-sm">
//               Dashboard
//             </Link>
//             <Link href="/laporan" className="text-gray-700 hover:text-blue-600 text-sm">
//               Laporan
//             </Link>
//             <a href="/logout" className="px-4 py-2 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 text-sm">
//               Logout
//             </a>
//           </>
//         ) : (
//           // --- Elements shown when LOGGED OUT ---
//           <button className="flex items-center gap-1 px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-100 text-sm text-gray-700">
//             <p className="inline-flex items-center justify-center w-5 h-5 bg-gray-200 rounded-full text-xs font-semibold">
//               ?
//             </p>
//             <p>Help</p>
//           </button>
//         )}
//       </div>
//     </nav>
//   );
// };

const Navbar = ({ isLoggedIn }) => {
  return (
    <nav className="flex justify-between items-center px-8 py-4 font-header font-bold bg-white shadow">
      <Link to="/"> 
        <img src={Logo} alt="FixMyCity Logo" className="h-8 w-auto" /> 
      </Link>
      
      <div className="flex items-center gap-4"> 
        {isLoggedIn ? (
          <> 
            <Link to="/dashboard" className="text-gray-700 
             hover:text-(--btn-secondary) text-sm transition duration-200 ease-in-out">
              Dashboard
            </Link>
            <Link to="/laporan" className="text-gray-700 
             hover:text-(--btn-secondary) text-sm transition duration-200 ease-in-out">
              Laporan
            </Link>
            <Link to="/logout" className="px-4 py-2 bg-gray-200 text-gray-800 rounded-full 
             hover:bg-gray-300 text-sm transition duration-300 ease-in-out">
              Logout
            </Link>
          </>
        ) : (
          // --- Elements shown when LOGGED OUT ---
          <button className="flex items-center gap-1 px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-100 text-sm text-gray-700">
            <p className="inline-flex items-center justify-center w-5 h-5 bg-gray-200 rounded-full text-xs font-semibold">
              ?
            </p>
            <p>Help</p>
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
