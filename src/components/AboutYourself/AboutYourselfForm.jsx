import React from "react";

const AboutYourselfForm = () => {
  return (
    <div className="max-w-[600px] space-y-4">
      <p className="text-white font-bold text-[24px] mb-2">Your Basic Info</p>

      <div className="flex gap-4">
        <input
          style={{ fontFamily: "'Vazirmatn', sans-serif" }}
          type="text"
          placeholder="First Name"
          className="flex-1 border border-white/40 px-4 py-3 placeholder-white text-white text-[16px] bg-[#000000]/60 backdrop-blur-[10px]"
        />
        <input
          style={{ fontFamily: "'Vazirmatn', sans-serif" }}
          type="text"
          placeholder="Last Name"
          className="flex-1 border border-white/40 px-4 py-3 placeholder-white text-white text-[16px]  bg-[#000000]/60 backdrop-blur-[10px]"
        />
      </div>

      <input
        style={{ fontFamily: "'Vazirmatn', sans-serif" }}
        type="email"
        placeholder="Email Address"
        className="w-full border border-white/40 px-4 py-3 placeholder-white text-white text-[16px]  bg-[#000000]/60 backdrop-blur-[10px]"
      />

      <input
        style={{ fontFamily: "'Vazirmatn', sans-serif" }}
        type="tel"
        placeholder="Phone Number"
        className="w-full border border-white/40 px-4 py-3 placeholder-white text-white text-[16px]  bg-[#000000]/60 backdrop-blur-[10px]"
      />

      <input
        style={{ fontFamily: "'Vazirmatn', sans-serif" }}
        type="text"
        placeholder="Mailing Address"
        className="w-full border border-white/40 px-4 py-3 placeholder-white text-white text-[16px]  bg-[#000000]/60 backdrop-blur-[10px]"
      />

      <input
        style={{ fontFamily: "'Vazirmatn', sans-serif" }}
        type="text"
        placeholder="Province"
        className="w-full border border-white/40 px-4 py-3 placeholder-white text-white text-[16px]  bg-[#000000]/60 backdrop-blur-[10px]"
      />

      <div className="flex gap-4">
        <input
          style={{ fontFamily: "'Vazirmatn', sans-serif" }}
          type="text"
          placeholder="City"
          className="flex-1 border border-white/40 px-4 py-3 placeholder-white text-white text-[16px]  bg-[#000000]/60 backdrop-blur-[10px]"
        />
        <input
          style={{ fontFamily: "'Vazirmatn', sans-serif" }}
          type="text"
          placeholder="Postal Code"
          className="flex-1 border border-white/40 px-4 py-3 placeholder-white text-white text-[16px]  bg-[#000000]/60 backdrop-blur-[10px]"
        />
      </div>

      <div className="flex gap-4">
        <div className="flex items-center gap-2 flex-1 border border-white/40 px-4 py-3 text-white text-[16px]  bg-[#000000]/60 backdrop-blur-[10px]">
          <input
            style={{ fontFamily: "'Vazirmatn', sans-serif" }}
            type="date"
            className="bg-transparent text-white w-full outline-none"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="#2DDE28"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>

        <select
          style={{ fontFamily: "'Vazirmatn', sans-serif" }}
          className="flex-1 border border-white/40 px-4 py-3 text-white text-[16px] appearance-none relative  bg-[#000000]/60 backdrop-blur-[10px]"
        >
          <option className="text-black">Gender</option>
          <option className="text-black">Male</option>
          <option className="text-black">Female</option>
          <option className="text-black">Other</option>
        </select>
      </div>
    </div>
  );
};

export default AboutYourselfForm;
