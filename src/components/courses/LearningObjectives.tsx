import React from 'react';
import { CheckCircle } from 'lucide-react';

const objectives = [
  'Build professional-grade applications using modern best practices',
  'Master advanced concepts and industry-standard tools',
  'Implement secure authentication and authorization',
  'Deploy applications to production environments',
  'Write clean, maintainable, and scalable code',
  'Work with databases and external APIs effectively',
];

export function LearningObjectives() {
  return (
    <div className="mb-8 rounded-xl bg-gray-800 p-6">
      <h2 className="mb-6 text-2xl font-bold text-white">What You'll Learn</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {objectives.map((objective, index) => (
          <div key={index} className="flex items-start gap-3">
            <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-green-500" />
            <span className="text-gray-300">{objective}</span>
          </div>
        ))}
      </div>
    </div>
  );
}