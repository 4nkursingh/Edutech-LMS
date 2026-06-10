import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, BookOpen, Tag, Calendar, Clock } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { Section } from '../components/layout/Section';
import { BlogCard } from '../components/blog/BlogCard';
import { blogPosts } from '../data/blog-posts';
import { Button } from '../components/Button';

const categories = ['All', 'Technology', 'Education', 'Career', 'Development'];

export function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'latest' | 'popular'>('latest');

  const filteredPosts = blogPosts
    .filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'latest') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return b.views - a.views;
    });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <>
      <PageHeader
        title="Latest from Our Blog"
        description="Stay updated with the latest trends in education, technology, and career development."
        image="https://images.unsplash.com/photo-1456324504439-367cee3b3c32"
      />
      
      <Section>
        {/* Search and Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex flex-wrap items-center gap-4"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg bg-gray-800 py-2 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'latest' | 'popular')}
              className="rounded-lg bg-gray-800 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="latest">Latest</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>
        </motion.div>

        {/* Categories */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 flex flex-wrap gap-2"
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'primary' : 'secondary'}
              onClick={() => setSelectedCategory(category)}
              size="sm"
            >
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Blog Grid */}
        <AnimatePresence mode="wait">
          {filteredPosts.length > 0 ? (
            <motion.div
              key="grid"
              variants={container}
              initial="hidden"
              animate="show"
              className="grid gap-8 md:grid-cols-2"
            >
              {filteredPosts.map((post) => (
                <BlogCard key={post.id} {...post} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex flex-col items-center justify-center rounded-xl bg-gray-800 py-12"
            >
              <BookOpen className="mb-4 h-12 w-12 text-gray-600" />
              <h3 className="mb-2 text-xl font-bold">No Articles Found</h3>
              <p className="text-gray-400">Try adjusting your search or filters</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Featured Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 rounded-xl bg-gray-800 p-6"
        >
          <h3 className="mb-4 text-xl font-bold">Popular Tags</h3>
          <div className="flex flex-wrap gap-2">
            {['React', 'JavaScript', 'TypeScript', 'Web Development', 'UI/UX', 'Career Tips'].map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-gray-700 px-3 py-1 text-sm text-gray-300 hover:bg-gray-600"
              >
                #{tag}
              </span>
            ))}
          </div>
        </motion.div>
      </Section>
    </>
  );
}