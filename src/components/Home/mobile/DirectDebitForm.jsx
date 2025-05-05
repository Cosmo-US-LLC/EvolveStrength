import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import visaIcon from "../../../assets/images/mobile/payment/dabit1.svg";
import mcIcon from "../../../assets/images/mobile/payment/dabit2.svg";
import lockIcon from "../../../assets/images/mobile/payment/dabit3.svg";
import { useSelector } from "react-redux";

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
}) => {
  const navigate = useNavigate();
  const {
    userInfo,
    startDate,
    clubLocation,
    plan,
    clubLocationPostal,
    clubPlans,
    clubPlanMonthly,
    clubPlanYearly,
    isLoading,
    error,
  } = useSelector((state) => state.plan);

  const [holder, setHolder] = useState(false);
  const [agree, setAgree] = useState(false);
  const [confirm, setConfirm] = useState(false);

  return (
    <div className="flex justify-center min-h-screen bg-black">
      <div className="w-full max-w-[600px] flex flex-col gap-4">
        <div>
          <p className="text-white text-[18px] font-[500] font-[kanit] capitalize">
            Set Your Monthly Payment Of&nbsp;
            {plan == "monthly"
              ? clubPlanMonthly?.downPaymentTotalAmount
              : clubPlanYearly?.downPaymentTotalAmount}
          </p>
          <p className="text-[#D8D8D8] text-[14px] font-[400] mt-1 font-[vazirmatn]">
            This is your standard payment for your monthly direct debit before
            any discounts are applied
          </p>
        </div>

        <div className="flex flex-col w-full gap-4">
          <div className="flex flex-row gap-3">
            <input
              type="text"
              placeholder="First Name"
              value={fname}
              onChange={(e) => {
                setFname(e.target.value);
                updateErrs("fname");
              }}
              className={`w-full p-2 pt-3 border border-[#999] font-[vazirmatn] bg-black text-white text-[16px] font-[400] placeholder-[#999999] text-left ${
                errors?.includes("fname") && "!border-red-500"
              }`}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lname}
              onChange={(e) => {
                setLname(e.target.value);
                updateErrs("lname");
              }}
              className={`w-full p-2 pt-3 border border-[#999] font-[vazirmatn] bg-black text-white text-[16px] font-[400] placeholder-[#999999] text-left ${
                errors?.includes("lname") && "!border-red-500"
              }`}
            />
          </div>

          <div className="flex flex-row gap-4">
            <input
              type="text"
              placeholder="Transit Number"
              value={transitNumber}
              onChange={(e) => {
                setTransitNumber(e.target.value);
                updateErrs("transitNumber");
              }}
              className={`w-full p-2 pt-3 border border-[#999] font-[vazirmatn] bg-black text-white text-[16px] font-[400] placeholder-[#999999] text-left ${
                errors?.includes("transitNumber") && "!border-red-500"
              }`}
            />
            <input
              type="text"
              placeholder="Bank Number"
              value={institutionNumber}
              onChange={(e) => {
                setInstitutionNumber(e.target.value);
                updateErrs("institutionNumber");
              }}
              className={`w-full p-2 pt-3 border border-[#999] font-[vazirmatn] bg-black text-white text-[16px] font-[400] placeholder-[#999999] text-left ${
                errors?.includes("institutionNumber") && "!border-red-500"
              }`}
            />
          </div>

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

          <div className="flex flex-row gap-3">
            <input
              type="text"
              placeholder="Account Number"
              value={accountNumber}
              onChange={(e) => {
                setAccountNumber(e.target.value);
                updateErrs("accountNumber");
              }}
              className={`w-full p-2 pt-3 border font-[vazirmatn] border-[#999] bg-black text-white text-[16px] font-[400] placeholder-[#999999] text-left ${
                errors?.includes("accountNumber") && "!border-red-500"
              }`}
            />
            <input
              type="text"
              placeholder="Verify Account"
              value={verifyAccountNumber}
              onChange={(e) => {
                setVerifyAccountNumber(e.target.value);
                updateErrs("verifyAccountNumber");
              }}
              className={`w-full p-2 pt-3 border font-[vazirmatn] border-[#999] bg-black text-white text-[16px] font-[400] placeholder-[#999999] text-left ${
                errors?.includes("verifyAccountNumber") && "!border-red-500"
              }`}
            />
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
          </div>
        </div>

        {/* Checkboxes */}
        <label className="flex items-start gap-3 text-[16px] text-[#D8D8D8] font-[vazirmatn] cursor-pointer">
          <input
            type="checkbox"
            className="mt-1 accent-[#2DDE28] "
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
            onChange={(e) => setConfirm(e.target.checked)}
          />
          <span>
            Please confirm you have read our{" "}
            <span className="text-[#2DDE28] underline">
              Terms And Conditions
            </span>
          </span>
        </label>

        {/* Submit Button */}
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
  );
};

export default DirectDebitForm;
