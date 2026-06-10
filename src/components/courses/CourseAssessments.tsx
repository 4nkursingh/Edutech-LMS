import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Target, Award, Timer, AlertTriangle } from 'lucide-react';
import { Button } from '../Button';
import { CourseTest } from './CourseTest';

interface CourseAssessmentsProps {
  courseId: string;
}

const assessmentTypes = [
  {
    id: 'quiz',
    title: 'Quick Quiz',
    icon: Brain,
    description: 'Test your knowledge with quick questions',
    duration: '10 minutes',
    questions: 10,
    test: {
      id: 'quiz-1',
      title: 'React Fundamentals Quiz',
      questions: [
        {
          question: 'What is the virtual DOM?',
          options: [
            'A lightweight copy of the actual DOM',
            'A browser extension',
            'A JavaScript library',
            'A programming language'
          ],
          correctAnswer: 0
        },
        {
          question: 'What is JSX?',
          options: [
            'A database query language',
            'A styling framework',
            'A JavaScript XML syntax',
            'A testing library'
          ],
          correctAnswer: 2
        }
      ],
      timeLimit: '10 minutes',
      passingScore: '60%'
    }
  },
  {
    id: 'practice',
    title: 'Practice Test',
    icon: Target,
    description: 'Practice with comprehensive questions',
    duration: '30 minutes',
    questions: 25,
    test: {
      id: 'practice-1',
      title: 'React Advanced Concepts',
      questions: [
        {
          question: 'What is the purpose of React.memo()?',
          options: [
            'To memoize component rendering',
            'To create memory leaks',
            'To handle form data',
            'To manage routing'
          ],
          correctAnswer: 0
        },
        {
          question: 'When should you use useCallback?',
          options: [
            'For all functions',
            'Never',
            'For memoized child components',
            'For styling components'
          ],
          correctAnswer: 2
        }
      ],
      timeLimit: '30 minutes',
      passingScore: '70%'
    }
  },
  {
    id: 'certification',
    title: 'Certification Exam',
    icon: Award,
    description: 'Final exam for course certification',
    duration: '60 minutes',
    questions: 50,
    test: {
      id: 'cert-1',
      title: 'React Developer Certification',
      questions: [
        {
          question: 'What is the correct way to handle side effects in React?',
          options: [
            'Using useEffect hook',
            'Using console.log',
            'Using setTimeout directly',
            'Using global variables'
          ],
          correctAnswer: 0
        },
        {
          question: 'How do you optimize React performance?',
          options: [
            'By using more components',
            'By using useMemo and useCallback appropriately',
            'By avoiding hooks',
            'By using class components'
          ],
          correctAnswer: 1
        }
      ],
      timeLimit: '60 minutes',
      passingScore: '80%'
    }
  }
];

export function CourseAssessments({ }: CourseAssessmentsProps) {
  const [selectedTest, setSelectedTest] = useState<any | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [testToStart, setTestToStart] = useState<any | null>(null);

  const handleStartTest = (test: any) => {
    setTestToStart(test);
    setShowConfirmation(true);
  };

  const confirmStartTest = () => {
    setSelectedTest(testToStart);
    setShowConfirmation(false);
    setTestToStart(null);
  };

  return (
    <div className="space-y-8">
      {/* Assessment Types */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {assessmentTypes.map((type, index) => (
          <motion.div
            key={type.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -8 }}
            className="group relative overflow-hidden rounded-xl bg-gray-800 p-6"
          >
            {/* Background Animation */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />

            <div className="relative z-10">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/10">
                <type.icon className="h-6 w-6 text-green-500" />
              </div>

              <h3 className="mb-2 text-xl font-bold">{type.title}</h3>
              <p className="mb-4 text-sm text-gray-400">{type.description}</p>

              <div className="mb-4 space-y-2 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Timer className="h-4 w-4" />
                  {type.duration}
                </div>
                <div className="flex items-center gap-2">
                  <Brain className="h-4 w-4" />
                  {type.questions} questions
                </div>
              </div>

              <Button
                onClick={() => handleStartTest(type.test)}
                className="w-full"
              >
                Start {type.title}
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Test Modal */}
      <AnimatePresence>
        {selectedTest && (
          <CourseTest
            test={selectedTest}
            onClose={() => setSelectedTest(null)}
          />
        )}
      </AnimatePresence>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-md rounded-xl bg-gray-800 p-6"
            >
              <div className="mb-4 flex items-center gap-4">
                <div className="rounded-full bg-yellow-500/10 p-3">
                  <AlertTriangle className="h-6 w-6 text-yellow-500" />
                </div>
                <h3 className="text-xl font-bold">Start Test?</h3>
              </div>

              <p className="mb-6 text-gray-400">
                Once you start the test:
                <ul className="mt-2 list-inside list-disc">
                  <li>The timer will begin immediately</li>
                  <li>You cannot pause or resume later</li>
                  <li>Leaving the page will submit your answers</li>
                </ul>
              </p>

              <div className="flex gap-4">
                <Button
                  variant="secondary"
                  className="flex-1"
                  onClick={() => setShowConfirmation(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1"
                  onClick={confirmStartTest}
                >
                  Start Test
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}