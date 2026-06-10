import React from 'react';
import { TestimonialCard } from '../TestimonialCard';
import { Section } from '../layout/Section';
import { testimonials } from '../../data/testimonials';

export function TestimonialsSection() {
  return (
    <Section className="border-t border-gray-800 bg-black/50 backdrop-blur-sm">
      <h2 className="mb-12 text-center text-4xl font-bold">What Our Students Say</h2>
      <div className="grid gap-8 md:grid-cols-2">
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.author} {...testimonial} />
        ))}
      </div>
    </Section>
  );
}