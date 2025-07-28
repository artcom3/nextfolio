import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BasicInfoForm } from "./ui/BasicInfoForm";

export default function ProfilePage() {
  return (
    <div className="space-y-6">
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
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="funFact">Fun Fact</Label>
              <Input id="funFact" placeholder="I built a robot that solves Rubik's cubes." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="motto">Motto</Label>
              <Input id="motto" placeholder="Code with purpose." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="profilePicture">Profile Picture URL</Label>
              <Input id="profilePicture" placeholder="https://example.com/profile_picture.jpg" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input id="phoneNumber" placeholder="+1-385-461-5172" />
            </div>
            <Button>Save Additional Details</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Languages</CardTitle>
          <CardDescription>Languages you speak</CardDescription>
        </CardHeader>
        <CardContent>
          {/* <form className="space-y-4">
            {languages.map((language, index) => (
              <div key={index} className="flex items-end gap-4">
                <div className="flex-1 space-y-2">
                  <Label htmlFor={`language-${index}`}>Language</Label>
                  <Input
                    id={`language-${index}`}
                    value={language.name}
                    onChange={(e) => updateLanguage(index, 'name', e.target.value)}
                    placeholder="Language (e.g., English)"
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <Label htmlFor={`level-${index}`}>Level</Label>
                  <Select
                    onValueChange={(value) => updateLanguage(index, 'level', value)}
                    value={language.level}
                  >
                    <SelectTrigger id={`level-${index}`}>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="NATIVE">Native</SelectItem>
                      <SelectItem value="FLUENT">Fluent</SelectItem>
                      <SelectItem value="ADVANCED">Advanced</SelectItem>
                      <SelectItem value="INTERMEDIATE">Intermediate</SelectItem>
                      <SelectItem value="BEGINNER">Beginner</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="button" variant="destructive" size="icon" onClick={() => removeLanguage(index)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addLanguage}>Add Language</Button>
            <Button>Save Languages</Button>
          </form> */}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Social Media</CardTitle>
          <CardDescription>Your professional social media links</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn URL</Label>
              <Input id="linkedin" placeholder="https://linkedin.com/in/kevinharor" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="github">GitHub URL</Label>
              <Input id="github" placeholder="https://github.com/kevinharor" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="twitter">Twitter URL</Label>
              <Input id="twitter" placeholder="https://twitter.com/kevinharor" />
            </div>
            <Button>Save Social Media Links</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}