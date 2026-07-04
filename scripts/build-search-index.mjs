import fs from "fs";
import path from "path";

const contentDir = path.join(process.cwd(), "content");
const publicDir = path.join(process.cwd(), "public");

// Simple frontmatter parser
function parseFrontmatter(fileContent) {
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
  const match = fileContent.match(frontmatterRegex);
  if (!match) return { data: {} };
  
  const yamlSection = match[1];
  const data = {};
  yamlSection.split(/\r?\n/).forEach((line) => {
    const colonIndex = line.indexOf(":");
    if (colonIndex > -1) {
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();
      if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
      if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
      data[key] = value;
    }
  });
  return { data };
}

function buildIndex() {
  console.log("Generating search index...");
  const searchIndex = [];

  // 1. Categories
  const catDir = path.join(contentDir, "categories");
  if (fs.existsSync(catDir)) {
    fs.readdirSync(catDir).forEach((file) => {
      if (file.endsWith(".json")) {
        const cat = JSON.parse(fs.readFileSync(path.join(catDir, file), "utf-8"));
        searchIndex.push({
          type: "category",
          id: cat.id,
          slug: cat.slug,
          title: cat.title,
          subtitle: cat.description,
          thumbnail: cat.coverImage,
        });
      }
    });
  }

  // 2. Creators
  const creatorDir = path.join(contentDir, "creators");
  if (fs.existsSync(creatorDir)) {
    fs.readdirSync(creatorDir).forEach((file) => {
      if (file.endsWith(".json")) {
        const creator = JSON.parse(fs.readFileSync(path.join(creatorDir, file), "utf-8"));
        searchIndex.push({
          type: "creator",
          id: creator.id,
          slug: creator.slug,
          title: creator.name,
          subtitle: creator.specialization,
          thumbnail: creator.photo,
        });
      }
    });
  }

  // 3. Collections
  const collDir = path.join(contentDir, "collections");
  if (fs.existsSync(collDir)) {
    fs.readdirSync(collDir).forEach((file) => {
      if (file.endsWith(".json")) {
        const coll = JSON.parse(fs.readFileSync(path.join(collDir, file), "utf-8"));
        searchIndex.push({
          type: "collection",
          id: coll.id,
          slug: coll.slug,
          title: coll.title,
          subtitle: coll.description,
          thumbnail: coll.coverImage,
        });
      }
    });
  }

  // 4. Courses & Lessons
  const courseDir = path.join(contentDir, "courses");
  if (fs.existsSync(courseDir)) {
    fs.readdirSync(courseDir).forEach((dir) => {
      const coursePath = path.join(courseDir, dir);
      if (fs.statSync(coursePath).isDirectory()) {
        const courseJsonPath = path.join(coursePath, "course.json");
        if (fs.existsSync(courseJsonPath)) {
          const course = JSON.parse(fs.readFileSync(courseJsonPath, "utf-8"));
          searchIndex.push({
            type: "course",
            id: course.courseId,
            slug: course.slug,
            title: course.title,
            subtitle: course.subtitle,
            thumbnail: course.thumbnail,
            category: course.categoryId,
            creator: course.creatorId,
          });

          // Lessons
          fs.readdirSync(coursePath).forEach((file) => {
            if (file.endsWith(".md")) {
              const fileContent = fs.readFileSync(path.join(coursePath, file), "utf-8");
              const { data } = parseFrontmatter(fileContent);
              if (data.slug) {
                searchIndex.push({
                  type: "lesson",
                  id: data.lessonId || file.replace(".md", ""),
                  slug: data.slug,
                  title: data.title || "Untitled Lesson",
                  subtitle: data.moduleName || "Course Lesson",
                  courseSlug: course.slug,
                  creator: course.creatorId,
                });
              }
            }
          });
        }
      }
    });
  }

  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(
    path.join(publicDir, "search-index.json"),
    JSON.stringify(searchIndex, null, 2),
    "utf-8"
  );
  console.log(`Search index successfully written to public/search-index.json. Total items: ${searchIndex.length}`);
}

buildIndex();
