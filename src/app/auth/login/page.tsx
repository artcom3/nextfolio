import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LoginForm } from "./ui/LoginForm"
import { AuthHeader, BackgroundImage } from "@/components"
import SignInGoogle from "@/components/auth/SignInGoogle"

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <AuthHeader />
      <div className="flex flex-1">
        <BackgroundImage 
          backgroundImage="/imgs/pexels-blooddrainer-218820.jpg" 
          quote="“Strive not to be a success, but rather to be of value.”"
          quoteAuthor="Albert Einstein"
        />
        <div className="flex-1 flex items-center justify-center p-8">
          <LoginForm />
          <SignInGoogle />
        </div>
      </div>
      <div className="absolute top-0 right-0 p-4">
        <Button variant="ghost" asChild>
          <Link href="/auth/register">Create Account</Link>
        </Button>
      </div>
    </div>
  )
}