import ActionMenu from "@/components/ActionMenu";
import ErrorComponent from "@/components/ErrorComponent";
import ProgressBar from "@/components/ProgressBar";
import TaskDetails from "@/components/TaskDetails";
import { totalWorkingHours } from "@/config/constants";
import { getMonthDate } from "@/lib/utils";
import { fetchWeeklyTimesheets } from "@/services/weeklyTimesheets";
import React from "react";
import { FiPlus } from "react-icons/fi";

const page = async ({ params, searchParams }) => {
  const { data: allEntries, error: fetchError } = await fetchWeeklyTimesheets(
    params.id
  );

  const sp = await searchParams;
  const { date } = sp;
  const totalHours = totalWorkingHours;

  // Returns the total tracked hours
  const getTotalTrackedHours = (timesheetEntries) => {
    if (!Array.isArray(timesheetEntries)) return 0;
    return timesheetEntries.reduce((totalHours, entry) => {
      const dayTotalHours = entry.tasks.reduce(
        (daySum, task) => daySum + task.hours,
        0
      );
      return totalHours + dayTotalHours;
    }, 0);
  };

  const totalTrackedHours = getTotalTrackedHours(allEntries);

  if (fetchError) return <ErrorComponent errorMessage={fetchError} />;

  return (
    <section className="w-full min-h-[500px] bg-white shadow-[0_1px_3px_-1px_rgba(0,0,0,0.2)] rounded-lg p-6 pb-13.5">
      <div>
        <div className="w-full flex justify-between items-end gap-2 mb-6">
          <h1 className="font-bold text-24 leading-6 tracking-0 pb-1">
            This week's timesheet
          </h1>
          <ProgressBar
            totalTrackedHours={totalTrackedHours || 0}
            totalHours={totalHours}
          />
        </div>
        <p className="font-normal text-14 leading-5 tracking-0 text-secondary mb-6">
          {date}
        </p>
        <div className="w-full flex flex-col gap-6">
          {!allEntries || allEntries.length === 0 ? (
            <div className="w-full h-[200px] flex justify-center items-center">
              <p className="text-secondary font-medium text-14 leading-5 tracking-0">
                No records found.
              </p>
            </div>
          ) : (
            allEntries?.map((entry, index) => (
              <div
                key={`entry-${index}`}
                className="w-full grid [grid-template-columns:minmax(100px,1fr)_minmax(100px,8.625fr)] "
              >
                <div>
                  <p className="font-semibold text-18 leading-5 tracking-0">
                    {getMonthDate(entry.date)}
                  </p>
                </div>
                <div className="w-full flex flex-col gap-2.5">
                  {entry.tasks.length > 0 &&
                    entry.tasks.map((task, taskIndex) => {
                      return (
                        <TaskDetails key={`task-${taskIndex}`} task={task} />
                      );
                    })}
                  <div className="w-full hover:bg-[#E1EFFE] rounded-lg border border-[#D1D5DB] hover:border-primary-dark transition-colors border-dashed py-2.5 flex justify-center items-center cursor-pointer">
                    <div className="flex items-center gap-2">
                      <FiPlus className="text-primary-dark" />
                      <p className="font-medium text-base leading-5 tracking-0 text-primary-dark">
                        Add new task
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default page;
