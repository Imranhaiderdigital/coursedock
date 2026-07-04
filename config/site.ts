export const siteConfig = {
  name: "CourseDock",
  description: "Learn Smarter. Build Faster. Grow Without Limits.",
  url: "https://coursedock.online",
  ogImage: "/images/og-image.webp",
  links: {
    github: "https://github.com/coursedock/coursedock",
    twitter: "https://twitter.com/coursedock",
  },
  mainNav: [
    {
      title: "Browse Courses",
      href: "/courses",
    },
    {
      title: "Categories",
      href: "/categories",
    },
    {
      title: "Creators",
      href: "/creators",
    },
    {
      title: "Collections",
      href: "/collections",
    },
  ],
  stats: {
    courses: "1,000+",
    creators: "100+",
    lessons: "5,000+",
    categories: "20+",
  },
};

export type SiteConfig = typeof siteConfig;
