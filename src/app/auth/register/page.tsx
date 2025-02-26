import Link from "next/link"
import { Button } from "@/components/ui/button"
import { RegisterForm } from "./ui/RegisterForm"
import { AuthHeader, BackgroundImage } from "@/components"

export default function RegisterPage() {
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
          <RegisterForm />
        </div>
      </div>
      <div className="absolute top-0 right-0 p-4">
        <Button variant="ghost" asChild>
          <Link href="/auth/login">Log In</Link>
        </Button>
      </div>
    </div>
  )
}