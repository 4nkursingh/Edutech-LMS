import React from 'react';
import { CourseCard } from '../CourseCard';
import { Section } from '../layout/Section';
import { featuredCourses } from '../../data/courses';

export function FeaturedCourses() {
  return (
    <Section>
      <h2 className="mb-12 text-center text-4xl font-bold">Featured Courses</h2>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {featuredCourses.map((course) => (
          <CourseCard key={course.title} {...course} />
        ))}
      </div>
    </Section>
  );
}