import { useState } from 'react';
import { ChevronDown, ChevronUp, Lock, X, FileText, Video, CheckSquare, RefreshCw } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Button } from '../Button';
import { Quiz } from './Quiz';
import { updateCourseProgress } from '../../lib/api';

interface Lesson {
  title: string;
  duration: string;
  isPreview: boolean;
  isCompleted?: boolean;
  type: 'video' | 'text' | 'quiz';
  content: string;
}

interface Section {
  title: string;
  lessons: Lesson[];
}

const courseSections: Section[] = [
  {
    title: 'Getting Started',
    lessons: [
      {
        title: 'Course Introduction',
        duration: '5:20',
        isPreview: true,
        isCompleted: false,
        type: 'video',
        content: 'https://player.vimeo.com/video/76979871',
      },
      {
        title: 'Setting Up Your Environment',
        duration: '10:15',
        isPreview: true,
        isCompleted: false,
        type: 'text',
        content: `
# Setting Up Your Development Environment

Before we begin coding, let's make sure you have all the necessary tools installed:

1. Install Node.js (version 14 or higher)
2. Set up your code editor
3. Configure your terminal

## Code Editor Setup
We recommend using Visual Studio Code with the following extensions:
- ESLint
- Prettier
- JavaScript and TypeScript Intellisense

## Terminal Configuration
Make sure you have Git installed and configured...
        `,
      },
      {
        title: 'Basic Concepts Quiz',
        duration: '15:30',
        isPreview: true,
        isCompleted: false,
        type: 'quiz',
        content: JSON.stringify({
          questions: [
            {
              question: 'What is React?',
              options: [
                'A JavaScript library for building user interfaces',
                'A programming language',
                'A database system',
                'An operating system',
              ],
              correctAnswer: 0,
            },
            {
              question: 'What is JSX?',
              options: [
                'A JavaScript extension for SQL',
                'A syntax extension for JavaScript',
                'A new programming language',
                'A database query language',
              ],
              correctAnswer: 1,
            },
          ],
        }),
      },
    ],
  },
  {
    title: 'Core Fundamentals',
    lessons: [
      {
        title: 'Understanding Components',
        duration: '12:45',
        isPreview: false,
        type: 'video',
        content: 'https://player.vimeo.com/video/76979871',
      },
      {
        title: 'State and Props',
        duration: '18:20',
        isPreview: false,
        type: 'text',
        content: `
# Understanding State and Props in React

React components use state and props to manage and pass data:

## Props
Props are read-only components that must be kept pure...

## State
State is a built-in React object that is used to contain data...
        `,
      },
      {
        title: 'Component Lifecycle Quiz',
        duration: '20:10',
        isPreview: false,
        type: 'quiz',
        content: JSON.stringify({
          questions: [
            {
              question: 'When does componentDidMount execute?',
              options: [
                'After the component is mounted to the DOM',
                'Before the component is mounted',
                'When the component updates',
                'When the component unmounts',
              ],
              correctAnswer: 0,
            },
          ],
        }),
      },
    ],
  },
];

interface ContentModalProps {
  lesson: Lesson;
  onClose: () => void;
  onComplete: () => void;
  onRetake?: () => void;
}

function ContentModal({ lesson, onClose, onComplete, onRetake }: ContentModalProps) {
  const [isCompleted, setIsCompleted] = useState(lesson.isCompleted);

  const handleComplete = () => {
    setIsCompleted(true);
    onComplete();
  };

  const handleRetake = () => {
    setIsCompleted(false);
    if (onRetake) onRetake();
  };

  const renderContent = () => {
    switch (lesson.type) {
      case 'video':
        return (
          <div className="space-y-4">
            <div className="aspect-video">
              <iframe
                src={lesson.content}
                className="h-full w-full rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            {!isCompleted ? (
              <Button className="w-full" onClick={handleComplete}>
                Mark as Completed
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button variant="secondary" className="w-full" onClick={handleRetake}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Watch Again
                </Button>
                <Button className="w-full" onClick={onClose}>
                  Continue
                </Button>
              </div>
            )}
          </div>
        );
      case 'text':
        return (
          <div className="space-y-4">
            <div className="prose prose-invert max-w-none">
              {lesson.content.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4 text-gray-300">
                  {paragraph}
                </p>
              ))}
            </div>
            {!isCompleted ? (
              <Button className="w-full" onClick={handleComplete}>
                Mark as Completed
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button variant="secondary" className="w-full" onClick={handleRetake}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Read Again
                </Button>
                <Button className="w-full" onClick={onClose}>
                  Continue
                </Button>
              </div>
            )}
          </div>
        );
      case 'quiz':
        const quiz = JSON.parse(lesson.content);
        return (
          <Quiz
            questions={quiz.questions}
            onClose={onClose}
            onComplete={handleComplete}
            isCompleted={isCompleted ?? false}
            onRetake={handleRetake}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-xl bg-gray-800 p-6">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
        >
          <X className="h-6 w-6" />
        </button>
        <div className="mb-6">
          <h2 className="text-2xl font-bold">{lesson.title}</h2>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            {lesson.type === 'video' && <Video className="h-4 w-4" />}
            {lesson.type === 'text' && <FileText className="h-4 w-4" />}
            {lesson.type === 'quiz' && <CheckSquare className="h-4 w-4" />}
            <span>{lesson.type.charAt(0).toUpperCase() + lesson.type.slice(1)} Lesson</span>
            <span>•</span>
            <span>{lesson.duration}</span>
          </div>
        </div>
        {renderContent()}
      </div>
    </div>
  );
}

