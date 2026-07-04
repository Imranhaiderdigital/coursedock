export interface Creator {
  id: string;
  slug: string;
  name: string;
  photo: string;
  cover: string;
  bio: string;
  specialization: string;
  website?: string;
  socialLinks?: {
    twitter?: string;
    github?: string;
    youtube?: string;
    linkedin?: string;
  };
  totalCourses: number;
  featured: boolean;
  tags?: string[];
  seo?: {
    title?: string;
    description?: string;
  };
}

export interface Category {
  id: string;
  slug: string;
  title: string;
  description: string;
  coverImage: string;
  icon: string; // Lucide icon name, e.g. "Laptop", "Brain"
  featured: boolean;
}

export interface Collection {
  id: string;
  slug: string;
  title: string;
  description: string;
  coverImage: string;
  estimatedTime: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  requiredSkills?: string[];
  recommendedOrder: string[]; // List of course slugs in order
}

export interface ResourceItem {
  name: string;
  type: string; // e.g. "PDF", "ZIP", "Link"
  size?: string; // e.g. "4.2 MB"
  url: string;
}

export interface Course {
  courseId: string;
  slug: string;
  title: string;
  subtitle: string;
  creatorId: string; // Reference to Creator.id
  categoryId: string; // Reference to Category.id
  collectionId?: string; // Optional reference to Collection.id
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  language: string;
  duration: string;
  lessonsCount: number;
  thumbnail: string;
  coverImage: string;
  description: string;
  whatYouWillLearn?: string[];
  requirements?: string[];
  targetAudience?: string[];
  tags?: string[];
  resources?: ResourceItem[];
  publishedDate: string;
  updatedDate: string;
  featured: boolean;
  popular: boolean;
  recommended: boolean;
  seo?: {
    title?: string;
    description?: string;
  };
}

export interface Lesson {
  lessonId: string;
  slug: string;
  title: string;
  moduleName?: string;
  duration: string;
  videoUrl?: string; // Google Drive link (watch)
  downloadUrl?: string; // Google Drive link (download)
  notesUrl?: string; // Google Docs or PDF notes
  resourcesUrl?: string; // ZIP resources
  isFree?: boolean;
  content: string; // Markdown content
}

export interface SearchResult {
  type: "course" | "creator" | "category" | "collection" | "lesson";
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  thumbnail?: string;
  category?: string;
  creator?: string;
  courseSlug?: string; // For lessons
}
