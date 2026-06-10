import React, { useState, useRef } from 'react';
import { Camera, X } from 'lucide-react';
import { Button } from '../Button';

interface ProfileSectionProps {
  user: {
    username: string;
    email: string;
    avatar?: string;
  };
}

export function ProfileSection({ user }: ProfileSectionProps) {
  const [avatar, setAvatar] = useState(user.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e');
  const [isHovering, setIsHovering] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
        // In a real app, you would upload the image to a server here
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mb-8 flex items-center gap-6">
      <div
        className="relative h-24 w-24"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <img
          src={avatar}
          alt={user.username}
          className="h-full w-full rounded-full object-cover ring-2 ring-green-500 ring-offset-2 ring-offset-gray-900"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className={`absolute inset-0 flex items-center justify-center rounded-full bg-black/50 transition-opacity ${
            isHovering ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Camera className="h-6 w-6 text-white" />
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </div>
      <div>
        <h2 className="text-2xl font-bold">{user.username}</h2>
        <p className="text-gray-400">{user.email}</p>
      </div>
    </div>
  );
}