import React, { useState, useEffect, useRef } from "react";
import calendarIcon from "../assets/images/mobile/location-details/calendar.svg";

const DOBPicker = (props) => {
  const { title, dob, setDob, errors } = props;
  const today = new Date();
  const minYear = 1900;
  const maxYear = today.getFullYear();

  const [currentDate, setCurrentDate] = useState(today);
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

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const getDaysInMonth = (y, m) => new Date(y, m + 1, 0).getDate();
  const getStartDay = (y, m) => new Date(y, m, 1).getDay();

  const daysInMonth = getDaysInMonth(year, month);
  const startDay = getStartDay(year, month);

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
    const date = new Date(year, month, day);
    setDob(date);
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

    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

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

    const dayOfWeek = dayNames[date.getDay()];

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
    <div className="relative w-full mb-4">
      {title && (
        <label className="text-[#FFFFFF] text-[16px] font-[vazirmatn] font-normal leading-[25.2px] mb-1 block">
          Choose your start date
        </label>
      )}

      <div
        onClick={() => setShowCalendar(true)}
        className={`flex h-[46px] px-[14px] py-[10px] items-center justify-between w-full border border-[#999] bg-[rgba(3,3,3,0.41)] backdrop-blur-[15.9px] cursor-pointer ${errors?.includes("dob") && "!border-red-500"}`}
      >
        <input
          type="text"
          readOnly
          value={formatDate(dob)}
          placeholder="Pick a date"
          className="bg-transparent text-white text-[16px] font-[vazirmatn] w-full outline-none placeholder-[#999999]"
        />
        <img src={calendarIcon} alt="Calendar Icon" className="w-5 h-5 ml-2" />
      </div>

      {showCalendar && (
        <>
          <div className="fixed inset-0 z-40 bg-black/50" />

          <div
            ref={calendarRef}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-md bg-[#1A1A1A] border border-[#FFFFFF] p-4 text-white shadow-lg"
          >
            <div className="flex items-center justify-between mb-3">
              <button
                onClick={handlePrevYear}
                className="text-[12px] font-[vazirmatn] font-[500] text-[#2DDE28] hover:text-white flex items-center gap-1"
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
                className="text-[12px] font-[vazirmatn] font-[500] text-[#2DDE28] hover:text-white flex items-center gap-1"
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
              <h2 className="text-[12px] font-[500]">
                {monthNames[month]} {year}
              </h2>
              <button
                onClick={handleNextMonth}
                className="text-[12px] font-[vazirmatn] font-[500] text-[#2DDE28] hover:text-white flex items-center gap-1"
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
                className="text-[12px] font-[vazirmatn] font-[500] text-[#2DDE28] hover:text-white flex items-center gap-1"
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
              {Array.from({ length: startDay }).map((_, i) => (
                <div key={`blank-${i}`} />
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                return (
                  <div
                    key={day}
                    onClick={() => handleSelectDate(day)}
                    className={`w-9 h-9 flex items-center justify-center rounded-lg cursor-pointer 
                    ${
                      isToday(day)
                        ? "bg-[#2DDE28] text-black"
                        : "hover:bg-[#2DDE28] hover:text-black"
                    }`}
                  >
                    {day}
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

export default DOBPicker;
