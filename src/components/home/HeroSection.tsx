import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, CheckCircle } from 'lucide-react';
import { Button } from '../Button';
import { SignUpForm } from '../auth/SignUpForm';

const benefits = [
  'Access to 500+ courses',
  'Learn from industry experts',
  'Flexible learning schedule',
  'Certificate on completion',
];

export function HeroSection() {
  const [showSignUp, setShowSignUp] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className="relative min-h-screen overflow-hidden pt-16">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-green-500/10 via-transparent to-black" />
        <motion.div
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.2 }}
          transition={{ duration: 1.5 }}
          className="h-full w-full"
        >
          <img
            src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
            alt="Background"
            className="h-full w-full object-cover"
          />
        </motion.div>
        {/* Animated Gradient Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20"
        />
      </div>
      
      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
        {/* Left Column - Text Content */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col justify-center"
        >
          <motion.h1 
            variants={item}
            className="mb-6 text-5xl font-bold leading-tight tracking-tight text-white md:text-6xl lg:text-7xl"
          >
            Master New Skills with
            <span className="relative">
              <span className="relative z-10 bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">
                {' '}Expert Guidance
              </span>
              <motion.span
                className="absolute -inset-1 -z-10 block rounded-lg bg-green-500/20 blur-xl"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </span>
          </motion.h1>

          <motion.p 
            variants={item}
            className="mb-8 max-w-2xl text-xl text-gray-300"
          >
            Join thousands of learners worldwide and transform your career with our cutting-edge online courses.
          </motion.p>

          <motion.div 
            variants={item}
            className="mb-12 flex flex-col gap-4 sm:flex-row"
          >
            <Button size="lg" onClick={() => setShowSignUp(true)}>
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => setIsVideoPlaying(true)}
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </motion.div>

          <motion.ul
            variants={container}
            initial="hidden"
            animate="show"
            className="grid gap-3 sm:grid-cols-2"
          >
            {benefits.map((benefit, index) => (
              <motion.li
                key={benefit}
                variants={item}
                className="flex items-center gap-2 text-gray-300"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </motion.span>
                {benefit}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Right Column - Floating Cards */}
        <div className="relative hidden lg:block">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute right-0 top-20 w-80 rounded-xl bg-gray-800/90 p-6 backdrop-blur-sm"
          >
            <div className="mb-4 flex items-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                alt="Student"
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-medium">John Doe</h3>
                <p className="text-sm text-gray-400">Web Development Student</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-2 w-3/4 rounded-full bg-green-500/20" />
              <div className="h-2 w-full rounded-full bg-green-500/20" />
              <div className="h-2 w-2/3 rounded-full bg-green-500/20" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute bottom-20 right-20 w-80 rounded-xl bg-gray-800/90 p-6 backdrop-blur-sm"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-green-500/20" />
                <div>
                  <div className="h-2 w-20 rounded-full bg-green-500/20" />
                  <div className="mt-1 h-2 w-16 rounded-full bg-green-500/20" />
                </div>
              </div>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="h-8 w-8 rounded-full bg-green-500/20"
              />
            </div>
          </motion.div>

          {/* Floating Elements */}
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute left-20 top-40 h-20 w-20 rounded-xl bg-green-500/10 backdrop-blur-sm"
          />
          <motion.div
            animate={{ 
              y: [0, 20, 0],
              rotate: [0, -5, 0]
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute right-40 top-60 h-16 w-16 rounded-full bg-green-500/10 backdrop-blur-sm"
          />
        </div>
      </div>

      {/* Video Modal */}
      {isVideoPlaying && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setIsVideoPlaying(false)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="relative aspect-video w-full max-w-4xl rounded-xl bg-gray-800"
          >
            <iframe
              src="https://player.vimeo.com/video/76979871"
              className="h-full w-full rounded-xl"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </motion.div>
        </motion.div>
      )}

      {showSignUp && <SignUpForm onClose={() => setShowSignUp(false)} />}
    </section>
  );
}