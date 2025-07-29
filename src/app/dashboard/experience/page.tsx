import { getExperiencesWithSkills } from "@/actions/dashboard/experience/get-experiences-with-skills";
import { getUserSkills } from "@/actions/dashboard/skills/get-skills";
import { AddExperienceDialog } from "./ui/AddExperienceDialog";
import { ExperienceTable } from "./ui/ExperienceTable";

export default async function ExperiencePage() {
  const [experiences, userSkills] = await Promise.all([
    getExperiencesWithSkills(),
    getUserSkills()
  ]);

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Experience</h1>
        <AddExperienceDialog />
      </div>
      <div
        className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm mt-4" 
        x-chunk="dashboard-02-chunk-1"
      >        
        <ExperienceTable 
          experiences={experiences}
          userSkills={userSkills}
        />

      </div>
    </>
  );
}