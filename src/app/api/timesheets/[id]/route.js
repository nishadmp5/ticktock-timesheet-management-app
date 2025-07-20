import { timesheetEntries } from "@/lib/mockData/timesheetEntries";

export async function GET(req, { params }) {
  const { id } =await params;
  if(!id){
    return Response.json({error: "Missing timesheet id"},{ status:400 })
  }
  const detail = timesheetEntries[id] ;
  if(!detail){
    return Response.json({error:"Timesheet not found"},{ status:404 })
  }
  return Response.json(detail);
}