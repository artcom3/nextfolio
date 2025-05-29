import { ThemeProvider } from "./_lib/theme-context"
import Navigation from "./_components/navigation"
import HeroSection from "./_components/hero-section"
import AboutSection from "./_components/about-section"
import SkillsSection from "./_components/skills-section"
import ProjectsSection from "./_components/projects-section"
import ExperienceSection from "./_components/experience-section"
import TestimonialsSection from "./_components/testimonials-section"
import ContactSection from "./_components/contact-section"
import Footer from "./_components/footer"
import { redirect, notFound } from "next/navigation"
import { PortfolioData } from "./_lib/types"

interface PortfolioProps {
  params: Promise<{ userId: string }>;
}

async function fetchPortfolioData(userId: string): Promise<PortfolioData> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/portfolio/${userId}`, {
      cache: 'no-store', // Ensure fresh data
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        notFound();
      }
      throw new Error(`Failed to fetch portfolio data: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to fetch portfolio data');
    }

    return result.data;
  } catch (error) {
    console.error('Error fetching portfolio data:', error);
    throw error;
  }
}

export default async function Portfolio(props: PortfolioProps) {
  const params = await props.params;
  const userId = params.userId;

  if (!userId) {
    redirect("/");
  }

  const portfolioData = await fetchPortfolioData(userId);

  console.log('Fetched portfolio data:', portfolioData);

  return (
    <ThemeProvider>
      <main className="min-h-screen">
        <Navigation />
        <HeroSection data={portfolioData} />
        <AboutSection data={portfolioData} />
        <SkillsSection data={portfolioData} />
        <ProjectsSection data={portfolioData} />
        <ExperienceSection data={portfolioData} />
        <TestimonialsSection data={portfolioData} />
        <ContactSection data={portfolioData} />
        <Footer data={portfolioData} />
      </main>
    </ThemeProvider>
  )
}
