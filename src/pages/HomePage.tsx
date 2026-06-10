import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { StatsSection } from '../components/home/StatsSection';
import { FeaturedCourses } from '../components/home/FeaturedCourses';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { TechnologySection } from '../components/home/TechnologySection';
import { InstructorsSection } from '../components/home/InstructorsSection';
import { NewsletterSection } from '../components/home/NewsletterSection';
import { FaqSection } from '../components/home/FaqSection';

export function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <TechnologySection />
      <FeaturedCourses />
      <InstructorsSection />
      <TestimonialsSection />
      <FaqSection />
      <NewsletterSection />
    </>
  );
}