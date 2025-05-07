import React from "react";
import DOBPickerDesktop from "../../../../utils/DOBPickerDesktop";

const AboutYourselfForm = ({ formData, handleChange, validationErrors }) => {
  return (
    <div className="max-w-[600px] w-full space-y-4">
      <p className="text-white font-[kanit] font-[400] text-[24px] leading-[10.734px] tracking-[-0.76px] capitalize">
        Your Basic Info
      </p>

      <div className="flex gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange("firstName")}
            className={`w-full border px-4 py-3 placeholder-[#999999] text-white font-[vazirmatn] text-[16px] bg-[#000000]/60 backdrop-blur-[10px] ${
              validationErrors.firstName
                ? "border-[#c20000]"
                : "border-white/40"
            }`}
          />
          {validationErrors.firstName && (
            <p className="text-[#c20000] text-sm mt-1">
              {validationErrors.firstName}
            </p>
          )}
        </div>

        <div className="flex-1">
          <input
            type="text"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange("lastName")}
            className={`w-full border px-4 py-3 placeholder-[#999999] text-white font-[vazirmatn] text-[16px] bg-[#000000]/60 backdrop-blur-[10px] ${
              validationErrors.lastName ? "border-[#c20000]" : "border-white/40"
            }`}
          />
          {validationErrors.lastName && (
            <p className="text-[#c20000] text-sm mt-1">
              {validationErrors.lastName}
            </p>
          )}
        </div>
      </div>

      <div>
        <input
          type="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange("email")}
          className={`w-full border px-4 py-3 placeholder-[#999999] text-white font-[vazirmatn] text-[16px]  bg-[#000000]/60 backdrop-blur-[10px] ${
            validationErrors.email ? "border-[#c20000]" : "border-white/40"
          }`}
        />

        {validationErrors.email && (
          <p className="text-[#c20000] text-sm mt-1">
            {validationErrors.email}
          </p>
        )}
      </div>

      <div>
        <input
          type="tel"
          placeholder="Phone Number"
          value={formData.number}
          onChange={handleChange("number")}
          className={`w-full border px-4 py-3 placeholder-[#999999] text-white font-[vazirmatn] text-[16px] bg-[#000000]/60 backdrop-blur-[10px] ${
            validationErrors.number ? "border-[#c20000]" : "border-white/40"
          }`}
        />
        {validationErrors.number && (
          <p className="text-[#c20000] text-sm mt-1">
            {validationErrors.number}
          </p>
        )}
      </div>

      <div>
        <input
          type="text"
          placeholder="Mailing Address"
          value={formData.address}
          onChange={handleChange("address")}
          className={`w-full border px-4 py-3 placeholder-[#999999] text-white font-[vazirmatn] text-[16px] bg-[#000000]/60 backdrop-blur-[10px] ${
            validationErrors.address ? "border-[#c20000]" : "border-white/40"
          }`}
        />
        {validationErrors.address && (
          <p className="text-[#c20000] text-sm mt-1">
            {validationErrors.address}
          </p>
        )}
      </div>

      <div>
        <input
          type="text"
          placeholder="Province"
          value={formData.province}
          onChange={handleChange("province")}
          className={`w-full border px-4 py-3 placeholder-[#999999] text-white font-[vazirmatn] text-[16px] bg-[#000000]/60 backdrop-blur-[10px] ${
            validationErrors.province ? "border-[#c20000]" : "border-white/40"
          }`}
        />
        {validationErrors.province && (
          <p className="text-[#c20000] text-sm mt-1">
            {validationErrors.province}
          </p>
        )}
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="City"
            value={formData.city}
            onChange={handleChange("city")}
            className={`w-full border px-4 py-3 placeholder-[#999999] text-white font-[vazirmatn] text-[16px]  bg-[#000000]/60 backdrop-blur-[10px] ${
              validationErrors.city ? "border-[#c20000]" : "border-white/40"
            }`}
          />
          {validationErrors.city && (
            <p className="text-[#c20000] text-sm mt-1">
              {validationErrors.city}
            </p>
          )}
        </div>

        <div className="flex-1">
          <input
            type="text"
            placeholder="Postal Code"
            value={formData.postalCode}
            onChange={handleChange("postalCode")}
            className={`w-full border px-4 py-3 placeholder-[#999999] text-white font-[vazirmatn] text-[16px]  bg-[#000000]/60 backdrop-blur-[10px] ${
              validationErrors.postalCode
                ? "border-[#c20000]"
                : "border-white/40"
            }`}
          />
          {validationErrors.postalCode && (
            <p className="text-[#c20000] text-sm mt-1">
              {validationErrors.postalCode}
            </p>
          )}
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <div
            className={`flex items-center gap-2 border px-4 py-3 text-white font-[vazirmatn] text-[16px] bg-[#000000]/60 backdrop-blur-[10px] ${
              validationErrors.selectedDate
                ? "border-[#c20000]"
                : "border-white/40"
            }`}
          >
            <input
              type="date"
              className="bg-transparent text-[#999] w-full outline-none font-[vazirmatn]"
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
          {validationErrors.selectedDate && (
            <p className="text-[#c20000] text-sm mt-1">
              {validationErrors.selectedDate}
            </p>
          )}
        </div>

        <div className="flex-1">
          <select
            className={`w-full border px-4 py-3 text-[#999999] placeholder-[#999999] font-[vazirmatn] text-[16px] appearance-none bg-[#000000]/60 backdrop-blur-[10px] ${
              validationErrors.gender ? "border-[#c20000]" : "border-white/40"
            }`}
            value={formData.gender}
            onChange={handleChange("gender")}
          >
            <option className="text-black" value="">
              Gender
            </option>
            <option className="text-black" value="Male">
              Male
            </option>
            <option className="text-black" value="Female">
              Female
            </option>
            <option className="text-black" value="Other">
              Other
            </option>
          </select>
          {validationErrors.gender && (
            <p className="text-[#c20000] text-sm mt-1">
              {validationErrors.gender}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutYourselfForm;
