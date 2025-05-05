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
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(null);

  const location = Cookies.get("locationCode");
  const planId = Cookies.get("planId");
  const planValidate = Cookies.get("planValidation");
  const fName = Cookies.get("firstName");
  const lName = Cookies.get("lastName");
  const formattedLastName = lName.charAt(0).toUpperCase();
  const email = Cookies.get("email");
  const gender = Cookies.get("gender");
  let number = Cookies.get("number") || "";
  const accountId = Cookies.get("accountId");

  const digitsOnly = number.replace(/\D/g, "");
  if (digitsOnly.length === 10) {
    // Format as 3-3-4
    number = digitsOnly.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
  } else {
    console.warn("Invalid phone number format");
    number = "";
  }
  let selectedDate = Cookies.get("selectedDate") || "";

  if (selectedDate) {
    const dateObj = new Date(selectedDate);
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    const year = dateObj.getFullYear();

    selectedDate = `${month}/${day}/${year}`;
  } else {
    console.warn("Invalid or missing selectedDate");
  }
  const address = Cookies.get("address");
  const city = Cookies.get("city");
  const rawPostalCode = Cookies.get("postalCode") || "";
  const formattedPostalCode = rawPostalCode
    .toUpperCase()
    .replace(/\s+/g, "")
    .replace(/(.{3})(.{3})/, "$1 $2");

  // Optional regex validation
  const isValidPostalCode = /^[A-Z]\d[A-Z] \d[A-Z]\d$/.test(
    formattedPostalCode
  );

  if (!isValidPostalCode) {
    console.error("Invalid Canadian postal code format:", formattedPostalCode);
  }

  console.log("formattedPostalCode", formattedPostalCode);

  const provinceMap = {
    Alberta: "AB",
    "British Columbia": "BC",
    Manitoba: "MB",
    "New Brunswick": "NB",
    Newfoundland: "NL",
    "Northwest Territories": "NT",
    "Nova Scotia": "NS",
    Nunavut: "NU",
    Ontario: "ON",
    "Prince Edward Island": "PE",
    Quebec: "QC",
    Saskatchewan: "SK",
    Yukon: "YT",
  };

  const provinceName = Cookies.get("province") || "";
  const stateCode = provinceMap[provinceName] || "";

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
      email: email || "",
      gender: gender || "",
      homePhone: "",
      cellPhone: digitsOnly || "9495898283",
      workPhone: "",
      birthday: selectedDate || "",
      wellnessProgramId: "",
      barcode: "",
      agreementAddressInfo: {
        addressLine1: address || "",
        addressLine2: "",
        city: city || "",
        state: stateCode || "ON",
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

  const createPeople = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/createPerson`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            first_name: fName || "John",
            last_name: lName || "Doe",
            email: email || "",
            birthday: selectedDate || "",
            phone_mobile: number || "",
            address: address || "",
            city: city || "",
            province: stateCode || "",
            postal_code: formattedPostalCode || "",
            company_id: accountId || "",
          }),
        }
      );

      const data = await response.json();
      const person = data?.people_create_response;

      if (person?.id) {
        navigate("/congratulations");
      } else {
        console.warn("Person creation failed or missing ID.");
      }
    } catch (error) {
      console.error("Error creating person:", error.message);
    }
  };

  const getAgreementInfo = async () => {
    try {
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
      const message = data?.data?.restResponse?.status?.message;
      console.log("data", message);

      if (message && message.toLowerCase() !== "success") {
        createPeople();
      } else {
        setApiError(message);
      }
    } catch (error) {
      console.error("Error fetching club information:", error.message);
      setApiError(
        "Failed to submit. Please check your connection and try again."
      );
    }
  };

  const validateFields = () => {
    const newErrors = {};

    if (selectPlan === "direct_debit") {
      if (!firstName.trim()) newErrors.firstName = true;
      if (!lastName.trim()) newErrors.lastName = true;
      if (!transitNumber.trim()) newErrors.transitNumber = true;
      if (!institutionNumber.trim()) newErrors.institutionNumber = true;
      if (!accountNumber.trim()) newErrors.accountNumber = true;
      if (accountNumber !== verifyAccountNumber)
        newErrors.verifyAccountNumber = true;
    } else {
      if (!firstName.trim()) newErrors.firstName = true;
      if (!lastName.trim()) newErrors.lastName = true;
      if (!cardNumber.trim()) newErrors.cardNumber = true;
      if (!cvv.trim()) newErrors.cvv = true;
      if (!expirationDate.trim()) newErrors.expirationDate = true;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleJoinNow = () => {
    if (!validateFields()) return;
    getAgreementInfo();
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
                selectedPlan={selectedPlan}
                errors={errors}
                setErrors={setErrors}
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
                selectedPlan={selectedPlan}
                errors={errors}
                setErrors={setErrors}
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
            <div className="flex justify-end items-end mt-6 w-full flex-col">
              <button
                onClick={handleJoinNow}
                className={`button mt-6 ${
                  isHuman ? "bg-[#2DDE28]" : "bg-gray-400 cursor-not-allowed"
                } text-black text-[16px] font-medium w-[139px] h-[42px]`}
                disabled={!isHuman}
              >
                PAY NOW
              </button>
              {apiError && (
                <p className="text-red-500 mt-2 text-sm text-right w-full">
                  {apiError}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewAndPay;
