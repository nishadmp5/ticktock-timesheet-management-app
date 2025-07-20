import { timesheets } from "@/lib/mockData/timesheets";

export async function POST(req) {
  try {
    const { userId } = await req.json();
    if (!userId) {
      return Response.json({ error: "Missing userId" }, { status: 400 });
    }

    const userData = timesheets.find((t) => t.userId === userId);
    if (!userData) {
      return Response.json(
        { error: "User timesheet not found" },
        { status: 404 }
      );
    }

    return Response.json(userData.userTimesheets);
  } catch (error) {
    return Response.json({ error: "Internal server error" });
  }
}
