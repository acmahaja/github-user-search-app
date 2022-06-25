import React, { useState } from "react";
import "../css/navbar.css";

export const Navbar = ({ theme , setTheme}) => {
  const [isHovering, setHovering] = useState(false);
  const toggleHovering = () => {
    setHovering(!isHovering);
  };

  return (
    <nav>
      <h1 className="noselect">devfinder</h1>
      <div
        id="themeToggle"
        className={`${isHovering ? "hover" : null}`}
        onMouseEnter={toggleHovering}
        onMouseLeave={toggleHovering}
        onClick={setTheme}
      >
        <h4>{theme}</h4>
        <button></button>
      </div>
    </nav>
  );
};

export default Navbar;
