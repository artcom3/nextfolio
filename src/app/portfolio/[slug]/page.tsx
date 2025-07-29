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
  params: Promise<{ slug: string }>;
}

// Transform date strings to Date objects recursively
function transformDates(obj: any): any {
  if (obj === null || obj === undefined) {
    return obj;
  }
  
  if (Array.isArray(obj)) {
    return obj.map(transformDates);
  }
  
  if (typeof obj === 'object') {
    const transformed: any = {};
    for (const [key, value] of Object.entries(obj)) {
      // Transform known date fields
      if (key.endsWith('At') || key.endsWith('Date') || key === 'date') {
        transformed[key] = value ? new Date(value as string) : value;
      } else {
        transformed[key] = transformDates(value);
      }
    }
    return transformed;
  }
  
  return obj;
}

async function fetchPortfolioData(slug: string): Promise<PortfolioData> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/portfolio/${slug}`, {
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

    // Transform date strings to Date objects
    return transformDates(result.data);
  } catch (error) {
    console.error('Error fetching portfolio data:', error);
    throw error; // Re-throw the error so it can be handled by the calling code
  }
}

export default async function Portfolio(props: PortfolioProps) {
  const params = await props.params;
  const slug = params.slug;

  if (!slug) {
    redirect("/");
  }

  const portfolioData = await fetchPortfolioData(slug);

  console.log('Fetched portfolio data:', portfolioData);

  return (
    <ThemeProvider>
      <main className="min-h-screen">
        <Navigation data={portfolioData} />
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
