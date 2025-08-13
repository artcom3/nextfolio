"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2, Plus } from "lucide-react";
import { getUserLanguages } from "@/actions/dashboard/profile/get-profile";
import { updateLanguages } from "@/actions/dashboard/profile/update-profile";


type Language = {
  id?: number;
  name: string;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'NATIVE';
};

export function LanguagesForm() {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const userLanguages = await getUserLanguages();
        setLanguages(userLanguages.map(lang => ({
          id: lang.id,
          name: lang.name,
          level: lang.level,
        })));
      } catch (error) {
        console.error("Error fetching languages:", error);
        toast.error("Failed to load languages");
      } finally {
        setInitialLoading(false);
      }
    };

    fetchLanguages();
  }, []);

  const addLanguage = () => {
    setLanguages([...languages, { name: "", level: "INTERMEDIATE" }]);
  };

  const removeLanguage = (index: number) => {
    setLanguages(languages.filter((_, i) => i !== index));
  };

  const updateLanguage = (index: number, field: keyof Language, value: string) => {
    const updated = [...languages];
    if (field === 'level') {
      updated[index][field] = value as Language['level'];
    } else if (field === 'name') {
      updated[index][field] = value;
    }
    setLanguages(updated);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Filter out empty languages
      const validLanguages = languages.filter(lang => lang.name.trim() !== "");
      await updateLanguages(validLanguages);
      toast.success("Languages updated successfully!");
    } catch (error) {
      console.error("Error updating languages:", error);
      toast.error("Failed to update languages");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return <div className="flex items-center justify-center p-8">Loading languages...</div>;
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {languages.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center text-sm text-muted-foreground">
            No languages added yet. Click &ldquo;Add Language&rdquo; to get started.
          </CardContent>
        </Card>
      ) : (
        languages.map((language, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-5 space-y-2">
              <Label htmlFor={`language-${index}`}>Language</Label>
              <Input
                id={`language-${index}`}
                value={language.name}
                onChange={(e) => updateLanguage(index, 'name', e.target.value)}
                placeholder="Language (e.g., English)"
              />
            </div>
            <div className="md:col-span-5 space-y-2">
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
                  <SelectItem value="ADVANCED">Advanced</SelectItem>
                  <SelectItem value="INTERMEDIATE">Intermediate</SelectItem>
                  <SelectItem value="BEGINNER">Beginner</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2 flex items-end">
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => removeLanguage(index)}
                aria-label={`Remove language ${index + 1}`}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))
      )}

      <div className="flex flex-wrap gap-2">
        <Button type="button" variant="outline" onClick={addLanguage}>
          <Plus className="h-4 w-4 mr-2" />
          Add Language
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Languages"}
        </Button>
      </div>
    </form>
  );
} 