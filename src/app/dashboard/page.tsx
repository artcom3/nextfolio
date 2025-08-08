
import { getDashboardSummary } from "@/actions/dashboard/get-dashboard-summary";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Trophy, 
  Code, 
  FolderOpen,
  ExternalLink,
  TrendingUp,
  Calendar,
  MapPin,
  LucideIcon
} from "lucide-react";

export default async function DashboardPage() {
  const summary = await getDashboardSummary();

  const StatCard = ({ 
    title, 
    value, 
    description, 
    icon: Icon, 
    href 
  }: { 
    title: string; 
    value: number; 
    description: string; 
    icon: LucideIcon; 
    href: string;
  }) => (
    <Link href={href}>
      <Card className="hover:shadow-md transition-shadow cursor-pointer">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
          <p className="text-xs text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back, {summary.profile.fullName.split(' ')[0]}!
          </h1>
          <p className="text-muted-foreground">
            Here&apos;s an overview of your portfolio
          </p>
        </div>
        {summary.portfolioUrl && (
          <Button asChild>
            <Link href={summary.portfolioUrl} target="_blank">
              <ExternalLink className="h-4 w-4 mr-2" />
              View Portfolio
            </Link>
          </Button>
        )}
      </div>

      {/* Profile Completion */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Profile Completion
          </CardTitle>
          <CardDescription>
            Complete your profile to make a better impression
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex justify-between text-sm mb-2">
                <span>Progress</span>
                <span>{summary.profile.completionPercentage}%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${summary.profile.completionPercentage}%` }}
                />
              </div>
            </div>
            <Button asChild size="sm" className="ml-4">
              <Link href="/dashboard/profile">
                Complete Profile
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <StatCard
          title="Projects"
          value={summary.stats.totalProjects}
          description="Total projects created"
          icon={FolderOpen}
          href="/dashboard/projects"
        />
        <StatCard
          title="Skills"
          value={summary.stats.totalSkills}
          description="Skills in your toolkit"
          icon={Code}
          href="/dashboard/skills"
        />
        <StatCard
          title="Experience"
          value={summary.stats.totalExperiences}
          description="Work experiences"
          icon={Briefcase}
          href="/dashboard/experience"
        />
        <StatCard
          title="Education"
          value={summary.stats.totalEducations}
          description="Educational background"
          icon={GraduationCap}
          href="/dashboard/education"
        />
        <StatCard
          title="Achievements"
          value={summary.stats.totalAchievements}
          description="Accomplishments earned"
          icon={Trophy}
          href="/dashboard/achievements"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Activities */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Recent Activity
          </h2>
          
          {/* Recent Projects */}
          {summary.recentActivities.recentProjects.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Latest Projects</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {summary.recentActivities.recentProjects.map((project) => (
                  <div key={project.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{project.title}</p>
                      <p className="text-sm text-muted-foreground">{project.category}</p>
                    </div>
                    <Badge variant="outline">
                      {new Date(project.updatedAt).toLocaleDateString()}
                    </Badge>
                  </div>
                ))}
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link href="/dashboard/projects">View All Projects</Link>
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Recent Experience */}
          {summary.recentActivities.recentExperiences.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Recent Experience</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {summary.recentActivities.recentExperiences.map((exp) => (
                  <div key={exp.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{exp.role}</p>
                      <p className="text-sm text-muted-foreground">{exp.company}</p>
                    </div>
                    <Badge variant="outline">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(exp.startDate).getFullYear()}
                    </Badge>
                  </div>
                ))}
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link href="/dashboard/experience">View All Experience</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Skills by Category */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Code className="h-5 w-5" />
            Skills Overview
          </h2>
          
          {summary.skillsByCategory.length > 0 ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Skills by Category</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {summary.skillsByCategory.map((category) => (
                  <div key={category.category} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{category.category.replace(/_/g, ' ')}</h3>
                      <Badge variant="secondary">{category.count}</Badge>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {category.skills.slice(0, 5).map((skill) => (
                        <Badge key={skill.id} variant="outline" className="text-xs">
                          {skill.name}
                        </Badge>
                      ))}
                      {category.skills.length > 5 && (
                        <Badge variant="outline" className="text-xs">
                          +{category.skills.length - 5} more
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link href="/dashboard/skills">Manage Skills</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <Code className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-medium mb-2">No skills added yet</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Add your skills to showcase your expertise
                  </p>
                  <Button asChild size="sm">
                    <Link href="/dashboard/profile">Add Skills</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recent Education */}
          {summary.recentActivities.recentEducations.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Education</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {summary.recentActivities.recentEducations.map((edu) => (
                  <div key={edu.id} className="space-y-1">
                    <p className="font-medium">{edu.degree}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {edu.institution}
                    </p>
                    <Badge variant="outline">
                      {edu.type.replace(/_/g, ' ')}
                    </Badge>
                  </div>
                ))}
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link href="/dashboard/education">View All Education</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}