import React from "react";

const AboutYourselfForm = ({ formData, handleChange, validationErrors }) => {
  return (
    <div className="max-w-[600px] space-y-4">
      <p className="text-white font-[kanit] font-[400] text-[24px] leading-[10.734px] tracking-[-0.76px] capitalize">
        Your Basic Info
      </p>

      <div className="flex gap-4">
        <input
          type="text"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange("firstName")}
          className={`flex-1 border px-4 py-3 placeholder-[#999999] text-white font-[vazirmatn] text-[16px] bg-[#000000]/60 backdrop-blur-[10px] ${
            validationErrors.firstName ? "border-red-500" : "border-white/40"
          }`}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange("lastName")}
          className={`flex-1 border px-4 py-3 placeholder-[#999999] text-white font-[vazirmatn] text-[16px] bg-[#000000]/60 backdrop-blur-[10px] ${
            validationErrors.lastName ? "border-red-500" : "border-white/40"
          }`}
        />
      </div>

      <input
        type="email"
        placeholder="Email Address"
        value={formData.email}
        onChange={handleChange("email")}
        className={`w-full border px-4 py-3 placeholder-[#999999] text-white font-[vazirmatn] text-[16px]  bg-[#000000]/60 backdrop-blur-[10px] ${
          validationErrors.email ? "border-red-500" : "border-white/40"
        }`}
      />

      <input
        type="tel"
        placeholder="Phone Number"
        value={formData.number}
        onChange={handleChange("number")}
        className={`w-full border px-4 py-3 placeholder-[#999999] text-white font-[vazirmatn] text-[16px]  bg-[#000000]/60 backdrop-blur-[10px] ${
          validationErrors.number ? "border-red-500" : "border-white/40"
        }`}
      />

      <input
        type="text"
        placeholder="Mailing Address"
        value={formData.address}
        onChange={handleChange("address")}
        className={`w-full border px-4 py-3 placeholder-[#999999] text-white font-[vazirmatn] text-[16px]  bg-[#000000]/60 backdrop-blur-[10px] ${
          validationErrors.address ? "border-red-500" : "border-white/40"
        }`}
      />

      <input
        type="text"
        placeholder="Province"
        value={formData.province}
        onChange={handleChange("province")}
        className={`w-full border px-4 py-3 placeholder-[#999999] text-white font-[vazirmatn] text-[16px]  bg-[#000000]/60 backdrop-blur-[10px] ${
          validationErrors.province ? "border-red-500" : "border-white/40"
        }`}
      />

      <div className="flex gap-4">
        <input
          type="text"
          placeholder="City"
          value={formData.city}
          onChange={handleChange("city")}
          className={`flex-1 border px-4 py-3 placeholder-[#999999] text-white font-[vazirmatn] text-[16px]  bg-[#000000]/60 backdrop-blur-[10px] ${
            validationErrors.city ? "border-red-500" : "border-white/40"
          }`}
        />
        <input
          type="text"
          placeholder="Postal Code"
          value={formData.postalCode}
          onChange={handleChange("postalCode")}
          className={`flex-1 border px-4 py-3 placeholder-[#999999] text-white font-[vazirmatn] text-[16px]  bg-[#000000]/60 backdrop-blur-[10px] ${
            validationErrors.postalCode ? "border-red-500" : "border-white/40"
          }`}
        />
      </div>

      <div className="flex gap-4">
        <div
          className={`flex items-center gap-2 flex-1 border px-4 py-3  text-white font-[vazirmatn] text-[16px]  bg-[#000000]/60 backdrop-blur-[10px] ${
            validationErrors.selectedDate ? "border-red-500" : "border-white/40"
          } `}
        >
          <input
            type="date"
            className="bg-transparent text-[#999] w-full outline-none font-[vazirmatn] placeholder-[#999999]"
            value={formData.selectedDate}
            onChange={handleChange("selectedDate")}
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
          className={`flex-1 border px-4 py-3 text-[#999999] placeholder-[#999999] font-[vazirmatn] text-[16px] appearance-none relative  bg-[#000000]/60 backdrop-blur-[10px] ${
            validationErrors.gender ? "border-red-500" : "border-white/40"
          }`}
          value={formData.gender}
          onChange={handleChange("gender")}
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
