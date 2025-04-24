import React from "react";

const StepIndicator = ({ step, totalSteps, title, subtitle }) => {
  const radius = 18;
  const stroke = 6.5;
  const circumference = 2 * Math.PI * radius;
  const progress = (step / totalSteps) * circumference;

  return (
    <div className="flex items-center gap-4 w-full">
      <div className="relative w-[56px] h-[56px] min-w-[56px] min-h-[56px]">
        <svg
          viewBox="0 0 44 44"
          className="absolute top-0 left-0 w-full h-full rotate-[-90deg]"
        >
          <circle
            cx="22"
            cy="22"
            r={radius}
            stroke="#1C1C1C"
            strokeWidth={stroke}
            fill="none"
          />

          <circle
            cx="22"
            cy="22"
            r={radius}
            stroke="#2DDE28"
            strokeWidth={stroke}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            strokeLinecap="round"
            className="transition-all duration-500 ease-in-out"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-full text-white text-[12px] font-vazirmatn leading-tight text-center">
          Step
          <br />
          {step}/{totalSteps}
        </div>
      </div>

      <div className="flex flex-col justify-center gap-[3px]">
        <h2 className="text-[#2DDE28] text-[16.062px] font-[600] leading-[21.093px]">
          {title}
        </h2>

        <p className="text-[#B9B9B9] text-[12px] font-[400] leading-[15.1px] w-[231px]">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default StepIndicator;
