import React, { useState } from "react";
import info_icon from "../../../../../assets/images/desktop/info_icon.svg";
import guarantee_icons from "../../../../../assets/images/desktop/guarantee_icons.svg";
import { useSelector } from "react-redux";

function DebitForm({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  transitNumber,
  setTransitNumber,
  institutionNumber,
  setInstitutionNumber,
  accountNumber,
  setAccountNumber,
  verifyAccountNumber,
  setVerifyAccountNumber,
  confirm,
  setConfirm,
  errors,
  setErrors,
}) {
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [renewAgreed, setRenewAgreed] = useState(false);
  const { plan, clubPlanMonthly, clubPlanYearly } = useSelector(
    (state) => state.plan
  );

  return (
    <div
      className="max-w-[600px] space-y-4 text-white"
      style={{ height: "700px" }}
    >
      <h1 className="text-[40px] font-[500] leading-[42px] font-[kanit] capitalize mb-6 text-left mt-4">
        Set Your Monthly Payment Of <br />{" "}
        {plan === "monthly"
          ? clubPlanMonthly?.scheduleTotalAmount
          : clubPlanYearly?.scheduleTotalAmount}
      </h1>
      <p className="mb-6 text-left text-[#FFFFFF] font-[vazirmatn] text-[18px] font-regular">
        This is your standard payment for your monthly direct debit before any
        discounts are applied
      </p>

      <form>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="flex flex-col">
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => {
                const value = e.target.value;
                setFirstName(value);
                if (errors.firstName && value.trim() !== "") {
                  setErrors((prev) => ({ ...prev, firstName: false }));
                }
              }}
              className={`p-3 text-white font-[vazirmatn] text-[16px] bg-[#000000]/60 backdrop-blur-[10px] placeholder-[#999999] ${
                errors.firstName ? "border-[#c20000]" : "border-[#999999]"
              } border`}
              placeholder="First Name"
            />
            {errors.firstName && (
              <p className="text-[#c20000] mt-1 text-sm">{errors.firstName}</p>
            )}
          </div>

          <div className="flex flex-col">
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => {
                const value = e.target.value;
                setLastName(value);
                if (errors.lastName && value.trim() !== "") {
                  setErrors((prev) => ({ ...prev, lastName: false }));
                }
              }}
              className={`p-3 border text-white font-[vazirmatn] text-[16px] bg-[#000000]/60 backdrop-blur-[10px] placeholder-[#999999] ${
                errors.lastName ? "border-[#c20000]" : "border-[#999999]"
              }`}
              placeholder="Last Name"
            />
            {errors.lastName && (
              <p className="text-[#c20000] mt-1 text-sm">{errors.lastName}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="flex flex-col">
            <div className="items-center">
              <input
                type="text"
                id="transitNumber"
                value={transitNumber}
                onChange={(e) => {
                  const value = e.target.value;
                  setTransitNumber(value);
                  if (errors.transitNumber && value.trim() !== "") {
                    setErrors((prev) => ({ ...prev, transitNumber: false }));
                  }
                }}
                className={`p-3 bg-[#000000]/60 backdrop-blur-[10px] font-[vazirmatn] text-[16px] border text-white w-full placeholder-[#999999] ${
                  errors.transitNumber ? "border-[#c20000]" : "border-[#999999]"
                }`}
                placeholder="Transit Number"
              />
              {errors.transitNumber && (
                <p className="text-[#c20000] mt-1 text-sm">
                  {errors.transitNumber}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col">
            <div className="items-center">
              <input
                type="text"
                id="institutionNumber"
                value={institutionNumber}
                onChange={(e) => {
                  const value = e.target.value;
                  setInstitutionNumber(value);
                  if (errors.institutionNumber && value.trim() !== "") {
                    setErrors((prev) => ({
                      ...prev,
                      institutionNumber: false,
                    }));
                  }
                }}
                className={`p-3 bg-[#000000]/60 backdrop-blur-[10px] font-[vazirmatn] text-[16px] border text-white w-full placeholder-[#999999] ${
                  errors.institutionNumber
                    ? "border-[#c20000]"
                    : "border-[#999999]"
                }`}
                placeholder="Institution Number"
              />
              {errors.institutionNumber && (
                <p className="text-[#c20000] mt-1 text-sm">
                  {errors.institutionNumber}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <div className="flex flex-col">
              <label className="text-[14px] flex font-[vazirmatn] flex-row items-center mb-2 gap-2">
                Where is my Transit Number?
                <div className="relative group">
                  <img
                    src={info_icon}
                    alt="info_icon"
                    className="cursor-pointer"
                  />

                  <span className="border font-[vazirmatn] border-[#999999] max-w-[250px] z-20 absolute left-1/2 transform -translate-x-1/2 bottom-[-80px] w-max bg-[#757575] text-white text-xs p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    This is a 5-digit number that identifies your branch. You
                    can find it on your bank card or check with your bank.
                  </span>
                </div>
              </label>

              <input
                type="text"
                id="accountNumber"
                value={accountNumber}
                onChange={(e) => {
                  const value = e.target.value;
                  setAccountNumber(value);
                  if (errors.accountNumber && value.trim() !== "") {
                    setErrors((prev) => ({ ...prev, accountNumber: false }));
                  }
                }}
                className={`p-3 bg-[#000000]/60 backdrop-blur-[10px] font-[vazirmatn] text-[16px] border text-white placeholder-[#999999] ${
                  errors.accountNumber ? "border-[#c20000]" : "border-[#999999]"
                }`}
                placeholder="Account Number"
              />
              {errors.accountNumber && (
                <p className="text-[#c20000] mt-1 text-sm">
                  {errors.accountNumber}
                </p>
              )}
            </div>
            <label className="text-[14px] font-[vazirmatn] flex flex-row items-center mt-2 gap-2">
              Where is my Account Number?
              <div className="relative group">
                <img
                  src={info_icon}
                  alt="info_icon"
                  className="cursor-pointer"
                />

                <span className="border  font-[vazirmatn] border-[#999999] max-w-[250px] z-20 absolute left-1/2 transform -translate-x-1/2 bottom-[-80px] w-max bg-[#757575] text-white text-xs p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  This is the number of your personal bank account. It can be
                  found on your cheque or bank statement.
                </span>
              </div>
            </label>
          </div>

          <div className="flex flex-col">
            <label className="text-[14px] flex font-[vazirmatn] flex-row items-center mb-2 gap-2">
              Where is my Institution Number?
              <div className="relative group">
                <img
                  src={info_icon}
                  alt="info_icon"
                  className="cursor-pointer"
                />

                <span className="border font-[vazirmatn] border-[#999999] max-w-[250px] z-20 absolute left-1/2 transform -translate-x-1/2 bottom-[-90px] w-max bg-[#757575] text-white text-xs p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  This 3-digit number identifies the bank itself. You can find
                  it on your bank statement or contact your bank for assistance.
                </span>
              </div>
            </label>
            <input
              type="text"
              id="verifyAccountNumber"
              value={verifyAccountNumber}
              onChange={(e) => {
                const value = e.target.value;
                setVerifyAccountNumber(value);
                if (errors.verifyAccountNumber && value.trim() !== "") {
                  setErrors((prev) => ({
                    ...prev,
                    verifyAccountNumber: false,
                  }));
                }
              }}
              className={`p-3 bg-[#000000]/60 backdrop-blur-[10px] font-[vazirmatn] text-[16px] border text-white placeholder-[#999999] ${
                errors.verifyAccountNumber
                  ? "border-[#c20000]"
                  : "border-[#999999]"
              }`}
              placeholder="Verify Account Number"
            />
            {errors.verifyAccountNumber && (
              <p className="text-[#c20000] mt-1 text-sm">
                {errors.verifyAccountNumber}
              </p>
            )}
          </div>
        </div>

        <div>
          <p className="text-[16px] font-regular capitalize font-[vazirmatn]">
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
            id="renewAgreed"
            checked={renewAgreed}
            onChange={() => setRenewAgreed(!renewAgreed)}
            className="mr-2"
            style={{ marginTop: "3.5px" }}
          />
          <label
            htmlFor="renewAgreed"
            className="text-[16px] font-[400] font-[vazirmatn] ml-2"
          >
            I acknowledge and agree that my membership will automatically renew
            bi-weekly until I cancel in accordance with the membership contract
            (unless the membership contract provides for a shorter renewal
            period)
          </label>
        </div>

        <div className="flex items-start mb-6 ">
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

export default DebitForm;
