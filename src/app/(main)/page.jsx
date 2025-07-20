

import Timesheets from "@/components/Timesheets.jsx";
import React from "react";

const page =  () => {
  

  return (
    <section className="w-full min-h-[500px] bg-white shadow-[0_1px_3px_-1px_rgba(0,0,0,0.2)] rounded-lg p-6">
      <h1 className="font-bold text-24 leading-6 tracking-0 mb-6">Your Timesheets</h1>
      <Timesheets/>
    </section>
  );
};

export default page;
