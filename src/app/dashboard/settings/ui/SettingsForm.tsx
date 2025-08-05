"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProfileInterface } from "@/interfaces/dashboard/profile-interface";
import { updateSlug } from "@/actions/dashboard/profile/update-profile";
import { toast } from "sonner";
import { ExternalLink, Copy, Check } from "lucide-react";

interface SettingsFormProps {
  profile: ProfileInterface | null;
}

export default function SettingsForm({ profile }: SettingsFormProps) {
  const [slug, setSlug] = useState(profile?.slug || "");
  const [isPending, startTransition] = useTransition();
  const [copied, setCopied] = useState(false);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://yoursite.com";
  const portfolioUrl = slug ? `${baseUrl}/portfolio/${slug}` : `${baseUrl}/portfolio/${profile?.userId || "your-id"}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    startTransition(async () => {
      const result = await updateSlug(slug);
      
      if (result.success) {
        toast.success("Portfolio URL updated successfully!");
      } else {
        toast.error(result.error || "Failed to update portfolio URL");
      }
    });
  };

  const validateSlug = (value: string) => {
    if (!value) return true; // Empty is allowed
    
    const slugRegex = /^[a-zA-Z0-9_-]+$/;
    if (!slugRegex.test(value)) {
      return "Slug can only contain letters, numbers, hyphens, and underscores";
    }
    
    if (value.length < 3 || value.length > 50) {
      return "Slug must be between 3 and 50 characters";
    }
    
    return true;
  };

  const handleSlugChange = (value: string) => {
    // Convert to lowercase and replace spaces with hyphens
    const cleanSlug = value.toLowerCase().replace(/\s+/g, '-');
    setSlug(cleanSlug);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(portfolioUrl);
      setCopied(true);
      toast.success("URL copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy URL");
    }
  };

  const validation = validateSlug(slug);
  const isValid = validation === true;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="slug">Custom Slug</Label>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {baseUrl}/portfolio/
          </span>
          <Input
            id="slug"
            value={slug}
            onChange={(e) => handleSlugChange(e.target.value)}
            placeholder="your-name"
            className="flex-1"
            disabled={isPending}
          />
        </div>
        {typeof validation === "string" && (
          <p className="text-sm text-red-600 dark:text-red-400">{validation}</p>
        )}
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Leave empty to use your user ID as the portfolio URL.
        </p>
      </div>

      <div className="space-y-2">
        <Label>Portfolio URL Preview</Label>
        <div className="flex items-center space-x-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
          <span className="text-sm font-mono flex-1 truncate">{portfolioUrl}</span>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={copyToClipboard}
            className="h-8 w-8 p-0"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-600" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => window.open(portfolioUrl, '_blank')}
            className="h-8 w-8 p-0"
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex justify-end">
        <Button 
          type="submit" 
          disabled={isPending || !isValid}
          className="min-w-[120px]"
        >
          {isPending ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
} 