import React, { useState } from "react";
import guarantee_icons from "../../../../../assets/images/desktop/guarantee_icons.svg";

function CardForm({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  cardNumber,
  setCardNumber,
  cvv,
  setCvv,
  expirationDate,
  setExpirationDate,
  confirm,
  setConfirm,
}) {
  const [termsAgreed, setTermsAgreed] = useState(false);

  return (
    <div className="max-w-[600px] space-y-4 text-white">
      <h1 className="text-[40px] leading-[42px] font-[kanit] font-[500] capitalize  mb-6 text-left mt-4">
        Set your Bi-Weekly Payment of <br /> $98.99
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
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="p-3 border border-[#999999] text-white font-[vazirmatn] bg-[#000000]/60 backdrop-blur-[10px] placeholder-[#999999]"
              placeholder="First Name"
            />
          </div>

          {/* Last Name */}
          <div className="flex flex-col">
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="p-3 border border-[#999999] text-white font-[vazirmatn] bg-[#000000]/60 backdrop-blur-[10px] placeholder-[#999999]"
              placeholder="Last Name"
            />
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
                onChange={(e) => setCardNumber(e.target.value)}
                className="p-3 bg-[#000000]/60 backdrop-blur-[10px] font-[vazirmatn] border border-[#999999] text-white w-full placeholder-[#999999]"
                placeholder="Card Number"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <div className="flex flex-col">
              <input
                type="text"
                id="cvv"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                className="p-3 bg-[#000000]/60 backdrop-blur-[10px] font-[vazirmatn] border border-[#999999] text-white placeholder-[#999999]"
                placeholder="CVV"
              />
            </div>
          </div>
          <div>
            <div className="flex flex-col">
              <input
                type="text"
                id="accountNumber"
                value={expirationDate}
                onChange={(e) => setExpirationDate(e.target.value)}
                className="p-3 bg-[#000000]/60 backdrop-blur-[10px] border font-[vazirmatn] border-[#999999] text-white placeholder-[#999999]"
                placeholder="Expiration Date"
              />
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

        <div className="flex items-center mb-6 mt-4">
          <input
            type="checkbox"
            id="accountHolder"
            checked={termsAgreed}
            onChange={() => setTermsAgreed(!termsAgreed)}
            className="mr-2"
          />
          <label
            htmlFor="accountHolder"
            className="text-[16px] font-[400] font-[vazirmatn] ml-2"
          >
            I am the bank account holder and do not require another person to
            authorize the debits on this account
          </label>
        </div>

        <div className="flex items-center mb-6">
          <input
            type="checkbox"
            id="terms"
            checked={confirm}
            onChange={() => setConfirm(!confirm)}
            className="mr-2"
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
