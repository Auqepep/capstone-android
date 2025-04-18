import React from "react";

const Button = ({ variant = "primary", children, onClick, className = "" }) => {
  // Base styles remain the same
  const baseClasses = "px-6 py-3 rounded font-medium transition-colors";

  // Updated variant classes using arbitrary hex values for background
  const variantClasses = {
    primary: "bg-primary rounded-4xl text-white hover:bg-opacity-90", // Use arbitrary value for primary bg
    secondary: "bg-[#6A9C89] rounded-4xl text-white hover:bg-opacity-90", // Use arbitrary value for secondary bg
  };

  // Combine classes as before
  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

  return (
    <button className={buttonClasses} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
