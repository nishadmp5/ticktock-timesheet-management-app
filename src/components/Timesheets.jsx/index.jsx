import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getWeekRange } from "@/lib/utils";
import Link from "next/link";

const Timesheets = async () => {
  const tableHeadings = ["WEEK #", "Date", "Status", "ACTIONS"];
  const totalHours = 40;

  let timesheetsData = [];
  let fetchError = null;

  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    console.log(userId,"userid");
    

    const baseUrl = process.env.NEXTAUTH_URL;
    console.log(baseUrl,"baseUrl");
    
    const res = await fetch(`${baseUrl}/api/timesheets`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
      cache: "no-store",
    });

    console.log(res,"response");
    

    if (!res.ok) {
      const errorData = await res.json();
      console.log(errorData?.error || "Failed to fetch timesheets.");
      fetchError = errorData?.error || "Failed to fetch timesheets.";
    } else {
      timesheetsData = await res.json();
    }
  } catch (error) {
    console.log(error?.message || "An unexpected error occured.");
    fetchError = error?.message || "An unexpected error occured.";
  }

  const getTimesheetStatusInfo = (trackedHours, totalHours) => {
    let status;
    let statusClasses;
    let actionTitle;

    if (trackedHours === totalHours) {
      status = "COMPLETED";
      statusClasses = "text-[#03543F] bg-[#DEF7EC]";
      actionTitle = "View";
    } else if (trackedHours > 0) {
      status = "INCOMPLETE";
      statusClasses = "text-[#723B13] bg-[#FDF6B2]";
      actionTitle = "Update";
    } else {
      status = "MISSING";
      statusClasses = "text-[#99154B] bg-[#FCE8F3]";
      actionTitle = "Create";
    }

    return { status, statusClasses, actionTitle };
  };

// Show error message if fetch failed
  if (fetchError) {
    return (
      <div className="w-full h-[200px] flex justify-center items-center">
        <p className="text-danger font-medium text-14 leading-5 tracking-0">
          {fetchError}
        </p>
      </div>
    );
  }

  if (!timesheetsData || timesheetsData.length === 0)
    return (
      <div className="w-full h-[200px] flex justify-center items-center">
        <p className="text-secondary font-medium text-14 leading-5 tracking-0">
          No records found.
        </p>
      </div>
    );

  return (
    <div className="w-full  rounded-lg shadow-[0_1px_3px_-1px_rgba(0,0,0,0.2)] bg-[#F9FAFB] overflow-hidden">
      <div className="w-full ">
        <div className="w-full grid [grid-template-columns:minmax(100px,1fr)_minmax(100px,4.69fr)_minmax(100px,4.69fr)_minmax(100px,1.13fr)] border-b border-[#E5E7EB]">
          {tableHeadings.map((heading, index) => (
            <div
              key={`heading-${index}`}
              className="p-4  text-left last:text-center font-semibold text-12 leading-5 tracking-0 uppercase text-secondary break-words "
            >
              {heading}
            </div>
          ))}
        </div>
        <div className="w-full">
          {timesheetsData?.map((timesheet, index) => {
            const { status, statusClasses, actionTitle } =
              getTimesheetStatusInfo(timesheet.trackedHours, totalHours);
            const formattedDate = getWeekRange(
              timesheet.startDate,
              timesheet.endDate
            );
            return (
              <div
                key={`timesheet-row-${index}`}
                className="w-full grid [grid-template-columns:minmax(100px,1fr)_minmax(100px,4.69fr)_minmax(100px,4.69fr)_minmax(100px,1.13fr)] border-b last:border-none border-[#E5E7EB]"
              >
                <div className="p-4  text-left  font-normal text-14  leading-5 tracking-0  break-words ">
                  {index + 1}
                </div>
                <div className="p-4  text-left  font-normal text-14  leading-5 tracking-0 text-secondary  break-words  bg-white">
                  {formattedDate}
                </div>
                <div className="p-4 bg-white">
                  <span
                    className={`text-left py-0.5 px-2.5 font-medium text-12 leading-5 tracking-0 rounded-md ${statusClasses} `}
                  >
                    {status}
                  </span>
                </div>
                <Link
                  href={{
                    pathname: `/${timesheet.id}`,
                    query: {
                      tracked: timesheet.trackedHours,
                      total: totalHours,
                      date: formattedDate,
                    },
                  }}
                  className="p-4  text-center  font-normal text-base  leading-25 tracking-0 text-primary  break-words  bg-white"
                >
                  {actionTitle}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Timesheets;
