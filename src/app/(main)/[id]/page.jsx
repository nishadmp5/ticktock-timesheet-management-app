import EntriesListing from "@/components/EntriesListing/EntriesListing";
import ErrorComponent from "@/components/ErrorComponent";
import ProgressBar from "@/components/ProgressBar";
import { totalWorkingHours } from "@/config/constants";
import { fetchWeeklyTimesheets } from "@/services/weeklyTimesheets";

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
       <EntriesListing allEntries={allEntries}/>
      </div>
    </section>
  );
};

export default page;
