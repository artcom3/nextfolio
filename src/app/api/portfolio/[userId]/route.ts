import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// This is the type for the successful response
export type PortfolioApiResponse = {
  success: true;
  data: {
    user: {
      id: string;
      name: string | null;
      email: string | null;
      bio: string | null;
      profileImage: string | null;
      createdAt: Date;
      updatedAt: Date;
    };
    profile: {
      id: string;
      fullName: string | null;
      professionalTitle: string | null;
      bio: string | null;
      location: string | null;
      pronouns: string | null;
      funFact: string | null;
      motto: string | null;
      profilePicture: string | null;
      phoneNumber: string | null;
      socials: Record<string, string> | null;
      createdAt: Date;
      updatedAt: Date;
      languages: Array<{
        id: string;
        name: string;
        level: string;
        createdAt: Date;
        updatedAt: Date;
      }>;
    } | null;
    languages: Array<{
      id: string;
      name: string;
      level: string;
      createdAt: Date;
      updatedAt: Date;
    }>;
    skills: Array<{
      id: string;
      name: string;
      category: string;
      createdAt: Date;
      updatedAt: Date;
    }>;
    projects: Array<{
      id: string;
      title: string;
      category: string | null;
      description: string | null;
      link: string | null;
      status: string;
      createdAt: Date;
      updatedAt: Date;
      images: Array<{
        id: string;
        url: string;
        caption: string | null;
        createdAt: Date;
        updatedAt: Date;
      }>;
      projectTools: Array<{
        skill: {
          id: string;
          name: string;
          category: string;
        };
      }>;
      tools: Array<{
        id: string;
        name: string;
        category: string;
      }>;
    }>;
    experiences: Array<{
      id: string;
      role: string;
      company: string;
      startDate: Date;
      endDate: Date | null;
      description: string | null;
      createdAt: Date;
      updatedAt: Date;
    }>;
    educations: Array<{
      id: string;
      type: string;
      degree: string;
      institution: string;
      startDate: Date;
      endDate: Date | null;
      description: string | null;
      createdAt: Date;
      updatedAt: Date;
    }>;
    achievements: Array<{
      id: string;
      title: string;
      description: string | null;
      date: Date;
      link: string | null;
      createdAt: Date;
      updatedAt: Date;
    }>;
    testimonials: Array<{
      id: string;
      fromName: string;
      fromRole: string | null;
      relationship: string | null;
      message: string;
      rating: number | null;
      createdAt: Date;
      updatedAt: Date;
    }>;
    profileSummary: {
      id: string;
      summary: string;
      updatedAt: Date;
    } | null;
    metadata: {
      totalSkills: number;
      totalProjects: number;
      totalExperiences: number;
      totalEducations: number;
      totalAchievements: number;
      totalTestimonials: number;
      hasProfilePicture: boolean;
      hasContactInfo: boolean;
      hasProfile: boolean;
      hasSummary: boolean;
      lastUpdated: Date;
      skillsByCategory: Record<string, Array<{
        id: string;
        name: string;
        category: string;
        createdAt: Date;
        updatedAt: Date;
      }>>;
      projectsByStatus: Record<string, Array<{
        id: string;
        title: string;
        category: string | null;
        description: string | null;
        link: string | null;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        images: Array<{
          id: string;
          url: string;
          caption: string | null;
          createdAt: Date;
          updatedAt: Date;
        }>;
        projectTools: Array<{
          skill: {
            id: string;
            name: string;
            category: string;
          };
        }>;
        tools: Array<{
          id: string;
          name: string;
          category: string;
        }>;
      }>>;
    };
  };
};

// This is the type for error responses
export type PortfolioApiErrorResponse = {
  success: false;
  error: string;
  message?: string;
};

// URL validation and sanitization utilities
function isValidUserId(userId: string): boolean {
  // Check if userId is a valid format (adjust based on your ID format)
  // For UUIDs: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  // For cuid: /^c[a-z0-9]{24}$/
  // For simple alphanumeric: /^[a-zA-Z0-9_-]+$/
  
  // Basic validation - adjust regex based on your ID format
  const userIdRegex = /^[a-zA-Z0-9_-]{1,50}$/;
  return userIdRegex.test(userId);
}

