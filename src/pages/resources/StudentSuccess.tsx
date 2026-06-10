import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Book, Award, Target, Calendar, Clock, ChevronRight, Download, Play } from 'lucide-react';
import { PageHeader } from '../../components/PageHeader';
import { Section } from '../../components/layout/Section';
import { Button } from '../../components/Button';

const successResources = [
  {
    title: 'Study Techniques',
    icon: Book,
    resources: [
      {
        title: 'Effective Note-Taking',
        description: 'Learn proven techniques for taking better notes during lectures.',
        type: 'guide',
        duration: '15 min read',
        downloadUrl: '#'
      },
      {
        title: 'Time Management',
        description: 'Master the art of managing your study schedule efficiently.',
        type: 'video',
        duration: '10 min watch',
        videoUrl: 'https://player.vimeo.com/video/76979871'
      }
    ]
  },
  {
    title: 'Career Development',
    icon: Target,
    resources: [
      {
        title: 'Resume Building',
        description: 'Create a standout resume that gets you noticed.',
        type: 'template',
        downloadUrl: '#'
      },
      {
        title: 'Interview Preparation',
        description: 'Common interview questions and how to answer them.',
        type: 'guide',
        duration: '20 min read',
        downloadUrl: '#'
      }
    ]
  },
  {
    title: 'Certification Prep',
    icon: Award,
    resources: [
      {
        title: 'Exam Strategies',
        description: 'Tips and tricks for acing your certification exams.',
        type: 'guide',
        duration: '25 min read',
        downloadUrl: '#'
      },
      {
        title: 'Practice Tests',
        description: 'Sample questions to test your knowledge.',
        type: 'interactive',
        duration: '30 min',
        url: '#'
      }
    ]
  }
];

const successStories = [
  {
    name: 'Sarah Johnson',
    role: 'Frontend Developer',
    company: 'Tech Corp',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    story: 'After completing the Web Development course, I landed my dream job...',
    achievement: 'Increased salary by 40%'
  },
  {
    name: 'Michael Chen',
    role: 'Data Scientist',
    company: 'Analytics Inc',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    story: 'The Data Science track helped me transition from marketing to tech...',
    achievement: 'Career change success'
  }
];

export function StudentSuccess() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [showVideo, setShowVideo] = useState<string | null>(null);

  return (
    <>
      <PageHeader
        title="Student Success Center"
        description="Resources and guidance to help you achieve your learning goals"
        image="https://images.unsplash.com/photo-1523240795612-9a054b0db644"
      />
      
      <Section>
        {/* Success Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          <div className="rounded-xl bg-gray-800 p-6">
            <Award className="mb-4 h-8 w-8 text-green-500" />
            <h3 className="text-2xl font-bold">90%</h3>
            <p className="text-gray-400">Completion Rate</p>
          </div>
          <div className="rounded-xl bg-gray-800 p-6">
            <Target className="mb-4 h-8 w-8 text-green-500" />
            <h3 className="text-2xl font-bold">85%</h3>
            <p className="text-gray-400">Career Goals Met</p>
          </div>
          <div className="rounded-xl bg-gray-800 p-6">
            <Calendar className="mb-4 h-8 w-8 text-green-500" />
            <h3 className="text-2xl font-bold">6</h3>
            <p className="text-gray-400">Months Average</p>
          </div>
          <div className="rounded-xl bg-gray-800 p-6">
            <Clock className="mb-4 h-8 w-8 text-green-500" />
            <h3 className="text-2xl font-bold">15hr</h3>
            <p className="text-gray-400">Weekly Study Time</p>
          </div>
        </motion.div>

        {/* Success Resources */}
        <div className="mb-12 grid gap-8">
          {successResources.map((section) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="overflow-hidden rounded-xl bg-gray-800"
            >
              <button
                onClick={() => setExpandedSection(
                  expandedSection === section.title ? null : section.title
                )}
                className="flex w-full items-center justify-between p-6 text-left hover:bg-gray-700/50"
              >
                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-green-500/10 p-3">
                    <section.icon className="h-6 w-6 text-green-500" />
                  </div>
                  <h2 className="text-xl font-bold">{section.title}</h2>
                </div>
                <motion.div
                  animate={{ rotate: expandedSection === section.title ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronRight className="h-6 w-6 text-gray-400" />
                </motion.div>
              </button>

              <AnimatePresence>
                {expandedSection === section.title && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="grid gap-4 p-6 pt-0 sm:grid-cols-2">
                      {section.resources.map((resource) => (
                        <motion.div
                          key={resource.title}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="rounded-lg bg-gray-700/50 p-6"
                        >
                          <h3 className="mb-2 text-lg font-bold">{resource.title}</h3>
                          <p className="mb-4 text-gray-400">{resource.description}</p>
                          <div className="flex items-center justify-between">
                            {resource.duration && (
                              <span className="text-sm text-gray-400">
                                {resource.duration}
                              </span>
                            )}
                            {resource.type === 'video' && 'videoUrl' in resource ? (
                              <Button
                                size="sm"
                                onClick={() => setShowVideo((resource as any).videoUrl)}
                              >
                                <Play className="mr-2 h-4 w-4" />
                                Watch Now
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                variant="secondary"
                                onClick={() => window.open(resource.downloadUrl, '_blank')}
                              >
                                <Download className="mr-2 h-4 w-4" />
                                Download
                              </Button>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Success Stories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="mb-8 text-2xl font-bold">Success Stories</h2>
          <div className="grid gap-8 sm:grid-cols-2">
            {successStories.map((story) => (
              <motion.div
                key={story.name}
                whileHover={{ y: -8 }}
                className="rounded-xl bg-gray-800 p-6"
              >
                <div className="mb-4 flex items-center gap-4">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-bold">{story.name}</h3>
                    <p className="text-sm text-gray-400">{story.role}</p>
                    <p className="text-sm text-green-500">{story.company}</p>
                  </div>
                </div>
                <p className="mb-4 text-gray-300">{story.story}</p>
                <div className="rounded-lg bg-green-500/10 px-4 py-2 text-sm text-green-500">
                  {story.achievement}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Section>

      {/* Video Modal */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            onClick={() => setShowVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative aspect-video w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={showVideo}
                className="h-full w-full rounded-xl"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope ; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}