export function CourseContent({ courseTitle }: { courseTitle: string }) {
  const [openSections, setOpenSections] = useState<number[]>([0]);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());

  const calculateProgress = () => {
    const totalLessons = courseSections.reduce((total, section) => total + section.lessons.length, 0);
    const completedCount = completedLessons.size;
    return Math.round((completedCount / totalLessons) * 100);
  };

  const handleLessonComplete = async (lessonTitle: string) => {
    const newCompletedLessons = new Set([...completedLessons, lessonTitle]);
    setCompletedLessons(newCompletedLessons);
    
    const progress = calculateProgress();
    const currentSection = courseSections.find(section => 
      section.lessons.some(lesson => lesson.title === lessonTitle)
    );
    const currentModule = currentSection ? currentSection.title : 'Unknown';

    try {
      await updateCourseProgress(courseTitle, progress, currentModule);
    } catch (error) {
      console.error('Error updating course progress:', error);
    }
  };

  const handleLessonRetake = async (lessonTitle: string) => {
    const newCompletedLessons = new Set(completedLessons);
    newCompletedLessons.delete(lessonTitle);
    setCompletedLessons(newCompletedLessons);

    const progress = calculateProgress();
    const currentSection = courseSections.find(section => 
      section.lessons.some(lesson => lesson.title === lessonTitle)
    );
    const currentModule = currentSection ? currentSection.title : 'Unknown';

    try {
      await updateCourseProgress(courseTitle, progress, currentModule);
    } catch (error) {
      console.error('Error updating course progress:', error);
    }
  };

  const toggleSection = (index: number) => {
    setOpenSections(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <>
      <div className="mb-8 rounded-xl bg-gray-800 p-6">
        <h2 className="mb-6 text-2xl font-bold text-white">Course Content</h2>
        
        <div className="space-y-4">
          {courseSections.map((section, sectionIndex) => (
            <div key={section.title} className="rounded-lg bg-gray-700/50">
              <button
                onClick={() => toggleSection(sectionIndex)}
                className="flex w-full items-center justify-between p-4 text-left focus:outline-none focus:ring-2 focus:ring-green-500"
                aria-expanded={openSections.includes(sectionIndex)}
              >
                <div className="flex items-center gap-2">
                  {openSections.includes(sectionIndex) ? (
                    <ChevronUp className="h-5 w-5 text-green-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-green-500" />
                  )}
                  <span className="font-medium text-white">{section.title}</span>
                </div>
                <span className="text-sm text-gray-400">
                  {section.lessons.length} lessons
                </span>
              </button>
              
              <div
                className={cn(
                  'overflow-hidden transition-all duration-300 ease-in-out',
                  openSections.includes(sectionIndex) ? 'max-h-96' : 'max-h-0'
                )}
              >
                <div className="space-y-1 p-4 pt-0">
                  {section.lessons.map((lesson) => (
                    <button
                      key={lesson.title}
                      onClick={() => lesson.isPreview && setSelectedLesson(lesson)}
                      className="flex w-full items-center justify-between rounded-lg p-3 hover:bg-gray-700"
                      disabled={!lesson.isPreview}
                    >
                      <div className="flex items-center gap-3">
                        {lesson.type === 'video' && <Video className="h-4 w-4 text-green-500" />}
                        {lesson.type === 'text' && <FileText className="h-4 w-4 text-green-500" />}
                        {lesson.type === 'quiz' && <CheckSquare className="h-4 w-4 text-green-500" />}
                        {!lesson.isPreview && <Lock className="h-4 w-4 text-gray-400" />}
                        <span className={cn(
                          'text-sm',
                          completedLessons.has(lesson.title) ? 'text-gray-400 line-through' : 'text-white'
                        )}>
                          {lesson.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {lesson.isPreview && (
                          <span className="rounded-full bg-green-500/10 px-2 py-1 text-xs text-green-500">
                            Preview
                          </span>
                        )}
                        {completedLessons.has(lesson.title) && (
                          <span className="rounded-full bg-green-500/10 px-2 py-1 text-xs text-green-500">
                            Completed
                          </span>
                        )}
                        <span className="text-sm text-gray-400">
                          {lesson.duration}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedLesson && (
        <ContentModal
          lesson={selectedLesson}
          onClose={() => setSelectedLesson(null)}
          onComplete={() => handleLessonComplete(selectedLesson.title)}
          onRetake={() => handleLessonRetake(selectedLesson.title)}
        />
      )}
    </>
  );
}