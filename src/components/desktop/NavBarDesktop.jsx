import React from "react";
import logo from "../../assets/desktop/logo_navbar.svg";

const NavBarDesktop = () => {
  return (
    <nav className="fixed top-0 left-0 w-full h-22 flex items-center px-5 bg-[white] shadow-md z-50">
      <img src={logo} alt="Logo" className="h-3/5" />
    </nav>
  );
};

export default NavBarDesktop;
