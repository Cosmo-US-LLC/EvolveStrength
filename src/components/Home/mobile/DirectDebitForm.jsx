import React, { useEffect, useRef, useState } from "react";
import visaIcon from "../../../assets/images/mobile/payment/dabit1.svg";
import mcIcon from "../../../assets/images/mobile/payment/dabit2.svg";
import lockIcon from "../../../assets/images/mobile/payment/dabit3.svg";
import info_icon from "../../../assets/images/desktop/info_icon.svg";

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
  const [holder, setHolder] = useState(false);
  const [agree, setAgree] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [termPage, setTermPage] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [instituteTip, setInstituteTip] = useState(false);
  const [accountTip, setAccountTip] = useState(false);
  const tooltipRef = useRef(null);
  const instituteRef = useRef(null);
  const accountRef = useRef(null);

  // Close tooltip if clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
        setShowTooltip(false);
      }
      if (
        instituteRef.current &&
        !instituteRef.current.contains(event.target)
      ) {
        setInstituteTip(false);
      }
      if (accountRef.current && !accountRef.current.contains(event.target)) {
        setAccountTip(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex justify-center min-h-screen bg-black">
      <div className="w-full max-w-[600px] flex flex-col gap-4">
        <div>
          {/* <p className="text-white text-[18px] font-[500] font-[kanit] capitalize">
            Set Your Bi-Weekly Payment Of&nbsp;
            {addOnDetails &&
            (clubLocationPostal === 40248 || clubLocationPostal === 40327)
              ? formattedTotalAmount
              : (plan === "monthly" ? clubPlanMonthly : clubPlanYearly)
                  ?.scheduleTotalAmount || "$--.--"}
          </p> */}
          <p className="text-[#D8D8D8] text-[14px] font-[400] mt-1 font-[vazirmatn]">
            Please enter your payment details for your biweekly payment to help
            us start your membership. This payment method will also be used for
            future fees.
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

          <div className="flex flex-row gap-3 text-xs text-white">
            <div className="flex flex-col w-full gap-2">
              <label className="text-[10px] flex font-[400] text-[#D8D8D8] font-[vazirmatn] flex-row items-center mb-2 gap-2 relative">
                Where is my Transit Number?
                <div
                  className="relative cursor-pointer"
                  onClick={() => setShowTooltip((prev) => !prev)}
                  ref={tooltipRef}
                >
                  <img src={info_icon} alt="info_icon" />
                  {showTooltip && (
                    <span className="border font-[vazirmatn] border-[#999999] max-w-[250px] z-20 absolute left-1/2 transform -translate-x-1/2 bottom-[-70px] w-max bg-[#757575] text-white text-xs p-2">
                      This is a 5-digit number that identifies your branch. You
                      can find it on your bank card or check with your bank.
                    </span>
                  )}
                </div>
              </label>
            </div>

            <div className="flex flex-col w-full">
              <label className="text-[10px] flex font-[400] text-[#D8D8D8] font-[vazirmatn] flex-row items-center mb-2 gap-1 relative">
                Where is my Institution Number?
                <div
                  className="relative cursor-pointer"
                  onClick={() => setInstituteTip((prev) => !prev)}
                  ref={instituteRef}
                >
                  <img src={info_icon} alt="info_icon" />
                  {instituteTip && (
                    <span className="border font-[vazirmatn] border-[#999999] max-w-[250px] z-20 absolute transform -translate-x-[95%] bottom-[-90px] w-max bg-[#757575] text-white text-xs p-2">
                      This 3-digit number identifies the bank itself. You can
                      find it on your bank statement or contact your bank for
                      assistance.
                    </span>
                  )}
                </div>
              </label>
            </div>
          </div>

          <div className="flex flex-row gap-3">
            <div className="w-full">
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
              <div className="mt-3">
                <label className="text-[10px] flex font-[400] text-[#D8D8D8] font-[vazirmatn] flex-row items-center gap-2 relative">
                  Where is my Account Number?
                  <div
                    className="relative cursor-pointer"
                    onClick={() => setAccountTip((prev) => !prev)}
                    ref={accountRef}
                  >
                    <img src={info_icon} alt="info_icon" />
                    {accountTip && (
                      <span className="border font-[vazirmatn] border-[#999999] max-w-[250px] z-20 absolute left-1/2 transform -translate-x-1/2 bottom-[-70px] w-max bg-[#757575] text-white text-xs p-2">
                        This is the number of your personal bank account. It can
                        be found on your cheque or bank statement.
                      </span>
                    )}
                  </div>
                </label>
              </div>
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
        <label className="flex items-start gap-3 text-[14px] text-[#D8D8D8] font-[vazirmatn] cursor-pointer">
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

        <label className="flex items-start gap-3 text-[14px] text-[#D8D8D8] font-[vazirmatn] cursor-pointer">
          <input
            type="checkbox"
            className="mt-1 accent-[#2DDE28]"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
          />
          <span>
            I acknowledge and agree that my membership will automatically renew
            biweekly unless I cancel as outlined in the membership contract or
            if the contract specifies a shorter renewal period.
          </span>
        </label>

        <label className="flex items-start gap-3 text-[14px] text-[#D8D8D8] font-[vazirmatn] cursor-pointer">
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
              target="_blank"
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
              target="_blank"
            >
              Privacy Policy
            </a>
          </span>
        </label>

        {/* Submit Button */}
        <div className="flex flex-col items-center">
          {apiError && paymentMethod == "direct" && (
            <span className="w-full text-sm text-center text-red-500">
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
