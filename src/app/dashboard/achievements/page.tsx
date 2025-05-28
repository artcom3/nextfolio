
import { getAllAchievements } from "@/actions/dashboard/achievements/get-achievements";
import { DataTable } from "@/components";
import { achievementsColumns } from "./ui/AchievementsColumns";

export default async function AchievementsPage() {
  const achievements = await getAllAchievements();

  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Achievements</h1>
      </div>
      <div
        className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm" 
        x-chunk="dashboard-02-chunk-1"
      >
        <DataTable 
          columns={achievementsColumns} 
          data={achievements}
          filter={"title"}
        />
      </div>
    </>
  );
}