import React, { useState } from "react";
import visaIcon from "../../../assets/images/mobile/payment/dabit1.svg";
import mcIcon from "../../../assets/images/mobile/payment/credit2.svg";
import lockIcon from "../../../assets/images/mobile/payment/credit3.svg";
import lockIcon2 from "../../../assets/images/mobile/payment/credit4.svg";
import { useSelector } from "react-redux";
import images from "react-payment-inputs/images";

const CardPaymentForm = ({
  makeAgreement,
  fname,
  setFname,
  lname,
  setLname,
  cardNumber,
  setCardNumber,
  cvc,
  setCvv,
  expirationDate,
  setExpirationDate,
  errors,
  updateErrs,
  apiError,
  paymentMethod,

  getCardNumberProps,
  getExpiryDateProps,
  getCVCProps,
  getCardImageProps,
  meta,
  cardAuthorize,
  cardAcknowledge,
  cardConfirm,
  setCardAuthorize,
  setCardAcknowledge,
  setCardConfirm,
}) => {
  // const [termsPage, setTermsPage] = useState(false);
  // const [agree, setAgree] = useState(false);
  // const [holder, setHolder] = useState(false);
  const { isLoading } = useSelector((state) => state.plan);

  // const [confirm, setConfirm] = useState(false);
  // const [privacyPage, setPrivacyPage] = useState(false);

  return (
    <form onSubmit={makeAgreement} className="flex flex-col gap-4">
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
              id="firstName"
              name="firstName"
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
              id="lastName"
              name="lastName"
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
          <div className="flex items-center relative">
            <input
              type="text"
              placeholder="Card Number"
              {...getCardNumberProps()}
              // value={cardNumber}
              // onChange={(e) => {
              //   const value = e.target.value.replace(/[^0-9]/g, "");
              //   setCardNumber(value);
              //   updateErrs("cardNumber");
              // }}
              // maxLength={16}
              className={`w-full px-4 py-3 bg-black border border-[#999] text-white text-[16px] font-[400] placeholder-[#999999] text-left rounded-none ${
                (errors?.cardNumber ||
                  (meta?.touchedInputs?.cardNumber &&
                    meta?.erroredInputs?.cardNumber)) &&
                "!border-red-500"
              }`}
            />
            <div className="absolute right-5 w-fit h-full flex items-center">
              <svg
                {...getCardImageProps({ images })}
                alt="Card type"
                className="h-6"
              />
            </div>
          </div>
          {(errors?.cardNumber ||
            (meta?.touchedInputs?.cardNumber &&
              meta?.erroredInputs?.cardNumber)) && (
            <p className="text-red-500 text-[12px] mt-1">
              {errors.cardNumber || meta?.erroredInputs?.cardNumber}
            </p>
          )}
        </div>

        <div className="flex flex-row gap-4">
          <div className="w-full">
            <input
              type="text"
              placeholder="MM/YY"
              {...getExpiryDateProps()}
              // placeholder="Expiration Date (MM/YY)"
              // value={expirationDate}
              // onChange={(e) => {
              //   let value = e.target.value;
              //   value = value.replace(/[^0-9/]/g, "");
              //   setExpirationDate(value);
              //   updateErrs("expirationDate");
              // }}
              // maxLength={5}
              className={`w-full px-4 py-3 bg-black border border-[#999] text-white text-[16px] font-[400] placeholder-[#999999] text-left rounded-none ${
                (errors?.expiryDate ||
                  (meta?.touchedInputs?.expiryDate &&
                    meta?.erroredInputs?.expiryDate)) &&
                "!border-red-500"
              }`}
            />
            {(errors?.expiryDate ||
              (meta?.touchedInputs?.expiryDate &&
                meta?.erroredInputs?.expiryDate)) && (
              <p className="text-red-500 text-[12px] mt-1">
                {errors.expiryDate || meta?.erroredInputs?.expiryDate}
              </p>
            )}
          </div>

          <div className="w-full">
            <input
              type="text"
              // placeholder="CVC"
              name="cvc"
              {...getCVCProps()}
              // value={cvc}
              // onChange={(e) => {
              //   // Only allow numbers
              //   const value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
              //   setCvv(value); // Set the cleaned numeric value
              //   updateErrs("cvc"); // Update error state if necessary
              // }}
              // maxLength={3}
              className={`w-full px-4 py-3 bg-black border border-[#999] text-white text-[16px] font-[400] placeholder-[#999999] text-left rounded-none ${
                (errors?.cvc ||
                  (meta?.touchedInputs?.cvc && meta?.erroredInputs?.cvc)) &&
                "!border-red-500"
              }`}
            />
            {(errors?.cvc ||
              (meta?.touchedInputs?.cvc && meta?.erroredInputs?.cvc)) && (
              <p className="text-red-500 text-[12px] mt-1">
                {errors.cvc || meta?.erroredInputs?.cvc}
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

      <div>
        <label className="flex items-start gap-3 text-[14px] text-[#D8D8D8] font-[vazirmatn] cursor-pointer">
          <input
            type="checkbox"
            id="accountHolder"
            name="accountHolder"
            className="mt-1 accent-[#2DDE28]"
            checked={cardAuthorize}
            onChange={(e) => setCardAuthorize(e.target.checked)}
          />
          <span>
            I authorize Evolve Strength to charge my credit or debit card for
            membership fees
          </span>
        </label>
        {errors.accountHolder && (
          <p className="text-[#f90303] text-xs">{errors.accountHolder}</p>
        )}
      </div>

      <div>
        <label className="flex items-start gap-3 text-[14px] text-[#D8D8D8] font-[vazirmatn] cursor-pointer">
          <input
            type="checkbox"
            id="acknowledge"
            name="acknowledge"
            className="mt-1 accent-[#2DDE28]"
            checked={cardAcknowledge}
            onChange={(e) => setCardAcknowledge(e.target.checked)}
          />
          <span>
            I acknowledge and agree that my membership will automatically renew
            biweekly unless I cancel as outlined in the membership contract or
            if the contract specifies a shorter renewal period.
          </span>
        </label>
        {errors.acknowledge && (
          <p className="text-[#f90303] text-xs">{errors.acknowledge}</p>
        )}
      </div>

      <div>
        <label className="flex items-start gap-2 text-[14px] font-[vazirmatn] text-[#D8D8D8] font-[400] mt-4">
          <input
            type="checkbox"
            className="mt-1 accent-[#2DDE28]"
            id="terms"
            name="terms"
            checked={cardConfirm}
            // disabled={!(termsPage && privacyPage)}
            disabled={!(cardAcknowledge && cardAuthorize)}
            onChange={(e) => setCardConfirm(e.target.checked)}
          />
          <span>
            Please confirm you have read our{" "}
            <a
              href="https://join.evolvestrength.ca/terms-and-conditions/"
              target="_blank"
              className="text-[#2DDE28]"
              // className={`text-[#2DDE28] ${
              //   !termsPage ? "font-[600]" : "font-[400]"
              // }`}
              // onClick={() => setTermsPage(true)}
            >
              Terms And Conditions
            </a>{" "}
            &{" "}
            <a
              href="https://join.evolvestrength.ca/privacy-policy/"
              target="_blank"
              className="text-[#2DDE28]"
              // className={`text-[#2DDE28] ${
              //   !privacyPage ? "font-[600]" : "font-[400]"
              // }`}
              // onClick={() => setPrivacyPage(true)}
            >
              Privacy Policy
            </a>
          </span>
        </label>
        {errors.terms && (
          <p className="text-[#f90303] text-xs">{errors.terms}</p>
        )}
      </div>

      <div className="flex flex-col items-center">
        {apiError && paymentMethod == "card" && (
          <span className="w-full text-sm text-center text-red-500">
            {apiError}
          </span>
        )}

        <button
          type="submit"
          // onClick={() => makeAgreement()}
          className="cursor-pointer flex justify-center items-center w-full h-[42px] mt-4 px-0 pt-[12.801px] pb-[13.199px] 
          bg-[#2DDE28] border border-[#2DDE28] font-[kanit] text-black text-[16px] font-medium 
          leading-[16px] uppercase font-kanit transition-all hover:opacity-90 active:scale- disabled:opacity-60"
          // disabled={isLoading || !holder || !agree || !confirm}
          disabled={isLoading}
        >
          Pay Now
        </button>
      </div>
    </form>
  );
};

export default CardPaymentForm;
