import React from "react";
import logo from "../../../assets/desktop/logo_navbar.svg";

function NavbarMobile() {
  return (
    <nav className=" w-full min-h-[60px] flex justify-between items-center px-4 py-3 bg-[#000000] shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
      <img src={logo} alt="Evolve Strength Logo" className="h-9" />
      <div className="text-white text-2xl font-bold">☰</div>
    </nav>
  );
}

export default NavbarMobile;
