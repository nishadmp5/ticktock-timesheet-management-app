import { NextResponse } from "next/server";
import Project from "@/lib/models/project";
import connectToDatabase from "@/lib/dbConnect";

export const GET = async () => {
  try {
    await connectToDatabase();

    // 1. Define your sample data
    const sampleProjects = [
      { name: "ABC Website", description: "Client website redesign" },
      { name: "Mobile App", description: "Flutter application v2" },
      { name: "Internal Ops", description: "HR and Admin tasks" },
    ];

    // 2. Clear existing projects (Optional: helps reset data while testing)
    // await Project.deleteMany({}); 

    // 3. Insert the new projects
    // insertMany is a Mongoose command to save an array of items at once
    await Project.insertMany(sampleProjects);

    return NextResponse.json({ 
      message: "Database seeded successfully!", 
      projects: sampleProjects 
    });

  } catch (error) {
    return NextResponse.json(
      { message: "Error seeding data", error: error.message },
      { status: 500 }
    );
  }
};