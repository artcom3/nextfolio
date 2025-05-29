import { DataTable } from "@/components";
import { experiencesColumns } from "./ui/ProjectColumns";
import { getAllExpiriences } from "@/actions/dashboard/expirience/get-expiriences";

export default async function ExperiencePage() {

  const experiences = await getAllExpiriences()

  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Work Experience</h1>
      </div>
      <div
        className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm" 
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