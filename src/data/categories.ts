import { Category } from '../types/category';
import { Laptop, Database, Palette, Smartphone, Brain, TrendingUp } from 'lucide-react';

export const categories: Category[] = [
  {
    title: 'Web Development',
    description: 'Learn to build modern web applications with the latest technologies.',
    icon: Laptop,
    courses: 45,
    color: 'from-blue-500 to-blue-600',
  },
  {
    title: 'Data Science',
    description: 'Master data analysis, visualization, and machine learning.',
    icon: Database,
    courses: 32,
    color: 'from-purple-500 to-purple-600',
  },
  {
    title: 'UI/UX Design',
    description: 'Create beautiful and functional user interfaces.',
    icon: Palette,
    courses: 28,
    color: 'from-pink-500 to-pink-600',
  },
  {
    title: 'Mobile Development',
    description: 'Build native and cross-platform mobile applications.',
    icon: Smartphone,
    courses: 35,
    color: 'from-orange-500 to-orange-600',
  },
  {
    title: 'Machine Learning',
    description: 'Explore artificial intelligence and neural networks.',
    icon: Brain,
    courses: 24,
    color: 'from-green-500 to-green-600',
  },
  {
    title: 'Digital Marketing',
    description: 'Learn SEO, social media, and content marketing strategies.',
    icon: TrendingUp,
    courses: 30,
    color: 'from-red-500 to-red-600',
  },
];