import React, { useEffect, useRef, useState } from "react";
import StepIndicator from "./common/StepIndicator";
import MembershipVancouver from "./common/MembershipVancouver";
import { useNavigate } from "react-router-dom";
import EventDatePicker from "../../../utils/EventDatePicker";
import DOBPicker from "../../../utils/DOBPicker";
import { formatDate } from "../../../libs/utils";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../../../redux/slices/planSlice";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { loadGoogleMaps } from "../../../utils/loadGoogleMap";

const genderOptions = [
  { label: "Gender", value: "" },
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  { label: "Other", value: "Other" },
];

const MemberDetails = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.plan);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const GOOGLE_MAPS_API_KEY = "AIzaSyC6URLPah7QiL_BHSzJVJTNy_qX6bIK8uU";
  const postalCodeRef = useRef(null);
  const addressRef = useRef(null);
  const provinceRef = useRef(null);
  const cityRef = useRef(null);

  const dropdownRef = useRef(null);
  const [autocompleteInitialized, setAutocompleteInitialized] = useState(false);
  const [
    autocompleteInitializedForAddress,
    setAutocompleteInitializedForAddress,
  ] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const formatAddress = (address) => {
    // Remove any special characters that are not allowed by the API
    return address.replace(/[^A-Za-z0-9 /#]/g, "").slice(0, 44); // Limit to 44 characters
  };

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

        autocomplete.setFields(["address_components", "formatted_address"]);

        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          let postalCode = "";
          let formattedAddress = "";
          let shortAddress = "";
          let province = "";
          let city = "";

          if (place.address_components) {
            for (const component of place.address_components) {
              if (component.types.includes("postal_code")) {
                postalCode = component.long_name;
                // break;
                continue;
              }
              if (component.types.includes("street_number")) {
                shortAddress = component.long_name?.replaceAll('é', 'e');
                shortAddress = component.long_name?.replace(/[^A-Za-z0-9 /#]/g, "");
                // break;
                continue;
              }
              if (component.types.includes("route")) {
                shortAddress = (shortAddress + " " + component.long_name)?.replaceAll('é', 'e');
                shortAddress = (shortAddress + " " + component.long_name)?.replace(/[^A-Za-z0-9 /#]/g, "");
                // break;
                continue;
              }
              if (component.types.includes("administrative_area_level_1")) {
                province = component.long_name?.replaceAll('é', 'e');
                province = component.long_name?.replace(/[^A-Za-z0-9 /#]/g, "");
                // break;
                continue;
              }
              if (component.types.includes("administrative_area_level_3")) {
                city = component.long_name?.replaceAll('é', 'e');
                city = component.long_name?.replace(/[^A-Za-z0-9 /#]/g, "");
                // break;
                continue;
              } else if (component.types.includes("locality")) {
                city = component.long_name?.replaceAll('é', 'e');
                city = component.long_name?.replace(/[^A-Za-z0-9 /#]/g, "");
                // break;
                continue;
              }
            }
          }

          if (place.formatted_address) {
            formattedAddress = place.formatted_address;
          } else {
            const cityComp =
              place.address_components?.find((c) =>
                c.types.includes("locality")
              )?.long_name || "";
            const provinceComp =
              place.address_components?.find((c) =>
                c.types.includes("administrative_area_level_1")
              )?.long_name || "";
            formattedAddress = [cityComp, provinceComp]
              .filter(Boolean)
              .join(", ");
          }
          const cleanedAddress = formatAddress(formattedAddress);

          if (postalCode) {
            postalCodeRef.current.value = postalCode;
            setPostal(postalCode);
            updateErrs("postal", postalCode);
          }

          if (shortAddress) {
            addressRef.current.value = shortAddress;
            setAddress(shortAddress);
            updateErrs("address", shortAddress);
          } else if (formattedAddress) {
            addressRef.current.value = cleanedAddress;
            setAddress(cleanedAddress);
            updateErrs("address", cleanedAddress);
          }
          
          if (province) {
            if (provinceRef.current) {
              provinceRef.current.value = province;
            }
            setProvince(province)
            // handleChange("province")({ target: { value: province } });
          }
          if (city) {
            if (cityRef.current) {
              cityRef.current.value = city;
            }
            setCity(city)
            // handleChange("city")({ target: { value: city } });
          }
        });

        setAutocompleteInitialized(true);
      } catch (err) {
        console.error("Failed to load Google Maps script:", err);
      }
    }
  };

  const handleAddressFocus = async () => {
    if (!autocompleteInitializedForAddress && addressRef.current) {
      try {
        const google = await loadGoogleMaps(GOOGLE_MAPS_API_KEY);

        const autocomplete = new google.maps.places.Autocomplete(
          addressRef.current,
          {
            types: ["address"],
            componentRestrictions: { country: "ca" },
          }
        );

        autocomplete.setFields(["formatted_address", "address_components"]);

        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          console?.log(place)
          const formattedAddress = place.formatted_address || "";
          let postalCode = "";
          let shortAddress = "";
          let province = "";
          let city = "";

          if (place.address_components) {
            for (const component of place.address_components) {
              if (component.types.includes("postal_code")) {
                postalCode = component.long_name;
                // break;
                continue;
              }
              if (component.types.includes("street_number")) {
                shortAddress = component.long_name?.replaceAll('é', 'e');
                shortAddress = component.long_name?.replace(/[^A-Za-z0-9 /#]/g, "");
                // break;
                continue;
              }
              if (component.types.includes("route")) {
                shortAddress = (shortAddress + " " + component.long_name)?.replaceAll('é', 'e');
                shortAddress = (shortAddress + " " + component.long_name)?.replace(/[^A-Za-z0-9 /#]/g, "");
                // break;
                continue;
              }
              if (component.types.includes("administrative_area_level_1")) {
                province = component.long_name?.replaceAll('é', 'e');
                province = component.long_name?.replace(/[^A-Za-z0-9 /#]/g, "");
                // break;
                continue;
              }
              if (component.types.includes("administrative_area_level_3")) {
                city = component.long_name?.replaceAll('é', 'e');
                city = component.long_name?.replace(/[^A-Za-z0-9 /#]/g, "");
                // break;
                continue;
              } else if (component.types.includes("locality")) {
                city = component.long_name?.replaceAll('é', 'e');
                city = component.long_name?.replace(/[^A-Za-z0-9 /#]/g, "");
                // break;
                continue;
              }
            }
          }

          const cleanedAddress = formatAddress(formattedAddress);

          if (shortAddress) {
            addressRef.current.value = shortAddress;
            setAddress(shortAddress);
            updateErrs("address", shortAddress);
          } else if (formattedAddress) {
            addressRef.current.value = cleanedAddress;
            setAddress(cleanedAddress);
            updateErrs("address", cleanedAddress);
          }

          if (postalCode) {
            postalCodeRef.current.value = postalCode;
            setPostal(postalCode);
            updateErrs("postal", postalCode);
          }
          if (province) {
            if (provinceRef.current) {
              provinceRef.current.value = province;
            }
            setProvince(province)
            // handleChange("province")({ target: { value: province } });
          }
          if (city) {
            if (cityRef.current) {
              cityRef.current.value = city;
            }
            setCity(city);
            // handleChange("city")({ target: { value: city } });
          }
        });

        setAutocompleteInitializedForAddress(true);
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
    const allowedPattern = /^[A-Za-z0-9 /#]{1,44}$/;

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
    if (!allowedPattern.test(address.trim()))
      errors.address = "Mailing address expected format between 1 and 44 alphanumeric characters, spaces, forward slashes(/), or pound signs(#).";
      // errors.address = "Mailing address can only contain letters, digits, spaces, /, # and -";
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
    navigate("/review-and-pay");
    // navigate("/member-Payment");
  }

  const handleSelect = (value) => {
    setGender(value);
    updateErrs("gender", value);
    setIsOpen(false);
  };

  const selectedLabel =
    genderOptions.find((opt) => opt.value === gender)?.label || "Gender";

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
        <p className="text-white font-[kanit] text-[16px] font-[600] tracking-[0.705px] uppercase">
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
            ref={addressRef}
            type="text"
            placeholder="Mailing Address"
            onFocus={handleAddressFocus}
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
          <div className="w-full relative">
            <DOBPicker
              dob={dob}
              setDob={setDob}
              errors={errors}
              updateErrs={updateErrs}
            />
          </div>

          <div
            className={`relative w-full max-w-xs ${isOpen ? "mb-40" : "mb-2"}`}
            ref={dropdownRef}
          >
            <div
              onClick={toggleDropdown}
              className={`flex items-center justify-between w-full px-4 py-2.5 bg-transparent border
                ${errors?.gender ? "border-red-500" : "border-white/40"}
               text-white cursor-pointer`}
            >
              <span className={gender ? "text-white" : "text-[#999]"}>
                {selectedLabel}
              </span>

              <svg
                className={`h-4 w-4 ml-2 transition-transform duration-300 text-[#2DDE28] ${
                  isOpen ? "rotate-180" : "rotate-0"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            {isOpen && (
              <div className="absolute z-10 w-full max-h-48 overflow-y-auto bg-black bg-opacity-90 border border-white/40 rounded-md mt-1 text-white shadow-md">
                {genderOptions.map(({ label, value }) => (
                  <div
                    key={value}
                    onClick={() => handleSelect(value)}
                    className={`px-4 py-2 cursor-pointer hover:bg-[#2DDE28] font-[300] hover:text-black 
                ${
                  value === gender
                    ? "bg-[#2DDE28] text-black font-[600]"
                    : ""
                }`}
                  >
                    {label}
                  </div>
                ))}
              </div>
            )}
            {errors?.gender && (
              <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
            )}
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
