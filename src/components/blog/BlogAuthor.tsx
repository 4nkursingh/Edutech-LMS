import React from 'react';

interface BlogAuthorProps {
  author: string;
  authorRole: string;
  authorAvatar: string;
  date: string;
}

export function BlogAuthor({ author, authorRole, authorAvatar, date }: BlogAuthorProps) {
  return (
    <div className="flex items-center gap-4">
      <img
        src={authorAvatar}
        alt={author}
        className="h-12 w-12 rounded-full object-cover"
      />
      <div>
        <h4 className="font-medium text-white">{author}</h4>
        <p className="text-sm text-gray-400">{authorRole}</p>
        <p className="text-sm text-gray-400">{date}</p>
      </div>
    </div>
  );
}