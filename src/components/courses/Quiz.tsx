import { useState, useEffect } from 'react';
import { Button } from '../Button';
import { cn } from '../../utils/cn';
import { RefreshCw } from 'lucide-react';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

interface QuizProps {
  questions: Question[];
  onClose: () => void;
  onComplete: () => void;
  isCompleted: boolean;
  onRetake: () => void;
}

export function Quiz({ questions, onClose, onComplete, isCompleted, onRetake }: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(Array(questions.length).fill(-1));
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState<{ score: number; total: number; percentage: number } | null>(null);

  useEffect(() => {
    if (showResults && !isCompleted) {
      const result = calculateScore();
      setScore(result);
      if (result.percentage >= 70) {
        onComplete();
      }
    }
  }, [showResults, isCompleted, onComplete]);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const calculateScore = () => {
    const correctAnswers = selectedAnswers.reduce((count, answer, index) => {
      return count + (answer === questions[index].correctAnswer ? 1 : 0);
    }, 0);
    return {
      score: correctAnswers,
      total: questions.length,
      percentage: Math.round((correctAnswers / questions.length) * 100),
    };
  };

  if (showResults) {
    const result = score || calculateScore();
    const passed = result.percentage >= 70;

    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold">Quiz Results</h3>
          <div className="mx-auto my-6 h-32 w-32 rounded-full border-4 border-green-500 flex items-center justify-center">
            <span className="text-3xl font-bold">{result.percentage}%</span>
          </div>
          <p className="text-lg">
            You got {result.score} out of {result.total} questions correct!
          </p>
          <p className={cn('text-lg font-medium', passed ? 'text-green-500' : 'text-red-500')}>
            {passed ? 'Congratulations! You passed!' : 'Keep practicing and try again!'}
          </p>
        </div>

        <div className="space-y-4">
          {questions.map((question, index) => (
            <div
              key={index}
              className={cn(
                'rounded-lg p-4',
                selectedAnswers[index] === question.correctAnswer
                  ? 'bg-green-500/10'
                  : 'bg-red-500/10'
              )}
            >
              <p className="font-medium mb-2">{question.question}</p>
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

        <div className="flex gap-2">
          <Button variant="secondary" className="w-full" onClick={onRetake}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Retake Quiz
          </Button>
          <Button className="w-full" onClick={onClose}>
            Continue
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">
          Question {currentQuestionIndex + 1} of {questions.length}
        </h3>
        <div className="text-sm text-gray-400">
          Progress: {Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%
        </div>
      </div>

      <div className="h-2 bg-gray-700 rounded-full">
        <div
          className="h-full bg-green-500 rounded-full transition-all duration-300"
          style={{
            width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
          }}
        />
      </div>

      <div className="space-y-4">
        <p className="text-lg">{questions[currentQuestionIndex].question}</p>
        <div className="space-y-3">
          {questions[currentQuestionIndex].options.map((option, index) => (
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

      <div className="flex justify-between">
        <Button
          variant="secondary"
          onClick={() => currentQuestionIndex > 0 && setCurrentQuestionIndex(currentQuestionIndex - 1)}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </Button>
        <Button
          onClick={() => {
            if (currentQuestionIndex === questions.length - 1) {
              setShowResults(true);
            } else {
              setCurrentQuestionIndex(currentQuestionIndex + 1);
            }
          }}
          disabled={selectedAnswers[currentQuestionIndex] === -1}
        >
          {currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
        </Button>
      </div>
    </div>
  );
}