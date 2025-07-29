import { DataTable } from "@/components";
import { educationColumns } from "./ui/EducationColumns";
import { getAllEducation } from "@/actions/dashboard/education/get-education";
import { AddEducationDialog } from "./ui/AddEducationDialog";

export default async function EducationPage() {

  const education = await getAllEducation()

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Education</h1>
        <AddEducationDialog />
      </div>
      <div
        className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm mt-4" 
        x-chunk="dashboard-02-chunk-1"
      >        
        <DataTable 
          columns={educationColumns} 
          data={education}
          filter={"degree"}
        />

      </div>
    </>
  );
}