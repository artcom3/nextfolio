import { ThemeProvider } from "./_lib/theme-context"

export default function Loading() {
  return (
    <ThemeProvider>
      <main className="min-h-screen bg-background">
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="text-lg text-muted-foreground">Loading portfolio...</p>
          </div>
        </div>
      </main>
    </ThemeProvider>
  )
}
