"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { login, registerUser } from "@/actions"

const formSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .toLowerCase()
    .trim(),
  password: z
    .string()
    .min(8, { message: "Must be at least 8 characters long." })
    .regex(/[a-zA-Z]/, { message: 'Must contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Must contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Must contain at least one special character.',
    })
    .trim()
})

export function RegisterForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { email, password } = values;

    console.log(values)
    // Call server action
    const response = await registerUser(email, password);

    if (!response.ok) {
      form.setError("root", { 
        type: "manual", message: response.message 
      });
      return;
    }

    await login(email, password);
    window.location.replace('/dashboard');
  }

  const RegisterButton = () => {
    const { isSubmitting } = form.formState
    return (
      <Button 
        className="w-full" 
        type="submit"
        disabled={ isSubmitting }
      >
        { !isSubmitting ? ("Create Account") : ("Creating Account...") }
      </Button> 
    )
  }

  return (
    <div className="w-full max-w-[400px] space-y-8">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Create Your Account</h1>
        <p className="text-gray-500">Join our community and take your projects to the next level</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="your.name@example.com" {...field}/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="At least 8 characters" type="password" {...field}/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
          </div>
          <RegisterButton/>
        </form>
      </Form>
      <p className="text-sm text-center text-gray-500">
        By creating an account, you agree to our{" "}
        <Link href="#" className="underline text-primary">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="#" className="underline text-primary">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  )
}
