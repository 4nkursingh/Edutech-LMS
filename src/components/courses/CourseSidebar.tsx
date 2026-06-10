import { useState } from 'react';
import { Users, Star, GraduationCap, Heart, Share2, Download } from 'lucide-react';
import { Course } from '../../types/course';
import { Button } from '../Button';

interface CourseSidebarProps {
  course: Course;
}

export function CourseSidebar({ course }: CourseSidebarProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const toggleWishlist = () => {
    // In a real app, this would update the wishlist in the database
    setIsWishlisted(!isWishlisted);
    if (!isWishlisted) {
      alert('Added to wishlist!');
    } else {
      alert('Removed from wishlist!');
    }
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  const downloadSyllabus = () => {
    // In a real app, this would download the course syllabus
    alert('Downloading course syllabus...');
  };

  return (
    <div className="lg:sticky lg:top-24">
      <div className="rounded-xl bg-gray-800 p-6">
        <div className="mb-6">
          <div className="flex items-center justify-center gap-1">
            <span className="text-4xl font-bold text-green-500">{course.price}</span>
            <span className="text-sm text-gray-400">USD</span>
          </div>
        </div>

        <div className="mb-6 space-y-4">
          <Button className="w-full">
            Enroll Now
          </Button>
          
          <div className="flex gap-2">
            <Button
              variant="secondary"
              className="flex-1"
              onClick={toggleWishlist}
            >
              <Heart
                className={`mr-2 h-4 w-4 ${isWishlisted ? 'fill-green-500' : ''}`}
              />
              {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
            </Button>
            
            <Button
              variant="secondary"
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="mb-6 space-y-4">
          <div className="flex items-center gap-3 text-gray-400">
            <Users className="h-5 w-5 text-green-500" />
            <span>{course.students.toLocaleString()} students enrolled</span>
          </div>
          <div className="flex items-center gap-3 text-gray-400">
            <Star className="h-5 w-5 text-green-500" />
            <span>{course.rating.toFixed(1)} average rating</span>
          </div>
          <div className="flex items-center gap-3 text-gray-400">
            <GraduationCap className="h-5 w-5 text-green-500" />
            <span>{course.duration} of content</span>
          </div>
        </div>

        <div className="mb-6 border-t border-gray-700 pt-6">
          <h3 className="mb-4 text-lg font-semibold text-white">Course Includes</h3>
          <ul className="space-y-3 text-sm text-gray-400">
            <li>• Full lifetime access</li>
            <li>• 15 coding exercises</li>
            <li>• 5 downloadable resources</li>
            <li>• Certificate of completion</li>
            <li>• Mobile and TV access</li>
          </ul>
        </div>

        <div className="mb-6 border-t border-gray-700 pt-6">
          <Button
            variant="secondary"
            className="w-full"
            onClick={downloadSyllabus}
          >
            <Download className="mr-2 h-4 w-4" />
            Download Syllabus
          </Button>
        </div>

        <div className="border-t border-gray-700 pt-6">
          <h3 className="mb-4 text-lg font-semibold text-white">Instructor</h3>
          <div className="flex items-center gap-4">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
              alt={course.instructor}
              className="h-12 w-12 rounded-full object-cover"
            />
            <div>
              <h4 className="font-medium text-white">{course.instructor}</h4>
              <p className="text-sm text-gray-400">Senior Developer & Instructor</p>
            </div>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-xl bg-gray-800 p-6">
            <h3 className="mb-4 text-lg font-semibold">Share This Course</h3>
            <div className="space-y-4">
              <input
                type="text"
                value={window.location.href}
                readOnly
                className="w-full rounded-lg bg-gray-700 px-4 py-2 text-white"
              />
              <div className="flex justify-end gap-2">
                <Button
                  variant="secondary"
                  onClick={() => setShowShareModal(false)}
                >
                  Close
                </Button>
                <Button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Link copied to clipboard!');
                  }}
                >
                  Copy Link
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}