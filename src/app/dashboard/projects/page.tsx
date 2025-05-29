import { getAllProjects } from "@/actions/dashboard/projects/get-projects";
import { DataTable } from "@/components";
import { projectsColumns } from "./ui/ProjectColumns";

export default async function ProjectsPage() {

  const projects = await getAllProjects()

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
          columns={projectsColumns} 
          data={projects}
          filter={"role"}
        />

      </div>
    </>
  );
}