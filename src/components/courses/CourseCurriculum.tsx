import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Video, FileText, Code, Target, Play } from 'lucide-react';
import { Button } from '../Button';
import { cn } from '../../utils/cn';

const courseCurriculum = [
  {
    title: 'Getting Started',
    duration: '2 hours',
    modules: [
      {
        title: 'Course Introduction',
        type: 'video',
        duration: '10 min',
      },
      {
        title: 'Setting Up Your Environment',
        type: 'text',
        duration: '15 min',
      },
      {
        title: 'Understanding Core Concepts',
        type: 'video',
        duration: '20 min',
      }
    ]
  },
  {
    title: 'Core Fundamentals',
    duration: '5 hours',
    modules: [
      {
        title: 'Basic Principles',
        type: 'video',
        duration: '30 min',
      },
      {
        title: 'Hands-on Practice',
        type: 'exercise',
        duration: '45 min',
      },
      {
        title: 'Real-world Examples',
        type: 'video',
        duration: '25 min',
      }
    ]
  },
  {
    title: 'Advanced Topics',
    duration: '8 hours',
    modules: [
      {
        title: 'Advanced Techniques',
        type: 'video',
        duration: '40 min',
      },
      {
        title: 'Project Implementation',
        type: 'project',
        duration: '2 hours',
      },
      {
        title: 'Best Practices',
        type: 'text',
        duration: '30 min',
      }
    ]
  }
];

export function CourseCurriculum() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <div className="space-y-4">
      {courseCurriculum.map((section, sectionIndex) => (
        <motion.div
          key={section.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: sectionIndex * 0.1 }}
          className="overflow-hidden rounded-xl bg-gray-800"
        >
          <button
            onClick={() => setExpandedSection(
              expandedSection === section.title ? null : section.title
            )}
            className="flex w-full items-center justify-between p-6"
          >
            <div className="flex items-center gap-4">
              <div className="text-left">
                <h3 className="font-bold">{section.title}</h3>
                <p className="text-sm text-gray-400">{section.duration}</p>
              </div>
            </div>
            <motion.div
              animate={{ rotate: expandedSection === section.title ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {expandedSection === section.title ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </motion.div>
          </button>

          <AnimatePresence>
            {expandedSection === section.title && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                exit={{ height: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="border-t border-gray-700 p-6">
                  {section.modules.map((module, moduleIndex) => (
                    <motion.div
                      key={module.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: moduleIndex * 0.1 }}
                      className="group flex items-center justify-between rounded-lg p-4 transition-colors hover:bg-gray-700"
                    >
                      <div className="flex items-center gap-4">
                        {module.type === 'video' && <Video className="h-5 w-5 text-blue-500" />}
                        {module.type === 'text' && <FileText className="h-5 w-5 text-green-500" />}
                        {module.type === 'exercise' && <Code className="h-5 w-5 text-yellow-500" />}
                        {module.type === 'project' && <Target className="h-5 w-5 text-purple-500" />}
                        <div>
                          <h4 className="font-medium">{module.title}</h4>
                          <p className="text-sm text-gray-400">{module.duration}</p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => setIsVideoPlaying(true)}
                      >
                        <Play className="mr-2 h-4 w-4" />
                        Start
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}

      {/* Video Modal */}
      <AnimatePresence>
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
              className="relative w-full max-w-4xl aspect-video rounded-xl bg-gray-800"
              onClick={e => e.stopPropagation()}
            >
              <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden" }}>
                <iframe 
                  src="https://geo.dailymotion.com/player.html?video=x9dqvlc" 
                  style={{ width: "100%", height: "100%", position: "absolute", left: 0, top: 0, border: "none" }} 
                  allowFullScreen 
                  allow="web-share"
                  title="Dailymotion Video Player"
                ></iframe>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
