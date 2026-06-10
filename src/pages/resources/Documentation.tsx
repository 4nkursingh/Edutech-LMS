import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Book, Code, Terminal, ChevronRight, Copy, Check } from 'lucide-react';
import { PageHeader } from '../../components/PageHeader';
import { Section } from '../../components/layout/Section';
import { Button } from '../../components/Button';

const documentationSections = [
  {
    title: 'Getting Started',
    icon: Book,
    items: [
      {
        title: 'Platform Overview',
        content: `Our learning platform is designed to provide an immersive educational experience.
        Key features include:
        - Interactive courses
        - Progress tracking
        - Certificate generation
        - Community support`,
        codeExample: `// Example API usage
const course = await api.getCourse('course-id');
await api.enrollInCourse(course.id);`
      },
      {
        title: 'Installation Guide',
        content: 'Follow these steps to set up your development environment...',
        codeExample: `npm install @edutech/client
// or
yarn add @edutech/client`
      }
    ]
  },
  {
    title: 'API Reference',
    icon: Code,
    items: [
      {
        title: 'Authentication',
        content: 'Learn how to authenticate your requests to our API...',
        codeExample: `const client = new EduTechClient({
  apiKey: 'your-api-key'
});`
      },
      {
        title: 'Course Management',
        content: 'Explore our course management API endpoints...',
        codeExample: `// List all courses
const courses = await client.courses.list();

// Get course details
const course = await client.courses.get('course-id');`
      }
    ]
  },
  {
    title: 'CLI Tools',
    icon: Terminal,
    items: [
      {
        title: 'Command Reference',
        content: 'Explore our CLI commands for course management...',
        codeExample: `edutech create course
edutech deploy
edutech test`
      }
    ]
  }
];

export function Documentation() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});

  const filteredSections = documentationSections.map(section => ({
    ...section,
    items: section.items.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(section => section.items.length > 0);

  const copyToClipboard = async (text: string, itemTitle: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedStates({ ...copiedStates, [itemTitle]: true });
    setTimeout(() => {
      setCopiedStates(prev => ({ ...prev, [itemTitle]: false }));
    }, 2000);
  };

  return (
    <>
      <PageHeader
        title="Documentation"
        description="Comprehensive guides and documentation for our platform"
        image="https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
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
              placeholder="Search documentation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg bg-gray-800 py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </motion.div>

        {/* Documentation Sections */}
        <div className="grid gap-8">
          {filteredSections.map((section) => (
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
                    <div className="space-y-4 p-6 pt-0">
                      {section.items.map((item) => (
                        <motion.div
                          key={item.title}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="rounded-lg bg-gray-700/50 p-6"
                        >
                          <h3 className="mb-4 text-lg font-bold">{item.title}</h3>
                          <div className="prose prose-invert max-w-none">
                            <p className="mb-4 text-gray-300">{item.content}</p>
                            {item.codeExample && (
                              <div className="relative">
                                <pre className="rounded-lg bg-gray-900 p-4">
                                  <code className="text-sm text-gray-300">
                                    {item.codeExample}
                                  </code>
                                </pre>
                                <Button
                                  size="sm"
                                  variant="secondary"
                                  className="absolute right-2 top-2"
                                  onClick={() => copyToClipboard(item.codeExample, item.title)}
                                >
                                  {copiedStates[item.title] ? (
                                    <Check className="h-4 w-4 text-green-500" />
                                  ) : (
                                    <Copy className="h-4 w-4" />
                                  )}
                                </Button>
                              </div>
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

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 rounded-xl bg-gradient-to-r from-green-500 to-green-600 p-8"
        >
          <h2 className="mb-6 text-xl font-bold text-black">Need More Help?</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Button className="w-full bg-black text-white hover:bg-gray-900">
              Join Discord
            </Button>
            <Button className="w-full bg-black text-white hover:bg-gray-900">
              GitHub Repo
            </Button>
            <Button className="w-full bg-black text-white hover:bg-gray-900">
              Video Tutorials
            </Button>
            <Button className="w-full bg-black text-white hover:bg-gray-900">
              Contact Support
            </Button>
          </div>
        </motion.div>
      </Section>
    </>
  );
}