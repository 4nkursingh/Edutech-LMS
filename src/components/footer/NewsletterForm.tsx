import React from 'react';
import { Button } from '../Button';

export function NewsletterForm() {
  return (
    <div>
      <h3 className="mb-4 text-lg font-semibold">Newsletter</h3>
      <p className="mb-4 text-gray-400">Stay updated with our latest courses and offers.</p>
      <div className="flex gap-2">
        <input
          type="email"
          placeholder="Enter your email"
          className="flex-1 rounded-lg bg-gray-800 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <Button>Subscribe</Button>
      </div>
    </div>
  );
}