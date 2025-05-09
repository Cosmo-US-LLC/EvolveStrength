import React, { useEffect, useState } from "react";
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
  const [paymentMethod, setPaymentMethod] = useState("card");
  const {
    userInfo,
    plan,
    clubLocationPostal,
    clubPlans,
    clubPlanMonthly,
    clubPlanYearly,
    isLoading,
    error,
  } = useSelector((state) => state.plan);

  const [errors, setErrors] = useState({});
  const [fname, setFname] = useState(userInfo?.fname || "");
  const [lname, setLname] = useState(userInfo?.lname || "");
  const [transitNumber, setTransitNumber] = useState("");
  const [institutionNumber, setInstitutionNumber] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [verifyAccountNumber, setVerifyAccountNumber] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    if (!userInfo) {
      navigate("/member-details");
    }
  }, []);

  function updateErrs(valueToRemove) {
    const updatedErrs = { ...errors };
    delete updatedErrs[valueToRemove];
    setErrors(updatedErrs);
  }

  const validateForm = () => {
    const newErrors = {};

    if (!fname.trim()) newErrors.fname = "First name is required.";
    if (!lname.trim()) newErrors.lname = "Last name is required.";

    if (paymentMethod === "direct") {
      if (!transitNumber.trim())
        newErrors.transitNumber = "Transit number is required.";
      else if (transitNumber.length > 5)
        newErrors.transitNumber = "Transit number must be 5 digits or fewer.";

      if (!institutionNumber.trim())
        newErrors.institutionNumber = "Institution number is required.";
      else if (institutionNumber.length > 4)
        newErrors.institutionNumber =
          "Institution number must be 4 digits or fewer.";

      if (!accountNumber.trim())
        newErrors.accountNumber = "Account number is required.";
      else if (accountNumber.length !== 10)
        newErrors.accountNumber = "Account number must be exactly 10 digits.";

      if (!verifyAccountNumber.trim())
        newErrors.verifyAccountNumber = "Please re-enter your account number.";
      else if (accountNumber !== verifyAccountNumber)
        newErrors.verifyAccountNumber = "Account numbers do not match.";
    } else if (paymentMethod === "card") {
      if (!cardNumber.trim()) newErrors.cardNumber = "Card number is required.";
      else if (cardNumber.length !== 16)
        newErrors.cardNumber = "Card number must be exactly 16 digits.";

      if (!cvv.trim()) newErrors.cvv = "CVV is required.";
      else if (cvv.length !== 3)
        newErrors.cvv = "CVV must be exactly 3 digits.";

      if (!expirationDate.trim())
        newErrors.expirationDate = "Expiration date is required.";
      else if (expirationDate.length < 4)
        newErrors.expirationDate = "Expiration date must be in MMYY format.";
    }

    if (Object.keys(newErrors).length > 0) {
      console.error("Validation Errors:", newErrors);
      return newErrors;
    }
    return false;
  };

  const makeAgreement = async () => {
    const errorStatus = validateForm();
    if (errorStatus && Object.keys(errorStatus).length > 0) {
      console.warn("Please fix the form errors.");
      setErrors(errorStatus);
      return;
    }
    setErrors([]);

    try {
      const routingNumber = `0${institutionNumber}${transitNumber}`;
      const [expMonth, expYearRaw] = expirationDate.split("/");
      const expYear = expYearRaw?.length === 2 ? `20${expYearRaw}` : expYearRaw;
      const formattedPostalCode = (`${userInfo?.postal}` || "")
        .toUpperCase()
        .replace(/\s+/g, "")
        .replace(/(.{3})(.{3})/, "$1 $2");
      // Optional regex validation
      const isValidPostalCode = /^[A-Z]\d[A-Z] \d[A-Z]\d$/.test(
        formattedPostalCode
      );
      if (!isValidPostalCode) {
        console.error(
          "Invalid Canadian postal code format:",
          formattedPostalCode
        );
      }
      let selectedDate = userInfo?.dob || "";
      if (selectedDate) {
        const dateObj = new Date(selectedDate);
        const month = String(dateObj.getMonth() + 1).padStart(2, "0");
        const day = String(dateObj.getDate()).padStart(2, "0");
        const year = dateObj.getFullYear();
        selectedDate = `${month}/${day}/${year}`;
      } else {
        console.warn("Invalid or missing selectedDate");
      }

      let schedules = ["Dues"];

      if (clubLocationPostal === 40248 || clubLocationPostal === 40327) {
        schedules = ["Dues", "Towel"];
      }

      const payload = {
        paymentPlanId:
          plan == "monthly" ? clubPlans[0]?.planId : clubPlans[1]?.planId || "",
        planValidationHash:
          plan == "monthly"
            ? clubPlanMonthly?.planValidation
            : clubPlanYearly?.planValidation || "",
        campaignId: "730E227DC96B7F9EE05302E014ACD689",
        activePresale: "true",
        sendAgreementEmail: "true",
        agreementContactInfo: {
          firstName: fname || "John",
          middleInitial: `${lname[0]}`.toUpperCase() || "",
          lastName: lname || "Doe",
          email: userInfo?.email || "example@gmail.com",
          gender: userInfo?.gender || "",
          homePhone: "",
          cellPhone: userInfo?.phone || "9495898283",
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
        schedules: schedules,
        marketingPreferences: {
          email: "true",
          sms: "true",
          directMail: "true",
          pushNotification: "true",
        },
      };

      if (paymentMethod !== "direct") {
        payload.todayBillingInfo = {
          isTodayBillingSameAsDraft: "true",
          todayCcCvvCode: cvv || "",
          todayCcBillingZip: formattedPostalCode || "",
        };

        payload.draftBillingInfo.draftCreditCard = {
          creditCardFirstName: fname || "John",
          creditCardLastName: lname || "Doe",
          creditCardType: "visa",
          creditCardAccountNumber: cardNumber || "",
          creditCardExpMonth: expMonth || "00",
          creditCardExpYear: expYear || "",
        };
        // 👉 Debit (Bank Account) flow
      } else if (paymentMethod === "direct") {
        payload.draftBillingInfo.draftBankAccount = {
          draftAccountFirstName: fname || "John",
          draftAccountLastName: lname || "Doe",
          draftAccountRoutingNumber: routingNumber || "",
          draftAccountNumber: accountNumber || "",
          draftAccountType: "Checking",
        };
      }

      const response = await fetch(
        `http://138.197.175.219:8081/api/submitAgreement?location=${clubLocationPostal}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const data = await response.json();
      const message = data?.data?.restResponse?.status?.message;
      console.log("data", message);

      if (message && message.toLowerCase() === "success") {
        createPeople();
      } else {
        setApiError(message);
      }
      // navigate("/confirmation");
    } catch (error) {
      console.error("Error fetching club information:", error.message);
    }
  };

  const createPeople = async () => {
    let selectedDate = userInfo?.dob || "";
    if (selectedDate) {
      const dateObj = new Date(selectedDate);
      const month = String(dateObj.getMonth() + 1).padStart(2, "0");
      const day = String(dateObj.getDate()).padStart(2, "0");
      const year = dateObj.getFullYear();
      selectedDate = `${month}/${day}/${year}`;
    } else {
      console.warn("Invalid or missing selectedDate");
    }
    const formattedPostalCode = (`${userInfo?.postal}` || "")
      .toUpperCase()
      .replace(/\s+/g, "")
      .replace(/(.{3})(.{3})/, "$1 $2");
    // Optional regex validation
    const isValidPostalCode = /^[A-Z]\d[A-Z] \d[A-Z]\d$/.test(
      formattedPostalCode
    );
    if (!isValidPostalCode) {
      console.error(
        "Invalid Canadian postal code format:",
        formattedPostalCode
      );
      return;
    }

    const response = await fetch(
      `http://138.197.175.219:8081/api/createPerson`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: fname || "John",
          last_name: lname || "Doe",
          email: userInfo?.email || "",
          birthday: selectedDate || "",
          phone_mobile: userInfo?.phone || "",
          address: userInfo?.address || "",
          city: userInfo?.city || "",
          province: userInfo?.province || "",
          postal_code: formattedPostalCode || "",
          company_id: clubLocationPostal,
        }),
      }
    );

    const data = await response.json();
    console.log(data);
    navigate("/confirmation");
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
            onClick={() => setPaymentMethod("card")}
            className={`cursor-pointer w-1/2 py-2 text-[14px] font-[500] font-[vazirmatn] uppercase flex items-center justify-center space-x-2 ${
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
          <button
            onClick={() => setPaymentMethod("direct")}
            className={`cursor-pointer w-1/2 py-2 text-[14px] font-[500] font-[vazirmatn] uppercase flex items-center justify-center gap-2 ${
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
        </div>
      </div>

      {paymentMethod === "direct" ? (
        <DirectDebitForm
          makeAgreement={makeAgreement}
          fname={fname}
          setFname={setFname}
          lname={lname}
          setLname={setLname}
          transitNumber={transitNumber}
          setTransitNumber={setTransitNumber}
          institutionNumber={institutionNumber}
          setInstitutionNumber={setInstitutionNumber}
          accountNumber={accountNumber}
          setAccountNumber={setAccountNumber}
          verifyAccountNumber={verifyAccountNumber}
          setVerifyAccountNumber={setVerifyAccountNumber}
          errors={errors}
          updateErrs={updateErrs}
          apiError={apiError}
          paymentMethod={paymentMethod}
        />
      ) : (
        <CardPaymentForm
          makeAgreement={makeAgreement}
          fname={fname}
          setFname={setFname}
          lname={lname}
          setLname={setLname}
          cardNumber={cardNumber}
          setCardNumber={setCardNumber}
          cvv={cvv}
          setCvv={setCvv}
          expirationDate={expirationDate}
          setExpirationDate={setExpirationDate}
          errors={errors}
          updateErrs={updateErrs}
          apiError={apiError}
          paymentMethod={paymentMethod}
        />
      )}
    </div>
  );
};

export default MemberPayment;
