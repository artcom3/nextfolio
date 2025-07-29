"use client";

import { DataTable } from "@/components";
import { createExperienceColumns } from "./ExperienceColumns";
import { ExperienceWithSkillsInterface, UserSkillInterface } from "@/interfaces";

interface ExperienceTableProps {
  experiences: ExperienceWithSkillsInterface[];
  userSkills: UserSkillInterface[];
}

export function ExperienceTable({ experiences, userSkills }: ExperienceTableProps) {
  const experienceColumns = createExperienceColumns(userSkills);

  return (
    <DataTable 
      columns={experienceColumns} 
      data={experiences}
      filter={"role"}
    />
  );
} 