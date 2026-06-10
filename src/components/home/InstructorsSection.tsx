
import { motion } from 'framer-motion';
import { Star, Users, Award } from 'lucide-react';
import { Section } from '../layout/Section';

const instructors = [
  {
    name: 'Sarah Johnson',
    role: 'Senior Web Developer',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    rating: 4.9,
    students: '15,000+',
    courses: 12,
  },
  {
    name: 'Michael Chen',
    role: 'Data Science Expert',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    rating: 4.8,
    students: '12,000+',
    courses: 8,
  },
  {
    name: 'Emma Davis',
    role: 'UI/UX Designer',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
    rating: 4.9,
    students: '18,000+',
    courses: 15,
  },
  {
    name: 'James Wilson',
    role: 'Mobile Developer',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    rating: 4.7,
    students: '10,000+',
    courses: 10,
  },
];

export function InstructorsSection() {
  return (
    <Section className="bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 text-center"
      >
        <h2 className="mb-4 text-4xl font-bold">Learn from the Best</h2>
        <p className="mx-auto max-w-2xl text-gray-400">
          Our instructors are industry experts with years of real-world experience
        </p>
      </motion.div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {instructors.map((instructor, index) => (
          <motion.div
            key={instructor.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -8 }}
            className="group relative overflow-hidden rounded-xl bg-gray-800/50 p-6 text-center backdrop-blur-sm"
          >
            {/* Profile Image */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
              className="relative mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full"
            >
              <img
                src={instructor.image}
                alt={instructor.name}
                className="h-full w-full object-cover"
              />
              <motion.div
                initial={false}
                animate={{ opacity: 0 }}
                whileHover={{ opacity: 0.4 }}
                className="absolute inset-0 bg-gradient-to-b from-green-500/50 to-transparent"
              />
            </motion.div>

            {/* Instructor Info */}
            <h3 className="mb-1 text-lg font-bold">{instructor.name}</h3>
            <p className="mb-4 text-sm text-gray-400">{instructor.role}</p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2">
              <div className="rounded-lg bg-gray-700/50 p-2">
                <Star className="mx-auto mb-1 h-4 w-4 text-yellow-500" />
                <p className="text-sm font-medium">{instructor.rating}</p>
                <p className="text-xs text-gray-400">Rating</p>
              </div>
              <div className="rounded-lg bg-gray-700/50 p-2">
                <Users className="mx-auto mb-1 h-4 w-4 text-green-500" />
                <p className="text-sm font-medium">{instructor.students}</p>
                <p className="text-xs text-gray-400">Students</p>
              </div>
              <div className="rounded-lg bg-gray-700/50 p-2">
                <Award className="mx-auto mb-1 h-4 w-4 text-blue-500" />
                <p className="text-sm font-medium">{instructor.courses}</p>
                <p className="text-xs text-gray-400">Courses</p>
              </div>
            </div>

            {/* Hover Effect */}
            <motion.div
              initial={false}
              animate={{ opacity: 0 }}
              whileHover={{ opacity: 0.1 }}
              className="absolute inset-0 bg-gradient-to-b from-green-500 to-transparent"
            />
          </motion.div>
        ))}
      </div>
    </Section>
  );
}