import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getUserProfile } from "@/actions/dashboard/profile/get-profile";
import SettingsForm from "./ui/SettingsForm";

export default async function SettingsPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/auth/login");
  }

  const profile = await getUserProfile();

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage your account settings and portfolio configuration.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Portfolio URL
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Customize your portfolio URL slug. This will be used to access your public portfolio.
          </p>
          
          <SettingsForm profile={profile} />
        </div>
      </div>
    </div>
  );
} 