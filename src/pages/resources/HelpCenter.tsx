import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MessageSquare, Mail, Video, Book, ChevronRight, ArrowRight } from 'lucide-react';
import { PageHeader } from '../../components/PageHeader';
import { Section } from '../../components/layout/Section';
import { Button } from '../../components/Button';

const helpCategories = [
  {
    title: 'Getting Started',
    icon: Book,
    questions: [
      {
        question: 'How do I create an account?',
        answer: 'Click the "Sign Up" button in the top right corner and follow the registration process. You\'ll need to provide your email and create a password.'
      },
      {
        question: 'How do I enroll in a course?',
        answer: 'Browse our course catalog, select a course you\'re interested in, and click the "Enroll Now" button. You can pay using various payment methods.'
      }
    ]
  },
  {
    title: 'Technical Support',
    icon: Video,
    questions: [
      {
        question: 'Video playback issues',
        answer: 'If you\'re experiencing video playback issues, try: \n1. Checking your internet connection\n2. Clearing your browser cache\n3. Using a different browser'
      },
      {
        question: 'Mobile app problems',
        answer: 'For mobile app issues, ensure you have the latest version installed. Try logging out and back in, or reinstalling the app if problems persist.'
      }
    ]
  },
  {
    title: 'Billing & Payments',
    icon: Mail,
    questions: [
      {
        question: 'Payment methods',
        answer: 'We accept all major credit cards, PayPal, and various local payment methods. Contact support for specific payment options in your region.'
      },
      {
        question: 'Refund policy',
        answer: 'You can request a refund within 30 days of purchase if you\'re not satisfied with the course. Contact our support team to initiate the process.'
      }
    ]
  }
];

export function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);
  const [showChatbot, setShowChatbot] = useState(false);

  const filteredCategories = helpCategories.map(category => ({
    ...category,
    questions: category.questions.filter(q =>
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <>
      <PageHeader
        title="Help Center"
        description="Find answers to your questions and get the support you need"
        image="https://images.unsplash.com/photo-1600880292203-757bb62b4baf"
      />
      
      <Section>
        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="relative mx-auto max-w-2xl">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg bg-gray-800 py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </motion.div>

        {/* Help Categories */}
        <div className="grid gap-8">
          {filteredCategories.map((category) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="overflow-hidden rounded-xl bg-gray-800"
            >
              <button
                onClick={() => setExpandedCategory(
                  expandedCategory === category.title ? null : category.title
                )}
                className="flex w-full items-center justify-between p-6 text-left hover:bg-gray-700/50"
              >
                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-green-500/10 p-3">
                    <category.icon className="h-6 w-6 text-green-500" />
                  </div>
                  <h2 className="text-xl font-bold">{category.title}</h2>
                </div>
                <motion.div
                  animate={{ rotate: expandedCategory === category.title ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronRight className="h-6 w-6 text-gray-400" />
                </motion.div>
              </button>

              <AnimatePresence>
                {expandedCategory === category.title && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="space-y-4 p-6 pt-0">
                      {category.questions.map((item) => (
                        <motion.div
                          key={item.question}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="overflow-hidden rounded-lg bg-gray-700/50"
                        >
                          <button
                            onClick={() => setExpandedQuestion(
                              expandedQuestion === item.question ? null : item.question
                            )}
                            className="flex w-full items-center justify-between p-4 text-left hover:bg-gray-700/50"
                          >
                            <span className="font-medium">{item.question}</span>
                            <motion.div
                              animate={{ rotate: expandedQuestion === item.question ? 90 : 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ChevronRight className="h-4 w-4 text-gray-400" />
                            </motion.div>
                          </button>

                          <AnimatePresence>
                            {expandedQuestion === item.question && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="px-4 pb-4"
                              >
                                <p className="whitespace-pre-line text-gray-300">
                                  {item.answer}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Contact Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          <div className="rounded-xl bg-gray-800 p-6">
            <MessageSquare className="mb-4 h-8 w-8 text-green-500" />
            <h3 className="mb-2 text-lg font-bold">Live Chat</h3>
            <p className="mb-4 text-gray-400">Get instant help from our support team</p>
            <Button onClick={() => setShowChatbot(true)} className="w-full">
              Start Chat
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="rounded-xl bg-gray-800 p-6">
            <Mail className="mb-4 h-8 w-8 text-green-500" />
            <h3 className="mb-2 text-lg font-bold">Email Support</h3>
            <p className="mb-4 text-gray-400">Get help via email within 24 hours</p>
            <Button variant="secondary" className="w-full">
              Send Email
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="rounded-xl bg-gray-800 p-6">
            <Video className="mb-4 h-8 w-8 text-green-500" />
            <h3 className="mb-2 text-lg font-bold">Video Tutorials</h3>
            <p className="mb-4 text-gray-400">Learn through our video guides</p>
            <Button variant="secondary" className="w-full">
              Watch Tutorials
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </Section>

      {/* Chatbot Modal */}
      <AnimatePresence>
        {showChatbot && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-lg rounded-xl bg-gray-800 p-6"
            >
              <button
                onClick={() => setShowChatbot(false)}
                className="absolute right-4 top-4 text-gray-400 hover:text-white"
              >
                ×
              </button>
              <h3 className="mb-4 text-xl font-bold">Chat with Support</h3>
              <div className="h-96 overflow-y-auto rounded-lg bg-gray-900 p-4">
                {/* Chat messages would go here */}
                <p className="text-gray-400">How can we help you today?</p>
              </div>
              <div className="mt-4 flex gap-2">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 rounded-lg bg-gray-700 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <Button>Send</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
