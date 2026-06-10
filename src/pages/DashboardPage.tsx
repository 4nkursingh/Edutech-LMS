import { useEffect, useState } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';

import { courses } from '../data/courses';
import { getUserEnrollments, getUserWishlist } from '../lib/api';
import { OverviewTab } from '../components/dashboard/OverviewTab';
import { CoursesTab } from '../components/dashboard/CoursesTab';
import { PurchasesTab } from '../components/dashboard/PurchasesTab';
import { useAuth } from '../components/auth/AuthContext';

// Purchase history data
const purchaseHistory = [
  {
    id: 'INV-2024-001',
    courseTitle: 'Advanced Web Development',
    date: '2024-03-15',
    price: '$99.99',
    status: 'Completed',
  },
  {
    id: 'INV-2024-002',
    courseTitle: 'Data Science Fundamentals',
    date: '2024-03-10',
    price: '$89.99',
    status: 'Refunded',
  },
  {
    id: 'INV-2024-003',
    courseTitle: 'UI/UX Design Masterclass',
    date: '2024-02-28',
    price: '$79.99',
    status: 'Completed',
  },
];

// Simulated recommended courses based on user's interests
const recommendedCourses = courses.slice(3, 6);

export function DashboardPage() {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'purchases'>('overview');
  const [courseFilter, setCourseFilter] = useState<'all' | 'ongoing' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [userCourses, setUserCourses] = useState<any[]>([]);
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const courseParam = searchParams.get('course');
    if (courseParam) {
      setActiveTab('courses');
    }
  }, [searchParams]);

  useEffect(() => {
    async function loadUserData() {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setError(null);
        const [enrollments, wishlistItems] = await Promise.all([
          getUserEnrollments(),
          getUserWishlist()
        ]);

        // Map enrollments to courses
        const userCourseData = enrollments.map(enrollment => {
          const course = courses.find(c => c.title === enrollment.course_id);
          if (!course) return null;
          return {
            ...course,
            progress: enrollment.progress || 0,
            lastAccessed: enrollment.last_accessed,
            completed: enrollment.completed || false,
            currentModule: enrollment.current_module || 'Introduction',
            certificateId: enrollment.completed ? `CERT-${enrollment.course_id}` : null
          };
        }).filter(Boolean);

        // Map wishlist to courses
        const wishlistData = wishlistItems
          .map(item => courses.find(c => c.title === item.course_id))
          .filter(Boolean);

        setUserCourses(userCourseData);
        setWishlist(wishlistData);
      } catch (err) {
        console.error('Error loading user data:', err);
        setError('Failed to load your courses. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    loadUserData();
  }, [user]);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  const filteredCourses = userCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = 
      courseFilter === 'all' ||
      (courseFilter === 'ongoing' && !course.completed) ||
      (courseFilter === 'completed' && course.completed);
    return matchesSearch && matchesFilter;
  });

  const downloadCertificate = (certificateId: string) => {
    // In a real app, this would trigger a certificate PDF download
    alert(`Downloading certificate ${certificateId}`);
  };

  const downloadInvoice = (invoiceId: string) => {
    // In a real app, this would generate and download a PDF invoice
    alert(`Downloading invoice ${invoiceId}`);
  };

  const resumeCourse = (courseTitle: string) => {
    // Navigate to the course page with the current module
    const courseUrl = `/courses/${courseTitle.toLowerCase().replace(/\s+/g, '-')}`;
    window.location.href = courseUrl;
  };

  const removeFromWishlist = async (courseTitle: string) => {
    try {
      await removeFromWishlist(courseTitle);
      setWishlist(prev => prev.filter(course => course.title !== courseTitle));
    } catch (err) {
      console.error('Error removing from wishlist:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-900 pt-20">
        <div className="text-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-green-500 border-t-transparent"></div>
          <p className="text-gray-400">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-900 pt-20">
        <div className="text-center">
          <p className="mb-4 text-red-500">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="rounded-lg bg-green-500 px-4 py-2 text-black hover:bg-green-400"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Welcome back, {user.user_metadata?.username || 'User'}!</h1>
          <p className="text-gray-400">Track your progress and continue learning</p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8 border-b border-gray-800">
          <div className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`border-b-2 px-1 pb-4 text-sm font-medium ${
                activeTab === 'overview'
                  ? 'border-green-500 text-green-500'
                  : 'border-transparent text-gray-400 hover:border-gray-700 hover:text-gray-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('courses')}
              className={`border-b-2 px-1 pb-4 text-sm font-medium ${
                activeTab === 'courses'
                  ? 'border-green-500 text-green-500'
                  : 'border-transparent text-gray-400 hover:border-gray-700 hover:text-gray-300'
              }`}
            >
              My Courses
            </button>
            <button
              onClick={() => setActiveTab('purchases')}
              className={`border-b-2 px-1 pb-4 text-sm font-medium ${
                activeTab === 'purchases'
                  ? 'border-green-500 text-green-500'
                  : 'border-transparent text-gray-400 hover:border-gray-700 hover:text-gray-300'
              }`}
            >
              Purchase History
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <OverviewTab
            user={user}
            userCourses={userCourses}
            recommendedCourses={recommendedCourses}
            resumeCourse={resumeCourse}
          />
        )}
        {activeTab === 'courses' && (
          <CoursesTab
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            courseFilter={courseFilter}
            setCourseFilter={setCourseFilter}
            filteredCourses={filteredCourses}
            wishlist={wishlist}
            resumeCourse={resumeCourse}
            downloadCertificate={downloadCertificate}
            removeFromWishlist={removeFromWishlist}
          />
        )}
        {activeTab === 'purchases' && (
          <PurchasesTab
            purchaseHistory={purchaseHistory}
            downloadInvoice={downloadInvoice}
          />
        )}
      </div>
    </div>
  );
}