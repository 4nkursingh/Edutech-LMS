CourseOverview.tsx


import React from 'react';
import { motion } from 'framer-motion';
import { Star, Users, Clock, CheckSquare } from 'lucide-react';
import { Course } from '../../types/course';
import { LearningObjectives } from './LearningObjectives';

const features = [
  {
    title: 'HD Video Content',
    description: 'Crystal clear video lessons'
  },
  {
    title: 'Comprehensive Notes',
    description: 'Detailed written materials'
  },
  {
    title: 'Coding Exercises',
    description: 'Hands-on practice sessions'
  },
  {
    title: 'Community Access',
    description: 'Join student discussion groups'
  },
  {
    title: 'Lifetime Access',
    description: 'Learn at your own pace'
  },
  {
    title: 'Certificate',
    description: 'Earn completion certificate'
  }
];

const requirements = [
  'Basic understanding of programming concepts',
  'Familiarity with web development',
  'A computer with modern web browser',
  'Dedication to learn and practice'
];

interface CourseOverviewProps {
  course: Course;
}

export function CourseOverview({ course }: CourseOverviewProps) {
  return (
    <div className="space-y-8">
      {/* Course Description */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl bg-gray-800 p-6"
      >
        <h2 className="mb-4 text-xl font-bold">Course Description</h2>
        <p className="text-gray-400">
          Master the fundamentals and advanced concepts through hands-on projects
          and real-world examples. This comprehensive course will take you from
          beginner to professional level.
        </p>
      </motion.div>

      {/* Course Features */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="rounded-xl bg-gray-800 p-6"
          >
            <h3 className="mb-2 font-bold">{feature.title}</h3>
            <p className="text-sm text-gray-400">{feature.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Requirements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl bg-gray-800 p-6"
      >
        <h2 className="mb-4 text-xl font-bold">Requirements</h2>
        <ul className="space-y-2">
          {requirements.map((req, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-2 text-gray-400"
            >
              <CheckSquare className="h-5 w-5 text-green-500" />
              {req}
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Learning Objectives */}
      <LearningObjectives />
    </div>
  );
}