"use client";

import { useEffect } from "react";

interface LessonTrackerProps {
  courseId: string;
  courseTitle: string;
  courseSlug: string;
  lessonTitle: string;
  lessonSlug: string;
  lessonsCount: number;
  currentIdx: number;
}

export function LessonTracker({
  courseId,
  courseTitle,
  courseSlug,
  lessonTitle,
  lessonSlug,
  lessonsCount,
  currentIdx,
}: LessonTrackerProps) {
  useEffect(() => {
    // Calculate progress percentage
    const progressPercent = ((currentIdx + 1) / lessonsCount) * 100;

    // Build the progress object
    const progressData = {
      courseId,
      courseTitle,
      courseSlug,
      lessonTitle,
      lessonSlug,
      progressPercent,
      lastViewedTime: new Date().getTime(),
    };

    // Save to local storage for "Continue Learning" banner
    localStorage.setItem("user-progress", JSON.stringify(progressData));

    // Update the courses lesson read states
    const readLessonsKey = `read-lessons-${courseId}`;
    const readLessons = JSON.parse(localStorage.getItem(readLessonsKey) || "[]") as string[];
    
    if (!readLessons.includes(lessonSlug)) {
      localStorage.setItem(
        readLessonsKey,
        JSON.stringify([...readLessons, lessonSlug])
      );
    }
  }, [courseId, courseTitle, courseSlug, lessonTitle, lessonSlug, lessonsCount, currentIdx]);

  return null; // Side-effect tracker, does not render visual DOM nodes
}
