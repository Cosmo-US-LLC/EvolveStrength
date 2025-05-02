import React, { useState } from "react";
import MembershipSummaryBoxDesktop from "../../Membership/desktop/MembershipSummaryBoxDesktop";

import StepperDesktop from "../../commen/StepperDesktop";
import { useNavigate } from "react-router-dom";
import PaymentMethodSelector from "./PaymentMethodSelector";
import DebitForm from "./DebitForm";
import CardForm from "./CardForm";
import Turnstile from "react-turnstile";
import useScrollDirection from "../../../../../hooks/useScrollDirection";
import Cookies from "js-cookie";

function ReviewAndPay({ selectedPlan, setSelectedPlan }) {
  const [selectPlan, setSelectPlan] = useState("direct_debit");
  const [isHuman, setIsHuman] = useState(false);
  const navigate = useNavigate();
  const scrollDirection = useScrollDirection();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [transitNumber, setTransitNumber] = useState("");
  const [institutionNumber, setInstitutionNumber] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [verifyAccountNumber, setVerifyAccountNumber] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expirationDate, setExpirationDate] = useState("");

  console.log(
    "firstNamefirstNamefirstName",
    firstName,
    lastName,
    transitNumber,
    institutionNumber,
    accountNumber,
    verifyAccountNumber,
    confirm,
    cardNumber,
    cvv,
    expirationDate
  );

  const getAgreementInfo = async () => {
    try {
      const response = await fetch(
        "http://localhost:3002/api/submitAgreement",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            member: {
              firstName: firstName || "John",
              lastName: lastName || "Doe",
              email: Cookies.get("email"),
            },
            membership: {
              planId: "PLN123",
              startDate: "2025-05-01",
              term: "12",
              frequency: "monthly",
            },
            paymentMethod: {
              type: "creditCard",
              cardNumber: "4111111111111111",
              expiryDate: "12/27",
              cvv: "123",
              billingAddress: {
                street: "123 Main St",
                city: "Lahore",
                state: "Punjab",
                postalCode: "54000",
                country: "PK",
              },
            },
            agreement: {
              accepted: true,
              acceptedDate: new Date().toISOString(),
              ipAddress: "203.0.113.42",
            },
            clubId: "CLUB456",
          }),
        }
      );
      const data = await response.json();
      console.log("data", data);
    } catch (error) {
      console.error("Error fetching club information:", error.message);
    }
  };

  const handleJoinNow = () => {
    getAgreementInfo();

    navigate(`/congratulations`);
  };

  return (
    <div className="relative w-full review_and_pay_bg">
      <StepperDesktop stepNumber={3} scrollDirection={scrollDirection} />
      <div className="pt-[300px] pb-[100px] max-w-[1280px] mx-auto">
        <p className="text-white font-[kanit] text-[79px] font-[700] leading-[66px] tracking-[-1.329px] uppercase">
          Review &
        </p>
        <p className="text-[#2DDE28] font-[kanit] text-[79px] font-[700] leading-[66px] tracking-[-1.329px] uppercase">
          Pay
        </p>
        <div className="flex flex-row justify-between mt-16">
          <div>
            <p className=" text-white text-[16px] font-[400] leading-[10.2px]">
              Choose your pricing plan
            </p>
            <PaymentMethodSelector
              selectPlan={selectPlan}
              setSelectPlan={setSelectPlan}
            />
            {selectPlan === "direct_debit" ? (
              <DebitForm
                firstName={firstName}
                setFirstName={setFirstName}
                lastName={lastName}
                setLastName={setLastName}
                transitNumber={transitNumber}
                setTransitNumber={setTransitNumber}
                institutionNumber={institutionNumber}
                setInstitutionNumber={setInstitutionNumber}
                accountNumber={accountNumber}
                setAccountNumber={setAccountNumber}
                verifyAccountNumber={verifyAccountNumber}
                setVerifyAccountNumber={setVerifyAccountNumber}
                confirm={confirm}
                setConfirm={setConfirm}
              />
            ) : (
              <CardForm
                firstName={firstName}
                setFirstName={setFirstName}
                lastName={lastName}
                setLastName={setLastName}
                cardNumber={cardNumber}
                setCardNumber={setCardNumber}
                cvv={cvv}
                setCvv={setCvv}
                expirationDate={expirationDate}
                setExpirationDate={setExpirationDate}
                confirm={confirm}
                setConfirm={setConfirm}
              />
            )}
          </div>

          <div>
            <MembershipSummaryBoxDesktop
              selectedPlan={selectedPlan}
              setSelectedPlan={setSelectedPlan}
            />
            <Turnstile
              sitekey="0x4AAAAAABWSTWCqAhOt104z"
              onSuccess={() => setIsHuman(true)}
              onError={() => setIsHuman(false)}
              onExpire={() => setIsHuman(false)}
            />
            <div className="flex justify-end items-end mt-6 w-full">
              <button
                onClick={handleJoinNow}
                className={`button mt-6 ${
                  isHuman ? "bg-[#2DDE28]" : "bg-gray-400 cursor-not-allowed"
                } text-black text-[16px] font-medium w-[139px] h-[42px]`}
                disabled={!isHuman}
              >
                PAY NOW
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewAndPay;
