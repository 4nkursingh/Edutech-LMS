import { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence, LayoutGroup, useScroll, useSpring } from 'framer-motion';
import {
  Search,
  SlidersHorizontal,
  Clock,
  Users,
  Star,
  BookOpen,
  ChevronDown,
  Grid3X3,
  LayoutList,
  X,
  Sparkles,
  BookMarked,
  Share2
} from 'lucide-react';
import { PageHeader } from '../components/PageHeader';

import { courses } from '../data/courses';
import { Button } from '../components/Button';
import { cn } from '../utils/cn';

type ViewMode = 'grid' | 'list';
type SortOption = 'popular' | 'newest' | 'rating' | 'price-low' | 'price-high';
type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced' | 'all';
type Duration = 'short' | 'medium' | 'long' | 'all';

interface FilterState {
  search: string;
  sort: SortOption;
  difficulty: DifficultyLevel;
  duration: Duration;
  priceRange: [number, number];
  category: string | null;
  rating: number | null;
}

interface SavedFilter {
  name: string;
  filter: Partial<FilterState>;
}

export function CoursesPage() {
  const [searchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [savedFilters, setSavedFilters] = useState<SavedFilter[]>([]);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showFilterSaveModal, setShowFilterSaveModal] = useState(false);
  const filterNameRef = useRef<HTMLInputElement>(null);

  const [filters, setFilters] = useState<FilterState>({
    search: '',
    sort: 'popular',
    difficulty: 'all',
    duration: 'all',
    priceRange: [0, 200],
    category: searchParams.get('category'),
    rating: null,
  });

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredCourses = courses.filter(course => {
    if (filters.category && course.category !== filters.category) return false;
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      if (!course.title.toLowerCase().includes(searchLower) &&
          !course.instructor.toLowerCase().includes(searchLower)) {
        return false;
      }
    }
    if (filters.difficulty !== 'all') {
      const price = parseFloat(course.price.replace('$', ''));
      switch (filters.difficulty) {
        case 'beginner': if (price >= 50) return false; break;
        case 'intermediate': if (price < 50 || price >= 100) return false; break;
        case 'advanced': if (price < 100) return false; break;
      }
    }
    if (filters.duration !== 'all') {
      const weeks = parseInt(course.duration);
      switch (filters.duration) {
        case 'short': if (weeks > 4) return false; break;
        case 'medium': if (weeks <= 4 || weeks > 8) return false; break;
        case 'long': if (weeks <= 8) return false; break;
      }
    }
    if (filters.rating !== null && course.rating < filters.rating) return false;
    const price = parseFloat(course.price.replace('$', ''));
    if (price < filters.priceRange[0] || price > filters.priceRange[1]) return false;
    return true;
  }).sort((a, b) => {
    switch (filters.sort) {
      case 'popular':
        return b.students - a.students;
      case 'newest':
        return new Date(b.duration).getTime() - new Date(a.duration).getTime();
      case 'rating':
        return b.rating - a.rating;
      case 'price-low':
        return parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', ''));
      case 'price-high':
        return parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', ''));
      default:
        return 0;
    }
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleWishlist = (courseTitle: string) => {
    setWishlist(prev => {
      const newWishlist = new Set(prev);
      if (newWishlist.has(courseTitle)) {
        newWishlist.delete(courseTitle);
      } else {
        newWishlist.add(courseTitle);
      }
      return newWishlist;
    });
  };

  const saveCurrentFilter = (name: string) => {
    setSavedFilters(prev => [...prev, {
      name,
      filter: { ...filters }
    }]);
    setShowFilterSaveModal(false);
  };

  const applyFilter = (filter: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...filter }));
  };

  const shareFilter = () => {
    const filterParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== null && value !== 'all') {
        filterParams.set(key, String(value));
      }
    });
    const shareUrl = `${window.location.origin}${window.location.pathname}?${filterParams.toString()}`;
    navigator.clipboard.writeText(shareUrl);
  };

  return (
    <div className="min-h-screen bg-black">
      <PageHeader
        title={filters.category ? `${filters.category} Courses` : "Explore Our Courses"}
        description="Discover a wide range of professional courses designed to help you achieve your career goals."
        image="https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
      />
      
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-green-500 origin-left z-50"
        style={{ scaleX }}
      />
      
      <div className="sticky top-16 z-20 border-b border-gray-800 bg-black/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <motion.input
                type="text"
                placeholder="Search courses..."
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                className="w-full rounded-lg bg-gray-800 py-2 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
                <motion.span
                  animate={{ rotate: isFilterOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="h-4 w-4" />
                </motion.span>
              </Button>
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
          </div>

          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="grid gap-6 py-4 md:grid-cols-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-400">Sort By</label>
                    <select
                      value={filters.sort}
                      onChange={(e) => setFilters(prev => ({ ...prev, sort: e.target.value as SortOption }))}
                      className="w-full rounded-lg bg-gray-800 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="popular">Most Popular</option>
                      <option value="newest">Newest</option>
                      <option value="rating">Highest Rated</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-400">Difficulty Level</label>
                    <select
                      value={filters.difficulty}
                      onChange={(e) => setFilters(prev => ({ ...prev, difficulty: e.target.value as DifficultyLevel }))}
                      className="w-full rounded-lg bg-gray-800 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="all">All Levels</option>
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-400">Duration</label>
                    <select
                      value={filters.duration}
                      onChange={(e) => setFilters(prev => ({ ...prev, duration: e.target.value as Duration }))}
                      className="w-full rounded-lg bg-gray-800 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="all">Any Duration</option>
                      <option value="short">0-4 weeks</option>
                      <option value="medium">4-8 weeks</option>
                      <option value="long">8+ weeks</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-400">Minimum Rating</label>
                    <div className="flex items-center gap-2">
                      {[4, 4.5].map(rating => (
                        <button
                          key={rating}
                          onClick={() => setFilters(prev => ({
                            ...prev,
                            rating: prev.rating === rating ? null : rating
                          }))}
                          className={cn(
                            "flex items-center gap-1 rounded-lg px-3 py-2 transition-colors",
                            filters.rating === rating
                              ? "bg-green-500 text-black"
                              : "bg-gray-800 text-white hover:bg-gray-700"
                          )}
                        >
                          <Star className="h-4 w-4" />
                          {rating}+
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-gray-400">Price Range</label>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="0"
                        max="200"
                        step="10"
                        value={filters.priceRange[0]}
                        onChange={(e) => setFilters(prev => ({
                          ...prev,
                          priceRange: [parseInt(e.target.value), prev.priceRange[1]]
                        }))}
                        className="flex-1"
                      />
                      <span className="w-20 rounded-lg bg-gray-800 px-3 py-2 text-center">
                        ${filters.priceRange[0]}
                      </span>
                      <span>to</span>
                      <input
                        type="range"
                        min="0"
                        max="200"
                        step="10"
                        value={filters.priceRange[1]}
                        onChange={(e) => setFilters(prev => ({
                          ...prev,
                          priceRange: [prev.priceRange[0], parseInt(e.target.value)]
                        }))}
                        className="flex-1"
                      />
                      <span className="w-20 rounded-lg bg-gray-800 px-3 py-2 text-center">
                        ${filters.priceRange[1]}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 md:col-span-2">
                    <Button
                      variant="secondary"
                      onClick={() => setFilters({
                        search: '',
                        sort: 'popular',
                        difficulty: 'all',
                        duration: 'all',
                        priceRange: [0, 200],
                        category: null,
                        rating: null,
                      })}
                    >
                      <X className="mr-2 h-4 w-4" />
                      Reset Filters
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => setShowFilterSaveModal(true)}
                    >
                      <BookMarked className="mr-2 h-4 w-4" />
                      Save Filter
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => setShowShareMenu(true)}
                    >
                      <Share2 className="mr-2 h-4 w-4" />
                      Share Filters
                    </Button>
                  </div>
                </div>

                {savedFilters.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {savedFilters.map((saved, index) => (
                      <motion.button
                        key={saved.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => applyFilter(saved.filter)}
                        className="flex items-center gap-2 rounded-lg bg-gray-800 px-3 py-2 text-sm hover:bg-gray-700"
                      >
                        <Sparkles className="h-4 w-4 text-green-500" />
                        {saved.name}
                      </motion.button>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">
                {filteredCourses.length} {filteredCourses.length === 1 ? 'Course' : 'Courses'} Found
              </h2>
              <p className="text-sm text-gray-400">
                {filters.category ? `Showing ${filters.category} courses` : 'Showing all courses'}
              </p>
            </div>
            {filters.category && (
              <Button
                variant="secondary"
                onClick={() => setFilters(prev => ({ ...prev, category: null }))}
              >
                Clear Category Filter
              </Button>
            )}
          </div>

          <LayoutGroup>
            <motion.div
              layout
              className={cn(
                viewMode === 'grid'
                  ? 'grid gap-8 sm:grid-cols-2 lg:grid-cols-3'
                  : 'space-y-4'
              )}
            >
              <AnimatePresence mode="popLayout">
                {filteredCourses.map((course) => (
                  <motion.div
                    key={course.title}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ y: -8 }}
                    className={viewMode === 'list' ? 'w-full' : ''}
                  >
                    <Link
                      to={`/courses/${course.title.toLowerCase().replace(/\s+/g, '-')}`}
                      className="block"
                    >
                      <div
                        className={cn(
                          "group relative overflow-hidden rounded-xl bg-gray-800 transition-all",
                          viewMode === 'list' ? 'flex gap-6 p-6' : 'p-0'
                        )}
                      >
                        <div className={cn(
                          "overflow-hidden",
                          viewMode === 'list' ? 'h-48 w-72' : 'aspect-video w-full'
                        )}>
                          <motion.img
                            src={course.image}
                            alt={course.title}
                            className="h-full w-full object-cover transition-transform group-hover:scale-110"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>
                        
                        <div className={cn(
                          "flex flex-col",
                          viewMode === 'list' ? 'flex-1' : 'p-6'
                        )}>
                          <h3 className="mb-2 text-xl font-bold group-hover:text-green-500">
                            {course.title}
                          </h3>
                          <p className="mb-4 text-gray-400">{course.instructor}</p>
                          
                          <div className="mb-4 flex items-center gap-4 text-sm text-gray-400">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {course.duration}
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              {course.students.toLocaleString()}
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-500" />
                              {course.rating.toFixed(1)}
                            </div>
                          </div>
                          
                          <div className="mt-auto flex items-center justify-between">
                            <span className="text-2xl font-bold text-green-500">{course.price}</span>
                            <div className="flex gap-2">
                              <Button
                                variant="secondary"
                                size="sm"
                                onClick={(e) => {
                                  e.preventDefault();
                                  toggleWishlist(course.title);
                                }}
                              >
                                <BookMarked
                                  className={cn(
                                    "h-4 w-4",
                                    wishlist.has(course.title) && "fill-green-500 text-green-500"
                                  )}
                                />
                              </Button>
                              <Button size="sm">
                                Enroll Now
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </LayoutGroup>

          <AnimatePresence>
            {filteredCourses.length === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center justify-center rounded-xl bg-gray-800 py-12"
              >
                <BookOpen className="mb-4 h-12 w-12 text-gray-600" />
                <h3 className="mb-2 text-xl font-bold">No Courses Found</h3>
                <p className="text-gray-400">Try adjusting your filters or search terms</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Save Filter Modal */}
      <AnimatePresence>
        {showFilterSaveModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
            onClick={() => setShowFilterSaveModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-md rounded-xl bg-gray-800 p-6"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="mb-4 text-xl font-bold">Save Current Filter</h3>
              <input
                ref={filterNameRef}
                type="text"
                placeholder="Enter filter name..."
                className="mb-4 w-full rounded-lg bg-gray-700 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <div className="flex justify-end gap-2">
                <Button
                  variant="secondary"
                  onClick={() => setShowFilterSaveModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    if (filterNameRef.current?.value) {
                      saveCurrentFilter(filterNameRef.current.value);
                    }
                  }}
                >
                  Save Filter
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Share Menu */}
      <AnimatePresence>
        {showShareMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
            onClick={() => setShowShareMenu(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-md rounded-xl bg-gray-800 p-6"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="mb-4 text-xl font-bold">Share Filters</h3>
              <p className="mb-4 text-gray-400">
                Share your current filter configuration with others
              </p>
              <div className="flex justify-end gap-2">
                <Button
                  variant="secondary"
                  onClick={() => setShowShareMenu(false)}
                >
                  Cancel
                </Button>
                <Button onClick={shareFilter}>
                  <Share2 className="mr-2 h-4 w-4" />
                  Copy Link
                </Button>
              </div>
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