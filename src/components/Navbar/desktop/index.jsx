import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../../assets/images/desktop/logo_navbar.svg";

const NavBarDesktop = ({ scrollDirection }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [buttonText, setButtonText] = useState("Next");

  useEffect(() => {
    if (location.pathname === "/membership") {
      setButtonText("JOIN NOW");
    } else if (location.pathname === "/about-yourself") {
      setButtonText("NEXT");
    } else if (location.pathname === "/review-and-pay") {
      setButtonText("PAY NOW");
    } else if (location.pathname === "/congratulations") {
      setButtonText("BACK HOME");
    }
  }, [location.pathname]);

  const handleButtonClick = () => {
    if (location.pathname === "/membership") {
      navigate("/about-yourself");
    } else if (location.pathname === "/about-yourself") {
      navigate("/review-and-pay");
    } else if (location.pathname === "/review-and-pay") {
      navigate("/congratulations");
    } else if (location.pathname === "/congratulations") {
      navigate("/");
    }
  };

  return (
    <nav
    className={`fixed top-0 py-4 bg-[#000000] shadow-md z-50 w-full flex items-center transition-transform duration-300 ${
      scrollDirection === "down" ? "-translate-y-full" : "translate-y-0"
    }`}
    >
      <div className="flex items-center justify-between w-full max-w-[1280px] mx-auto">
        <img src={logo} alt="Logo" className="w-[175px] h-auto" />
        <button
          onClick={handleButtonClick}
          className="w-[141px] bg-[#2DDE28] text-black text-[16px] font-medium h-[50px] button"
        >
          {buttonText}
        </button>
      </div>
    </nav>
  );
};

export default NavBarDesktop;
