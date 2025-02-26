import {
  BarChart,
  User,
  Code,
  Layers,
  Briefcase,
  BookOpen,
  MessagesSquare,
  Award,
  PieChart,
  Map,
  Settings2,
} from "lucide-react";

export const sidebarData = {
  navMain: [
    {
      section: "Main",
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: BarChart,
        },
      ],
    },
    {
      section: "Profile",
      items: [
        {
          title: "Profile Management",
          url: "/dashboard/profile",
          icon: User,
        },
        {
          title: "Skills",
          url: "/dashboard/skills",
          icon: Code,
        },
        {
          title: "Achievements",
          url: "/dashboard/achievements",
          icon: Award,
        },
      ],
    },
    {
      section: "Portfolio",
      items: [
        {
          title: "Projects",
          url: "/dashboard/projects",
          icon: Layers,
        },
        {
          title: "Work Experience",
          url: "/dashboard/experience",
          icon: Briefcase,
        },
        {
          title: "Education",
          url: "/dashboard/education",
          icon: BookOpen,
        },
        {
          title: "Testimonials",
          url: "/dashboard/testimonials",
          icon: MessagesSquare,
        },
      ],
    },
    {
      section: "Insights",
      items: [
        {
          title: "Analytics",
          url: "/dashboard/analytics",
          icon: PieChart,
        },
        {
          title: "Media & Portfolio",
          url: "/dashboard/media",
          icon: Map,
        },
      ],
    },
    {
      section: "Settings",
      items: [
        {
          title: "Settings",
          url: "/dashboard/settings",
          icon: Settings2,
        },
      ],
    },
  ],
};