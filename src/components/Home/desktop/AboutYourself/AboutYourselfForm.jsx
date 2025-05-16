import React from "react";
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

  const [
    autocompleteInitializedForPostal,
    setAutocompleteInitializedForPostal,
  ] = useState(false);
  const [
    autocompleteInitializedForAddress,
    setAutocompleteInitializedForAddress,
  ] = useState(false);

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

          if (formattedAddress) {
            if (addressRef.current) {
              addressRef.current.value = formattedAddress;
            }
            handleChange("address")({ target: { value: formattedAddress } });
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

          if (formattedAddress) {
            addressRef.current.value = formattedAddress;
            handleChange("address")({ target: { value: formattedAddress } });
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

  const genders = [
    { label: "Gender", value: "" },
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Other", value: "Other" },
  ];
  const selectedGender =
    genders.find((g) => g.value === formData.gender) || genders[0];

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
          <div className="relative w-full max-w-xs">
            <Listbox
              as="div"
              value={selectedGender}
              onChange={(val) => {
                handleChange("gender")({ target: { value: val.value } });
              }}
            >
              {({ open }) => (
                <>
                  <Listbox.Button
                    className={`w-full border px-4 py-3 placeholder-[#999999] font-[vazirmatn] text-[16px] bg-[#000000]/60 backdrop-blur-[10px] text-left flex justify-between items-center ${
                      validationErrors.gender
                        ? "border-[#c20000]"
                        : "border-white/40"
                    } ${formData.gender ? "text-white" : "text-[#999]"}`}
                  >
                    <span>{selectedGender.label}</span>
                    <img
                      src={ChevronDownFilled}
                      alt="Dropdown Icon"
                      className={`w-6 h-6 transition-transform duration-300 ${
                        open ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </Listbox.Button>

                  <Listbox.Options className="absolute z-50 mt-1 max-h-40 w-full overflow-auto rounded border border-[#656c72] bg-black/80 backdrop-blur-xl text-white font-[vazirmatn]">
                    {genders.map((gender) => (
                      <Listbox.Option
                        key={gender.value}
                        value={gender}
                        className={({ active }) =>
                          `cursor-pointer select-none p-3 ${
                            active ? "bg-[#2DDE28]/20" : "bg-transparent"
                          }`
                        }
                      >
                        {gender.label}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </>
              )}
            </Listbox>
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
