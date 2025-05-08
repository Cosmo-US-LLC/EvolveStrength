import React, { useState } from "react";

import MembershipSummaryBoxDesktop from "../Membership/desktop/MembershipSummaryBoxDesktop";

import StepperDesktop from "../commen/StepperDesktop";
import AboutYourselfForm from "./AboutYourselfForm";
import { useNavigate } from "react-router-dom";
import useScrollDirection from "../../../../hooks/useScrollDirection";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../../../../redux/slices/planSlice";
import { parsePhoneNumberFromString } from "libphonenumber-js";

function AboutYourself() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.plan);
  const scrollDirection = useScrollDirection();
  const [validationErrors, setValidationErrors] = useState({});

  const [formData, setFormData] = useState({
    firstName: userInfo?.fname || "",
    lastName: userInfo?.lname || "",
    email: userInfo?.email || "",
    number: userInfo?.phone || "",
    address: userInfo?.address || "",
    province: userInfo?.province || "",
    city: userInfo?.city || "",
    postalCode: userInfo?.postal || "",
    selectedDate: userInfo?.dob || null,
    gender: userInfo?.gender || "",
  });

  const handleChangeDob = (field) => (value) => {
    if (field === "selectedDate") {
      setFormData((prevData) => {
        return { ...prevData, [field]: value };
      });
    }

    setValidationErrors((prev) => ({
      ...prev,
      [field]: null,
    }));
  };

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));

    setValidationErrors((prev) => ({
      ...prev,
      [field]: null,
    }));
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.firstName.trim()) errors.firstName = "First name is required";
    if (!formData.lastName.trim()) errors.lastName = "Last name is required";
    if (!/^\S+@\S+\.\S+$/.test(formData.email))
      errors.email = "Enter a valid email address";


    if (!formData.number.trim()) {
      errors.number = "Phone number is required.";
    } else if (!/^\d{10}$/.test(formData.number)) {
      errors.number = "Phone number must be exactly 10 digits.";
    } else {
      const phoneNumber = parsePhoneNumberFromString(`+1${formData.number}`, "CA");
      if (!phoneNumber || !phoneNumber.isValid()) {
        errors.number = "Enter a valid Canadian phone number.";
      }
    }

    if (!formData.address.trim())
      errors.address = "Mailing address is required";
    if (!formData.province.trim()) errors.province = "Province is required";
    if (!formData.city.trim()) errors.city = "City is required";
    if (!formData.postalCode.trim())
      errors.postalCode = "Postal code is required";
    if (!formData.selectedDate)
      errors.selectedDate = "Date of birth is required";
    if (!formData.gender) errors.gender = "Gender is required";

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleJoinNow = () => {
    if (!validateForm()) return;

    dispatch(
      setUserInfo({
        fname: formData.firstName,
        lname: formData.lastName,
        email: formData.email,
        phone: formData.number,
        address: formData.address,
        province: formData.province,
        city: formData.city,
        postal: formData.postalCode,
        dob: formData.selectedDate,
        gender: formData.gender,
      })
    );

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
            handleChange={handleChange}
            handleChangeDob={handleChangeDob}
            validationErrors={validationErrors}
          />

          <div>
            <MembershipSummaryBoxDesktop />
          </div>
        </div>
        <div className="flex justify-end items-end mt-8 w-full">
          <button
            onClick={handleJoinNow}
            className="button  bg-[#2DDE28] text-black text-[16px] font-[vazirmatn] leading-[16px] uppercase font-medium w-[139px]"
            style={{ paddingBottom: "11px", paddingTop: "15px" }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default AboutYourself;
