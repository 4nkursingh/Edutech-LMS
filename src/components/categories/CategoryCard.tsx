import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Category } from '../../types/category';
import { Button } from '../Button';
import { ChevronRight, Users, Star, BookOpen } from 'lucide-react';

interface CategoryCardProps extends Category {
  stats?: {
    totalStudents: number;
    averageRating: number;
  };
}

export function CategoryCard({
  title,
  description,
  icon: Icon,
  courses,
  color,
  stats,
}: CategoryCardProps) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <motion.div
      className="group relative isolate h-full overflow-hidden rounded-xl bg-gray-800/90 backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      onMouseMove={handleMouseMove}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => navigate(`/courses?category=${encodeURIComponent(title)}`)}
    >
      {/* Animated gradient background */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              ${color.split(' ')[1].replace('to-', '')},
              transparent 80%
            )
          `,
        }}
      />

      {/* Card content */}
      <div className="relative z-10 p-8">
        <motion.div
          animate={{
            y: isHovered ? -10 : 0,
            opacity: isHovered ? 0 : 1,
          }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className={`mb-4 inline-block rounded-xl bg-gradient-to-br ${color} p-3`}
          >
            <Icon className="h-8 w-8 text-white" />
          </motion.div>
          
          <motion.h3 
            className="mb-2 text-xl font-bold text-white"
            layout
          >
            {title}
          </motion.h3>
          
          <motion.p 
            className="mb-4 text-gray-400"
            layout
          >
            {description}
          </motion.p>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">{courses} courses</span>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-lg bg-green-500 px-4 py-2 text-sm font-medium text-black transition-colors group-hover:bg-green-400"
            >
              Explore
              <ChevronRight className="ml-2 inline-block h-4 w-4" />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Stats overlay */}
      <motion.div 
        className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-gray-900 via-gray-900/90 to-transparent p-8"
        initial={{ opacity: 0, y: "100%" }}
        animate={{
          opacity: isHovered ? 1 : 0,
          y: isHovered ? 0 : "100%",
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          transition={{ duration: 0.2, delay: 0.1 }}
          className="space-y-4"
        >
          {stats && (
            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-lg bg-gray-800/50 p-2 text-center backdrop-blur-sm">
                <div className="flex items-center justify-center gap-1 text-green-500">
                  <Users className="h-4 w-4" />
                  <span className="text-lg font-bold">
                    {stats.totalStudents.toLocaleString()}
                  </span>
                </div>
                <p className="text-xs text-gray-400">Students</p>
              </div>
              <div className="rounded-lg bg-gray-800/50 p-2 text-center backdrop-blur-sm">
                <div className="flex items-center justify-center gap-1 text-yellow-500">
                  <Star className="h-4 w-4" />
                  <span className="text-lg font-bold">
                    {stats.averageRating.toFixed(1)}
                  </span>
                </div>
                <p className="text-xs text-gray-400">Rating</p>
              </div>
              <div className="rounded-lg bg-gray-800/50 p-2 text-center backdrop-blur-sm">
                <div className="flex items-center justify-center gap-1 text-blue-500">
                  <BookOpen className="h-4 w-4" />
                  <span className="text-lg font-bold">{courses}</span>
                </div>
                <p className="text-xs text-gray-400">Courses</p>
              </div>
            </div>
          )}

          <div className="rounded-lg bg-gray-800/50 p-4 backdrop-blur-sm">
            <h4 className="mb-2 text-lg font-bold text-white">Popular Topics:</h4>
            <div className="flex flex-wrap gap-2">
              {['Beginner', 'Advanced', 'Certification'].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-gray-700/50 px-3 py-1 text-xs text-gray-300 backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <Button className="w-full bg-green-500 text-black hover:bg-green-400">
            Start Learning
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </motion.div>

      {/* Particle effects on hover */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{ opacity: isHovered ? 1 : 0 }}
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-2 w-2 rounded-full bg-green-500"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: isHovered ? [0, 1, 0] : 0,
              scale: isHovered ? [0, 1.5, 0] : 0,
              x: isHovered ? [0, Math.random() * 100 - 50] : 0,
              y: isHovered ? [0, Math.random() * -100] : 0,
            }}
            transition={{
              duration: 1,
              delay: i * 0.2,
              repeat: Infinity,
              repeatType: "loop",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              bottom: '20%',
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}