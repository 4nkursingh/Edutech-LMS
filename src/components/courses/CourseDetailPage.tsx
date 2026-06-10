import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Star, Users, Clock, Share2, Heart, Play } from 'lucide-react';
import { courses } from '../../data/courses';
import { Button } from '../Button';
import { CourseOverview } from './CourseOverview';
import { CourseCurriculum } from './CourseCurriculum';
import { CourseAssessments } from './CourseAssessments';
import { Reviews } from './Reviews';
import { ReviewForm } from './ReviewForm';
import { CourseSidebar } from './CourseSidebar';

export function CourseDetailPage() {
  const { courseId } = useParams();
  const course = courses.find(c => c.title.toLowerCase().replace(/\s+/g, '-') === courseId);
  const [activeTab, setActiveTab] = useState<'overview' | 'curriculum' | 'tests' | 'reviews'>('overview');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start start", "end start"]
  });

  const headerOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const headerScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  useEffect(() => {
    if (!course) return;
    document.title = `${course.title} - EduTech`;
  }, [course]);

  if (!course) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold">Course Not Found</h1>
          <Button onClick={() => useNavigate()('/courses')}>
            Back to Courses
          </Button>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: course.title,
        text: `Check out this course: ${course.title}`,
        url: window.location.href
      }).catch(console.error);
    } else {
      setShowShareModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Course Header */}
      <motion.div
        ref={headerRef}
        style={{ opacity: headerOpacity, scale: headerScale }}
        className="relative overflow-hidden bg-black pt-20"
      >
        <div className="absolute inset-0">
          <img
            src={course.image}
            alt={course.title}
            className="h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">
              {course.title}
            </h1>
            
            <div className="mb-6 flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                <span className="font-medium">{course.rating}</span>
                <span className="text-gray-400">
                  ({(course.students * 0.15).toFixed(0)} reviews)
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Users className="h-5 w-5" />
                {course.students.toLocaleString()} students
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Clock className="h-5 w-5" />
                Last updated 2 weeks ago
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Button onClick={() => setIsVideoPlaying(true)}>
                <Play className="mr-2 h-4 w-4" />
                Preview Course
              </Button>
              <Button variant="secondary" onClick={handleShare}>
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
              <Button variant="secondary">
                <Heart className="mr-2 h-4 w-4" />
                Wishlist
              </Button>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            {/* Tab Navigation */}
            <div className="mb-8 border-b border-gray-800">
              <div className="-mb-px flex space-x-8">
                {[
                  { id: 'overview', label: 'Overview' },
                  { id: 'curriculum', label: 'Curriculum' },
                  { id: 'tests', label: 'Tests & Assessments' },
                  { id: 'reviews', label: 'Reviews' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                    className={`border-b-2 px-1 pb-4 text-sm font-medium ${
                      activeTab === tab.id
                        ? 'border-green-500 text-green-500'
                        : 'border-transparent text-gray-400 hover:border-gray-700 hover:text-gray-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === 'overview' && <CourseOverview course={course} />}
                {activeTab === 'curriculum' && <CourseCurriculum />}
                {activeTab === 'tests' && <CourseAssessments courseId={courseId!} />}
                {activeTab === 'reviews' && (
                  <div className="space-y-6">
                    <div className="flex justify-between">
                      <h2 className="text-2xl font-bold">Student Reviews</h2>
                      <Button onClick={() => setShowReviewForm(true)}>
                        Write a Review
                      </Button>
                    </div>
                    <Reviews courseId={courseId!} />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column - Sidebar */}
          <div className="mt-8 lg:mt-0">
            <CourseSidebar course={course} />
          </div>
        </div>
      </div>

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
              className="relative aspect-video w-full max-w-4xl rounded-xl bg-gray-800"
              onClick={e => e.stopPropagation()}
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
      </AnimatePresence>

      {/* Share Modal */}
      <AnimatePresence>
        {showShareModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            onClick={() => setShowShareModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="w-full max-w-md rounded-xl bg-gray-800 p-6"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="mb-4 text-xl font-bold">Share This Course</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  value={window.location.href}
                  readOnly
                  className="w-full rounded-lg bg-gray-700 px-4 py-2 text-white"
                />
                <div className="flex justify-end gap-2">
                  <Button
                    variant="secondary"
                    onClick={() => setShowShareModal(false)}
                  >
                    Close
                  </Button>
                  <Button
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      alert('Link copied to clipboard!');
                    }}
                  >
                    Copy Link
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Review Form Modal */}
      {showReviewForm && (
        <ReviewForm
          courseId={courseId!}
          onClose={() => setShowReviewForm(false)}
        />
      )}
    </div>
  );
}