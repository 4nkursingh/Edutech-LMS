import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Clock, Users, Star, Heart } from 'lucide-react';
import { Course } from '../types/course';
import { Button } from './Button';
import { enrollInCourse, addToWishlist, removeFromWishlist } from '../lib/api';
import { useAuth } from './auth/AuthContext';

interface CourseCardProps extends Course {
  isWishlisted?: boolean;
  isEnrolled?: boolean;
  onEnroll?: () => void;
  onWishlist?: () => void;
}

export function CourseCard({
  title,
  instructor,
  duration,
  students,
  rating,
  image,
  price,
  isWishlisted = false,
  isEnrolled = false,
  onEnroll,
  onWishlist,
}: CourseCardProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const courseUrl = `/courses/${title.toLowerCase().replace(/\s+/g, '-')}`;

  const handleEnroll = async () => {
    if (!user) {
      // Redirect to sign in or show sign in modal
      return;
    }

    try {
      setLoading(true);
      const result = await enrollInCourse(title);
      if (result.success || result.alreadyEnrolled) {
        onEnroll?.();
        navigate(`/dashboard?course=${encodeURIComponent(title)}`);
      }
    } catch (error) {
      console.error('Error enrolling in course:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleWishlist = async () => {
    if (!user) {
      // Redirect to sign in or show sign in modal
      return;
    }

    try {
      setLoading(true);
      if (isWishlisted) {
        await removeFromWishlist(title);
      } else {
        await addToWishlist(title);
      }
      onWishlist?.();
    } catch (error) {
      console.error('Error updating wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-xl bg-gray-800 transition-transform hover:-translate-y-1">
      <Link to={courseUrl}>
        <div className="aspect-video overflow-hidden">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
        <div className="p-6">
          <h3 className="mb-2 text-xl font-bold text-white">{title}</h3>
          <p className="mb-4 text-gray-400">{instructor}</p>
          <div className="mb-4 flex items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {duration}
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              {students.toLocaleString()}
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-500" />
              {rating.toFixed(1)}
            </div>
          </div>
        </div>
      </Link>
      <div className="flex items-center justify-between p-6 pt-0">
        <span className="text-2xl font-bold text-green-500">{price}</span>
        <div className="flex gap-2">
          {user && (
            <Button
              variant="secondary"
              size="sm"
              onClick={handleWishlist}
              disabled={loading}
            >
              <Heart
                className={`h-4 w-4 ${isWishlisted ? 'fill-green-500 text-green-500' : ''}`}
              />
            </Button>
          )}
          <Button
            size="sm"
            onClick={handleEnroll}
            disabled={loading || isEnrolled}
          >
            {isEnrolled ? 'Enrolled' : 'Enroll Now'}
          </Button>
        </div>
      </div>
    </div>
  );
}