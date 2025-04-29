import React, { useState, useEffect, useRef } from "react";
import calendarIcon from "../assets/images/mobile/location-details/calendar.svg";

const TailwindCalendar = (props) => {
  const { title } = props;
  const today = new Date();
  const minYear = 1900;
  const maxYear = today.getFullYear();

  const [currentDate, setCurrentDate] = useState(today);
  const [selectedDate, setSelectedDate] = useState(null);
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
    setSelectedDate(date);
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
    <div className="w-full mb-4 relative">
      {title && (
        <label className="text-[#FFFFFF] text-[16px] font-[vazirmatn] font-normal leading-[25.2px] mb-1 block">
          Choose your start date
        </label>
      )}

      <div
        onClick={() => setShowCalendar(true)}
        className="flex h-[46px] px-[14px] py-[10px] items-center justify-between 
               w-full border border-[#999] bg-[rgba(3,3,3,0.41)] 
               backdrop-blur-[15.9px]  cursor-pointer"
      >
        <input
          type="text"
          readOnly
          value={formatDate(selectedDate)} // Display the formatted date
          placeholder="Pick a date"
          className="bg-transparent text-white text-[14px] font-[vazirmatn] w-full outline-none placeholder-[#D8D8D8]"
        />
        <img src={calendarIcon} alt="Calendar Icon" className="h-5 w-5 ml-2" />
      </div>

      {showCalendar && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" />

          <div
            ref={calendarRef}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                       z-50 w-[90%] max-w-md bg-[#1A1A1A] border border-[#2DDE28] 
                        p-4 text-white shadow-lg"
          >
            <div className="flex justify-between items-center mb-3">
              <button
                onClick={handlePrevYear}
                className="text-[12px] font-[vazirmatn] text-[#2DDE28] hover:text-white"
                disabled={year <= minYear}
              >
                ⬅️ Year
              </button>
              <button
                onClick={handlePrevMonth}
                className="text-[12px] font-[vazirmatn] text-[#2DDE28] hover:text-white"
                disabled={year <= minYear && month <= 0}
              >
                ⬅️ Month
              </button>
              <h2 className="text-[12px] font-[500]">
                {monthNames[month]} {year}
              </h2>
              <button
                onClick={handleNextMonth}
                className="text-[12px] font-[vazirmatn] text-[#2DDE28] hover:text-white"
                disabled={year >= maxYear && month >= 11}
              >
                Month ➡️
              </button>
              <button
                onClick={handleNextYear}
                className="text-[12px] font-[vazirmatn] font-[500] text-[#2DDE28] hover:text-white"
                disabled={year >= maxYear}
              >
                Year ➡️
              </button>
            </div>

            <div className="grid grid-cols-7 text-center mb-2 text-xs text-white/60">
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

export default TailwindCalendar;

// import React, { useState, useEffect, useRef } from "react";
// import calendarIcon from "../assets/images/mobile/location-details/calendar.svg";

// const TailwindCalendar = (props) => {
//   const { title } = props;
//   const today = new Date();
//   const [currentDate, setCurrentDate] = useState(today);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [showCalendar, setShowCalendar] = useState(false);
//   const calendarRef = useRef(null);

//   const monthNames = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];
//   const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

//   const year = currentDate.getFullYear();
//   const month = currentDate.getMonth();

//   const getDaysInMonth = (y, m) => new Date(y, m + 1, 0).getDate();
//   const getStartDay = (y, m) => new Date(y, m, 1).getDay();

//   const daysInMonth = getDaysInMonth(year, month);
//   const startDay = getStartDay(year, month);

//   const handlePrevMonth = () => {
//     setCurrentDate(new Date(year, month - 1, 1));
//   };

//   const handleNextMonth = () => {
//     setCurrentDate(new Date(year, month + 1, 1));
//   };

//   const handleSelectDate = (day) => {
//     const date = new Date(year, month, day);
//     setSelectedDate(date);
//     setShowCalendar(false);
//   };

//   const isToday = (day) => {
//     return (
//       today.getFullYear() === year &&
//       today.getMonth() === month &&
//       today.getDate() === day
//     );
//   };

//   const formatDate = (date) => {
//     if (!date) return "";

//     const day = date.getDate(); // Get the day (1-31)
//     const month = date.getMonth(); // Get month (0-11)
//     const year = date.getFullYear(); // Get year (e.g., 2025)

//     const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
//     const monthNames = [
//       "Jan",
//       "Feb",
//       "Mar",
//       "Apr",
//       "May",
//       "Jun",
//       "Jul",
//       "Aug",
//       "Sep",
//       "Oct",
//       "Nov",
//       "Dec",
//     ];

//     const dayOfWeek = dayNames[date.getDay()]; // Get the day of the week (Mon, Tue, etc.)

//     return `${dayOfWeek}, ${day} ${monthNames[month]} ${year}`; // Example: "Mon, 7 Apr 2025"
//   };

//   // Close calendar on outside click
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (calendarRef.current && !calendarRef.current.contains(e.target)) {
//         setShowCalendar(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <div className="w-full mb-4 relative">
//       {title && (
//         <label className="text-[#FFFFFF] text-[16px] font-[vazirmatn] font-normal leading-[25.2px] mb-1 block">
//           Choose your start date
//         </label>
//       )}

//       <div
//         onClick={() => setShowCalendar(true)}
//         className="flex h-[46px] px-[14px] py-[10px] items-center justify-between
//              w-full border border-[#999] bg-[rgba(3,3,3,0.41)]
//              backdrop-blur-[15.9px]  cursor-pointer"
//       >
//         <input
//           type="text"
//           readOnly
//           value={formatDate(selectedDate)}
//           placeholder="Pick a date"
//           className="bg-transparent text-white text-[14px] font-[vazirmatn] w-full outline-none placeholder-[#D8D8D8]"
//         />
//         <img src={calendarIcon} alt="Calendar Icon" className="h-5 w-5 ml-2" />
//       </div>

//       {showCalendar && (
//         <>
//           <div className="fixed inset-0 bg-black/50 z-40" />

//           <div
//             ref={calendarRef}
//             className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
//                        z-50 w-[90%] max-w-md bg-black border border-white
//                        rounded-md p-4 text-white shadow-lg"
//           >
//             <div className="flex justify-between items-center mb-3">
//               <button onClick={handlePrevMonth} className="text-sm">
//                 Previous
//               </button>
//               <h2 className="text-sm font-semibold">
//                 {monthNames[month]} {year}
//               </h2>
//               <button onClick={handleNextMonth} className="text-sm">
//                 Next
//               </button>
//             </div>

//             <div className="grid grid-cols-7 text-center mb-2 text-xs text-white/60">
//               {weekdays.map((day) => (
//                 <div key={day}>{day}</div>
//               ))}
//             </div>

//             <div className="grid grid-cols-7 gap-1 text-sm">
//               {Array.from({ length: startDay }).map((_, i) => (
//                 <div key={`blank-${i}`} />
//               ))}
//               {Array.from({ length: daysInMonth }).map((_, i) => {
//                 const day = i + 1;
//                 return (
//                   <div
//                     key={day}
//                     onClick={() => handleSelectDate(day)}
//                     className={`w-9 h-9 flex items-center justify-center rounded cursor-pointer
//                     ${
//                       isToday(day)
//                         ? "bg-[#2DDE28] text-black"
//                         : "hover:bg-white/20"
//                     }`}
//                   >
//                     {day}
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default TailwindCalendar;
