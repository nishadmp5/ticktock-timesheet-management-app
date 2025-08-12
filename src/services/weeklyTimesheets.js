export async function fetchWeeklyTimesheets(id) {
  try {
    const baseUrl = process.env.NEXTAUTH_URL;
    const res = await fetch(`${baseUrl}/api/timesheets/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData?.error || "Failed to fetch timesheets.");
    }
    return { data: await res.json(), error: null };
  } catch (error) {
    return {
      data: [],
      error: error?.message || "An unexpected error occurred.",
    };
  }
}
