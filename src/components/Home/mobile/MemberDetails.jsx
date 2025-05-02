import React, { useState } from "react";
import StepIndicator from "./common/StepIndicator";
import MembershipVancouver from "./common/MembershipVancouver";
import dropdownIcon from "../../../assets/images/mobile/member-ship/up-down-arrow.svg";
import { useNavigate } from "react-router-dom";
import EventDatePicker from "../../../utils/EventDatePicker";
import DOBPicker from "../../../utils/DOBPicker";
import { formatDate } from "../../../libs/utils";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../../../redux/slices/planSlice";

const MemberDetails = () => {
  const dispatch = useDispatch();
  const { userInfo, isLoading, error } = useSelector((state) => state.plan);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const [errors, setErrors] = useState([]);
  const [fname, setFname] = useState(userInfo?.fname || "");
  const [lname, setLname] = useState(userInfo?.lname || "");
  const [email, setEmail] = useState(userInfo?.email || "");
  const [phone, setPhone] = useState(userInfo?.phone || "");
  const [address, setAddress] = useState(userInfo?.address || "");
  const [province, setProvince] = useState(userInfo?.province || "");
  const [city, setCity] = useState(userInfo?.city || "");
  const [postal, setPostal] = useState(userInfo?.postal || "");
  const [dob, setDob] = useState(userInfo?.dob && new Date(userInfo?.dob) || "");
  const [gender, setGender] = useState(userInfo?.gender || "");

  function updateErrs(valueToRemove) {
    const updatedArr = errors.filter((item) => item !== valueToRemove);
    setErrors(updatedArr);
  }

  const validateForm = () => {
    const errors = [];

    if (!fname.trim()) errors.push("fname");
    if (!lname.trim()) errors.push("lname");
    if (!email.trim()) {
      errors.push("email");
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      errors.push("email");
    }

    if (!phone.trim()) errors.push("phone");
    if (!address.trim()) errors.push("address");
    if (!province.trim()) errors.push("province");
    if (!city.trim()) errors.push("city");
    if (!postal.trim()) errors.push("postal");
    if (!dob) errors.push("dob");
    if (!gender) errors.push("gender");

    if (errors.length > 0) {
      console.error("Validation Errors:", errors);
      return errors;
    }
    return false;
  };

  function addUser() {
    const errorStatus = validateForm();
    if (errorStatus && errorStatus.length > 0) {
      console.warn("Please fix the form errors.");
      setErrors(errorStatus);
      return;
    }
    // proceed with submission
    const payload = {
      fname,
      lname,
      email,
      phone,
      address,
      province,
      city,
      postal,
      dob: formatDate(dob),
      gender
    }
    console.log(payload);
    dispatch(setUserInfo(payload));
    navigate("/member-Payment");
  }

  return (
    <div className="min-h-screen bg-black text-white px-4 pt-[80px] pb-10 flex flex-col gap-6 max-w-[600px] w-full mx-auto">
      <StepIndicator
        step={2}
        totalSteps={3}
        title="Your Details"
        subtitle="Tell us about yourself"
      />

      <MembershipVancouver />

      <div className="flex flex-col">
        <p className="text-white font-[kanit] text-[46px] sm:text-[44px] font-[700] leading-[38px] uppercase">
          TELL US ABOUT
        </p>
        <p className="text-[#2DDE28] font-[kanit] text-[50px] font-[700] leading-[38px] uppercase">
          YOURSELF
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-white font-[kanit] text-[22.274px] font-medium leading-[35.02px] tracking-[-0.705px] capitalize">
          Your Basic Info
        </p>

        <div className="flex flex-row gap-4">
          <input
            type="text"
            placeholder="First Name"
            value={fname}
            onChange={(e) => {
              setFname(e.target.value);
              updateErrs("fname");
            }}
            className={`w-full px-4 py-3 bg-transparent border border-white/40 placeholder-[#999999] text-[16px] font-[400] ${
              errors?.includes("fname") && "!border-red-500"
            }`}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lname}
            onChange={(e) => {
              setLname(e.target.value);
              updateErrs("lname");
            }}
            className={`w-full px-4 py-3 bg-transparent border border-white/40 placeholder-[#999999] text-[16px] font-[400] ${
              errors?.includes("lname") && "!border-red-500"
            }`}
          />
        </div>

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            updateErrs("email");
          }}
          className={`w-full px-4 py-3 bg-transparent border border-white/40 placeholder-[#999999] text-[16px] font-[400] ${
            errors?.includes("email") && "!border-red-500"
          }`}
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
            updateErrs("phone");
          }}
          className={`w-full px-4 py-3 bg-transparent border border-white/40 placeholder-[#999999] text-[16px] font-[400] ${
            errors?.includes("phone") && "!border-red-500"
          }`}
        />
        <input
          type="text"
          placeholder="Mailing Address"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
            updateErrs("address");
          }}
          className={`w-full px-4 py-3 bg-transparent border border-white/40 placeholder-[#999999] text-[16px] font-[400] ${
            errors?.includes("address") && "!border-red-500"
          }`}
        />
        <input
          type="text"
          placeholder="Province"
          value={province}
          onChange={(e) => {
            setProvince(e.target.value);
            updateErrs("province");
          }}
          className={`w-full px-4 py-3 bg-transparent border border-white/40 placeholder-[#999999] text-[16px] font-[400] ${
            errors?.includes("province") && "!border-red-500"
          }`}
        />

        <div className="flex flex-row gap-4">
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              updateErrs("city");
            }}
            className={`w-full px-4 py-3 bg-transparent border border-white/40 placeholder-[#999999] text-[16px] font-[400] ${
              errors?.includes("city") && "!border-red-500"
            }`}
          />
          <input
            type="text"
            placeholder="Postal Code"
            value={postal}
            onChange={(e) => {
              setPostal(e.target.value);
              updateErrs("postal");
            }}
            className={`w-full px-4 py-3 bg-transparent border border-white/40 placeholder-[#999999] text-[16px] font-[400] ${
              errors?.includes("postal") && "!border-red-500"
            }`}
          />
        </div>

        <div className="flex flex-row gap-4">
          <DOBPicker dob={dob} setDob={setDob} errors={errors} />

          <div className="relative w-full">
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)} // ✅ Update gender
              onClick={toggleDropdown}
              className={`w-full appearance-none px-4 py-2.5 bg-[#1C1C1C] border border-white/40 placeholder-[#999999] text-[#999999] text-[16px] font-[400] outline-none ${errors?.includes("gender") && "!border-red-500"}`}
            >
              <option className="bg-[#1C1C1C] cursor-pointer text-[#999999]" value="">
                Gender
              </option>
              <option className="bg-[#1C1C1C] cursor-pointer text-white" value="Male">
                Male
              </option>
              <option className="bg-[#1C1C1C] cursor-pointer text-white" value="Female">
                Female
              </option>
              <option className="bg-[#1C1C1C] cursor-pointer text-white" value="Other">
                Other
              </option>
            </select>

            <img
              src={dropdownIcon}
              alt="Dropdown Icon"
              className={`absolute right-4 top-[23px] -translate-y-1/2 w-[14px] h-[14px] transition-transform duration-300 pointer-events-none ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </div>
        </div>
      </div>

      <button
        onClick={() => addUser()}
        className="flex justify-center items-center w-full h-[42px] cursor-pointer disabled:opacity-60 px-0 pt-[12.801px] pb-[13.199px] 
        bg-[#2DDE28] border border-[#2DDE28] font-[kanit] text-black text-[16px] font-medium 
        leading-[16px] uppercase font-kanit transition-all hover:opacity-90 active:scale-95"
        disabled={errors.length > 0}
      >
        Continue
      </button>
    </div>
  );
};

export default MemberDetails;
