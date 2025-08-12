import { getUserProjectsForDashboard } from "@/actions/dashboard/projects/get-projects";
import { DataTable } from "@/components";
import { projectsColumns } from "./ui/ProjectColumns";
import { AddProjectDialog } from "./ui/AddProjectDialog";

export default async function ProjectsPage() {

  const projects = await getUserProjectsForDashboard()

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Projects</h1>
        <AddProjectDialog />
      </div>
      <div
        className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm mt-4" 
        x-chunk="dashboard-02-chunk-1"
      >        
        <DataTable 
          columns={projectsColumns} 
          data={projects}
          filter={"title"}
        />

      </div>
    </>
  );
}