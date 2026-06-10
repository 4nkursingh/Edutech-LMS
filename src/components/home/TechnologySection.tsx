import React from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Layout, Smartphone, Cloud, Lock } from 'lucide-react';
import { Section } from '../layout/Section';

const technologies = [
  {
    icon: Code,
    title: 'Web Development',
    description: 'HTML, CSS, JavaScript, React, Node.js',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: Database,
    title: 'Data Science',
    description: 'Python, R, SQL, Machine Learning',
    color: 'from-purple-500 to-purple-600',
  },
  {
    icon: Layout,
    title: 'UI/UX Design',
    description: 'Figma, Adobe XD, Design Systems',
    color: 'from-pink-500 to-pink-600',
  },
  {
    icon: Smartphone,
    title: 'Mobile Development',
    description: 'React Native, Flutter, iOS, Android',
    color: 'from-orange-500 to-orange-600',
  },
  {
    icon: Cloud,
    title: 'Cloud Computing',
    description: 'AWS, Azure, Google Cloud',
    color: 'from-cyan-500 to-cyan-600',
  },
  {
    icon: Lock,
    title: 'Cybersecurity',
    description: 'Network Security, Ethical Hacking',
    color: 'from-red-500 to-red-600',
  },
];

export function TechnologySection() {
  return (
    <Section className="relative overflow-hidden">
      {/* Background Elements */}
      <motion.div
        animate={{ 
          rotate: 360,
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute right-0 top-0 h-96 w-96 rounded-full bg-gradient-to-r from-green-500/10 to-blue-500/10 blur-3xl"
      />
      <motion.div
        animate={{ 
          rotate: -360,
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 25, repeat: Infinity }}
        className="absolute -left-48 -top-48 h-96 w-96 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-3xl"
      />

      <div className="relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold">Technologies You'll Master</h2>
          <p className="mx-auto max-w-2xl text-gray-400">
            Learn the most in-demand technologies and tools used by leading companies worldwide
          </p>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-xl bg-gray-800/50 p-6 backdrop-blur-sm"
            >
              <div className="relative z-10">
                <div className={`mb-4 inline-block rounded-xl bg-gradient-to-br ${tech.color} p-3`}>
                  <tech.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mb-2 text-xl font-bold">{tech.title}</h3>
                <p className="text-gray-400">{tech.description}</p>
              </div>

              {/* Hover Effects */}
              <motion.div
                initial={false}
                animate={{ opacity: 0.5 }}
                whileHover={{ opacity: 0.8 }}
                className={`absolute inset-0 -z-10 bg-gradient-to-br ${tech.color} opacity-0 blur transition-opacity group-hover:opacity-5`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}