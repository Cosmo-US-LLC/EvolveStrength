import React, { useRef, useState } from "react";
import StepIndicator from "./common/StepIndicator";
import MembershipVancouver from "./common/MembershipVancouver";
import dropdownIcon from "../../../assets/images/mobile/member-ship/up-down-arrow.svg";
import { useNavigate } from "react-router-dom";
import EventDatePicker from "../../../utils/EventDatePicker";
import DOBPicker from "../../../utils/DOBPicker";
import { formatDate } from "../../../libs/utils";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../../../redux/slices/planSlice";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { loadGoogleMaps } from "../../../utils/loadGoogleMap";

const MemberDetails = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.plan);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const GOOGLE_MAPS_API_KEY = "AIzaSyC6URLPah7QiL_BHSzJVJTNy_qX6bIK8uU";
  const postalCodeRef = useRef(null);
  const [autocompleteInitialized, setAutocompleteInitialized] = useState(false);

  const handlePostalCodeFocus = async () => {
    if (!autocompleteInitialized && postalCodeRef.current) {
      try {
        const google = await loadGoogleMaps(GOOGLE_MAPS_API_KEY);

        const autocomplete = new google.maps.places.Autocomplete(
          postalCodeRef.current,
          {
            types: ["(regions)"],
            componentRestrictions: { country: "ca" },
          }
        );

        autocomplete.setFields(["address_components"]);

        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          let postalCode = "";

          if (place.address_components) {
            for (const component of place.address_components) {
              if (component.types.includes("postal_code")) {
                postalCode = component.long_name;
                break;
              }
            }

            if (postalCode) {
              postalCodeRef.current.value = postalCode;
              setPostal(postalCode);
              updateErrs("postal", postalCode);
            }
          }
        });

        setAutocompleteInitialized(true);
      } catch (err) {
        console.error("Failed to load Google Maps script:", err);
      }
    }
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const [errors, setErrors] = useState({});
  const [fname, setFname] = useState(userInfo?.fname || "");
  const [lname, setLname] = useState(userInfo?.lname || "");
  const [email, setEmail] = useState(userInfo?.email || "");
  const [phone, setPhone] = useState(userInfo?.phone || "");
  const [address, setAddress] = useState(userInfo?.address || "");
  const [province, setProvince] = useState(userInfo?.province || "");
  const [city, setCity] = useState(userInfo?.city || "");
  const [postal, setPostal] = useState(userInfo?.postal || "");
  const [dob, setDob] = useState(
    (userInfo?.dob && new Date(userInfo?.dob)) || ""
  );
  const [gender, setGender] = useState(userInfo?.gender || "");

  function updateErrs(field, value) {
    const newErrors = { ...errors };

    switch (field) {
      case "fname":
      case "lname":
      case "address":
      case "province":
      case "city":
      case "postal":
        if (value.trim()) delete newErrors[field];
        break;
      case "email":
        if (/^\S+@\S+\.\S+$/.test(value)) delete newErrors[field];
        break;
      case "phone":
        if (value.length >= 10 && value.length <= 14) delete newErrors[field];
        break;
      case "dob":
        if (value) delete newErrors[field];
        break;
      case "gender":
        if (value) delete newErrors[field];
        break;
      default:
        break;
    }

    setErrors(newErrors);
  }

  const validateForm = () => {
    const errors = {};

    if (!fname.trim()) errors.fname = "First name is required.";
    if (!lname.trim()) errors.lname = "Last name is required.";

    if (!email.trim()) {
      errors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      errors.email = "Invalid email format.";
    }

    if (!phone.trim()) {
      errors.phone = "Phone number is required.";
    } else if (!/^\d{10}$/.test(phone)) {
      errors.phone = "Phone number must be exactly 10 digits.";
    } else {
      const number = parsePhoneNumberFromString(`+1${phone}`, "CA");
      if (!number || !number.isValid()) {
        errors.phone = "Enter a valid Canadian phone number.";
      }
    }

    if (!address.trim()) errors.address = "Address is required.";
    if (!province.trim()) errors.province = "Province is required.";
    if (!city.trim()) errors.city = "City is required.";
    if (!postal.trim()) errors.postal = "Postal code is required.";
    if (!postal.trim()) {
      errors.postal = "Postal code is required";
    } else if (!/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/.test(postal.trim())) {
      errors.postal = "Invalid Canadian postal code format (e.g., M1B 2K3)";
    }
    if (!dob) errors.dob = "Date of birth is required.";
    if (!gender) errors.gender = "Gender is required.";

    if (Object.keys(errors).length > 0) {
      console.error("Validation Errors:", errors);
      return errors;
    }

    return false;
  };

  function addUser() {
    const errorStatus = validateForm();
    if (errorStatus) {
      console.warn("Please fix the form errors.");
      setErrors(errorStatus);
      return;
    }
    setErrors([]);
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
      gender,
    };
    dispatch(setUserInfo(payload));
    navigate("/member-Payment");
  }

  return (
    <div className="min-h-screen bg-black text-white px-4 pt-[80px] pb-10 flex flex-col gap-6 max-w-[600px] w-full mx-auto">
      <div>
        <StepIndicator
          step={2}
          totalSteps={3}
          title="Your Details"
          subtitle="Tell us a bit about yourself"
        />

        <div className="flex flex-col mt-4">
          <p className="text-white font-[kanit] text-[46px] sm:text-[44px] font-[700] leading-[38px] uppercase">
            TELL US ABOUT
          </p>
          <p className="text-[#2DDE28] font-[kanit] text-[50px] font-[700] leading-[38px] uppercase">
            YOURSELF
          </p>
        </div>
      </div>

      <MembershipVancouver />

      <div className="flex flex-col gap-3">
        <p className="text-white font-[kanit] text-[16px] font-[600]   tracking-[0.705px] uppercase">
          Your Basic Info
        </p>

        <div className="flex flex-row gap-4">
          <div className="w-full">
            <input
              type="text"
              placeholder="First Name"
              value={fname}
              onChange={(e) => {
                setFname(e.target.value);
                updateErrs("fname", e.target.value);
              }}
              className={`w-full px-4 py-3 bg-transparent border ${
                errors?.fname ? "!border-red-500" : "border-white/40"
              } placeholder-[#999999] text-[16px] font-[400]`}
            />
            {errors?.fname && (
              <p className="text-red-500 text-[12px] mt-1">{errors.fname}</p>
            )}
          </div>

          <div className="w-full">
            <input
              type="text"
              placeholder="Last Name"
              value={lname}
              onChange={(e) => {
                setLname(e.target.value);
                updateErrs("lname", e.target.value);
              }}
              className={`w-full px-4 py-3 bg-transparent border ${
                errors?.lname ? "!border-red-500" : "border-white/40"
              } placeholder-[#999999] text-[16px] font-[400]`}
            />
            {errors?.lname && (
              <p className="text-red-500 text-[12px] mt-1">{errors.lname}</p>
            )}
          </div>
        </div>

        <div>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              updateErrs("email", e.target.value);
            }}
            className={`w-full px-4 py-3 bg-transparent border ${
              errors?.email ? "!border-red-500" : "border-white/40"
            } placeholder-[#999999] text-[16px] font-[400]`}
          />
          {errors?.email && (
            <p className="text-red-500 text-[12px] mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              updateErrs("phone", e.target.value);
            }}
            onBeforeInput={(e) => {
              if (!/^\d+$/.test(e.data)) {
                e.preventDefault(); // blocks anything that's not a digit
              }
            }}
            className={`w-full px-4 py-3 bg-transparent border ${
              errors?.phone ? "!border-red-500" : "border-white/40"
            } placeholder-[#999999] text-[16px] font-[400]`}
          />

          {errors?.phone && (
            <p className="text-red-500 text-[12px] mt-1">{errors.phone}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            placeholder="Mailing Address"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
              updateErrs("address", e.target.value);
            }}
            className={`w-full px-4 py-3 bg-transparent border ${
              errors?.address ? "!border-red-500" : "border-white/40"
            } placeholder-[#999999] text-[16px] font-[400]`}
          />
          {errors?.address && (
            <p className="text-red-500 text-[12px] mt-1">{errors.address}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            placeholder="Province"
            value={province}
            onChange={(e) => {
              setProvince(e.target.value);
              updateErrs("province", e.target.value);
            }}
            className={`w-full px-4 py-3 bg-transparent border ${
              errors?.province ? "!border-red-500" : "border-white/40"
            } placeholder-[#999999] text-[16px] font-[400]`}
          />
          {errors?.province && (
            <p className="text-red-500 text-[12px] mt-1">{errors.province}</p>
          )}
        </div>

        <div className="flex flex-row gap-4">
          <div className="w-full">
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
                updateErrs("city", e.target.value);
              }}
              className={`w-full px-4 py-3 bg-transparent border ${
                errors?.city ? "!border-red-500" : "border-white/40"
              } placeholder-[#999999] text-[16px] font-[400]`}
            />
            {errors?.city && (
              <p className="text-red-500 text-[12px] mt-1">{errors.city}</p>
            )}
          </div>

          <div className="w-full">
            <input
              type="text"
              placeholder="Postal Code"
              value={postal}
              onChange={(e) => {
                setPostal(e.target.value);
                updateErrs("postal", e.target.value);
              }}
              onFocus={handlePostalCodeFocus}
              ref={postalCodeRef}
              className={`w-full px-4 py-3 bg-transparent border ${
                errors?.postal ? "!border-red-500" : "border-white/40"
              } placeholder-[#999999] text-[16px] font-[400]`}
            />
            {errors?.postal && (
              <p className="text-red-500 text-[12px] mt-1">{errors.postal}</p>
            )}
          </div>
        </div>

        <div className="flex flex-row gap-4">
          <div className="w-full">
            <DOBPicker
              dob={dob}
              setDob={setDob}
              errors={errors}
              updateErrs={updateErrs}
            />
          </div>

          <div className="relative w-full">
            <select
              value={gender || ""}
              onChange={(e) => {
                setGender(e.target.value);
                updateErrs("gender", e.target.value);
              }}
              onClick={toggleDropdown}
              className={`w-full appearance-none px-4 py-2.5 bg-transparent border ${
                errors?.gender ? "!border-red-500" : "border-white/40"
              } placeholder-[#999999] text-[16px] ${
                gender ? "text-white" : "text-[#999]"
              } font-[400] outline-none`}
            >
              <option className="bg-[#1C1C1C] cursor-pointer" value="">
                Gender
              </option>
              <option
                className="bg-[#1C1C1C] cursor-pointer text-white"
                value="Male"
              >
                Male
              </option>
              <option
                className="bg-[#1C1C1C] cursor-pointer text-white"
                value="Female"
              >
                Female
              </option>
              <option
                className="bg-[#1C1C1C] cursor-pointer text-white"
                value="Other"
              >
                Other
              </option>
            </select>

            {errors?.gender && (
              <p className="text-red-500 text-[12px] mt-1">{errors.gender}</p>
            )}

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
