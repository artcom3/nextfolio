import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BasicInfoForm } from "./ui/BasicInfoForm";
import { AdditionalDetailsForm } from "./ui/AdditionalDetailsForm";
import { LanguagesForm } from "./ui/LanguagesForm";
import { SocialMediaForm } from "./ui/SocialMediaForm";
import { SkillsManagementForm } from "./ui/SkillsManagementForm";
import { ProfileImageUpload } from "./ui/ProfileImageUpload";
import { getUserSkills } from "@/actions/dashboard/skills/get-skills";
import { getUserProfile } from "@/actions/dashboard/profile/get-profile";
import { auth } from "@/auth";

export default async function ProfilePage() {
  const session = await auth();
  const userSkills = await getUserSkills();
  const userProfile = await getUserProfile();
  
  if (!session?.user?.id) {
    return <div>Unauthorized</div>;
  }

  return (
    <div className="space-y-6">
      <ProfileImageUpload 
        userId={session.user.id} 
        initialImageUrl={userProfile?.profilePicture} 
      />
      
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>Your primary profile details</CardDescription>
        </CardHeader>
        <CardContent>
          <BasicInfoForm/>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Additional Details</CardTitle>
          <CardDescription>More about you</CardDescription>
        </CardHeader>
        <CardContent>
          <AdditionalDetailsForm />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Languages</CardTitle>
          <CardDescription>Languages you speak</CardDescription>
        </CardHeader>
        <CardContent>
          <LanguagesForm />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Skills</CardTitle>
          <CardDescription>Manage your technical and professional skills</CardDescription>
        </CardHeader>
        <CardContent>
          <SkillsManagementForm initialSkills={userSkills} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Social Media</CardTitle>
          <CardDescription>Your professional social media links</CardDescription>
        </CardHeader>
        <CardContent>
          <SocialMediaForm />
        </CardContent>
      </Card>
    </div>
  );
}