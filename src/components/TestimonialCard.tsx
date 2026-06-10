import React from 'react';
import { Quote } from 'lucide-react';
import { Testimonial } from '../types/testimonial';

export function TestimonialCard({
  content,
  author,
  role,
  avatar,
}: Testimonial) {
  return (
    <div className="relative rounded-xl bg-gray-800 p-6">
      <Quote className="absolute right-6 top-6 h-8 w-8 text-green-500/20" />
      <p className="mb-6 text-gray-300">{content}</p>
      <div className="flex items-center gap-4">
        <img
          src={avatar}
          alt={author}
          className="h-12 w-12 rounded-full object-cover"
        />
        <div>
          <h4 className="font-medium text-white">{author}</h4>
          <p className="text-sm text-gray-400">{role}</p>
        </div>
      </div>
    </div>
  );
}