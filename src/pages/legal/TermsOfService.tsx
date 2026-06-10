import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Users, Shield, Scale, AlertCircle, ChevronRight, Check } from 'lucide-react';
import { PageHeader } from '../../components/PageHeader';
import { Section } from '../../components/layout/Section';
import { Button } from '../../components/Button';

const termsOfServiceSections = [
  {
    title: 'User Agreement',
    icon: Users,
    content: [
      {
        subtitle: 'Account Responsibilities',
        text: `By creating an account, you agree to:

• Maintain accurate account information
• Keep your password secure
• Not share your account with others
• Be responsible for all account activity`,
        important: true
      },
      {
        subtitle: 'Age Requirements',
        text: 'You must be at least 18 years old to create an account.',
        important: false
      }
    ]
  },
  {
    title: 'Content Usage',
    icon: FileText,
    content: [
      {
        subtitle: 'Intellectual Property',
        text: `All content on our platform is protected by copyright:

• Course materials are for personal use only
• No redistribution without permission
• No unauthorized copying or sharing`,
        important: true
      },
      {
        subtitle: 'User-Generated Content',
        text: 'You retain rights to content you create while granting us license to use it.',
        important: false
      }
    ]
  },
  {
    title: 'Platform Rules',
    icon: Shield,
    content: [
      {
        subtitle: 'Code of Conduct',
        text: `Users must:

• Respect other users
• Not engage in harassment
• Not post inappropriate content
• Follow course guidelines`,
        important: true
      },
      {
        subtitle: 'Technical Requirements',
        text: 'Users are responsible for maintaining compatible devices and internet connections.',
        important: false
      }
    ]
  },
  {
    title: 'Legal Terms',
    icon: Scale,
    content: [
      {
        subtitle: 'Limitation of Liability',
        text: 'We provide services "as is" without warranties.',
        important: true
      },
      {
        subtitle: 'Dispute Resolution',
        text: 'All disputes will be resolved through arbitration.',
        important: true
      }
    ]
  }
];

export function TermsOfService() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showAcceptance, setShowAcceptance] = useState(false);

  const handleAcceptTerms = () => {
    setAcceptedTerms(true);
    setShowAcceptance(true);
    setTimeout(() => setShowAcceptance(false), 3000);
  };

  return (
    <>
      <PageHeader
        title="Terms of Service"
        description="Understanding your rights and responsibilities while using our platform"
        image="https://images.unsplash.com/photo-1450101499163-c8848c66ca85"
      />
      
      <Section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-4xl"
        >
          {/* Version Banner */}
          <div className="mb-8 rounded-xl bg-gray-800 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Version</p>
                <p className="font-medium">3.0 - March 15, 2024</p>
              </div>
              <Button
                onClick={handleAcceptTerms}
                disabled={acceptedTerms}
              >
                {acceptedTerms ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Terms Accepted
                  </>
                ) : (
                  'Accept Terms'
                )}
              </Button>
            </div>
          </div>

          {/* Terms Sections */}
          <div className="space-y-6">
            {termsOfServiceSections.map((section) => (
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
                      <div className="space-y-6 p-6 pt-0">
                        {section.content.map((item) => (
                          <motion.div
                            key={item.subtitle}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={item.important ? 'relative overflow-hidden rounded-lg bg-gray-700/50 p-6' : ''}
                          >
                            {item.important && (
                              <div className="absolute right-2 top-2">
                                <AlertCircle className="h-5 w-5 text-yellow-500" />
                              </div>
                            )}
                            <h3 className="mb-3 text-lg font-bold">{item.subtitle}</h3>
                            <div className="prose prose-invert max-w-none">
                              <p className="whitespace-pre-line text-gray-300">{item.text}</p>
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

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12 rounded-xl bg-gradient-to-r from-green-500 to-green-600 p-8 text-black"
          >
            <h2 className="mb-4 text-xl font-bold">Need Legal Assistance?</h2>
            <p className="mb-6">Contact our legal team for any questions about these terms.</p>
            <Button className="bg-black text-white hover:bg-gray-900">
              Contact Legal Team
            </Button>
          </motion.div>
        </motion.div>

        {/* Acceptance Notification */}
        <AnimatePresence>
          {showAcceptance && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-8 right-8 flex items-center gap-2 rounded-lg bg-green-500 px-4 py-2 text-black"
            >
              <Check className="h-5 w-5" />
              Terms of Service accepted successfully!
            </motion.div>
          )}
        </AnimatePresence>
      </Section>
    </>
  );
}