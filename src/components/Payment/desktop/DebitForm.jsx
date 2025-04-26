import React, { useState } from "react";
import info_icon from "../../../assets/desktop/info_icon.svg";
import guarantee_icons from "../../../assets/desktop/guarantee_icons.svg";

function DebitForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [transitNumber, setTransitNumber] = useState("");
  const [institutionNumber, setInstitutionNumber] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [verifyAccountNumber, setVerifyAccountNumber] = useState("");
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [renewAgreed, setRenewAgreed] = useState(false);
  const [confirm, setConfirm] = useState(false);

  return (
    <div className="max-w-[600px] space-y-4 text-white">
      <h1 className="text-3xl font-bold mb-6 text-left mt-4">
        Set Your Monthly Payment Of $98.99
      </h1>
      <p className="mb-6 text-left text-[#FFFFFF] text-[18px] font-regular">
        This is your standard payment for your monthly direct debit before any
        discounts are applied
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Transit Number */}
          <div className="flex flex-col">
            <div className="flex items-center">
              <input
                type="text"
                id="transitNumber"
                value={transitNumber}
                onChange={(e) => setTransitNumber(e.target.value)}
                className="p-3 bg-[#000000]/60 backdrop-blur-[10px] border border-[#999999] text-white w-full placeholder-[#999999]"
                placeholder="Transit Number"
              />
            </div>
          </div>

          {/* Institution Number */}
          <div className="flex flex-col">
            <div className="flex items-center">
              <input
                type="text"
                id="institutionNumber"
                value={institutionNumber}
                onChange={(e) => setInstitutionNumber(e.target.value)}
                className="p-3 bg-[#000000]/60 backdrop-blur-[10px] border border-[#999999] text-white w-full placeholder-[#999999]"
                placeholder="Institution Number"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            {/* Account Number */}
            <div className="flex flex-col">
              <label className="text-[14px] flex flex-row items-center mb-2 gap-2">
                Where is my Transit Number?
                {/* Info icon with tooltip on hover */}
                <div className="relative group">
                  <img
                    src={info_icon}
                    alt="info_icon"
                    className="cursor-pointer"
                  />
                  {/* Tooltip */}
                  <span className="border border-[1px] border-[#999999] max-w-[250px] z-20 absolute left-1/2 transform -translate-x-1/2 bottom-[-80px] w-max bg-[#757575] text-white text-xs p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    This is a 5-digit number that identifies your branch. You
                    can find it on your bank card or check with your bank.
                  </span>
                </div>
              </label>

              <input
                type="text"
                id="accountNumber"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                className="p-3 bg-[#000000]/60 backdrop-blur-[10px] border border-[#999999] text-white placeholder-[#999999]"
                placeholder="Account Number"
              />
            </div>
            <label className="text-[14px] flex flex-row items-center mt-2 gap-2">
              Where is my Account Number?
              {/* Info icon with tooltip on hover */}
              <div className="relative group">
                <img
                  src={info_icon}
                  alt="info_icon"
                  className="cursor-pointer"
                />
                {/* Tooltip */}
                <span className="border border-[1px] border-[#999999] max-w-[250px] z-20 absolute left-1/2 transform -translate-x-1/2 bottom-[-80px] w-max bg-[#757575] text-white text-xs p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  This is the number of your personal bank account. It can be
                  found on your cheque or bank statement.
                </span>
              </div>
            </label>
          </div>

          {/* Verify Account Number */}
          <div className="flex flex-col">
            <label className="text-[14px] flex flex-row items-center mb-2 gap-2">
              Where is my Institution Number?
              {/* Info icon with tooltip on hover */}
              <div className="relative group">
                <img
                  src={info_icon}
                  alt="info_icon"
                  className="cursor-pointer"
                />
                {/* Tooltip */}
                <span className="border border-[1px] border-[#999999] max-w-[250px] z-20 absolute left-1/2 transform -translate-x-1/2 bottom-[-90px] w-max bg-[#757575] text-white text-xs p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  This 3-digit number identifies the bank itself. You can find
                  it on your bank statement or contact your bank for assistance.
                </span>
              </div>
            </label>
            <input
              type="text"
              id="verifyAccountNumber"
              value={verifyAccountNumber}
              onChange={(e) => setVerifyAccountNumber(e.target.value)}
              className="p-3 bg-[#000000]/60 backdrop-blur-[10px] border border-[#999999] text-white placeholder-[#999999]"
              placeholder="Verify Account Number"
            />
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

        <div className="flex items-center mb-6">
          <input
            type="checkbox"
            id="renewAgreed"
            checked={renewAgreed}
            onChange={() => setRenewAgreed(!renewAgreed)}
            className="mr-2"
          />
          <label htmlFor="renewAgreed" className="text-sm">
            I acknowledge and agree that my membership will automatically renew
            bi-weekly until I cancel in accordance with the membership contract
            (unless the membership contract provides for a shorter renewal
            period)
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

export default DebitForm;