function sanitizeUserId(userId: string): string {
  // Remove any potentially harmful characters
  return userId.replace(/[^a-zA-Z0-9_-]/g, '').substring(0, 50);
}

function validateUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId: rawUserId } = await params;

    if (!rawUserId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Validate and sanitize the userId
    if (!isValidUserId(rawUserId)) {
      return NextResponse.json(
        { error: 'Invalid user ID format' },
        { status: 400 }
      );
    }

    const userId = sanitizeUserId(rawUserId);    // Extract query parameters for future functionality
    // const { searchParams } = new URL(request.url);
    // Future: Add support for includePrivate, format, fields, etc.
    // const includePrivate = searchParams.get('includePrivate') === 'true';
    // const format = searchParams.get('format') || 'json';
    
    // Fetch complete portfolio data with all relations
    const portfolio = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        bio: true,
        profileImage: true,
        createdAt: true,
        updatedAt: true,
        
        // Profile information with languages
        profile: {
          select: {
            id: true,
            fullName: true,
            professionalTitle: true,
            bio: true,
            location: true,
            pronouns: true,
            funFact: true,
            motto: true,
            profilePicture: true,
            phoneNumber: true,
            socials: true,
            createdAt: true,
            updatedAt: true,
            
            // Languages through profile relation
            languages: {
              select: {
                id: true,
                name: true,
                level: true,
                createdAt: true,
                updatedAt: true,
              },
              orderBy: {
                name: 'asc'
              }
            }
          }
        },
        
        // Direct user languages (if any exist)
        languages: {
          select: {
            id: true,
            name: true,
            level: true,
            createdAt: true,
            updatedAt: true,
          },
          orderBy: {
            name: 'asc'
          }
        },
        
        // Skills with user skill relationships
        skills: {
          select: {
            skill: {
              select: {
                id: true,
                name: true,
                category: true,
                createdAt: true,
                updatedAt: true,
              }
            }
          },
          orderBy: {
            skill: {
              name: 'asc'
            }
          }
        },
        
        // Projects with images and tools
        projects: {
          select: {
            id: true,
            title: true,
            category: true,
            description: true,
            link: true,
            status: true,
            createdAt: true,
            updatedAt: true,
            
            // Project images
            images: {
              select: {
                id: true,
                url: true,
                caption: true,
                createdAt: true,
                updatedAt: true,
              },
              orderBy: {
                createdAt: 'asc'
              }
            },
            
            // Project tools/skills
            projectTools: {
              select: {
                skill: {
                  select: {
                    id: true,
                    name: true,
                    category: true,
                  }
                }
              },
              orderBy: {
                skill: {
                  name: 'asc'
                }
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          }
        },
        
        // Work experience
        experiences: {
          select: {
            id: true,
            role: true,
            company: true,
            startDate: true,
            endDate: true,
            description: true,
            createdAt: true,
            updatedAt: true,
          },
          orderBy: {
            startDate: 'desc'
          }
        },
        
        // Education
        educations: {
          select: {
            id: true,
            type: true,
            degree: true,
            institution: true,
            startDate: true,
            endDate: true,
            description: true,
            createdAt: true,
            updatedAt: true,
          },
          orderBy: {
            startDate: 'desc'
          }
        },
        
        // Achievements
        achievements: {
          select: {
            id: true,
            title: true,
            description: true,
            date: true,
            link: true,
            createdAt: true,
            updatedAt: true,
          },
          orderBy: {
            date: 'desc'
          }
        },
        
        // Testimonials
        testimonials: {
          select: {
            id: true,
            fromName: true,
            fromRole: true,
            relationship: true,
            message: true,
            rating: true,
            createdAt: true,
            updatedAt: true,
          },
          orderBy: {
            createdAt: 'desc'
          }
        },
        
        // Profile summary (AI-generated summary if exists)
        profileSummary: {
          select: {
            id: true,
            summary: true,
            updatedAt: true,
          }
        }
      }
    });

    if (!portfolio) {
      return NextResponse.json(
        { error: 'Portfolio not found' },
        { status: 404 }
      );
    }

    // Transform and structure the data for better consumption
    const transformedPortfolio = {
      // Basic user information
      user: {
        id: portfolio.id,
        name: portfolio.name,
        email: portfolio.email,
        bio: portfolio.bio,
        profileImage: portfolio.profileImage,
        createdAt: portfolio.createdAt,
        updatedAt: portfolio.updatedAt,
      },
      
      // Profile details
      profile: portfolio.profile ? {
        ...portfolio.profile,
        // Parse socials JSON safely and validate URLs
        socials: portfolio.profile.socials ? 
          (typeof portfolio.profile.socials === 'string' ? 
            (() => {
              try {
                const parsed = JSON.parse(portfolio.profile.socials);
                // Validate URLs in socials object
                if (typeof parsed === 'object' && parsed !== null) {
                  const validatedSocials: Record<string, string> = {};
                  for (const [key, value] of Object.entries(parsed)) {
                    if (typeof value === 'string' && validateUrl(value)) {
                      validatedSocials[key] = value;
                    }
                  }
                  return validatedSocials;
                }
                return parsed;
              } catch {
                return portfolio.profile.socials;
              }
            })() : 
            portfolio.profile.socials
          ) : null
      } : null,
      
      // Combine languages from both profile and direct user relationships
      languages: [
        ...(portfolio.profile?.languages || []),
        ...(portfolio.languages || [])
      ].filter((lang, index, self) => 
        index === self.findIndex(l => l.name === lang.name)
      ),
      
      // Transform skills to flatten the structure
      skills: portfolio.skills.map(userSkill => ({
        id: userSkill.skill.id,
        name: userSkill.skill.name,
        category: userSkill.skill.category,
        createdAt: userSkill.skill.createdAt,
        updatedAt: userSkill.skill.updatedAt,
      })),
      
      // Transform projects with flattened tools
      projects: portfolio.projects.map(project => ({
        ...project,
        tools: project.projectTools.map(pt => pt.skill)
      })),
      
      // Direct mapping for other relations
      experiences: portfolio.experiences,
      educations: portfolio.educations,
      achievements: portfolio.achievements,
      testimonials: portfolio.testimonials,
      profileSummary: portfolio.profileSummary,
      
      // Add useful metadata for frontend consumption
      metadata: {
        totalSkills: portfolio.skills.length,
        totalProjects: portfolio.projects.length,
        totalExperiences: portfolio.experiences.length,
        totalEducations: portfolio.educations.length,
        totalAchievements: portfolio.achievements.length,
        totalTestimonials: portfolio.testimonials.length,
        hasProfilePicture: !!(portfolio.profile?.profilePicture || portfolio.profileImage),
        hasContactInfo: !!(portfolio.profile?.phoneNumber || portfolio.profile?.socials),
        hasProfile: !!portfolio.profile,
        hasSummary: !!portfolio.profileSummary,
        lastUpdated: new Date(Math.max(
          ...[
            portfolio.updatedAt,
            portfolio.profile?.updatedAt,
            ...portfolio.projects.map(p => p.updatedAt),
            ...portfolio.experiences.map(e => e.updatedAt),
            ...portfolio.educations.map(e => e.updatedAt),
            ...portfolio.achievements.map(a => a.updatedAt),
            ...portfolio.testimonials.map(t => t.updatedAt),
            ...(portfolio.profileSummary?.updatedAt ? [portfolio.profileSummary.updatedAt] : []),
          ].filter(Boolean).map(date => new Date(date as Date).getTime())
        )),
        // Skills breakdown by category
        skillsByCategory: portfolio.skills.reduce((acc, userSkill) => {
          const category = userSkill.skill.category;
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(userSkill.skill);
          return acc;
        }, {} as Record<string, Array<typeof portfolio.skills[0]['skill']>>),
        // Projects breakdown by status
        projectsByStatus: portfolio.projects.reduce((acc, project) => {
          const status = project.status;
          if (!acc[status]) {
            acc[status] = [];
          }
          acc[status].push(project);
          return acc;
        }, {} as Record<string, Array<typeof portfolio.projects[0]>>),
      }
    };

    // Add CORS headers for public access
    const response = NextResponse.json({
      success: true,
      data: transformedPortfolio
    });

    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');

    return response;

  } catch (error) {
    console.error('Error fetching portfolio:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Internal server error',
        message: 'Failed to fetch portfolio data'
      },
      { status: 500 }
    );
  }
}

// Handle preflight requests for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}