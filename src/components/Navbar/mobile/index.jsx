import React from "react";
import logo from "../../../assets/images/mobile/location-details/evolve_logo.webp";

function NavbarMobile() {
  return (
    <nav className="fixed top-0 z-50 w-full min-h-[60px] flex justify-between items-center px-4 py-3 bg-[#000000] shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
      <a href="https://www.evolvestrength.ca/">
        <img src={logo} alt="Evolve Strength Logo" className="h-9" />
      </a>
      {/* <div className="text-white text-2xl font-bold">☰</div> */}
    </nav>
  );
}

export default NavbarMobile;
