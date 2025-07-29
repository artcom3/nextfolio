import Link from "next/link"
import { ThemeProvider } from "./_lib/theme-context"

export default function NotFound() {
  return (
    <ThemeProvider>
      <main className="min-h-screen bg-background">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center space-y-6 max-w-md mx-auto px-4">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-foreground">404</h1>
              <h2 className="text-xl font-semibold text-foreground">Portfolio Not Found</h2>
              <p className="text-muted-foreground">
                The portfolio you&apos;re looking for doesn&apos;t exist or has been moved.
              </p>
            </div>
            <div className="space-y-3">
              <Link 
                href="/"
                className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Go Home
              </Link>
            </div>
          </div>
        </div>
      </main>
    </ThemeProvider>
  )
}
