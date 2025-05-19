import React, { useState } from "react";
import visaIcon from "../../../assets/images/mobile/payment/dabit1.svg";
import mcIcon from "../../../assets/images/mobile/payment/credit2.svg";
import lockIcon from "../../../assets/images/mobile/payment/credit3.svg";
import lockIcon2 from "../../../assets/images/mobile/payment/credit4.svg";
import { useSelector } from "react-redux";

const CardPaymentForm = ({
  makeAgreement,
  fname,
  setFname,
  lname,
  setLname,
  cardNumber,
  setCardNumber,
  cvv,
  setCvv,
  expirationDate,
  setExpirationDate,
  errors,
  updateErrs,
  apiError,
  paymentMethod,
}) => {
  const [termsPage, setTermsPage] = useState(false);
    const [agree, setAgree] = useState(false);
    const [holder, setHolder] = useState(false);
  const {
    isLoading,
  } = useSelector((state) => state.plan);

  const [confirm, setConfirm] = useState(false);
  const [privacyPage, setPrivacyPage] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="text-white ">
        {/* <p className="text-white text-[18px] font-medium leading-[42px] capitalize">
          Set Your Bi-Weekly Payment Of&nbsp;
          {addOnDetails &&
          (clubLocationPostal === 40248 || clubLocationPostal === 40327)
            ? formattedTotalAmount
            : (plan === "monthly" ? clubPlanMonthly : clubPlanYearly)
                ?.scheduleTotalAmount || "$--.--"}
        </p> */}

        <p className="text-[#D8D8D8] leading-[21.2px] text-[14px] font-[400]">
          Please enter your payment details for your biweekly payment to help us
          start your membership. This payment method will also be used for
          future fees.
        </p>
      </div>

      <div className="flex flex-col w-full gap-4">
        <div className="flex flex-row gap-4">
          <div className="w-full">
            <input
              type="text"
              placeholder="First Name"
              value={fname}
              onChange={(e) => {
                setFname(e.target.value);
                updateErrs("fname");
              }}
              className={`w-full px-4 py-3 bg-black border border-[#999] text-white text-[16px] font-[400] placeholder-[#999999] text-left rounded-none ${
                errors?.fname && "!border-red-500"
              }`}
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
                updateErrs("lname");
              }}
              className={`w-full px-4 py-3 bg-black border border-[#999] text-white text-[16px] font-[400] placeholder-[#999999] text-left rounded-none ${
                errors?.lname && "!border-red-500"
              }`}
            />
            {errors?.lname && (
              <p className="text-red-500 text-[12px] mt-1">{errors.lname}</p>
            )}
          </div>
        </div>

        <div className="w-full">
          <input
            type="text"
            placeholder="Card Number"
            value={cardNumber}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9]/g, "");
              setCardNumber(value);
              updateErrs("cardNumber");
            }}
            maxLength={16}
            className={`w-full px-4 py-3 bg-black border border-[#999] text-white text-[16px] font-[400] placeholder-[#999999] text-left rounded-none ${
              errors?.cardNumber && "!border-red-500"
            }`}
          />
          {errors?.cardNumber && (
            <p className="text-red-500 text-[12px] mt-1">{errors.cardNumber}</p>
          )}
        </div>

        <div className="flex flex-row gap-4">
          <div className="w-full">
            <input
              type="text"
              placeholder="CVV"
              value={cvv}
              onChange={(e) => {
                // Only allow numbers
                const value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
                setCvv(value); // Set the cleaned numeric value
                updateErrs("cvv"); // Update error state if necessary
              }}
              maxLength={3}
              className={`w-full px-4 py-3 bg-black border border-[#999] text-white text-[16px] font-[400] placeholder-[#999999] text-left rounded-none ${
                errors?.cvv && "!border-red-500"
              }`}
            />
            {errors?.cvv && (
              <p className="text-red-500 text-[12px] mt-1">{errors.cvv}</p>
            )}
          </div>

          <div className="w-full">
            <input
              type="text"
              placeholder="Expiration Date"
              value={expirationDate}
              onChange={(e) => {
                let value = e.target.value;
                value = value.replace(/[^0-9/]/g, "");
                setExpirationDate(value);
                updateErrs("expirationDate");
              }}
              maxLength={5}
              className={`w-full px-4 py-3 bg-black border border-[#999] text-white text-[16px] font-[400] placeholder-[#999999] text-left rounded-none ${
                errors?.expirationDate && "!border-red-500"
              }`}
            />
            {errors?.expirationDate && (
              <p className="text-red-500 text-[12px] mt-1">
                {errors.expirationDate}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col pt-1">
        <p className="text-[#CACACA] text-[16px] font-[400] font-[vazirmatn]">
          Guaranteed Safe checkout
        </p>
        <div className="flex flex-row gap-3">
          <img src={visaIcon} alt="Visa" className="h-10 w-14" />
          <img src={mcIcon} alt="MasterCard" className="h-10 w-14" />
          <img src={lockIcon} alt="Lock" className="h-10 w-14" />
          <img src={lockIcon2} alt="Lock" className="h-10 w-14" />
        </div>
      </div>
      <label className="flex items-start gap-3 text-[14px] text-[#D8D8D8] font-[vazirmatn] cursor-pointer">
        <input
          type="checkbox"
          className="mt-1 accent-[#2DDE28]"
          checked={holder}
          onChange={(e) => setHolder(e.target.checked)}
        />
        <span>
          I authorize Evolve Strength to charge my credit or debit card for
          membership fees
        </span>
      </label>

      <label className="flex items-start gap-3 text-[14px] text-[#D8D8D8] font-[vazirmatn] cursor-pointer">
        <input
          type="checkbox"
          className="mt-1 accent-[#2DDE28]"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
        />
        <span>
          I acknowledge and agree that my membership will automatically renew
          biweekly unless I cancel as outlined in the membership contract or if
          the contract specifies a shorter renewal period.
        </span>
      </label>

      <label className="flex items-start gap-2 text-[14px] font-[vazirmatn] text-[#D8D8D8] font-[400] mt-4">
        <input
          type="checkbox"
          className="mt-1 accent-[#2DDE28]"
          checked={confirm}
          // disabled={!(termsPage && privacyPage)}
          onChange={(e) => setConfirm(e.target.checked)}
        />
        <span>
          Please confirm you have read our{" "}
          <a
            href="https://join.evolvestrength.ca/terms-and-conditions/"
            target="_blank"
            className={`text-[#2DDE28] ${
              !termsPage ? "font-[600]" : "font-[400]"
            }`}
            onClick={() => setTermsPage(true)}
          >
            Terms And Conditions
          </a>{" "}
          &{" "}
          <a
            href="https://join.evolvestrength.ca/privacy-policy/"
            className={`text-[#2DDE28] ${
              !privacyPage ? "font-[600]" : "font-[400]"
            }`}
            onClick={() => setPrivacyPage(true)}
          >
            Privacy Policy
          </a>
        </span>
      </label>
      <div className="flex flex-col items-center">
        {apiError && paymentMethod == "card" && (
          <span className="w-full text-sm text-center text-red-500">
            {apiError}
          </span>
        )}

        <button
          onClick={() => makeAgreement()}
          className="cursor-pointer flex justify-center items-center w-full h-[42px] mt-4 px-0 pt-[12.801px] pb-[13.199px] 
          bg-[#2DDE28] border border-[#2DDE28] font-[kanit] text-black text-[16px] font-medium 
          leading-[16px] uppercase font-kanit transition-all hover:opacity-90 active:scale- disabled:opacity-60"
          disabled={isLoading || !holder || !agree || !confirm}
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default CardPaymentForm;
