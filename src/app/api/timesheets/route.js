import { NextResponse } from "next/server";
import { getServerSession } from "next-auth"; // To get the logged in user
import connectToDatabase from "@/lib/dbConnect";
import Timesheet from "@/lib/models/timesheet";
import { authOptions } from "@/lib/auth";

export const GET = async (request) => {
  try {
    // 1. Security: Get the session
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // 2. Connect to DB
    await connectToDatabase();

    // 3. Fetch Data
    // Find timesheets belonging to THIS user only.
    // Sort by Year (desc) and WeekNumber (desc) so newest is top.
    const timesheets = await Timesheet.find({ user: session.user.id })
      .sort({ year: -1, weekNumber: -1 });

    // 4. Return Data
    return NextResponse.json({ timesheets }, { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching timesheets", error: error.message },
      { status: 500 }
    );
  }
};