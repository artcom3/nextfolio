"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { generateContent } from "@/actions/gemini/generate-content";
import generatePortfolio from "@/actions/dashboard/generate-portfolio/generate-portfolio";

const formSchema = z.object({
  resume: z.string().min(1, { message: "Copy and paste your resume" }),
});

export function MediaForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      resume: "",

    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const toastId = toast.loading('Generating Protfolio Content...');
    
    try {
      const dataGenerated = await generateContent({resumeText: values.resume});
      // const dataGenerated = {}
      // console.log("Data Generated:", dataGenerated);
      await generatePortfolio(dataGenerated);
      toast.dismiss(toastId);
      toast.success('Portfolio Content Generated Successfully!');
      console.log("Form values:", values);
    } catch (error) {
      toast.dismiss(toastId);
      toast.error('Failed to generate Portfolio Content');
    }
    // Handle form submission logic here
    
  };

  return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="resume"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resume Text</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Copy and paste your resume" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit">
            Generate Portfolio
          </Button>
        </form>
      </Form>
  );
}