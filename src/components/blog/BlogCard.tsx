import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, User } from 'lucide-react';
import { BlogPost } from '../../types/blog';

export function BlogCard({
  id,
  title,
  excerpt,
  image,
  author,
  date,
  readTime,
}: BlogPost) {
  return (
    <Link 
      to={`/blog/${id}`}
      className="group block overflow-hidden rounded-xl bg-gray-800 transition-transform hover:-translate-y-1"
    >
      <div className="aspect-video overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h3 className="mb-2 text-xl font-bold text-white group-hover:text-green-500">
          {title}
        </h3>
        <p className="mb-4 text-gray-400">{excerpt}</p>
        <div className="flex flex-wrap gap-4 text-sm text-gray-400">
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            {author}
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {date}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {readTime}
          </div>
        </div>
      </div>
    </Link>
  );
}