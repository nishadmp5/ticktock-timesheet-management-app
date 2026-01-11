import Timesheets from "@/components/Timesheets.jsx";
import React from "react";
import ErrorComponent from "@/components/ErrorComponent";
import { getTimeSheets } from "@/services/timesheetService";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const page = async () => {

  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    // You could also use redirect('/login') here
    return <ErrorComponent errorMessage="Please log in to view timesheets." />;
  }

const { data: timesheetsData, error: fetchError } = await getTimeSheets(session.user.id);

if (fetchError) return <ErrorComponent errorMessage={fetchError} />;  

  return (
    <section className="w-full min-h-[500px] bg-white shadow-[0_1px_3px_-1px_rgba(0,0,0,0.2)] rounded-lg p-6">
      <h1 className="font-bold text-24 leading-6 tracking-0 mb-6">
        Your Timesheets
      </h1>
      <Timesheets timesheetsData={timesheetsData} />
    </section>
  );
};

export default page;
