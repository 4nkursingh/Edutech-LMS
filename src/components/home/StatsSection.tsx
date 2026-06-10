import React from 'react';
import { BookOpen, Users, Trophy } from 'lucide-react';

export function StatsSection() {
  return (
    <section className="border-t border-gray-800 bg-black/50 py-16 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <StatItem
            icon={BookOpen}
            value="500+"
            label="Online Courses"
          />
          <StatItem
            icon={Users}
            value="50k+"
            label="Active Students"
          />
          <StatItem
            icon={Trophy}
            value="99%"
            label="Success Rate"
          />
        </div>
      </div>
    </section>
  );
}

interface StatItemProps {
  icon: React.ElementType;
  value: string;
  label: string;
}

function StatItem({ icon: Icon, value, label }: StatItemProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="rounded-lg bg-green-500/10 p-3">
        <Icon className="h-8 w-8 text-green-500" />
      </div>
      <div>
        <h3 className="text-3xl font-bold">{value}</h3>
        <p className="text-gray-400">{label}</p>
      </div>
    </div>
  );
}