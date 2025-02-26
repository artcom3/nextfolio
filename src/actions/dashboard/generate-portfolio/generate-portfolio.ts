"use server"

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { Experience } from "@prisma/client";


export default async function generatePortfolio(json: any) {

  const session = await auth();

  console.log(session);
  
  if (!session) {
    throw new Error("Unauthorized");
  }

  if (!session.user?.id) {
    throw new Error("Unauthorized");
  }

  const userId = await session.user.id;


  // console.log(json.user.experiences);

  const userExpierences = json.user.experiences;

  console.log(userExpierences);

  try {

    await prisma.experience.createMany({
      data: json.user.experiences.map((experience: Experience) => ({
        userId,
        jobTitle: experience.jobTitle ?? "",
        company: experience.company ?? "",
        // responsibilities: experience.responsibilities,
        // responsibilities: experience.responsibilities,
      })),
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to generate portfolio");
  }

}