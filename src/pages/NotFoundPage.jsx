import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen px-6 text-white bg-black">
      <div className="max-w-xl text-center">
        <h1 className="text-9xl font-extrabold text-[#2DDE28] mb-6">404</h1>
        <h2 className="mb-4 font-semibold text-7xl md:text-6xl">Page Not Found</h2>
        <p className="mb-8 text-2xl text-gray-400">
          Sorry, the page you’re looking for doesn’t exist or has been moved.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-[#2DDE28] hover:bg-[#25c722] text-black font-semibold px-6 py-3 transition-all duration-200"
        >
          Back to Homepage
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
