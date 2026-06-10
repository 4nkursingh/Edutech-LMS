import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { Users, Target, Shield, Award } from 'lucide-react';

const values = [
  {
    title: 'Student-Centered Learning',
    description: 'We put our students first, ensuring personalized learning experiences that cater to individual needs and goals.',
    icon: Users,
  },
  {
    title: 'Excellence in Education',
    description: 'Our commitment to quality education is unwavering, with expert instructors and industry-relevant curriculum.',
    icon: Target,
  },
  {
    title: 'Trust and Reliability',
    description: 'We maintain high standards of integrity and transparency in all our educational offerings.',
    icon: Shield,
  },
  {
    title: 'Innovation',
    description: 'We continuously evolve our teaching methods and technology to provide cutting-edge learning experiences.',
    icon: Award,
  },
];

export function AboutPage() {
  return (
    <>
      <PageHeader
        title="About EduTech"
        description="Empowering learners worldwide with quality education and innovative learning solutions."
        image="https://images.unsplash.com/photo-1524178232363-1fb2b075b655"
      />
      
      {/* Mission Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-bold">Our Mission</h2>
              <p className="text-lg text-gray-400">
                At EduTech, we're dedicated to making quality education accessible to everyone. 
                Our platform connects ambitious learners with expert instructors, fostering a 
                community of continuous learning and professional growth.
              </p>
            </div>
            <div>
              <h2 className="mb-6 text-3xl font-bold">Our Vision</h2>
              <p className="text-lg text-gray-400">
                We envision a world where geographic and economic barriers to education no longer exist. 
                Through technology and innovation, we're building a future where anyone can access 
                the skills they need to succeed in their chosen career path.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="border-t border-gray-800 bg-black/50 py-20 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-3xl font-bold">Our Core Values</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ title, description, icon: Icon }) => (
              <div
                key={title}
                className="rounded-xl bg-gray-800 p-6 text-center"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
                  <Icon className="h-6 w-6 text-green-500" />
                </div>
                <h3 className="mb-2 text-xl font-bold">{title}</h3>
                <p className="text-gray-400">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-3xl font-bold">Our Leadership Team</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: 'John Smith',
                role: 'CEO & Founder',
                image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
              },
              {
                name: 'Sarah Johnson',
                role: 'Head of Education',
                image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
              },
              {
                name: 'Michael Chen',
                role: 'CTO',
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
              },
            ].map(({ name, role, image }) => (
              <div
                key={name}
                className="group overflow-hidden rounded-xl bg-gray-800 p-6 text-center"
              >
                <div className="mb-4 overflow-hidden rounded-full">
                  <img
                    src={image}
                    alt={name}
                    className="h-32 w-32 object-cover transition-transform group-hover:scale-110"
                  />
                </div>
                <h3 className="text-xl font-bold">{name}</h3>
                <p className="text-gray-400">{role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}