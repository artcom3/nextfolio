import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MediaForm } from "./ui/MediaForm";


export default function MediaPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Generate Portfolio from Resume Text</CardTitle>
          <CardDescription>Copy and Paste your portfolio here</CardDescription>
        </CardHeader>
        <CardContent>
          <MediaForm/>
        </CardContent>
      </Card>
    </div>
  );
}