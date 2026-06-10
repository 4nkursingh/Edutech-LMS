import React from 'react';
import { Star } from 'lucide-react';

// Mock reviews data
const mockReviews = [
  {
    id: 1,
    author: 'John Doe',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    rating: 5,
    date: '2024-03-15',
    content: 'Excellent course! The instructor explains complex concepts in a very clear and understandable way. The practical exercises were particularly helpful.',
  },
  {
    id: 2,
    author: 'Sarah Smith',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    rating: 4,
    date: '2024-03-14',
    content: 'Very comprehensive course with good examples. Would have liked more advanced topics, but overall a great learning experience.',
  },
  {
    id: 3,
    author: 'Michael Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    rating: 5,
    date: '2024-03-13',
    content: 'The course structure is well thought out and the content is up-to-date. Really enjoyed the hands-on projects.',
  },
];

interface ReviewsProps {
  courseId: string;
}

export function Reviews({ courseId }: ReviewsProps) {
  return (
    <div className="space-y-6">
      {mockReviews.map((review) => (
        <div key={review.id} className="rounded-xl bg-gray-800 p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src={review.avatar}
                alt={review.author}
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-medium text-white">{review.author}</h3>
                <p className="text-sm text-gray-400">{review.date}</p>
              </div>
            </div>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < review.rating
                      ? 'fill-yellow-500 text-yellow-500'
                      : 'fill-gray-700 text-gray-700'
                  }`}
                />
              ))}
            </div>
          </div>
          <p className="text-gray-300">{review.content}</p>
        </div>
      ))}
    </div>
  );
}