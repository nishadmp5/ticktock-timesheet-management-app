import { getPercentage } from "@/lib/utils";
import React from "react";

const ProgressBar = ({ totalTrackedHours, totalHours }) => {
  const trackedHoursPercentage = getPercentage(totalTrackedHours, totalHours);

  return (
    <div className="max-w-47 w-full h-1.5 bg-[#E5E7EB] rounded-sm relative group ">
      <div
        style={{ width: `${trackedHoursPercentage}%` }}
        className={`h-full  bg-[#FF8A4C] absolute top-0 left-0 transition-all rounded-sm z-2`}
      >
        <div className="w-22.5 h-10.5 pb-1 absolute right-0 translate-x-1/2  bottom-full">
          <div className="absolute top-0 left-0 w-full h-[81%] bg-white shadow-[0_2px_8px_1px_rgba(0,0,0,0.1)] rounded-md flex justify-center items-center group-hover:opacity-100 opacity-0 transition-opacity pointer-events-none">
            <p className="font-medium text-14 leading-5 tracking-0">{`${totalTrackedHours}/${totalHours} hrs`}</p>
          </div>
          <div className="w-4 h-2.5  [clip-path:polygon(50%_0%,0%_100%,100%_100%)]  bg-white rotate-180 absolute bottom-0 left-1/2 -translate-x-1/2"></div>
        </div>
      </div>
      <p className="absolute right-0 bottom-full  font-medium text-12 leading-5 tracking-0 text-secondary pb-1">
        {trackedHoursPercentage}%
      </p>
    </div>
  );
};

export default ProgressBar;
