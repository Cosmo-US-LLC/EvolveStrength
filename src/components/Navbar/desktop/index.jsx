import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../../assets/desktop/logo_navbar.svg";

const NavBarDesktop = () => {
  const navigate = useNavigate();
  const location = useLocation();  // Hook to get current route
  const [buttonText, setButtonText] = useState("Next");

  useEffect(() => {
    // Update button text based on current route
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
      navigate("/about-yourself"); // Redirect to /about-yourself from /membership
    } else if (location.pathname === "/about-yourself") {
      navigate("/review-and-pay"); // Redirect to /review-and-pay from /about-yourself
    } else if (location.pathname === "/review-and-pay") {
      navigate("/congratulations"); // Redirect to /congratulations from /review-and-pay
    } else if (location.pathname === "/congratulations") {
      navigate("/"); // Redirect to home from /congratulations
    }
  };

  return (
    <nav className="fixed top-0 h-[88px] bg-black/40 shadow-md z-50 w-full flex items-center">
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
