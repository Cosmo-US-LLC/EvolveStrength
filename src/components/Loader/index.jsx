// import React from "react";

// const Loader = () => {
//   return (
//     <div className="flex items-center justify-center h-screen bg-black">
//       <div className="flex items-center gap-2 animate-pulse">
//         <div className="w-3 h-12 bg-[#2DDE28] rounded"></div>
//         <div className="w-1 h-20 bg-white rounded"></div>
//         <div className="h-4 bg-white rounded w-28"></div>
//         <div className="w-1 h-20 bg-white rounded"></div>
//         <div className="w-3 h-12 bg-[#2DDE28] rounded"></div>
//       </div>
//     </div>
//   );
// };

// export default Loader;

import React from "react";

const Loader = ({ show = true, showMobile = true, text=false }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#2DDE28]"></div>
      {!show && (
        <h1 className="text-[40px] text-[#2DDE28]">Processing Payment</h1>
      )}
      {!showMobile && (
        <h1 className="text-[28px] text-[#2DDE28]">Processing Payment</h1>
      )}
      {text && (
        <h1 className="text-[24px] lg:text-[40px] text-[#FFF] font-black mt-10">{text}</h1>
      )}
    </div>
  );
};

export default Loader;
