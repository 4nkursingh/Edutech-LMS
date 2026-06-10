import React, { useState, useEffect } from 'react';
import { Search, Filter, ArrowRight, Users, Star, BookOpen, ChevronDown, Grid3X3, LayoutList } from 'lucide-react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { PageHeader } from '../components/PageHeader';
import { Section } from '../components/layout/Section';
import { CategoryCard } from '../components/categories/CategoryCard';
import { categories } from '../data/categories';
import { courses } from '../data/courses';
import { Button } from '../components/Button';

type ViewMode = 'grid' | 'list';
type SortOption = 'name' | 'courses' | 'popular';

export function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'popular' | 'new'>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getCategoryStats = (categoryTitle: string) => {
    const categoryCourses = courses.filter(course => course.category === categoryTitle);
    const totalStudents = categoryCourses.reduce((acc, course) => acc + course.students, 0);
    const averageRating = categoryCourses.reduce((acc, course) => acc + course.rating, 0) / categoryCourses.length;
    return { totalStudents, averageRating };
  };

  const filteredCategories = categories
    .filter(category =>
      category.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.title.localeCompare(b.title);
        case 'courses':
          return b.courses - a.courses;
        case 'popular':
          const statsA = getCategoryStats(a.title);
          const statsB = getCategoryStats(b.title);
          return statsB.totalStudents - statsA.totalStudents;
        default:
          return 0;
      }
    });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black">
      <PageHeader
        title="Explore Course Categories"
        description="Discover your perfect learning path from our diverse range of course categories"
        image="https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
      />
      
      {/* Search and Filter Section */}
      <Section className="sticky top-16 z-20 border-b border-gray-800 bg-black/80 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-between gap-4"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <motion.input
              type="text"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg bg-gray-800 py-3 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            />
          </div>
          <div className="flex items-center gap-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="rounded-lg bg-gray-800 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="name">Sort by Name</option>
              <option value="courses">Sort by Courses</option>
              <option value="popular">Sort by Popularity</option>
            </select>
            <div className="flex rounded-lg bg-gray-800 p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`rounded-lg p-2 transition-colors ${
                  viewMode === 'grid' ? 'bg-green-500 text-black' : 'text-gray-400'
                }`}
              >
                <Grid3X3 className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`rounded-lg p-2 transition-colors ${
                  viewMode === 'list' ? 'bg-green-500 text-black' : 'text-gray-400'
                }`}
              >
                <LayoutList className="h-5 w-5" />
              </button>
            </div>
          </div>
        </motion.div>
      </Section>

      {/* Categories Grid/List */}
      <Section>
        <LayoutGroup>
          <motion.div 
            layout
            className={
              viewMode === 'grid'
                ? 'grid gap-8 sm:grid-cols-2 lg:grid-cols-3'
                : 'space-y-4'
            }
          >
            <AnimatePresence mode="popLayout">
              {filteredCategories.map((category) => (
                <motion.div
                  key={category.title}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className={viewMode === 'list' ? 'w-full' : ''}
                >
                  <CategoryCard
                    {...category}
                    stats={getCategoryStats(category.title)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>

        {/* Empty State */}
        <AnimatePresence>
          {filteredCategories.length === 0 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center justify-center rounded-xl bg-gray-800 py-12"
            >
              <BookOpen className="mb-4 h-12 w-12 text-gray-600" />
              <h3 className="mb-2 text-xl font-bold">No Categories Found</h3>
              <p className="text-gray-400">Try adjusting your search or filters</p>
            </motion.div>
          )}
        </AnimatePresence>
      </Section>

      {/* Category Details Modal */}
      <AnimatePresence>
        {selectedCategory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
            onClick={() => setSelectedCategory(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-2xl rounded-xl bg-gray-800 p-6"
              onClick={e => e.stopPropagation()}
            >
              {/* Modal content */}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollToTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 rounded-full bg-green-500 p-4 text-black shadow-lg transition-transform hover:scale-110"
          >
            <ChevronDown className="h-6 w-6 rotate-180" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}