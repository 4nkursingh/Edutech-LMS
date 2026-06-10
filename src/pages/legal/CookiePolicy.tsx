import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, Settings, Shield, Activity, Bell, ChevronRight, Check } from 'lucide-react';
import { PageHeader } from '../../components/PageHeader';
import { Section } from '../../components/layout/Section';
import { Button } from '../../components/Button';

const cookieCategories = [
  {
    title: 'Essential Cookies',
    icon: Shield,
    required: true,
    description: 'Required for basic platform functionality',
    cookies: [
      {
        name: 'session_id',
        purpose: 'Maintains your login session',
        duration: '24 hours'
      },
      {
        name: 'csrf_token',
        purpose: 'Prevents cross-site request forgery',
        duration: 'Session'
      }
    ]
  },
  {
    title: 'Analytics Cookies',
    icon: Activity,
    required: false,
    description: 'Help us understand how users interact with our platform',
    cookies: [
      {
        name: 'ga_id',
        purpose: 'Tracks page views and user behavior',
        duration: '2 years'
      },
      {
        name: 'utm_source',
        purpose: 'Tracks traffic sources',
        duration: '30 days'
      }
    ]
  },
  {
    title: 'Preference Cookies',
    icon: Settings,
    required: false,
    description: 'Remember your settings and preferences',
    cookies: [
      {
        name: 'theme',
        purpose: 'Saves your theme preference',
        duration: '1 year'
      },
      {
        name: 'language',
        purpose: 'Remembers your language choice',
        duration: '1 year'
      }
    ]
  }
];

export function CookiePolicy() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [preferences, setPreferences] = useState<Record<string, boolean>>({
    analytics: true,
    preferences: true
  });
  const [showNotification, setShowNotification] = useState(false);

  const handleSavePreferences = () => {
    // In a real app, this would save to backend/localStorage
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  return (
    <>
      <PageHeader
        title="Cookie Policy"
        description="Understanding how we use cookies and similar technologies"
        image="https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
      />
      
      <Section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-4xl"
        >
          {/* Cookie Manager */}
          <div className="mb-8 rounded-xl bg-gray-800 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Cookie className="h-8 w-8 text-green-500" />
                <div>
                  <h2 className="text-xl font-bold">Cookie Preferences</h2>
                  <p className="text-sm text-gray-400">Manage your cookie settings</p>
                </div>
              </div>
              <Button onClick={handleSavePreferences}>
                Save Preferences
              </Button>
            </div>
          </div>

          {/* Cookie Categories */}
          <div className="space-y-6">
            {cookieCategories.map((category) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="overflow-hidden rounded-xl bg-gray-800"
              >
                <div className="flex items-center justify-between p-6">
                  <button
                    onClick={() => setExpandedCategory(
                      expandedCategory === category.title ? null : category.title
                    )}
                    className="flex flex-1 items-center gap-4 text-left"
                  >
                    <div className="rounded-lg bg-green-500/10 p-3">
                      <category.icon className="h-6 w-6 text-green-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">{category.title}</h3>
                      <p className="text-sm text-gray-400">{category.description}</p>
                    </div>
                  </button>
                  
                  <div className="flex items-center gap-4">
                    {!category.required && (
                      <label className="relative inline-flex cursor-pointer items-center">
                        <input
                          type="checkbox"
                          checked={preferences[category.title.toLowerCase().replace(' ', '_')]}
                          onChange={(e) => setPreferences({
                            ...preferences,
                            [category.title.toLowerCase().replace(' ', '_')]: e.target.checked
                          })}
                          className="peer sr-only"
                        />
                        <div className="peer h-6 w-11 rounded-full bg-gray-700 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-500 peer-checked:after:translate-x-full peer-focus:ring-2 peer-focus:ring-green-500" />
                      </label>
                    )}
                    <motion.div
                      animate={{ rotate: expandedCategory === category.title ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronRight className="h-6 w-6 text-gray-400" />
                    </motion.div>
                  </div>
                </div>

                <AnimatePresence>
                  {expandedCategory === category.title && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="space-y-4 p-6 pt-0">
                        {category.cookies.map((cookie) => (
                          <motion.div
                            key={cookie.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="rounded-lg bg-gray-700/50 p-4"
                          >
                            <div className="mb-2 flex items-center justify-between">
                              <span className="font-medium">{cookie.name}</span>
                              <span className="text-sm text-gray-400">{cookie.duration}</span>
                            </div>
                            <p className="text-sm text-gray-400">{cookie.purpose}</p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Additional Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12 rounded-xl bg-gradient-to-r from-green-500 to-green-600 p-8 text-black"
          >
            <h2 className="mb-4 text-xl font-bold">Questions About Cookies?</h2>
            <p className="mb-6">Learn more about how we use cookies and your privacy rights.</p>
            <Button className="bg-black text-white hover:bg-gray-900">
              Learn More
            </Button>
          </motion.div>
        </motion.div>

        {/* Save Notification */}
        <AnimatePresence>
          {showNotification && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-8 right-8 flex items-center gap-2 rounded-lg bg-green-500 px-4 py-2 text-black"
            >
              <Check className="h-5 w-5" />
              Cookie preferences saved successfully!
            </motion.div>
          )}
        </AnimatePresence>
      </Section>
    </>
  );
}