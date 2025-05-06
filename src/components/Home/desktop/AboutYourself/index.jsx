import React, { useState } from "react";

import MembershipSummaryBoxDesktop from "../Membership/desktop/MembershipSummaryBoxDesktop";

import StepperDesktop from "../commen/StepperDesktop";
import AboutYourselfForm from "./AboutYourselfForm";
import { useNavigate } from "react-router-dom";
import useScrollDirection from "../../../../hooks/useScrollDirection";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../../../../redux/slices/planSlice";

function AboutYourself({ selectedPlan }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo, isLoading, error } = useSelector((state) => state.plan);
  const scrollDirection = useScrollDirection();
  const [validationErrors, setValidationErrors] = useState({});
  const [errors, setErrors] = useState([]);

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

    if (!phone.trim() || phone.length < 10 || phone.length > 14)
      errors.push("phone");
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

  const [formData, setFormData] = useState({
    firstName: userInfo?.fname || "",
    lastName: userInfo?.lname || "",
    email: userInfo?.email || "",
    number: userInfo?.phone || "",
    address: userInfo?.address || "",
    province: userInfo?.province || "",
    city: userInfo?.city || "",
    postalCode: userInfo?.postal || "",
    selectedDate: userInfo?.dob || "",
    gender: userInfo?.gender || "",
  });

  const handleJoinNow = () => {
    const errors = {};

    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) {
        errors[key] = true;
      }
    });

    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) return;

    Object.entries(formData).forEach(([key, value]) => {
      Cookies.set(key, value);
    });
    navigate(`/review-and-pay`);
  };

  return (
    <div className="relative w-full about_yourself_bg">
      <StepperDesktop stepNumber={2} scrollDirection={scrollDirection} />

      <div className="pt-[300px] pb-[100px] max-w-[1280px] mx-auto">
        <p className="text-white font-[kanit] text-[79px] font-[700] tracking-[-1.329px] leading-[66px] uppercase">
          Tell us about
        </p>
        <p className="text-[#2DDE28] font-[kanit] text-[79px] font-[700] leading-[66px] tracking-[-1.329px] uppercase">
          yourself
        </p>

        <div className="flex flex-row justify-between mt-16">
          <AboutYourselfForm
            formData={formData}
            setFormData={setFormData}
            validationErrors={validationErrors}
            setValidationErrors={setValidationErrors}
          />

          <div>
            <MembershipSummaryBoxDesktop selectedPlan={selectedPlan} />
          </div>
        </div>
        <div className="flex justify-end items-end mt-8 w-full">
          <button
            onClick={handleJoinNow}
            className="button  bg-[#2DDE28] text-black text-[16px] font-[vazirmatn] leading-[16px] uppercase font-medium w-[139px] h-[42px]"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default AboutYourself;
