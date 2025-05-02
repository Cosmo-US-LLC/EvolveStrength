import React, { useContext, useEffect, useState } from "react";
import StepIndicator from "./common/StepIndicator";
import DirectDebitForm from "./DirectDebitForm";
import CardPaymentForm from "./CardPaymentForm";
import MembershipVancouver from "./common/MembershipVancouver";
import debit_icon_active from "../../../assets/images/desktop/debit_icon_active.svg";
import debit_icon_inactive from "../../../assets/images/desktop/debit_icon_inactive.svg";
import credit_icon_active from "../../../assets/images/desktop/credit_icon_active.svg";
import credit_icon_inactive from "../../../assets/images/desktop/credit_icon_inactive.svg";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const MemberPayment = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("direct");
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

  const [fname, setFname] = useState(userInfo?.fname || "");
  const [lname, setLname] = useState(userInfo?.lname || "");
  const [transitNumber, setTransitNumber] = useState("");
  const [institutionNumber, setInstitutionNumber] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [verifyAccountNumber, setVerifyAccountNumber] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expirationDate, setExpirationDate] = useState("");

  useEffect(() => {
    if (!userInfo) {
      navigate("/member-details");
    }
  }, []);

  const makeAgreement = async () => {
    try {
      const routingNumber = `0${institutionNumber}${transitNumber}`;
      const [expMonth, expYearRaw] = expirationDate.split("/");
      const expYear = expYearRaw?.length === 2 ? `20${expYearRaw}` : expYearRaw;

      const payload = {
        paymentPlanId: planId || "",
        planValidationHash: planValidate || "",
        campaignId: "730E227DC96B7F9EE05302E014ACD689",
        activePresale: "true",
        sendAgreementEmail: "true",
        agreementContactInfo: {
          firstName: fName || "John",
          middleInitial: formattedLastName || "",
          lastName: lName || "Doe",
          email: email || "example@gmail.com",
          gender: gender || "",
          homePhone: "",
          cellPhone: number || "9495898283",
          workPhone: "",
          birthday: selectedDate || "",
          wellnessProgramId: "",
          barcode: "",
          agreementAddressInfo: {
            addressLine1: "123 Queen Street West",
            addressLine2: "",
            city: "Toronto",
            state: "ON",
            country: "CA",
            zipCode: formattedPostalCode || "",
          },
          emergencyContact: {
            ecFirstName: "",
            ecLastName: "",
            ecPhone: "",
            ecPhoneExtension: "",
          },
        },
        todayBillingInfo: {},
        draftBillingInfo: {},
        marketingPreferences: {
          email: "true",
          sms: "true",
          directMail: "true",
          pushNotification: "true",
        },
      };

      if (selectPlan !== "direct_debit") {
        payload.todayBillingInfo = {
          isTodayBillingSameAsDraft: "true",
          todayCcCvvCode: cvv || "",
          todayCcBillingZip: formattedPostalCode || "",
        };

        payload.draftBillingInfo.draftCreditCard = {
          creditCardFirstName: firstName || "John",
          creditCardLastName: lastName || "Doe",
          creditCardType: "visa",
          creditCardAccountNumber: cardNumber || "",
          creditCardExpMonth: expMonth || "00",
          creditCardExpYear: expYear || "",
        };
        // 👉 Debit (Bank Account) flow
      } else if (selectPlan === "direct_debit") {
        payload.draftBillingInfo.draftBankAccount = {
          draftAccountFirstName: firstName || "John",
          draftAccountLastName: lastName || "Doe",
          draftAccountRoutingNumber: routingNumber || "",
          draftAccountNumber: accountNumber || "",
          draftAccountType: "Checking",
        };
      }

      const response = await fetch(
        `${
          import.meta.env.VITE_APP_API_URL
        }/submitAgreement?location=${location}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const data = await response.json();
      console.log("data", data?.data?.restResponse?.request);
    } catch (error) {
      console.error("Error fetching club information:", error.message);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 pt-[80px] pb-[12px] flex flex-col gap-6">
      <StepIndicator
        step={3}
        totalSteps={3}
        title="Payment info"
        subtitle="Please provide your payment details"
      />

      <MembershipVancouver />

      <div className="text-left flex flex-row gap-[10px]">
        <span className="text-white font-[kanit] text-[46px] font-[700] leading-[42px] uppercase">
          REVIEW &
        </span>
        <span className="text-[#2DDE28] font-[kanit] text-[48px] font-[700] leading-[42px] uppercase">
          PAY
        </span>
      </div>

      <div className="flex flex-col">
        <p className="text-white font-[Vazirmatn] text-[16px] font-normal leading-[25.2px]">
          Choose payment Option
        </p>

        <div className="border border-white/40 flex overflow-hidden p-1">
          <button
            onClick={() => setPaymentMethod("direct")}
            className={`w-1/2 py-2 text-[14px] font-[500] font-[vazirmatn] uppercase flex items-center justify-center gap-2 ${
              paymentMethod === "direct"
                ? "bg-[#2DDE28] text-black"
                : "text-white"
            }`}
          >
            <img
              src={
                paymentMethod === "direct"
                  ? debit_icon_active
                  : debit_icon_inactive
              }
              alt="Direct Debit Icon"
              className="w-4 h-4"
            />
            <span>Direct Debit</span>
          </button>
          <button
            onClick={() => setPaymentMethod("card")}
            className={`w-1/2 py-2 text-[14px] font-[500] font-[vazirmatn] uppercase flex items-center justify-center space-x-2 ${
              paymentMethod === "card"
                ? "bg-[#2DDE28] text-black"
                : "text-white"
            }`}
          >
            <img
              src={
                paymentMethod === "card"
                  ? credit_icon_active
                  : credit_icon_inactive
              }
              alt="Card Pay Icon"
              className="w-4 h-4"
            />
            <span>Card pay</span>
          </button>
        </div>
      </div>

      {paymentMethod === "direct" ? (
        <DirectDebitForm
          makeAgreement={makeAgreement}
          fname={fname}
          setFname={setFname}
          lname={lname}
          setLname={setLname}
        />
      ) : (
        <CardPaymentForm
          makeAgreement={makeAgreement}
          fname={fname}
          setFname={setFname}
          lname={lname}
          setLname={setLname}
        />
      )}
    </div>
  );
};

export default MemberPayment;
