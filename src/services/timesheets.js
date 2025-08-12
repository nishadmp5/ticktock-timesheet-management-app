import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function fetchTimesheets(){
    try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    if(!userId) throw new Error("User not authenticated")

    const baseUrl = process.env.NEXTAUTH_URL;

    const res = await fetch(`${baseUrl}/api/timesheets`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
      cache: "no-store",
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData?.error || "Failed to fetch timesheets.");
    } 

    return { data : await res.json(), error:null}
  } catch (error) {
    return { data : [] ,error : error?.message || "An unexpected error occurred."};
  }
}