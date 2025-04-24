import React from "react";
import logo from "../../../assets/desktop/logo_navbar.svg";

const NavBarDesktop = () => {
  return (
    <nav className="fixed top-0 h-[88px] bg-black/40 shadow-md z-50 w-full flex items-center">
      <div className="flex items-center justify-between w-full max-w-[1280px] mx-auto">
        <img src={logo} alt="Logo" className="w-[175px] h-auto" />
      </div>
    </nav>
  );
};

export default NavBarDesktop;
