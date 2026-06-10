import React, { useState } from 'react';
import { Button } from '../Button';
import { cn } from '../../utils/cn';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface TestQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

interface CourseTestProps {
  test: {
    id: number;
    title: string;
    questions: TestQuestion[];
    timeLimit: string;
    passingScore: string;
  };
  onClose: () => void;
}

export function CourseTest({ test, onClose }: CourseTestProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(
    Array(test.questions.length).fill(-1)
  );
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(() => {
    const [minutes] = test.timeLimit.split(' ');
    return parseInt(minutes) * 60;
  });

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setShowResults(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const calculateScore = () => {
    const correctAnswers = selectedAnswers.reduce((count, answer, index) => {
      return count + (answer === test.questions[index].correctAnswer ? 1 : 0);
    }, 0);
    const percentage = Math.round((correctAnswers / test.questions.length) * 100);
    const passingPercentage = parseInt(test.passingScore);
    return {
      score: correctAnswers,
      total: test.questions.length,
      percentage,
      passed: percentage >= passingPercentage,
    };
  };

  if (showResults) {
    const { score, total, percentage, passed } = calculateScore();
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <div className="w-full max-w-2xl rounded-xl bg-gray-800 p-6">
          <div className="space-y-6 text-center">
            <h3 className="text-2xl font-bold">Test Results</h3>
            <div className="relative mx-auto h-32 w-32">
              <div className="absolute inset-0 flex items-center justify-center">
                {passed ? (
                  <CheckCircle className="h-12 w-12 text-green-500" />
                ) : (
                  <AlertCircle className="h-12 w-12 text-red-500" />
                )}
              </div>
              <svg className="h-full w-full" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke={passed ? '#22c55e' : '#ef4444'}
                  strokeWidth="3"
                  strokeDasharray={`${percentage}, 100`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold">{percentage}%</span>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-lg font-medium">
                You got {score} out of {total} questions correct
              </p>
              <p className={passed ? 'text-green-500' : 'text-red-500'}>
                {passed ? 'Congratulations! You passed!' : 'You did not pass. Try again!'}
              </p>
            </div>
            <div className="space-y-4">
              {test.questions.map((question, index) => (
                <div
                  key={index}
                  className={cn(
                    'rounded-lg p-4 text-left',
                    selectedAnswers[index] === question.correctAnswer
                      ? 'bg-green-500/10'
                      : 'bg-red-500/10'
                  )}
                >
                  <p className="mb-2 font-medium">{question.question}</p>
                  <p className="text-sm">
                    Your answer: {question.options[selectedAnswers[index]]}
                  </p>
                  {selectedAnswers[index] !== question.correctAnswer && (
                    <p className="text-sm text-green-500">
                      Correct answer: {question.options[question.correctAnswer]}
                    </p>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="secondary" onClick={onClose}>
                Close
              </Button>
              {!passed && (
                <Button onClick={() => window.location.reload()}>
                  Retake Test
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl rounded-xl bg-gray-800 p-6">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xl font-bold">{test.title}</h3>
          <div className="text-lg font-medium">
            Time Left: <span className="text-green-500">{formatTime(timeLeft)}</span>
          </div>
        </div>

        <div className="mb-4 flex items-center justify-between text-sm text-gray-400">
          <span>
            Question {currentQuestionIndex + 1} of {test.questions.length}
          </span>
          <span>
            Progress: {Math.round(((currentQuestionIndex + 1) / test.questions.length) * 100)}%
          </span>
        </div>

        <div className="mb-6 h-2 overflow-hidden rounded-full bg-gray-700">
          <div
            className="h-full bg-green-500 transition-all duration-300"
            style={{
              width: `${((currentQuestionIndex + 1) / test.questions.length) * 100}%`,
            }}
          />
        </div>

        <div className="space-y-6">
          <p className="text-lg">{test.questions[currentQuestionIndex].question}</p>
          <div className="space-y-3">
            {test.questions[currentQuestionIndex].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={cn(
                  'w-full rounded-lg p-4 text-left transition-colors',
                  selectedAnswers[currentQuestionIndex] === index
                    ? 'bg-green-500 text-black'
                    : 'bg-gray-700 hover:bg-gray-600'
                )}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-between">
          <Button
            variant="secondary"
            onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </Button>
          <Button
            onClick={() => {
              if (currentQuestionIndex === test.questions.length - 1) {
                setShowResults(true);
              } else {
                setCurrentQuestionIndex((prev) => prev + 1);
              }
            }}
            disabled={selectedAnswers[currentQuestionIndex] === -1}
          >
            {currentQuestionIndex === test.questions.length - 1 ? 'Finish Test' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
}