import React, { useState } from "react";
import guarantee_icons from "../../../../../assets/images/desktop/guarantee_icons.svg";
import { usePaymentInputs } from "react-payment-inputs";
import images from "react-payment-inputs/images";

function CardForm({
  firstCardName,
  setFirstCardName,
  lastCardName,
  setLastCardName,
  // termPage,
  // setTermPage,
  // privacy,
  // setPrivacy,
  // cardNumber,
  // setCardNumber,
  // cvc,
  // setCvv,
  // expiryDate,
  // setExpirationDate,
  // confirm,
  // setConfirm,
  errors,
  setErrors,
  // termsAgreed,
  // setTermsAgreed,
  // renewAgreeded,
  // setRenewAgreeded,
  getCardNumberProps,
  getExpiryDateProps,
  getCVCProps,
  // getCardImageProps,
  meta,
  cardAuthorize,
  cardAcknowledge,
  cardConfirm,
  setCardAuthorize,
  setCardAcknowledge,
  setCardConfirm,
}) {
  return (
    <div
      className="max-w-[600px] space-y-4 text-white"
      style={{ height: "700px" }}
    >
      <p className="mb-6 mt-6 text-left text-[#FFFFFF] font-[400] text-[16px] font-[vazirmatn]">
        Please enter your payment details for your bi-weekly payment to help us
        start your membership. This payment method will also be used for future
        fees.
      </p>

      {/* Form */}
      <>
        <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-2">
          {/* First Name */}
          <div className="flex flex-col">
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={firstCardName}
              onChange={(e) => {
                const value = e.target.value;
                setFirstCardName(value);
                if (errors.firstName && value.trim() !== "") {
                  setErrors((prev) => ({ ...prev, firstCardName: false }));
                }
              }}
              className={`p-3 border text-white font-[vazirmatn] text-[16px] bg-[#000000]/60 backdrop-blur-[10px] placeholder-[#999999] ${
                errors.firstName ? "border-red-500" : "border-[#999999]"
              }`}
              placeholder="First Name"
            />
            {errors.firstName && (
              <p className="text-[#c20000] mt-1 text-sm">{errors.firstName}</p>
            )}
          </div>

          {/* Last Name */}
          <div className="flex flex-col">
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={lastCardName}
              onChange={(e) => {
                const value = e.target.value;
                setLastCardName(value);
                if (errors.lastName && value.trim() !== "") {
                  setErrors((prev) => ({ ...prev, lastCardName: false }));
                }
              }}
              className={`p-3 border text-white font-[vazirmatn] text-[16px] bg-[#000000]/60 backdrop-blur-[10px] placeholder-[#999999] ${
                errors.lastName ? "border-red-500" : "border-[#999999]"
              }`}
              placeholder="Last Name"
            />
            {errors.lastName && (
              <p className="text-[#c20000] mt-1 text-sm">{errors.lastName}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 mb-6">
          <div className="flex flex-col">
            <div className="flex items-center">
              <input
                {...getCardNumberProps()}
                placeholder="Card Number"
                className={`p-3 bg-[#000000]/60 backdrop-blur-[10px] font-[vazirmatn] text-[16px] border text-white w-full placeholder-[#999999] ${
                  errors.cardNumber || (meta?.touchedInputs?.cardNumber && meta?.erroredInputs?.cardNumber)
                    ? "border-red-500"
                    : "border-[#999999]"
                }`}
              />
            </div>
            {/* meta?.erroredInputs */}
            {(errors.cardNumber || (meta?.touchedInputs?.cardNumber && meta?.erroredInputs?.cardNumber)) && (
              <p className="text-[#c20000] mt-1 text-sm">
                {errors.cardNumber || meta?.erroredInputs?.cardNumber}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-2">
          <div>
            <div className="flex flex-col">
              <input
                {...getExpiryDateProps()}
                placeholder="MM/YY"
                className={`p-3 bg-[#000000]/60 backdrop-blur-[10px] border font-[vazirmatn] text-[16px] text-white placeholder-[#999999] ${
                  errors.expiryDate || (meta?.touchedInputs?.expiryDate && meta?.erroredInputs?.expiryDate)
                    ? "border-red-500"
                    : "border-[#999999]"
                }`}
              />
              {(errors.expiryDate || (meta?.touchedInputs?.expiryDate && meta?.erroredInputs?.expiryDate)) && (
                <p className="text-[#c20000] mt-1 text-sm">
                  {errors.expiryDate || meta?.erroredInputs?.expiryDate}
                </p>
              )}
            </div>
          </div>
          <div>
            <div className="flex flex-col">
              <input
                {...getCVCProps()}
                placeholder="CVC"
                className={`p-3 bg-[#000000]/60 backdrop-blur-[10px] font-[vazirmatn] text-[16px] border text-white placeholder-[#999999] ${
                  errors.cvc || (meta?.touchedInputs?.cvc && meta?.erroredInputs?.cvc)
                    ? "border-red-500"
                    : "border-[#999999]"
                }`}
              />
              {(errors.cvc || (meta?.touchedInputs?.cvc && meta?.erroredInputs?.cvc)) && (
                <p className="text-[#c20000] mt-1 text-sm">
                  {errors.cvc || meta?.erroredInputs?.cvc}
                </p>
              )}
            </div>
          </div>
        </div>

        <div>
          <p className="text-[16px] font-regular font-[vazirmatn]">
            Guaranteed Safe checkout
          </p>
          <img
            src={guarantee_icons}
            alt="guarantee_icons"
            className="mt-1 cursor-pointer"
          />
        </div>

        <div className="mt-4 mb-6">
          <div className="flex items-start">
            <input
              type="checkbox"
              id="accountHolder"
              name="accountHolder"
              checked={cardAuthorize}
              onChange={(e) => setCardAuthorize(e.target.checked)}
              className="mr-2 accent-[#2DDE28]"
              style={{ marginTop: "3.5px" }}
            />
            <label
              htmlFor="accountHolder"
              className="text-[16px] font-[400] font-[vazirmatn] ml-2"
            >
              I authorize Evolve Strength to charge my credit or debit card for
              membership fees.
            </label>
          </div>
          {(errors.accountHolder) && (
            <p className="text-[#f90303] text-sm">
              {errors.accountHolder}
            </p>
          )}
        </div>

        <div className="mt-4 mb-6">
          <div className="flex items-start">
            <input
              type="checkbox"
              id="acknowledge"
              name="acknowledge"
              checked={cardAcknowledge}
              onChange={(e) => setCardAcknowledge(e.target.checked)}
              className="mr-2 accent-[#2DDE28]"
              style={{ marginTop: "3.5px" }}
            />
            <label
              htmlFor="acknowledge"
              className="text-[16px] font-[400] font-[vazirmatn] ml-2"
            >
              I acknowledge and agree that my membership will automatically renew
              biweekly unless I cancel as outlined in the membership contract or
              if the contract specifies a shorter renewal period.
            </label>
          </div>
          {(errors.acknowledge) && (
            <p className="text-[#f90303] mt-1 text-sm">
              {errors.acknowledge}
            </p>
          )}
        </div>

        <div className="mb-6">
          <div className="flex items-start">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              checked={cardConfirm}
              disabled={!(cardAcknowledge && cardAuthorize)}
              onChange={(e) => setCardConfirm(e.target.checked)}
              className="mr-2 accent-[#2DDE28]"
              style={{ marginTop: "3.5px" }}
            />
            <label
              htmlFor="terms"
              className="text-[16px] font-[400] font-[vazirmatn] ml-2"
            >
              Please confirm you have read our{" "}
              <a
                // onClick={() => setTermPage(true)}
                href="https://join.evolvestrength.ca/terms-and-conditions/"
                target="_blank"
                className={`font-[400] text-blue-500`}
              >
                Terms And Conditions
              </a>{" "}
              &{" "}
              <a
                // onClick={() => setPrivacy(true)}
                href="https://join.evolvestrength.ca/privacy-policy/"
                target="_blank"
                className={`font-[400] text-blue-500`}
              >
                Privacy Policy
              </a>
            </label>
          </div>
          {(errors.terms) && (
            <p className="text-[#f90303] mt-1 text-sm">
              {errors.terms}
            </p>
          )}
        </div>
      </>
    </div>
  );
}

export default CardForm;
