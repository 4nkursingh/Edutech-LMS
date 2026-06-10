import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Section } from '../layout/Section';

const faqs = [
  {
    question: 'How do I get started with EduTech?',
    answer: 'Getting started is easy! Simply create an account, browse our course catalog, and enroll in any course that interests you. You can begin learning immediately after enrollment.',
  },
  {
    question: 'Are the courses self-paced?',
    answer: 'Yes, all our courses are self-paced. You can learn at your own speed and access the course content 24/7. This flexibility allows you to balance your learning with other commitments.',
  },
  {
    question: 'Do I get a certificate upon completion?',
    answer: 'Yes, youll receive a verified certificate of completion for each course you finish. Our certificates are recognized by leading companies and can be shared on LinkedIn.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, PayPal, and various local payment methods. We also offer flexible payment plans for some courses.',
  },
  {
    question: 'Can I access courses on mobile devices?',
    answer: 'Yes, our platform is fully responsive and works on all devices. You can access your courses through our website or download our mobile app for offline learning.',
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Section>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto max-w-3xl text-center"
      >
        <h2 className="mb-4 text-4xl font-bold">Frequently Asked Questions</h2>
        <p className="mb-12 text-gray-400">
          Find answers to common questions about our platform and courses
        </p>
      </motion.div>

      <div className="mx-auto max-w-3xl space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="overflow-hidden rounded-xl bg-gray-800"
          >
            <motion.button
              className="flex w-full items-center justify-between p-6 text-left"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
            >
              <span className="text-lg font-medium">{faq.question}</span>
              <motion.span
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="h-5 w-5 text-gray-400" />
              </motion.span>
            </motion.button>

            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="border-t border-gray-700 p-6 text-gray-400">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}