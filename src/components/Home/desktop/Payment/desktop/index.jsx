import React, { useState } from "react";
import MembershipSummaryBoxDesktop from "../../Membership/desktop/MembershipSummaryBoxDesktop";

import StepperDesktop from "../../commen/StepperDesktop";
import { useNavigate } from "react-router-dom";
import PaymentMethodSelector from "./PaymentMethodSelector";
import DebitForm from "./DebitForm";
import CardForm from "./CardForm";
import Turnstile from "react-turnstile";
import useScrollDirection from "../../../../../hooks/useScrollDirection";
import { useSelector } from "react-redux";
import logo from "../../../../../assets/images/desktop/logo_navbar.svg";

function ReviewAndPay() {
  const [selectPlan, setSelectPlan] = useState("card");
  const {
    clubLocationPostal,
    clubLocationId,
    plan,
    clubPlanMonthly,
    clubPlanYearly,
    userInfo,
  } = useSelector((state) => state.plan);
  const [isHuman, setIsHuman] = useState(false);
  const navigate = useNavigate();
  const scrollDirection = useScrollDirection();
  const [firstName, setFirstName] = useState(userInfo?.fname || "");
  const [lastName, setLastName] = useState(userInfo?.lname || "");
  const [firstCardName, setFirstCardName] = useState(userInfo?.fname || "");
  const [lastCardName, setLastCardName] = useState(userInfo?.lname || "");
  const [transitNumber, setTransitNumber] = useState("");
  const [institutionNumber, setInstitutionNumber] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [verifyAccountNumber, setVerifyAccountNumber] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [termsAgreeded, setTermsAgreeded] = useState(false);
  const [renewAgreed, setRenewAgreed] = useState(false);
  console.log("first", expirationDate);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(null);

  const location = clubLocationPostal;
  const planId =
    plan === "monthly" ? clubPlanMonthly?.planId : clubPlanYearly?.planId;
  const planValidate =
    plan === "monthly"
      ? clubPlanMonthly?.planValidation
      : clubPlanYearly?.planValidation;
  const fName = userInfo?.fname;
  const lName = userInfo?.lname;
  const formattedLastName = lName.charAt(0).toUpperCase();
  const email = userInfo?.email;
  const gender = userInfo?.gender;
  let number = userInfo?.phone;
  const accountId = clubLocationId;

  const digitsOnly = number.replace(/\D/g, "");
  if (digitsOnly.length === 10) {
    // Format as 3-3-4
    number = digitsOnly.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
  } else {
    console.warn("Invalid phone number format");
    number = "";
  }
  let selectedDate = userInfo?.dob;

  if (selectedDate) {
    const dateObj = new Date(selectedDate);
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    const year = dateObj.getFullYear();

    selectedDate = `${month}/${day}/${year}`;
  } else {
    console.warn("Invalid or missing selectedDate");
  }
  const address = userInfo?.address;
  const city = userInfo?.city;
  const rawPostalCode = userInfo?.postal;
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

  const provinceName = userInfo?.province;
  const stateCode = provinceMap[provinceName] || "";

  const routingNumber = `0${institutionNumber}${transitNumber}`;
  const [expMonth, expYearRaw] = expirationDate.split("/");
  const expYear = expYearRaw?.length === 2 ? `20${expYearRaw}` : expYearRaw;

  let schedules = ["Dues"];

  if (clubLocationPostal === 40248 || clubLocationPostal === 40327) {
    schedules = ["Dues", "Towel"];
  }

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
    schedules: schedules,
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
      creditCardFirstName: firstCardName || "John",
      creditCardLastName: lastCardName || "Doe",
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

  console.log("payload", payload);

  const createPeople = async () => {
    try {
      const response = await fetch(
        `http://138.197.175.219:8081/api/createPerson`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            club_id: clubLocationPostal,
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
        `http://138.197.175.219:8081/api/submitAgreement?location=${location}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const data = await response.json();
      const message = data?.data?.restResponse?.status?.message;

      if (message && message.toLowerCase() === "success") {
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
      if (!firstName.trim()) newErrors.firstName = "First name is required.";
      if (!lastName.trim()) newErrors.lastName = "Last name is required.";
      if (!transitNumber.trim())
        newErrors.transitNumber = "Transit number is required.";
      else if (transitNumber.length > 5)
        newErrors.transitNumber = "Transit number cannot exceed 5 digits.";

      if (!institutionNumber.trim())
        newErrors.institutionNumber = "Institution number is required.";
      else if (institutionNumber.length > 4)
        newErrors.institutionNumber =
          "Institution number cannot exceed 4 digits.";

      if (!accountNumber.trim())
        newErrors.accountNumber = "Account number is required.";
      else if (accountNumber.length !== 10)
        newErrors.accountNumber = "Account number must be exactly 10 digits.";

      if (!verifyAccountNumber.trim())
        newErrors.verifyAccountNumber = "Please re-enter your account number.";
      else if (accountNumber !== verifyAccountNumber)
        newErrors.verifyAccountNumber = "Account numbers do not match.";
    } else {
      if (!firstCardName.trim())
        newErrors.firstCardName = "First name is required.";
      if (!lastCardName.trim())
        newErrors.lastCardName = "Last name is required.";
      if (!cardNumber.trim()) newErrors.cardNumber = "Card number is required.";
      else if (cardNumber.length !== 16)
        newErrors.cardNumber = "Card number must be 16 digits.";

      if (!cvv.trim()) newErrors.cvv = "CVV is required.";
      else if (cvv.length !== 3) newErrors.cvv = "CVV must be 3 digits.";

      if (!expirationDate.trim()) {
        newErrors.expirationDate = "Expiration date is required.";
      } else if (expirationDate.length < 5) {
        newErrors.expirationDate = "Expiration date is invalid.";
      } else {
        // Extract the month and year from the expirationDate (MM/YY format)
        const [month, year] = expirationDate.split("/");

        // Get the current month and year
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1; // months are 0-indexed, so add 1
        const currentYear = currentDate.getFullYear() % 100; // get last two digits of the current year

        // Convert the extracted expiration month and year to integers
        const expirationMonth = parseInt(month, 10);
        const expirationYear = parseInt(year, 10);

        // Check if the expiration date is before the current date
        if (
          expirationYear < currentYear ||
          (expirationYear === currentYear && expirationMonth < currentMonth)
        ) {
          newErrors.expirationDate = "This card has expired.";
        }
      }
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
      <nav
        className={`fixed top-0 py-4 bg-[#000000] shadow-md z-50 w-full flex items-center transition-transform duration-300 ${
          scrollDirection === "down" ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="flex items-center justify-between w-full max-w-[1280px] mx-auto">
          <img src={logo} alt="Logo" className="w-[175px] h-auto" />

          <button
            onClick={handleJoinNow}
            disabled={
              selectPlan !== "direct_debit"
                ? !(isHuman && termsAgreeded && confirmed)
                : !(isHuman && termsAgreed && renewAgreed && confirm)
            }
            className={`w-[141px] ${
              selectPlan !== "direct_debit"
                ? isHuman && termsAgreeded && confirmed
                  ? "bg-[#2DDE28]"
                  : "bg-gray-400 cursor-not-allowed"
                : isHuman && termsAgreed && renewAgreed && confirm
                ? "bg-[#2DDE28]"
                : "bg-gray-400 cursor-not-allowed"
            } text-black text-[16px] font-medium h-[50px] button`}
          >
            PAY NOW
          </button>
        </div>
      </nav>
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
            <p className=" text-white text-[16px] font-[vazirmatn] font-[400] leading-[10.2px]">
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
                errors={errors}
                setErrors={setErrors}
                termsAgreed={termsAgreed}
                setTermsAgreed={setTermsAgreed}
                renewAgreed={renewAgreed}
                setRenewAgreed={setRenewAgreed}
              />
            ) : (
              <CardForm
                firstCardName={firstCardName}
                setFirstCardName={setFirstCardName}
                lastCardName={lastCardName}
                setLastCardName={setLastCardName}
                cardNumber={cardNumber}
                setCardNumber={setCardNumber}
                cvv={cvv}
                setCvv={setCvv}
                expirationDate={expirationDate}
                setExpirationDate={setExpirationDate}
                confirm={confirmed}
                setConfirm={setConfirmed}
                errors={errors}
                setErrors={setErrors}
                termsAgreed={termsAgreeded}
                setTermsAgreed={setTermsAgreeded}
              />
            )}
          </div>

          <div>
            <MembershipSummaryBoxDesktop />
            <Turnstile
              sitekey="0x4AAAAAABbwGUJsSvo2brY2"
              onSuccess={() => setIsHuman(true)}
              onError={() => setIsHuman(false)}
              onExpire={() => setIsHuman(false)}
            />
            <div className="flex justify-end items-end mt-6 w-full flex-col">
              <button
                onClick={handleJoinNow}
                className={`button mt-6 ${
                  selectPlan !== "direct_debit"
                    ? isHuman && termsAgreeded && confirmed
                      ? "bg-[#2DDE28]"
                      : "bg-gray-400 cursor-not-allowed"
                    : isHuman && termsAgreed && renewAgreed && confirm
                    ? "bg-[#2DDE28]"
                    : "bg-gray-400 cursor-not-allowed"
                } text-black text-[16px] font-medium w-[139px] h-[42px]`}
                disabled={
                  selectPlan !== "direct_debit"
                    ? !(isHuman && termsAgreeded && confirmed)
                    : !(isHuman && termsAgreed && renewAgreed && confirm)
                }
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
