import React from 'react';
import { BookOpen, Clock, Award, BarChart, TrendingUp, Play, Star } from 'lucide-react';
import { Button } from '../Button';
import { CircularProgress } from './CircularProgress';
import { ProfileSection } from './ProfileSection';
import { Course } from '../../types/course';

interface OverviewTabProps {
  user: any;
  userCourses: any[];
  recommendedCourses: Course[];
  resumeCourse: (courseTitle: string, module: string) => void;
}

export function OverviewTab({ user, userCourses, recommendedCourses, resumeCourse }: OverviewTabProps) {
  const overallProgress = Math.round(
    userCourses.length > 0
      ? userCourses.reduce((acc, course) => acc + course.progress, 0) / userCourses.length
      : 0
  );

  return (
    <>
      <ProfileSection user={user} />

      {/* Progress Overview */}
      <div className="mb-8 rounded-xl bg-gray-800 p-6">
        <h2 className="mb-6 text-xl font-bold">Overall Progress</h2>
        <div className="flex items-center gap-8">
          <CircularProgress percentage={overallProgress}>
            <div className="text-center">
              <span className="text-3xl font-bold">{overallProgress}%</span>
              <p className="text-sm text-gray-400">Complete</p>
            </div>
          </CircularProgress>
          <div className="flex-1 space-y-4">
            <div>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span>Courses Completed</span>
                <span className="text-green-500">
                  {userCourses.filter(c => c.completed).length}/{userCourses.length}
                </span>
              </div>
              <div className="h-2 rounded-full bg-gray-700">
                <div
                  className="h-full rounded-full bg-green-500"
                  style={{
                    width: userCourses.length > 0
                      ? `${(userCourses.filter(c => c.completed).length / userCourses.length) * 100}%`
                      : '0%'
                  }}
                />
              </div>
            </div>
            <div>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span>Hours Spent</span>
                <span className="text-green-500">12.5 hrs</span>
              </div>
              <div className="h-2 rounded-full bg-gray-700">
                <div
                  className="h-full rounded-full bg-green-500"
                  style={{ width: '60%' }}
                />
              </div>
            </div>
            <div>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span>Certificates Earned</span>
                <span className="text-green-500">
                  {userCourses.filter(c => c.certificateId).length}
                </span>
              </div>
              <div className="h-2 rounded-full bg-gray-700">
                <div
                  className="h-full rounded-full bg-green-500"
                  style={{
                    width: userCourses.length > 0
                      ? `${(userCourses.filter(c => c.certificateId).length / userCourses.length) * 100}%`
                      : '0%'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={BookOpen}
          title="Enrolled Courses"
          value={userCourses.length}
          trend="↑ 2 this month"
        />
        <StatCard
          icon={Clock}
          title="Hours Learned"
          value="12.5"
          trend="↑ 3.5 this week"
        />
        <StatCard
          icon={Award}
          title="Certificates"
          value={userCourses.filter(c => c.completed).length}
          trend="+1 new this month"
        />
        <StatCard
          icon={BarChart}
          title="Average Progress"
          value={`${overallProgress}%`}
          trend="↑ 5% improvement"
        />
      </div>

      {/* Continue Learning */}
      <div className="mb-8">
        <h2 className="mb-4 text-xl font-bold">Continue Learning</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {userCourses
            .filter(course => !course.completed)
            .map((course) => (
              <div key={course.title} className="rounded-xl bg-gray-800 p-6">
                <div className="mb-4 aspect-video overflow-hidden rounded-lg">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="mb-2 font-bold">{course.title}</h3>
                <p className="mb-2 text-sm text-gray-400">
                  Current Module: {course.currentModule}
                </p>
                <div className="mb-3 h-2 overflow-hidden rounded-full bg-gray-700">
                  <div
                    className="h-full bg-green-500"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-400">{course.progress}% complete</p>
                  <Button
                    size="sm"
                    onClick={() => resumeCourse(course.title, course.currentModule!)}
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Resume
                  </Button>
                </div>
              </div>
          ))}
        </div>
      </div>

      {/* Recommended Courses */}
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Recommended for You</h2>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <span>Based on your interests</span>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {recommendedCourses.map((course) => (
            <div key={course.title} className="rounded-xl bg-gray-800 p-4">
              <div className="mb-3 aspect-video overflow-hidden rounded-lg">
                <img
                  src={course.image}
                  alt={course.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="mb-1 font-medium">{course.title}</h3>
              <p className="mb-2 text-sm text-gray-400">{course.instructor}</p>
              <div className="flex items-center justify-between">
                <span className="text-green-500">{course.price}</span>
                <div className="flex items-center gap-1 text-sm text-yellow-500">
                  <Star className="h-4 w-4 fill-yellow-500" />
                  {course.rating}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

interface StatCardProps {
  icon: React.ElementType;
  title: string;
  value: string | number;
  trend: string;
}

function StatCard({ icon: Icon, title, value, trend }: StatCardProps) {
  return (
    <div className="rounded-xl bg-gray-800 p-6">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/10">
        <Icon className="h-6 w-6 text-green-500" />
      </div>
      <h3 className="text-sm font-medium text-gray-400">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
      <p className="mt-1 text-sm text-gray-400">
        <span className="text-green-500">{trend}</span>
      </p>
    </div>
  );
}