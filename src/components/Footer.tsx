import React from 'react';
import { FooterSection } from './footer/FooterSection';
import { NewsletterForm } from './footer/NewsletterForm';

export function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-black py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <FooterSection title="Company" links={[
            { href: "/about", label: "About Us" },
            { href: "#", label: "Careers" },
            { href: "/blog", label: "Blog" }
          ]} />
          <FooterSection title="Resources" links={[
            { href: "/help", label: "Help Center" },
            { href: "/success", label: "Student Success" },
            { href: "/docs", label: "Documentation" }
          ]} />
          <FooterSection title="Legal" links={[
            { href: "/privacy", label: "Privacy Policy" },
            { href: "/terms", label: "Terms of Service" },
            { href: "/cookies", label: "Cookie Policy" }
          ]} />
          <NewsletterForm />
        </div>
        <div className="mt-12 border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2024 EduTech. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}