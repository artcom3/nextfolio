"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getUserProfile } from "@/actions/dashboard/profile/get-profile";
import { updateAdditionalDetails } from "@/actions/dashboard/profile/update-profile";

const formSchema = z.object({
  funFact: z.string().optional(),
  motto: z.string().optional(),
  profilePicture: z.string().url().optional().or(z.literal("")),
  phoneNumber: z.string().optional(),
});

export function AdditionalDetailsForm() {
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      funFact: "",
      motto: "",
      profilePicture: "",
      phoneNumber: "",
    },
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getUserProfile();
        if (profile) {
          form.reset({
            funFact: profile.funFact || "",
            motto: profile.motto || "",
            profilePicture: profile.profilePicture || "",
            phoneNumber: profile.phoneNumber || "",
          });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("Failed to load additional details");
      } finally {
        setInitialLoading(false);
      }
    };

    fetchProfile();
  }, [form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      await updateAdditionalDetails({
        funFact: values.funFact || undefined,
        motto: values.motto || undefined,
        profilePicture: values.profilePicture || undefined,
        phoneNumber: values.phoneNumber || undefined,
      });
      toast.success("Additional details updated successfully!");
    } catch (error) {
      console.error("Error updating additional details:", error);
      toast.error("Failed to update additional details");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return <div className="flex items-center justify-center p-8">Loading additional details...</div>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="funFact"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fun Fact</FormLabel>
              <FormControl>
                <Input placeholder="I built a robot that solves Rubik's cubes." {...field} />
              </FormControl>
            <FormDescription>Something memorable about you (optional)</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="motto"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Motto</FormLabel>
              <FormControl>
                <Input placeholder="Code with purpose." {...field} />
              </FormControl>
            <FormDescription>Your personal tagline (optional)</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="profilePicture"
          render={({ field }) => (
          <FormItem>
            <FormLabel>Profile Picture URL</FormLabel>
            <FormControl>
              <Input placeholder="https://example.com/profile_picture.jpg" {...field} />
            </FormControl>
            <FormDescription>Optional fallback URL; prefer uploading in the Profile Picture card</FormDescription>
            <FormMessage />
          </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="+1-385-461-5172" {...field} />
              </FormControl>
            <FormDescription>Shown on your portfolio contact section (optional)</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Additional Details"}
          </Button>
        </div>
      </form>
    </Form>
  );
} 