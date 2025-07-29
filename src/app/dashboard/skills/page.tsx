
import { getUserSkills } from "@/actions/dashboard/skills/get-skills";
import { DataTable } from "@/components";
import { skillsColumns } from "./ui/SkillsColumns";
import { CreateSkillDialog } from "../profile/ui/CreateSkillDialog";

export default async function SkillsPage() {
  const userSkills = await getUserSkills();

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Skills</h1>
        <CreateSkillDialog />
      </div>
      <div
        className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm" 
        x-chunk="dashboard-02-chunk-1"
      >
        <DataTable 
          columns={skillsColumns} 
          data={userSkills}
          filter={"name"}
        />
      </div>
    </>
  );
}