import React, { useEffect, useState } from "react";
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
import Loader from "../../../../Loader";
import { z } from "zod";
import { usePaymentInputs } from "react-payment-inputs";

const form1Schema = z.object({
  firstName: z.string().trim().min(1, { message: "First name is required" }),
  lastName: z.string().trim().min(1, { message: "Last name is required" }),
  cardNumber: z.string().trim().optional(),
  expiryDate: z
    .string()
    .trim()
    .optional(),
  cvc: z.string().trim().optional(),
  accountHolder: z.literal("on", {
    errorMap: () => ({ message: "Account holder authorization is required" }),
  }),
  terms: z.literal("on", {
    errorMap: () => ({ message: "You must accept the Terms and Conditions" }),
  }),
  acknowledge: z.literal("on", {
    errorMap: () => ({ message: "You must acknowledge the statement" }),
  }),
});

const form2Schema = z.object({
  firstName: z.string().trim().min(1, { message: "First name is required" }),
  lastName: z.string().trim().min(1, { message: "Last name is required" }),
  routingNumber: z.string().min(1, "Routing number is required"),
  accountNumber: z.string().min(1, "Bank account is required"),
});

function ReviewAndPay() {
  const [selectPlan, setSelectPlan] = useState("card");
  const {
    clubLocationPostal,
    clubLocationId,
    plan,
    clubPlanMonthly,
    clubPlanYearly,
    userInfo,
    addOnDetails,
  } = useSelector((state) => state.plan);
  const [isHuman, setIsHuman] = useState(false);
  const navigate = useNavigate();
  const scrollDirection = useScrollDirection();
  const [firstName, setFirstName] = useState(userInfo?.fname || "");
  const [lastName, setLastName] = useState(userInfo?.lname || "");
  const [firstCardName, setFirstCardName] = useState(userInfo?.fname || "");
  const [lastCardName, setLastCardName] = useState(userInfo?.lname || "");

  const [termPage, setTermPage] = useState(false);
  const [privacy, setPrivacy] = useState(false);

  const [transitNumber, setTransitNumber] = useState("");
  const [institutionNumber, setInstitutionNumber] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [verifyAccountNumber, setVerifyAccountNumber] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cvc, setCvv] = useState("");
  const [expiryDate, setExpirationDate] = useState("");
  const [termsAgreed, setTermsAgreed] = useState(false);
  // const [termsAgreeded, setTermsAgreeded] = useState(false);
  const [renewAgreed, setRenewAgreed] = useState(false);
  // const [renewAgreeded, setRenewAgreeded] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // /////////////////////////////////////////////////////
  const [cardAuthorize, setCardAuthorize] = useState(false);
  const [cardAcknowledge, setCardAcknowledge] = useState(false);
  const [cardConfirm, setCardConfirm] = useState(false);
  // /////////////////////////////////////////////////////
  const [debitHolder, setDebitHolder] = useState(false);
  const [debitAcknowledge, setDebitAcknowledge] = useState(false);
  const [debitConfirm, setDebitConfirm] = useState(false);
  // /////////////////////////////////////////////////////

  const {
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps,
    getCardImageProps,
    meta,
  } = usePaymentInputs();

  // const [isDisabled, setIsDisabled] = useState(
  //   Object.keys(meta.erroredInputs)
  //     ?.map((objKey) => meta.erroredInputs[objKey] == "undefined" && objKey)
  //     .filter(Boolean)?.length > 0 ||
  //     Object.keys(meta.touchedInputs)
  //       ?.map((objKey) => meta.touchedInputs[objKey] == true)
  //       .filter(Boolean)?.length < 3 ||
  //     !isHuman ||
  //     !cardConfirm ||
  //     !cardAcknowledge ||
  //     !cardAuthorize
  // );
  // const [isDisabled2, setIsDisabled2] = useState(
  //   !isHuman || !debitHolder || !debitAcknowledge || !debitConfirm
  // );

  // useEffect(() => {
  //   setIsDisabled(
  //     Object.keys(meta.erroredInputs)
  //       ?.map((objKey) =>
  //         meta.erroredInputs[objKey] == undefined ? false : true
  //       )
  //       .filter(Boolean)?.length > 0 ||
  //       Object.keys(meta.touchedInputs)
  //         ?.map((objKey) => meta.touchedInputs[objKey] == true)
  //         .filter(Boolean)?.length < 3 ||
  //       !isHuman ||
  //       !cardConfirm ||
  //       !cardAcknowledge ||
  //       !cardAuthorize
  //   );
  // }, [meta, isHuman, cardConfirm, cardAcknowledge, cardAuthorize]);

  const location = clubLocationPostal;
  const planId =
    plan === "monthly" ? clubPlanMonthly?.planId : clubPlanYearly?.planId;
  const planValidate =
    plan === "monthly"
      ? clubPlanMonthly?.planValidation
      : clubPlanYearly?.planValidation;

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

  const stateCode = provinceMap[provinceName?.trim()] || "";

  const routingNumber = `0${institutionNumber}${transitNumber}`;
  const [expMonth, expYearRaw] = expiryDate.split("/");
  const expYear = expYearRaw?.length === 2 ? `20${expYearRaw}` : expYearRaw;

  let schedules = ["Dues"];

  if (
    (clubLocationPostal === 40248 || clubLocationPostal === 40327) &&
    addOnDetails === true
  ) {
    schedules = ["Dues", "Towel"];
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
            club_id: clubLocationPostal,
            first_name: userInfo?.fname || "John",
            last_name: userInfo?.lname || "Doe",
            email: userInfo?.email || "",
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

  const getAgreementInfo = async (data) => {
    setIsLoading(true);

    const payload = {
      paymentPlanId: planId || "",
      planValidationHash: planValidate || "",
      campaignId: "730E227DC96B7F9EE05302E014ACD689",
      activePresale: "true",
      sendAgreementEmail: "true",
      agreementContactInfo: {
        firstName: userInfo?.fname || "John",
        middleInitial: userInfo?.lname.charAt(0).toUpperCase() || "",
        lastName: userInfo?.lname || "Doe",
        email: userInfo?.email || "",
        gender: userInfo?.gender || "",
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
        todayCcCvvCode: data?.cvc.trim() || "",
        todayCcBillingZip: formattedPostalCode || "",
      };

      payload.draftBillingInfo.draftCreditCard = {
        creditCardFirstName: data?.firstName || "John",
        creditCardLastName: data?.lastName || "Doe",
        creditCardType: meta?.cardType?.type.trim(),
        creditCardAccountNumber: data?.cardNumber?.replace(/\s+/g, "") || "",
        creditCardExpMonth: parseInt(data?.expiryDate?.split("/")[0].trim()) || "00",
        creditCardExpYear: parseInt(`20${data?.expiryDate?.split("/")[1].trim()}`) || "",
      };
      // 👉 Debit (Bank Account) flow
    } else if (selectPlan === "direct_debit") {
      payload.draftBillingInfo.draftBankAccount = {
        draftAccountFirstName: data?.firstName || "John",
        draftAccountLastName: data?.lastName || "Doe",
        draftAccountRoutingNumber: data?.routingNumber || "",
        draftAccountNumber: data?.accountNumber || "",
        draftAccountType: "Checking",
      };
    }

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
    } finally {
      setIsLoading(false);
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
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleJoinNow = (e) => {
    // console.log(meta)
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    let activeSchema;
    if (selectPlan != "direct_debit") {
      activeSchema = form1Schema;
    } else if (selectPlan == "direct_debit") {
      activeSchema = form2Schema;
    }

    const result = activeSchema.safeParse(data);

    console.log(meta);
    console.log("Flattened error:", result?.error?.flatten());

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      return;
    }

    setErrors({});
    console.log("Validated data:", result.data);

    // return;
    // if (!validateFields()) return;
    getAgreementInfo(result.data);
  };

  if (isLoading) return <Loader show={false} />;

  return (
    <form
      onSubmit={handleJoinNow}
      className="relative w-full review_and_pay_bg"
    >
      <nav
        className={`fixed top-0 py-4 bg-[#000000] shadow-md z-50 w-full flex items-center transition-transform duration-300 ${
          scrollDirection === "down" ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="flex items-center justify-between w-full max-w-[1280px] mx-auto">
          <a href="https://www.evolvestrength.ca/">
            <img src={logo} alt="Logo" className="w-[175px] h-auto" />
          </a>

          <button
            type="submit"
            className={`button mt-6 bg-[#2DDE28] text-black text-[16px] font-medium w-[139px] h-[42px]`}
            // disabled={
            //   selectPlan !== "direct_debit"
            //     ? isDisabled
            //     : !(isHuman && termsAgreed && renewAgreed && confirm)
            // }
            // className={`w-[141px] ${
            //   selectPlan !== "direct_debit"
            //     ? !isDisabled
            //       ? "bg-[#2DDE28]"
            //       : "bg-gray-400 !cursor-not-allowed"
            //     : isHuman && termsAgreed && renewAgreed && confirm
            //     ? "bg-[#2DDE28]"
            //     : "bg-gray-400 cursor-not-allowed"
            // } text-black text-[16px] font-medium h-[50px] button`}
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
            <p className=" text-white text-[16px] font-[kanit] font-[600] leading-[16px] uppercase">
              Choose your payment option
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
                errors={errors}
                setErrors={setErrors}
                debitHolder={debitHolder}
                debitAcknowledge={debitAcknowledge}
                debitConfirm={debitConfirm}
                setDebitHolder={setDebitHolder}
                setDebitAcknowledge={setDebitAcknowledge}
                setDebitConfirm={setDebitConfirm}
              />
            ) : (
              <CardForm
                firstCardName={firstCardName}
                setFirstCardName={setFirstCardName}
                lastCardName={lastCardName}
                setLastCardName={setLastCardName}
                termPage={termPage}
                setTermPage={setTermPage}
                privacy={privacy}
                setPrivacy={setPrivacy}
                confirm={confirmed}
                setConfirm={setConfirmed}
                errors={errors}
                setErrors={setErrors}
                getCardNumberProps={getCardNumberProps}
                getExpiryDateProps={getExpiryDateProps}
                getCVCProps={getCVCProps}
                meta={meta}
                cardAuthorize={cardAuthorize}
                cardAcknowledge={cardAcknowledge}
                cardConfirm={cardConfirm}
                setCardAuthorize={setCardAuthorize}
                setCardAcknowledge={setCardAcknowledge}
                setCardConfirm={setCardConfirm}
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
            <div className="flex flex-col items-end justify-end w-full mt-6">
              <button
                type="submit"
                className={`button mt-6 bg-[#2DDE28] text-black text-[16px] font-medium w-[139px] h-[42px]`}
                // className={`button mt-6 ${
                //   selectPlan !== "direct_debit"
                //     ? !isDisabled
                //       ? "bg-[#2DDE28]"
                //       : "bg-gray-400 !cursor-not-allowed"
                //     : isHuman && termsAgreed && renewAgreed && confirm
                //     ? "bg-[#2DDE28]"
                //     : "bg-gray-400 cursor-not-allowed"
                // } text-black text-[16px] font-medium w-[139px] h-[42px]`}
                // disabled={
                //   selectPlan !== "direct_debit"
                //     ? isDisabled
                //     : !(isHuman && termsAgreed && renewAgreed && confirm)
                // }
              >
                PAY NOW
              </button>
              {apiError && (
                <p className="w-full mt-2 text-sm text-right text-red-500">
                  {apiError}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default ReviewAndPay;
