import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { Listbox } from "@headlessui/react";
import DOBPickerDesktop from "../../../../utils/DOBPickerDesktop";
import { loadGoogleMaps } from "../../../../utils/loadGoogleMap";
import ChevronDownFilled from "../../../../assets/images/desktop/chevron-down-filled.svg";
// import { PhoneInput } from "react-international-phone";
// import "react-international-phone/style.css";

const AboutYourselfForm = ({
  formData,
  handleChange,
  validationErrors,
  handleChangeDob,
}) => {
  const GOOGLE_MAPS_API_KEY = "AIzaSyC6URLPah7QiL_BHSzJVJTNy_qX6bIK8uU";
  const postalCodeRef = useRef(null);
  const addressRef = useRef(null);
  const modalRef = useRef(null);
  const [hovered, setHovered] = useState(null);

  const [
    autocompleteInitializedForPostal,
    setAutocompleteInitializedForPostal,
  ] = useState(false);
  const [
    autocompleteInitializedForAddress,
    setAutocompleteInitializedForAddress,
  ] = useState(false);

  const formatAddress = (address) => {
    // Remove any special characters that are not allowed by the API
    return address.replace(/[^\w\s/#-]/g, "").slice(0, 44); // Limit to 44 characters
  };

  const handlePostalCodeFocus = async () => {
    if (!autocompleteInitializedForPostal && postalCodeRef.current) {
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

          if (place.address_components) {
            for (const component of place.address_components) {
              if (component.types.includes("postal_code")) {
                postalCode = component.long_name;
                break;
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

          if (postalCode) {
            postalCodeRef.current.value = postalCode;
            handleChange("postalCode")({ target: { value: postalCode } });
          }

          const cleanedAddress = formatAddress(formattedAddress);

          if (formattedAddress) {
            if (addressRef.current) {
              addressRef.current.value = cleanedAddress;
            }
            handleChange("address")({ target: { value: cleanedAddress } });
          }
        });

        setAutocompleteInitializedForPostal(true);
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
          const formattedAddress = place.formatted_address || "";
          let postalCode = "";

          if (place.address_components) {
            for (const component of place.address_components) {
              if (component.types.includes("postal_code")) {
                postalCode = component.long_name;
                break;
              }
            }
          }

          const cleanedAddress = formatAddress(formattedAddress);

          if (formattedAddress) {
            addressRef.current.value = cleanedAddress;
            handleChange("address")({ target: { value: cleanedAddress } });
          }

          if (postalCode) {
            if (postalCodeRef.current) {
              postalCodeRef.current.value = postalCode;
            }
            handleChange("postalCode")({ target: { value: postalCode } });
          }
        });

        setAutocompleteInitializedForAddress(true);
      } catch (err) {
        console.error("Failed to load Google Maps script:", err);
      }
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  console.log("isOpen", isOpen);
  const [gender, setGender] = useState(formData.gender || ""); // Add gender state
  const dropdownRef = useRef(null);

  const genderOptions = [
    { label: "Gender", value: "" },
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Other", value: "Other" },
  ];

  // Function to handle dropdown toggle
  const toggleDropdown = (e) => {
    e.stopPropagation(); // Prevent outside click from interfering

    // Properly toggle the state based on current value
    setIsOpen((prev) => {
      console.log("Toggling dropdown, current state:", prev);
      return !prev;
    });
  };

  // Function to handle selection of gender
  const handleSelect = (value) => {
    setGender(value);
    handleChange("gender")({ target: { value } }); // Update the form data
    setIsOpen(false); // Close the dropdown after selection
  };

  const selectedLabel =
    genderOptions.find((opt) => opt.value === gender)?.label || "Gender";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // Attach the listener only once
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="max-w-[600px] w-full space-y-4" style={{ height: "520px" }}>
      <p className="text-white font-[kanit] font-[600] text-[16px] leading-[16px] tracking-[0.76px] uppercase">
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
          onBeforeInput={(e) => {
            if (!/^\d+$/.test(e.data)) {
              e.preventDefault();
            }
          }}
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

      {/* <div>
        <PhoneInput
          placeholder="Phone Number"
          value={formData.number}
          onChange={handleChangeDob("number")}
          // className={`w-full border px-4 py-3 placeholder-[#999999] text-white font-[vazirmatn] text-[16px] bg-[#000000]/60 backdrop-blur-[10px] ${
          //   validationErrors.number ? "border-[#c20000]" : "border-white/40"
          // }`}
          className={`w-full border px-4 py-3 placeholder-[#999999] text-white font-[vazirmatn] text-[16px] bg-[#000000]/60 backdrop-blur-[10px] ${
            validationErrors.number ? "border-[#c20000]" : "border-white/40"
          }`}
          international={false} // Disables international country selection dropdown
          defaultCountry="CA" // Set a default country code if required (e.g., US)
          country="CA"
          inputProps={{
            className:
              "react-international-phone-input flex-1 !bg-transparent !border-none !text-[16px] !font-[vazirmatn] !text-white placeholder-[#999999] focus:outline-none", 
          }}
        />
        {validationErrors.number && (
          <p className="text-[#c20000] text-sm mt-1">
            {validationErrors.number}
          </p>
        )}
      </div> */}

      <div>
        <input
          ref={addressRef}
          type="text"
          placeholder="Mailing Address"
          value={formData.address}
          onFocus={handleAddressFocus}
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
            ref={postalCodeRef}
            type="text"
            placeholder="Postal Code"
            value={formData.postalCode}
            onFocus={handlePostalCodeFocus}
            onChange={handleChange("postalCode")}
            className={`w-full border px-4 py-3 placeholder-[#999999] text-white font-[vazirmatn] text-[16px] bg-[#000000]/60 backdrop-blur-[10px] ${
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
        <div className="flex-1 relative">
          <DOBPickerDesktop
            dob={formData.selectedDate}
            setDob={(date) => handleChangeDob("selectedDate")(date)}
            errors={validationErrors.selectedDate ? ["dob"] : []}
          />
          {validationErrors.selectedDate && (
            <p className="text-[#c20000] text-sm mt-1">
              {validationErrors.selectedDate}
            </p>
          )}
        </div>

        <div className="flex-1">
          <div
            className={`relative w-full max-w-xs ${isOpen ? "mb-40" : "mb-2"}`}
            ref={dropdownRef}
          >
            <div
              onClick={toggleDropdown}
              className={`flex items-center justify-between w-full px-4 py-3 bg-[#000000]/60 border ${
                validationErrors?.gender ? "border-red-500" : "border-white/40"
              } text-white cursor-pointer`}
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
              <div
                className="absolute z-10 w-full max-h-48 overflow-y-auto bg-[#000000]/60 bg-opacity-90 border border-white/40 rounded-md mt-1 text-white shadow-md"
                ref={modalRef}
              >
                {genderOptions.map(({ label, value }) => (
                  <div
                    key={value}
                    onClick={() => handleSelect(value)}
                    onMouseEnter={() => setHovered(value)} // Track when an item is being hovered
                    onMouseLeave={() => setHovered(null)} // Reset hover when the mouse leaves
                    className={`px-4 py-2 cursor-pointer font-[300] hover:bg-[#2DDE28]/50 hover:text-black ${
                      value === gender
                        ? hovered !== null && hovered !== value
                          ? "bg-none text-white font-[400]" // Selected item but another item is hovered
                          : "bg-[#2DDE28] text-black font-[600]" // Selected item, no other hover or hovered itself
                        : "bg-transparent"
                    }`}
                  >
                    {label}
                  </div>
                ))}
              </div>
            )}
          </div>

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
