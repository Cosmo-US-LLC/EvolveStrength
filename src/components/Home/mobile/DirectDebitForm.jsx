import React, { useState } from "react";
import { useSelector } from "react-redux";
import visaIcon from "../../../assets/images/mobile/payment/dabit1.svg";
import mcIcon from "../../../assets/images/mobile/payment/dabit2.svg";
import lockIcon from "../../../assets/images/mobile/payment/dabit3.svg";

const DirectDebitForm = ({
  makeAgreement,
  fname,
  setFname,
  lname,
  setLname,
  transitNumber,
  setTransitNumber,
  institutionNumber,
  setInstitutionNumber,
  accountNumber,
  setAccountNumber,
  verifyAccountNumber,
  setVerifyAccountNumber,
  errors,
  updateErrs,
  apiError,
  paymentMethod,
}) => {
  const { plan, clubPlanMonthly, clubPlanYearly } = useSelector(
    (state) => state.plan
  );

  const [holder, setHolder] = useState(false);
  const [agree, setAgree] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [termPage, setTermPage] = useState(false);
  const [privacy, setPrivacy] = useState(false);

  return (
    <div className="flex justify-center min-h-screen bg-black">
      <div className="w-full max-w-[600px] flex flex-col gap-4">
        <div>
          <p className="text-white text-[18px] font-[500] font-[kanit] capitalize">
            Set Your Monthly Payment Of&nbsp;
            {plan === "monthly"
              ? clubPlanMonthly?.downPaymentTotalAmount
              : clubPlanYearly?.downPaymentTotalAmount}
          </p>
          <p className="text-[#D8D8D8] text-[14px] font-[400] mt-1 font-[vazirmatn]">
            This is your standard payment for your monthly direct debit before
            any discounts are applied
          </p>
        </div>

        <div className="flex flex-col w-full gap-4">
          {/* First and Last Name */}
          <div className="flex flex-row gap-3">
            <div className="w-full">
              <input
                type="text"
                placeholder="First Name"
                value={fname}
                onChange={(e) => {
                  setFname(e.target.value);
                  updateErrs("fname");
                }}
                className={`w-full p-2 pt-3 border border-[#999] bg-black text-white text-[16px] font-[400] placeholder-[#999999] text-left ${
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
                className={`w-full p-2 pt-3 border border-[#999] bg-black text-white text-[16px] font-[400] placeholder-[#999999] text-left ${
                  errors?.lname && "!border-red-500"
                }`}
              />
              {errors?.lname && (
                <p className="text-red-500 text-[12px] mt-1">{errors.lname}</p>
              )}
            </div>
          </div>

          {/* Transit and Institution Number */}
          <div className="flex flex-row gap-4">
            <div className="w-full">
              <input
                type="text"
                placeholder="Transit Number"
                value={transitNumber}
                onChange={(e) => {
                  let value = e.target.value;
                  value = value.replace(/[^0-9/]/g, "");
                  setTransitNumber(value);
                  updateErrs("transitNumber");
                }}
                className={`w-full p-2 pt-3 border border-[#999] bg-black text-white text-[16px] font-[400] placeholder-[#999999] text-left ${
                  errors?.transitNumber && "!border-red-500"
                }`}
              />
              {errors?.transitNumber && (
                <p className="text-red-500 text-[12px] mt-1">
                  {errors.transitNumber}
                </p>
              )}
            </div>

            <div className="w-full">
              <input
                type="text"
                placeholder="Bank Number"
                value={institutionNumber}
                onChange={(e) => {
                  let value = e.target.value;
                  value = value.replace(/[^0-9/]/g, "");
                  setInstitutionNumber(value);
                  updateErrs("institutionNumber");
                }}
                className={`w-full p-2 pt-3 border border-[#999] bg-black text-white text-[16px] font-[400] placeholder-[#999999] text-left ${
                  errors?.institutionNumber && "!border-red-500"
                }`}
              />
              {errors?.institutionNumber && (
                <p className="text-red-500 text-[12px] mt-1">
                  {errors.institutionNumber}
                </p>
              )}
            </div>
          </div>

          {/* Info Line */}
          <div className="flex flex-row gap-3 text-xs text-white">
            <div className="flex items-center w-full gap-2">
              <span className="text-[10px] font-[400] text-[#D8D8D8] font-[vazirmatn]">
                Where is my Transit Number?
              </span>
              <div className="w-4 h-4 bg-white rounded-full text-black flex items-center justify-center text-[10px] font-bold">
                i
              </div>
            </div>
            <div className="flex items-center w-full gap-2">
              <span className="text-[10px] font-[400] text-[#D8D8D8] font-[vazirmatn]">
                Where is my Bank Number?
              </span>
              <div className="w-4 h-4 bg-white rounded-full text-black flex items-center justify-center text-[10px] font-bold">
                i
              </div>
            </div>
          </div>

          {/* Account and Verify Account */}
          <div className="flex flex-row gap-3">
            <div className="w-full">
              <input
                type="text"
                placeholder="Account Number"
                value={accountNumber}
                onChange={(e) => {
                  let value = e.target.value;
                  value = value.replace(/[^0-9/]/g, "");
                  setAccountNumber(value);
                  updateErrs("accountNumber");
                }}
                className={`w-full p-2 pt-3 border border-[#999] bg-black text-white text-[16px] font-[400] placeholder-[#999999] text-left ${
                  errors?.accountNumber && "!border-red-500"
                }`}
              />
              {errors?.accountNumber && (
                <p className="text-red-500 text-[12px] mt-1">
                  {errors.accountNumber}
                </p>
              )}
            </div>

            <div className="w-full">
              <input
                type="text"
                placeholder="Verify Account"
                value={verifyAccountNumber}
                onChange={(e) => {
                  let value = e.target.value;
                  value = value.replace(/[^0-9/]/g, "");
                  setVerifyAccountNumber(value);
                  updateErrs("verifyAccountNumber");
                }}
                className={`w-full p-2 pt-3 border border-[#999] bg-black text-white text-[16px] font-[400] placeholder-[#999999] text-left ${
                  errors?.verifyAccountNumber && "!border-red-500"
                }`}
              />
              {errors?.verifyAccountNumber && (
                <p className="text-red-500 text-[12px] mt-1">
                  {errors.verifyAccountNumber}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Payment Icons */}
        <div className="flex flex-col pt-1">
          <p className="text-[#CACACA] text-[16px] font-[400] font-[vazirmatn]">
            Guaranteed Safe checkout
          </p>
          <div className="flex flex-row gap-3">
            <img src={visaIcon} alt="Visa" className="h-10 w-14" />
            <img src={mcIcon} alt="MasterCard" className="h-10 w-14" />
            <img src={lockIcon} alt="Lock" className="h-10 w-14" />
          </div>
        </div>

        {/* Checkboxes */}
        <label className="flex items-start gap-3 text-[16px] text-[#D8D8D8] font-[vazirmatn] cursor-pointer">
          <input
            type="checkbox"
            className="mt-1 accent-[#2DDE28]"
            checked={holder}
            onChange={(e) => setHolder(e.target.checked)}
          />
          <span>
            I am the bank account holder and do not require another person to
            authorize the debits on this account
          </span>
        </label>

        <label className="flex items-start gap-3 text-[16px] text-[#D8D8D8] font-[vazirmatn] cursor-pointer">
          <input
            type="checkbox"
            className="mt-1 accent-[#2DDE28]"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
          />
          <span>
            I acknowledge and agree that my membership will automatically renew
            bi-weekly until I cancel in accordance with the membership contract
            (unless the membership contract provides for a shorter renewal
            period)
          </span>
        </label>

        <label className="flex items-start gap-3 text-[16px] text-[#D8D8D8] font-[vazirmatn] cursor-pointer">
          <input
            type="checkbox"
            className="mt-1 accent-[#2DDE28]"
            checked={confirm}
            // disabled={!(termPage && privacy)}
            onChange={(e) => setConfirm(e.target.checked)}
          />
          <span>
            Please confirm you have read our{" "}
            <a
              href="https://join.evolvestrength.ca/terms-and-conditions/"
              className={`text-[#2DDE28] ${
                !termPage ? "font-[600]" : "font-[400]"
              }`}
              onClick={() => setTermPage(true)}
            >
              Terms And Conditions
            </a>{" "}
            &{" "}
            <a
              href="https://join.evolvestrength.ca/privacy-policy/"
              className={`text-[#2DDE28] ${
                !privacy ? "font-[600]" : "font-[400]"
              }`}
              onClick={() => setPrivacy(true)}
            >
              Privacy Policy
            </a>
          </span>
        </label>

        {/* Submit Button */}
        <div className="flex flex-col items-center">
          {apiError && paymentMethod == "direct" && (
            <span className="text-red-500 text-sm text-center w-full">
              {apiError}
            </span>
          )}
          <button
            onClick={() => makeAgreement()}
            className="cursor-pointer flex justify-center items-center w-full h-[48px] mt-4 
            bg-[#2DDE28] border border-[#2DDE28] font-[kanit] text-black text-[16px] font-medium 
            leading-[16px] uppercase font-kanit transition-all hover:opacity-90 active:scale-95 disabled:opacity-60"
            disabled={!holder || !agree || !confirm}
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default DirectDebitForm;
