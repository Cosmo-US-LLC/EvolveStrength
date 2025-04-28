import React, { useState } from "react";
import info_icon from "../../../../../assets/images/desktop/info_icon.svg";
import guarantee_icons from "../../../../../assets/images/desktop/guarantee_icons.svg";

function CardForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [renewAgreed, setRenewAgreed] = useState(false);
  const [confirm, setConfirm] = useState(false);

  return (
    <div className="max-w-[600px] space-y-4 text-white">
      <h1 className="text-3xl font-bold mb-6 text-left mt-4">
        Set your Bi-Weekly Payment of $98.99
      </h1>
      <p className="mb-6 text-left text-[#FFFFFF] text-[18px] font-regular">
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
              className="p-3 border border-[#999999] text-white bg-[#000000]/60 backdrop-blur-[10px] placeholder-[#999999]"
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
              className="p-3 border border-[#999999] text-white bg-[#000000]/60 backdrop-blur-[10px] placeholder-[#999999]"
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
                className="p-3 bg-[#000000]/60 backdrop-blur-[10px] border border-[#999999] text-white w-full placeholder-[#999999]"
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
                className="p-3 bg-[#000000]/60 backdrop-blur-[10px] border border-[#999999] text-white placeholder-[#999999]"
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
                className="p-3 bg-[#000000]/60 backdrop-blur-[10px] border border-[#999999] text-white placeholder-[#999999]"
                placeholder="Expiration Date"
              />
            </div>
          </div>
        </div>

        {/* Guarantee */}
        <div>
          <p
            style={{ fontFamily: "'Vazirmatn', sans-serif" }}
            className="text-[16px] font-regular"
          >
            Guaranteed Safe checkout
          </p>
          <img
            src={guarantee_icons}
            alt="guarantee_icons"
            className="cursor-pointer"
          />
        </div>
        {/* Agreement Checkboxes */}
        <div className="flex items-center mb-6 mt-4">
          <input
            type="checkbox"
            id="accountHolder"
            checked={termsAgreed}
            onChange={() => setTermsAgreed(!termsAgreed)}
            className="mr-2"
          />
          <label htmlFor="accountHolder" className="text-sm">
            I am the bank account holder and do not require another person to
            authorize the debits on this account
          </label>
        </div>

        {/* Terms and Conditions */}
        <div className="flex items-center mb-6">
          <input
            type="checkbox"
            id="terms"
            checked={confirm}
            onChange={() => setConfirm(!confirm)}
            className="mr-2"
          />
          <label htmlFor="terms" className="text-sm">
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
