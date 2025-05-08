import React, { useState } from "react";
import guarantee_icons from "../../../../../assets/images/desktop/guarantee_icons.svg";
import { useSelector } from "react-redux";

function CardForm({
  firstCardName,
  setFirstCardName,
  lastCardName,
  setLastCardName,
  cardNumber,
  setCardNumber,
  cvv,
  setCvv,
  expirationDate,
  setExpirationDate,
  confirm,
  setConfirm,
  errors,
  setErrors,
}) {
  const [termsAgreed, setTermsAgreed] = useState(false);
  const { plan, clubPlanMonthly, clubPlanYearly } = useSelector(
    (state) => state.plan
  );

  return (
    <div
      className="max-w-[600px] space-y-4 text-white"
      style={{ height: "700px" }}
    >
      <h1 className="text-[40px] leading-[42px] font-[kanit] font-[500] capitalize  mb-6 text-left mt-4">
        Set your Bi-Weekly Payment of <br />{" "}
        {plan === "monthly"
          ? clubPlanMonthly?.scheduleTotalAmount
          : clubPlanYearly?.scheduleTotalAmount}
      </h1>
      <p className="mb-6 text-left text-[#FFFFFF] font-[400] text-[18px] font-[vazirmatn]">
        Visa and master cards are accepted here
      </p>

      {/* Form */}
      <form>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* First Name */}
          <div className="flex flex-col">
            <input
              type="text"
              id="firstName"
              value={firstCardName}
              onChange={(e) => {
                const value = e.target.value;
                setFirstCardName(value);
                if (errors.firstCardName && value.trim() !== "") {
                  setErrors((prev) => ({ ...prev, firstCardName: false }));
                }
              }}
              className={`p-3 border text-white font-[vazirmatn] text-[16px] bg-[#000000]/60 backdrop-blur-[10px] placeholder-[#999999] ${
                errors.firstCardName ? "border-red-500" : "border-[#999999]"
              }`}
              placeholder="First Name"
            />
            {errors.firstCardName && (
              <p className="text-[#c20000] mt-1 text-sm">{errors.firstCardName}</p>
            )}
          </div>

          {/* Last Name */}
          <div className="flex flex-col">
            <input
              type="text"
              id="lastName"
              value={lastCardName}
              onChange={(e) => {
                const value = e.target.value;
                setLastCardName(value);
                if (errors.lastCardName && value.trim() !== "") {
                  setErrors((prev) => ({ ...prev, lastCardName: false }));
                }
              }}
              className={`p-3 border text-white font-[vazirmatn] text-[16px] bg-[#000000]/60 backdrop-blur-[10px] placeholder-[#999999] ${
                errors.lastCardName ? "border-red-500" : "border-[#999999]"
              }`}
              placeholder="Last Name"
            />
            {errors.lastCardName && (
              <p className="text-[#c20000] mt-1 text-sm">{errors.lastCardName}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 mb-6">
          {/* Card Number */}
          <div className="flex flex-col">
            <div className="flex items-center">
              <input
                type="text"
                id="cardNumber"
                value={cardNumber}
                onChange={(e) => {
                  const value = e.target.value;
                  setCardNumber(value);
                  if (errors.cardNumber && value.trim() !== "") {
                    setErrors((prev) => ({ ...prev, cardNumber: false }));
                  }
                }}
                className={`p-3 bg-[#000000]/60 backdrop-blur-[10px] font-[vazirmatn] text-[16px] border text-white w-full placeholder-[#999999] ${
                  errors.cardNumber ? "border-red-500" : "border-[#999999]"
                }`}
                placeholder="Card Number"
              />
            </div>
            {errors.cardNumber && (
              <p className="text-[#c20000] mt-1 text-sm">{errors.cardNumber}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <div className="flex flex-col">
              <input
                type="text"
                id="cvv"
                value={cvv}
                onChange={(e) => {
                  const value = e.target.value;
                  setCvv(value);
                  if (errors.cvv && value.trim() !== "") {
                    setErrors((prev) => ({ ...prev, cvv: false }));
                  }
                }}
                className={`p-3 bg-[#000000]/60 backdrop-blur-[10px] font-[vazirmatn] text-[16px] border text-white placeholder-[#999999] ${
                  errors.cvv ? "border-red-500" : "border-[#999999]"
                }`}
                placeholder="CVV"
              />
              {errors.cvv && (
              <p className="text-[#c20000] mt-1 text-sm">{errors.cvv}</p>
            )}
            </div>
          </div>
          <div>
            <div className="flex flex-col">
              <input
                type="text"
                id="accountNumber"
                value={expirationDate}
                onChange={(e) => {
                  const value = e.target.value;
                  setExpirationDate(value);
                  if (errors.expirationDate && value.trim() !== "") {
                    setErrors((prev) => ({ ...prev, expirationDate: false }));
                  }
                }}
                className={`p-3 bg-[#000000]/60 backdrop-blur-[10px] border font-[vazirmatn] text-[16px] text-white placeholder-[#999999] ${
                  errors.expirationDate ? "border-red-500" : "border-[#999999]"
                }`}
                placeholder="Expiration Date"
              />
              {errors.expirationDate && (
              <p className="text-[#c20000] mt-1 text-sm">{errors.expirationDate}</p>
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
            className="cursor-pointer mt-1"
          />
        </div>

        <div className="flex items-start mb-6 mt-4">
          <input
            type="checkbox"
            id="accountHolder"
            checked={termsAgreed}
            onChange={() => setTermsAgreed(!termsAgreed)}
            className="mr-2"
            style={{ marginTop: "3.5px" }}
          />
          <label
            htmlFor="accountHolder"
            className="text-[16px] font-[400] font-[vazirmatn] ml-2"
          >
            I am the bank account holder and do not require another person to
            authorize the debits on this account
          </label>
        </div>

        <div className="flex items-start mb-6">
          <input
            type="checkbox"
            id="terms"
            checked={confirm}
            onChange={() => setConfirm(!confirm)}
            className="mr-2"
            style={{ marginTop: "3.5px" }}
          />
          <label
            htmlFor="terms"
            className="text-[16px] font-[400] font-[vazirmatn] ml-2"
          >
            Please confirm you have read our{" "}
            <a href="#" className="text-blue-400">
              Terms And Conditions
            </a>
          </label>
        </div>
      </form>
    </div>
  );
}

export default CardForm;
