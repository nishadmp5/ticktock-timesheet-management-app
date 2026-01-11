import connectToDatabase from "@/lib/dbConnect";
import Timesheet from "@/lib/models/timesheet";

export async function getTimeSheets(userId) {
  try {
    if (!userId) throw new Error("User ID is required");
    await connectToDatabase();

    const timesheets = await Timesheet.find({ user: userId })
      .sort({ year: -1, weekNumber: -1 })
      .lean();
    const serializedTimesheets = timesheets.map((t) => ({
      ...t,
      _id: t._id.toString(),
      user: t.user.toString(),
      entries: t.entries.map((e) => ({
        ...e,
        _id: e._id.toString(),
        project: e.project.toString(),
      })),
      // Convert Dates to ISO strings if needed, or keep as Date objects
      // (Next.js server components handle Date objects better now, but strings are safest)
      weekStartDate: t.weekStartDate.toISOString(),
      weekEndDate: t.weekEndDate.toISOString(),
      createdAt: t.createdAt.toISOString(),
      updatedAt: t.updatedAt.toISOString(),
    }));

    return { data: serializedTimesheets, error: null };
  } catch (error) {
    console.error("DB Error:", error);
    return { data: [], error: "Failed to fetch timesheets" };
  }
}
