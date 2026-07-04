import fs from "fs";
import path from "path";
import { Course, Lesson, Creator, Category, Collection } from "@/types";

const contentDirectory = path.join(process.cwd(), "content");

// Parse simple frontmatter from markdown files
function parseFrontmatter(fileContent: string): { data: Record<string, any>; content: string } {
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
  const match = fileContent.match(frontmatterRegex);
  
  if (!match) {
    return { data: {}, content: fileContent };
  }
  
  const yamlSection = match[1];
  const markdownContent = match[2];
  const data: Record<string, any> = {};
  
  yamlSection.split(/\r?\n/).forEach((line) => {
    const colonIndex = line.indexOf(":");
    if (colonIndex > -1) {
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();
      
      // Strip quotes if present
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      } else if (value.startsWith("'") && value.endsWith("'")) {
        value = value.slice(1, -1);
      }
      
      // Parse basic types
      if (value === "true") {
        data[key] = true;
      } else if (value === "false") {
        data[key] = false;
      } else if (!isNaN(Number(value)) && value !== "") {
        data[key] = Number(value);
      } else {
        data[key] = value;
      }
    }
  });
  
  return { data, content: markdownContent };
}

// ----------------------------------------------------
// Creators
// ----------------------------------------------------
export function getCreators(): Creator[] {
  const creatorsDir = path.join(contentDirectory, "creators");
  if (!fs.existsSync(creatorsDir)) return [];
  
  const files = fs.readdirSync(creatorsDir);
  return files
    .filter((file) => file.endsWith(".json"))
    .map((file) => {
      const filePath = path.join(creatorsDir, file);
      const content = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(content) as Creator;
    });
}

export function getCreatorBySlug(slug: string): Creator | null {
  const creators = getCreators();
  return creators.find((c) => c.slug === slug) || null;
}

// ----------------------------------------------------
// Categories
// ----------------------------------------------------
export function getCategories(): Category[] {
  const categoriesDir = path.join(contentDirectory, "categories");
  if (!fs.existsSync(categoriesDir)) return [];
  
  const files = fs.readdirSync(categoriesDir);
  return files
    .filter((file) => file.endsWith(".json"))
    .map((file) => {
      const filePath = path.join(categoriesDir, file);
      const content = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(content) as Category;
    });
}

export function getCategoryBySlug(slug: string): Category | null {
  const categories = getCategories();
  return categories.find((c) => c.slug === slug) || null;
}

// ----------------------------------------------------
// Collections
// ----------------------------------------------------
export function getCollections(): Collection[] {
  const collectionsDir = path.join(contentDirectory, "collections");
  if (!fs.existsSync(collectionsDir)) return [];
  
  const files = fs.readdirSync(collectionsDir);
  return files
    .filter((file) => file.endsWith(".json"))
    .map((file) => {
      const filePath = path.join(collectionsDir, file);
      const content = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(content) as Collection;
    });
}

export function getCollectionBySlug(slug: string): Collection | null {
  const collections = getCollections();
  return collections.find((c) => c.slug === slug) || null;
}

// ----------------------------------------------------
// Courses
// ----------------------------------------------------
export function getCourses(): Course[] {
  const coursesDir = path.join(contentDirectory, "courses");
  if (!fs.existsSync(coursesDir)) return [];
  
  const dirs = fs.readdirSync(coursesDir);
  return dirs
    .map((dirName) => {
      const courseJsonPath = path.join(coursesDir, dirName, "course.json");
      if (!fs.existsSync(courseJsonPath)) return null;
      
      const content = fs.readFileSync(courseJsonPath, "utf-8");
      return JSON.parse(content) as Course;
    })
    .filter((course): course is Course => course !== null);
}

export function getCourseBySlug(slug: string): Course | null {
  const courses = getCourses();
  return courses.find((c) => c.slug === slug) || null;
}

// ----------------------------------------------------
// Lessons
// ----------------------------------------------------
export function getLessonsForCourse(courseSlug: string): Lesson[] {
  const lessonsDir = path.join(contentDirectory, "courses", courseSlug);
  if (!fs.existsSync(lessonsDir)) return [];
  
  const files = fs.readdirSync(lessonsDir);
  const lessons = files
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const filePath = path.join(lessonsDir, file);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data, content } = parseFrontmatter(fileContent);
      
      return {
        lessonId: data.lessonId || file.replace(".md", ""),
        slug: data.slug || file.replace(".md", ""),
        title: data.title || "Untitled Lesson",
        moduleName: data.moduleName || "Uncategorized",
        duration: data.duration || "0:00",
        videoUrl: data.videoUrl || "",
        downloadUrl: data.downloadUrl || "",
        notesUrl: data.notesUrl || "",
        resourcesUrl: data.resourcesUrl || "",
        isFree: data.isFree ?? false,
        content: content.trim(),
      } as Lesson;
    });

  // Sort lessons based on filename (e.g. lesson-01.md, lesson-02.md)
  return lessons.sort((a, b) => a.lessonId.localeCompare(b.lessonId));
}

export function getLessonBySlug(courseSlug: string, lessonSlug: string): Lesson | null {
  const lessons = getLessonsForCourse(courseSlug);
  return lessons.find((l) => l.slug === lessonSlug) || null;
}
