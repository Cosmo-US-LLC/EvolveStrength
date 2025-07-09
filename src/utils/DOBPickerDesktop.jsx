import React, { useState, useEffect, useRef } from "react";
import calendarIcon from "../assets/images/mobile/location-details/calendar.svg";

const DOBPickerDesktop = (props) => {
  const { title, dob, setDob, errors } = props;
  const today = new Date();
    
  const todayDate = new Date();
  const yearsAgo16 = new Date(
    todayDate.getFullYear() - 18,
    todayDate.getMonth(),
    todayDate.getDate()
  );

  const minYear = 1900;

  const maxYear = today.getFullYear();

  const [currentDate, setCurrentDate] = useState(yearsAgo16);
  // const [selectedDate, setSelectedDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef(null);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  useEffect(() => {
    if (showCalendar) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showCalendar]);
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const getDaysInMonth = (y, m) => new Date(y, m + 1, 0).getDate();

  const daysInMonth = getDaysInMonth(year, month);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handlePrevYear = () => {
    if (year > minYear) {
      setCurrentDate(new Date(year - 1, month, 1));
    }
  };

  const handleNextYear = () => {
    if (year < maxYear) {
      setCurrentDate(new Date(year + 1, month, 1));
    }
  };

  const handleSelectDate = (day) => {
    const selected = new Date(year, month, day);
    if (isNaN(selected.getTime())) {
      console.error("Invalid Date:", selected);
      return;
    }
    if (selected > today) return;
    setDob(selected);
    setShowCalendar(false);
  };

  const isToday = (day) => {
    return (
      today.getDate() === day &&
      today.getMonth() === month &&
      today.getFullYear() === year
    );
  };

  const formatDate = (date) => {
    if (!date) return "";

    const parsedDate = typeof date === "string" ? new Date(date) : date;
    if (isNaN(parsedDate.getTime())) return "";

    const day = parsedDate.getDate();
    const month = parsedDate.getMonth();
    const year = parsedDate.getFullYear();

    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const dayOfWeek = dayNames[parsedDate.getDay()];

    return `${dayOfWeek}, ${day} ${monthNames[month]} ${year}`;
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target)) {
        setShowCalendar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full">
      {title && (
        <label className="text-[#FFFFFF] text-[16px] font-[vazirmatn] font-normal leading-[25.2px] mb-1 block">
          Choose your start date
        </label>
      )}

      <div
        onClick={() => setShowCalendar(true)}
        style={{ minWidth: "292px" }}
        className={`flex px-4 py-3 items-center justify-between w-full border border-[#999] bg-[rgba(3,3,3,0.41)] backdrop-blur-[15.9px] cursor-pointer ${
          errors?.includes("dob") && "!border-[#c20000]"
        }`}
      >
        <input
          type="text"
          readOnly
          value={formatDate(dob)}
          placeholder="DOB"
          className="bg-transparent text-white text-[16px] font-[vazirmatn] w-full outline-none placeholder-[#999999]"
        />
        <img src={calendarIcon} alt="Calendar Icon" className="w-5 h-5 ml-2" />
      </div>

      {showCalendar && (
        <>
          <div className="fixed inset-0 z-40 bg-black/50" />

          <div
            ref={calendarRef}
            className="absolute custom-calendar z-50 w-[450px] max-w-md bg-[#1A1A1A] border border-[#FFFFFF] p-4 text-white shadow-lg
             -translate-x-[0%] -translate-y-[110%] transform"
            style={{ minHeight: "320px" }}
          >
            <div className="flex items-center justify-between mb-3">
              <button
                onClick={handlePrevYear}
                className="text-[12px] cursor-pointer font-[vazirmatn] font-[500] text-[#2DDE28] hover:text-white flex items-center gap-1"
                disabled={year <= minYear}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  fill="white"
                  viewBox="0 0 16 16"
                  className="mb-[3px]"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.646 8l5 5a.5.5 0 0 0 .708-.708L6.707 9H15a.5.5 0 0 0 0-1H6.707l3.647-3.646a.5.5 0 0 0-.708-.708l-5 5a.5.5 0 0 0 0 .708z"
                  />
                </svg>{" "}
                Year
              </button>
              <button
                onClick={handlePrevMonth}
                className="text-[12px] cursor-pointer font-[vazirmatn] font-[500] text-[#2DDE28] hover:text-white flex items-center gap-1"
                disabled={year <= minYear && month <= 0}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  fill="white"
                  viewBox="0 0 16 16"
                  className="mb-[3px]"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.646 8l5 5a.5.5 0 0 0 .708-.708L6.707 9H15a.5.5 0 0 0 0-1H6.707l3.647-3.646a.5.5 0 0 0-.708-.708l-5 5a.5.5 0 0 0 0 .708z"
                  />
                </svg>{" "}
                Month
              </button>
              <h2 className="text-[13px] font-[500] tracking-widest">
                {monthNames[month]} {year}
              </h2>
              <button
                onClick={handleNextMonth}
                className="text-[12px] cursor-pointer font-[vazirmatn] font-[500] text-[#2DDE28] hover:text-white flex items-center gap-1"
                disabled={year >= maxYear && month >= 11}
              >
                Month
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  fill="white"
                  viewBox="0 0 16 16"
                  className="mb-[1px]"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.354 8l-5-5a.5.5 0 0 0-.708.708L9.293 7H1a.5.5 0 0 0 0 1h8.293l-3.647 3.646a.5.5 0 1 0 .708.708l5-5a.5.5 0 0 0 0-.708z"
                  />
                </svg>{" "}
              </button>
              <button
                onClick={handleNextYear}
                className="text-[12px] cursor-pointer font-[vazirmatn] font-[500] text-[#2DDE28] hover:text-white flex items-center gap-1"
                disabled={year >= maxYear}
              >
                Year
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  fill="white"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.354 8l-5-5a.5.5 0 0 0-.708.708L9.293 7H1a.5.5 0 0 0 0 1h8.293l-3.647 3.646a.5.5 0 1 0 .708.708l5-5a.5.5 0 0 0 0-.708z"
                  />
                </svg>{" "}
              </button>
            </div>

            <div className="grid grid-cols-7 mb-2 text-xs text-center text-white/60">
              {weekdays.map((day) => (
                <div key={day} className="font-semibold">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1 text-sm">
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;

                // Check if dob is a valid Date object
                const isDateObject = dob instanceof Date && !isNaN(dob);
                const isSelected =
                  isDateObject &&
                  dob.getDate() === day &&
                  dob.getMonth() === month &&
                  dob.getFullYear() === year;

                const showTodayHighlight = !isDateObject && isToday(day);

                return (
                  <div
                    key={day}
                    onClick={() => handleSelectDate(day)}
                    className={`w-9 h-9 mx-auto flex items-center justify-center rounded-lg cursor-pointer 
                    ${
                      isSelected || showTodayHighlight
                        ? "bg-[#2DDE28] text-black"
                        : "hover:bg-[#2DDE28] hover:text-black"
                    }`}
                  >
                    <span>{day}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DOBPickerDesktop;
