import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { GraduationCap, User } from 'lucide-react';
import { Button } from './Button';
import { cn } from '../utils/cn';
import { SignInForm } from './auth/SignInForm';
import { SignUpForm } from './auth/SignUpForm';
import { useAuth } from './auth/AuthContext';

export function Header() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const navItems = [
    { path: '/courses', label: 'Courses' },
    { path: '/categories', label: 'Categories' },
    { path: '/blog', label: 'Blog' },
    { path: '/about', label: 'About Us' },
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-gray-800 bg-black/80 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2">
            <GraduationCap className="h-8 w-8 text-green-500" />
            <span className="text-xl font-bold text-white">EduTech</span>
          </Link>
          <nav className="hidden space-x-8 md:flex">
            {navItems.map(({ path, label }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  cn(
                    'text-sm transition-colors',
                    isActive ? 'text-green-500' : 'text-gray-300 hover:text-green-500'
                  )
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => navigate('/dashboard')}
                >
                  <User className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
                <Button size="sm" onClick={handleSignOut}>
                  Sign Out
                </Button>
              </div>
            ) : (
              <>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setShowSignIn(true)}
                >
                  Sign In
                </Button>
                <Button
                  size="sm"
                  onClick={() => setShowSignUp(true)}
                >
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {showSignIn && (
        <SignInForm
          onClose={() => setShowSignIn(false)}
          onSwitchToSignUp={() => {
            setShowSignIn(false);
            setShowSignUp(true);
          }}
        />
      )}

      {showSignUp && (
        <SignUpForm
          onClose={() => setShowSignUp(false)}
          onSwitchToSignIn={() => {
            setShowSignUp(false);
            setShowSignIn(true);
          }}
        />
      )}
    </>
  );
}