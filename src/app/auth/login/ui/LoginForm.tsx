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
import { login } from "@/actions"

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Invalid password" }),
})

export function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  })

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { email, password } = values;
    const authResponse = await login(email, password);
    if (authResponse === "Success") {
      window.location.replace('/dashboard');
    } else {
      form.setError("root", { 
        type: "manual", message: "Login failed" 
      });
    }
  }

  return (
    <div className="w-full max-w-[400px] space-y-8">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Log In</h1>
        <p className="text-gray-500">Access your account and continue with your projects</p>
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
                    <Input placeholder="Your password" type="password" {...field}/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
          </div>
          <Button 
            className="w-full" 
            type="submit"
            disabled={ isSubmitting }
            >
            { !isSubmitting ? ("Log In") : ("Logging In...") }
          </Button> 
          { 
            form.formState.errors.root && 
              ( 
                <FormMessage className="text-center">
                  { form.formState.errors.root.message }
                </FormMessage> 
              ) 
          }
        </form>
      </Form>
      <p className="text-sm text-center text-gray-500">
        Don’t have an account?{" "}
        <Link href="/auth/register" className="underline text-primary">
          Register here
        </Link>
      </p>
    </div>
  )
}