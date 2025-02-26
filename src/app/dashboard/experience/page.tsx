import { getAllProjects } from "@/actions/dashboard/projects/get-projects";
import { DataTable } from "@/components";
import { projectsColumns } from "./ui/ProjectColumns";
import { getAllExpiriences } from "@/actions/dashboard/expirience/get-expiriences";

export default async function ProjectsPage() {

  const experiences = await getAllExpiriences()

  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Projects</h1>
      </div>
      <div
        className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm" 
        x-chunk="dashboard-02-chunk-1"
      >

        <DataTable 
          columns={projectsColumns} 
          data={experiences}
          filter={"name"}
        />

      </div>
    </>
  );
}