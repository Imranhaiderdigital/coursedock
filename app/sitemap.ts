import { MetadataRoute } from "next";
import { getCourses, getCreators, getCategories, getCollections } from "@/lib/contentLoader";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://coursedock.online";
  
  // Static pages
  const routes = ["", "/courses", "/categories", "/creators", "/collections"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Dynamic Courses
  const courses = getCourses().map((course) => ({
    url: `${baseUrl}/courses/${course.slug}`,
    lastModified: new Date(course.updatedDate).toISOString(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Dynamic Creators
  const creators = getCreators().map((creator) => ({
    url: `${baseUrl}/creators/${creator.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Dynamic Categories
  const categories = getCategories().map((cat) => ({
    url: `${baseUrl}/categories/${cat.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Dynamic Collections
  const collections = getCollections().map((coll) => ({
    url: `${baseUrl}/collections/${coll.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...routes, ...courses, ...creators, ...categories, ...collections];
}
