
import { Search, Filter, Play, CheckCircle, Download, Heart } from 'lucide-react';
import { Button } from '../Button';
import { Course } from '../../types/course';

interface CoursesTabProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  courseFilter: 'all' | 'ongoing' | 'completed';
  setCourseFilter: (filter: 'all' | 'ongoing' | 'completed') => void;
  filteredCourses: any[];
  wishlist: Course[];
  resumeCourse: (courseTitle: string, module: string) => void;
  downloadCertificate: (certificateId: string) => void;
  removeFromWishlist: (courseTitle: string) => void;
}

export function CoursesTab({
  searchQuery,
  setSearchQuery,
  courseFilter,
  setCourseFilter,
  filteredCourses,
  wishlist,
  resumeCourse,
  downloadCertificate,
  removeFromWishlist,
}: CoursesTabProps) {
  return (
    <>
      {/* Course Management Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search your courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 rounded-lg bg-gray-800 pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value as any)}
              className="rounded-lg bg-gray-800 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="all">All Courses</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Course List */}
      <div className="space-y-4">
        {filteredCourses.map((course) => (
          <div
            key={course.title}
            className="rounded-xl bg-gray-800 p-4 transition-transform hover:-translate-y-1"
          >
            <div className="flex gap-4">
              <div className="h-32 w-48 flex-shrink-0 overflow-hidden rounded-lg">
                <img
                  src={course.image}
                  alt={course.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col">
                <div className="mb-2 flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold">{course.title}</h3>
                    <p className="text-sm text-gray-400">{course.instructor}</p>
                  </div>
                  {course.completed ? (
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1 rounded-full bg-green-500/10 px-3 py-1 text-sm text-green-500">
                        <CheckCircle className="h-4 w-4" />
                        Completed
                      </span>
                      {course.certificateId && (
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => downloadCertificate(course.certificateId!)}
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Certificate
                        </Button>
                      )}
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      onClick={() => resumeCourse(course.title, course.currentModule!)}
                    >
                      <Play className="mr-2 h-4 w-4" />
                      Resume
                    </Button>
                  )}
                </div>
                {!course.completed && (
                  <>
                    <p className="mb-2 text-sm text-gray-400">
                      Current Module: {course.currentModule}
                    </p>
                    <div className="mt-auto">
                      <div className="mb-1 h-2 overflow-hidden rounded-full bg-gray-700">
                        <div
                          className="h-full bg-green-500"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                      <p className="text-sm text-gray-400">
                        {course.progress}% complete
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Wishlist Section */}
      <div className="mt-8">
        <h2 className="mb-4 text-xl font-bold">Wishlist</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {wishlist.map((course) => (
            <div
              key={course.title}
              className="rounded-xl bg-gray-800 p-4 transition-transform hover:-translate-y-1"
            >
              <div className="flex gap-4">
                <div className="h-24 w-36 flex-shrink-0 overflow-hidden rounded-lg">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <h3 className="font-bold">{course.title}</h3>
                    <p className="text-sm text-gray-400">{course.instructor}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-green-500">{course.price}</span>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => removeFromWishlist(course.title)}
                    >
                      <Heart className="mr-2 h-4 w-4" />
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}