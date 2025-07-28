import { DataTable } from "@/components";
import { experiencesColumns } from "./ui/ProjectColumns";
import { getAllExpiriences } from "@/actions/dashboard/expirience/get-expiriences";
import { AddExperienceDialog } from "./ui/AddExperienceDialog";

export default async function ExperiencePage() {

  const experiences = await getAllExpiriences()

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
        <DataTable 
          columns={experiencesColumns} 
          data={experiences}
          filter={"role"}
        />

      </div>
    </>
  );
}