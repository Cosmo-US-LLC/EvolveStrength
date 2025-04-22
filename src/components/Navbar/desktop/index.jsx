import React from "react";
import logo from "../../../assets/desktop/logo_navbar.svg";

const NavBarDesktop = () => {
  return (
    <nav className="fixed top-0 h-[88px] bg-[black] shadow-md z-50 px-4 w-full flex items-center justify-start px-8">
      <img src={logo} alt="Logo" className="w-[175px] h-auto" />
    </nav>
  );
};

export default NavBarDesktop;
