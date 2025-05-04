import React from "react";
import { Link } from "react-router-dom";

export default function Button({ condition, title, to }) {
  if (condition ? true : false) {
    return (
      <Link 
      to={to}
        className="bg-(--btn-primary) text-white font-bold py-4 px-50 rounded-full 
        hover:bg-(--btn-primary-hover) transition duration-300 ease-in-out"
      >
        {title}
      </Link>
    );
  } else
    return (
      <Link
      to={to}
        className="bg-(--btn-secondary) text-white font-bold py-4 px-50 rounded-full 
        hover:bg-(--btn-secondary-hover) transition duration-300 ease-in-out"
      >
        {title}
      </Link>
    );
}
