import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

  const [confirm, setConfirm] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="text-white ">
        <p className="text-white text-[18px] font-medium leading-[42px] capitalize">
          Set Your Monthly Payment Of&nbsp;
          {plan == "monthly"
            ? clubPlanMonthly?.downPaymentTotalAmount
            : clubPlanYearly?.downPaymentTotalAmount}
        </p>

        <p className="text-[#D8D8D8] leading-[21.2px] text-[14px] font-[400]">
          Visa and master cards are accepted here
        </p>
      </div>

      <div className="flex flex-col w-full gap-4">
        <div className="flex flex-row gap-4">
          <input
            type="text"
            placeholder="First Name"
            value={fname}
            onChange={(e) => {
              setFname(e.target.value);
              updateErrs("fname");
            }}
            className={`w-full px-4 py-3 bg-black border border-[#999] text-white text-[16px] font-[400] placeholder-[#999999] text-left rounded-none ${
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
            className={`w-full px-4 py-3 bg-black border border-[#999] text-white text-[16px] font-[400] placeholder-[#999999] text-left rounded-none ${
              errors?.includes("lname") && "!border-red-500"
            }`}
          />
        </div>

        <input
          type="text"
          placeholder="Card Number"
          value={cardNumber}
          onChange={(e) => {
            setCardNumber(e.target.value);
            updateErrs("cardNumber");
          }}
          className={`w-full px-4 py-3 bg-black border border-[#999] text-white text-[16px] font-[400] placeholder-[#999999] text-left rounded-none ${
            errors?.includes("cardNumber") && "!border-red-500"
          }`}
        />

        <div className="flex flex-row gap-4">
          <input
            type="text"
            placeholder="CVV"
            value={cvv}
            onChange={(e) => {
              setCvv(e.target.value);
              updateErrs("cvv");
            }}
            className={`w-full px-4 py-3 bg-black border border-[#999] text-white text-[16px] font-[400] placeholder-[#999999] text-left rounded-none ${
              errors?.includes("cvv") && "!border-red-500"
            }`}
          />
          <input
            type="text"
            placeholder="Expiration Date"
            value={expirationDate}
            onChange={(e) => {
              setExpirationDate(e.target.value);
              updateErrs("expirationDate");
            }}
            className={`w-full px-4 py-3 bg-black border border-[#999] text-white text-[16px] font-[400] placeholder-[#999999] text-left rounded-none ${
              errors?.includes("expirationDate") && "!border-red-500"
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
          <img src={lockIcon2} alt="Lock" className="h-10 w-14" />
        </div>
      </div>

      <label className="flex items-start gap-2 text-[16px] font-[vazirmatn] text-[#D8D8D8] font-[400] mt-4">
        <input type="checkbox" className="mt-1" checked={confirm} onChange={(e)=>setConfirm(e.target.checked)} />
        <span>
          Please confirm you have read our{" "}
          <span className="text-[#2DDE28] text-[16px]">
            terms and conditions
          </span>
        </span>
      </label>

      <button
        onClick={() => makeAgreement()}
        className="cursor-pointer flex justify-center items-center w-full h-[42px] mt-4 px-0 pt-[12.801px] pb-[13.199px] 
          bg-[#2DDE28] border border-[#2DDE28] font-[kanit] text-black text-[16px] font-medium 
          leading-[16px] uppercase font-kanit transition-all hover:opacity-90 active:scale- disabled:opacity-60"
        disabled={isLoading || !confirm}
      >
        Pay Now
      </button>
    </div>
  );
};

export default CardPaymentForm;
