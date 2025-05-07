import React, { useState, useEffect, useRef } from "react";
import calendarIcon from "../assets/images/mobile/location-details/calendar.svg";
import { formatDate } from "../libs/utils";

const EventDatePicker = (props) => {
  const { title, selectedDate, setSelectedDate } = props;
  const today = new Date();
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

  const handleSelectDate = (day) => {
    const date = new Date(year, month, day);
    // setSelectedDate(date);
    setShowCalendar(false);
  };

  useEffect(() => {
    setSelectedDate(formatDate(new Date()));
  }, []);

  const isToday = (day) =>
    today.getFullYear() === year &&
    today.getMonth() === month &&
    today.getDate() === day;

  const isPastDate = (day) => {
    const date = new Date(year, month, day);
    return date < today;
  };

  const isPreviousMonthDay = (day) => {
    return day > daysInMonth;
  };

  // const formatDate = (date) => {
  //   if (!date) return "";
  //   const day = date.getDate();
  //   const month = date.getMonth();
  //   const year = date.getFullYear();
  //   const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  //   const monthNames = [
  //     "Jan",
  //     "Feb",
  //     "Mar",
  //     "Apr",
  //     "May",
  //     "Jun",
  //     "Jul",
  //     "Aug",
  //     "Sep",
  //     "Oct",
  //     "Nov",
  //     "Dec",
  //   ];
  //   const dayOfWeek = dayNames[date.getDay()];
  //   return `${dayOfWeek}, ${day} ${monthNames[month]} ${year}`;
  // };

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
          Your plan starts from:
        </label>
      )}

      <div
        // onClick={() => setShowCalendar(true)}
        className="flex h-[46px] px-[14px] py-[10px] items-center justify-between w-full border border-[#999] bg-[rgba(3,3,3,0.41)] backdrop-blur-[15.9px] cursor-pointer"
      >
        <img src={calendarIcon} alt="Calendar Icon" className="w-5 h-5 mr-2" />
        <input
          type="text"
          readOnly
          value={formatDate(new Date())}
          placeholder="Pick a date"
          className="bg-transparent text-white text-[16px] font-[vazirmatn] w-full outline-none placeholder-[#999999] pt-1.5"
        />
      </div>

      {showCalendar && (
        <>
          <div className="fixed inset-0 z-40 bg-black/50" />

          <div
            ref={calendarRef}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-md bg-black border border-white rounded-md p-4 text-white shadow-lg"
          >
            <div className="flex items-center justify-between mb-3">
              <button
                onClick={handlePrevMonth}
                className="text-sm"
                aria-label="Previous Month"
              >
                Previous
              </button>
              <h2 className="text-sm font-semibold">
                {monthNames[month]} {year}
              </h2>
              <button
                onClick={handleNextMonth}
                className="text-sm"
                aria-label="Next Month"
              >
                Next
              </button>
            </div>

            <div className="grid grid-cols-7 mb-2 text-xs text-center text-white/60">
              {weekdays.map((day) => (
                <div key={day}>{day}</div>
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
                    onClick={() => !isPastDate(day) && handleSelectDate(day)}
                    className={`w-9 h-9 flex items-center justify-center rounded cursor-pointer 
                    ${
                      isToday(day)
                        ? "bg-[#2DDE28] text-black"
                        : isPastDate(day)
                        ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                        : "hover:bg-white/20"
                    }`}
                    role="button"
                    aria-label={`Select ${day}`}
                    style={isPastDate(day) ? { cursor: "not-allowed" } : {}}
                  >
                    {day}
                  </div>
                );
              })}

              {Array.from({ length: startDay }).map((_, i) => {
                const prevMonthDay = i + 1;
                return (
                  <div
                    key={prevMonthDay}
                    className="flex items-center justify-center text-gray-500 rounded cursor-pointer w-9 h-9"
                  >
                    {prevMonthDay}
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

export default EventDatePicker;
