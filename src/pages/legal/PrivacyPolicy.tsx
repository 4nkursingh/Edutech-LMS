import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock, Eye, Server, Bell, ChevronRight } from 'lucide-react';
import { PageHeader } from '../../components/PageHeader';
import { Section } from '../../components/layout/Section';
import { Button } from '../../components/Button';

const privacyPolicySections = [
  {
    title: 'Data Collection',
    icon: Eye,
    content: [
      {
        subtitle: 'Information We Collect',
        text: `We collect several types of information from our users:

• Personal Information: Name, email address, and profile details when you register
• Usage Data: How you interact with our platform and services
• Technical Data: IP address, browser type, and device information
• Course Progress: Your learning activities and achievements`,
      },
      {
        subtitle: 'Cookies and Tracking',
        text: 'We use cookies and similar tracking technologies to enhance your experience and collect usage data. You can control cookie settings through your browser.',
      }
    ]
  },
  {
    title: 'Data Usage',
    icon: Server,
    content: [
      {
        subtitle: 'How We Use Your Data',
        text: `Your information helps us:

• Provide and improve our services
• Personalize your learning experience
• Send relevant communications
• Analyze platform usage and trends
• Ensure platform security`,
      },
      {
        subtitle: 'Legal Basis',
        text: 'We process your data based on legitimate interests, consent, and legal obligations.',
      }
    ]
  },
  {
    title: 'Data Protection',
    icon: Shield,
    content: [
      {
        subtitle: 'Security Measures',
        text: `We implement robust security measures:

• Encryption of sensitive data
• Regular security audits
• Access controls and monitoring
• Secure data storage practices`,
      },
      {
        subtitle: 'Data Retention',
        text: 'We retain your data only as long as necessary for service provision or legal requirements.',
      }
    ]
  },
  {
    title: 'Your Rights',
    icon: Lock,
    content: [
      {
        subtitle: 'User Rights',
        text: `You have the right to:

• Access your personal data
• Request data correction
• Request data deletion
• Object to processing
• Data portability`,
      },
      {
        subtitle: 'Exercise Your Rights',
        text: 'Contact our privacy team to exercise any of your data rights.',
      }
    ]
  }
];

export function PrivacyPolicy() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [showNotification, setShowNotification] = useState(false);

  const handleUpdatePreferences = () => {
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  return (
    <>
      <PageHeader
        title="Privacy Policy"
        description="Learn how we collect, use, and protect your personal information"
        image="https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d"
      />
      
      <Section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-4xl"
        >
          {/* Last Updated Banner */}
          <div className="mb-8 rounded-xl bg-gray-800 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Last Updated</p>
                <p className="font-medium">March 15, 2024</p>
              </div>
              <Button onClick={handleUpdatePreferences}>
                Update Preferences
              </Button>
            </div>
          </div>

          {/* Policy Sections */}
          <div className="space-y-6">
            {privacyPolicySections.map((section) => (
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
                          >
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
            <h2 className="mb-4 text-xl font-bold">Questions About Privacy?</h2>
            <p className="mb-6">Contact our Data Protection Officer for any privacy-related concerns.</p>
            <Button className="bg-black text-white hover:bg-gray-900">
              Contact DPO
            </Button>
          </motion.div>
        </motion.div>

        {/* Notification */}
        <AnimatePresence>
          {showNotification && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-8 right-8 flex items-center gap-2 rounded-lg bg-green-500 px-4 py-2 text-black"
            >
              <Bell className="h-5 w-5" />
              Preferences updated successfully!
            </motion.div>
          )}
        </AnimatePresence>
      </Section>
    </>
  );
}