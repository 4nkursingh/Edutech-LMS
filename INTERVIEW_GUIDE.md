# EduTech Platform - Comprehensive Interview Preparation Guide

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Architecture & Design Patterns](#architecture--design-patterns)
4. [Project Structure](#project-structure)
5. [Core Features & Implementation](#core-features--implementation)
6. [Authentication System](#authentication-system)
7. [Data Models](#data-models)
8. [Key Components Deep Dive](#key-components-deep-dive)
9. [State Management](#state-management)
10. [API Integration](#api-integration)
11. [UI/UX Patterns](#uiux-patterns)
12. [Database & Supabase](#database--supabase)
13. [Performance & Optimization](#performance--optimization)
14. [Interview Questions & Answers](#interview-questions--answers)

---

## Project Overview

**Project Name:** EduTech - Modern Online Learning Platform

**Purpose:** A comprehensive web-based educational platform that enables users to:
- Browse and enroll in courses
- Track learning progress
- Complete assessments and quizzes
- Read educational blog posts
- Manage personal dashboard with enrollment history
- Access certification programs

**Key Metrics:**
- 6+ course categories
- 50+ courses available
- Multiple assessment types (quizzes, tests, practice exams)
- Blog platform with 3+ content categories
- Full user authentication & dashboard

---

## Technology Stack

### Frontend
```
React 18.2.0          - UI library and component framework
TypeScript 5.2.0      - Type safety and development experience
Vite 5.0.0            - Build tool and dev server
Tailwind CSS 3.4.0    - Utility-first CSS framework
framer-motion 11.0.0  - Animation library
lucide-react 0.408.0  - Icon library
react-router-dom 6.28 - Client-side routing
clsx 2.0.0           - Conditional className utility
tailwind-merge 2.2.0  - Smart Tailwind class merging
```

### Backend Services
```
Supabase            - Backend-as-a-Service (PostgreSQL + Auth)
PostgreSQL          - Database (via Supabase)
Supabase Auth       - User authentication & session management
```

### Development Tools
```
Node.js 14+         - Runtime
npm/yarn            - Package management
ESLint              - Code linting
Prettier            - Code formatting (recommended)
```

---

## Architecture & Design Patterns

### 1. Component Architecture

**Hierarchical Structure:**
```
App (Root)
├── Layout (Global wrapper with Header & Footer)
│   ├── Header (Navigation & Auth UI)
│   │   ├── SignInForm Modal
│   │   └── SignUpForm Modal
│   ├── Routes (Page-level components)
│   │   ├── HomePage
│   │   ├── CoursesPage
│   │   ├── CourseDetailPage
│   │   ├── DashboardPage
│   │   ├── BlogPage
│   │   ├── BlogDetailPage
│   │   └── Legal Pages (Privacy, Terms, Cookies)
│   └── Footer (Company info & Newsletter)
└── AuthProvider (Context provider for auth state)
```

### 2. Design Patterns Used

**Context API Pattern:**
```typescript
// Authentication context for global auth state
const AuthContext = createContext<AuthContextType>();

export function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  // Auth logic...
  return <AuthContext.Provider value={...}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  // Custom hook to access auth anywhere
}
```

**Composition Pattern:**
- Small, reusable components (Button, CourseCard, BlogCard)
- Composed into larger, feature-specific components
- Each component has single responsibility

**Container/Presentational Pattern:**
- Pages act as container components (handle logic, data fetching)
- Sub-components act as presentational components (handle UI rendering)

**Modal Pattern:**
- Modals for forms, previews, and confirmations
- Implemented using fixed positioning and overlay
- Animated with framer-motion

### 3. State Management Strategy

**Hierarchical State Management:**
- Global state: Authentication (Auth Context)
- Page-level state: Filters, search queries, tab selection (useState)
- Local component state: Form inputs, UI toggles

**No External State Management** - The app uses React's built-in features:
- `useState` for local component state
- `useContext` for global authentication state
- `useEffect` for side effects and data fetching
- URL params via `useSearchParams()` for filter persistence

---

## Project Structure

### Directory Organization

```
/src
├── /components          # Reusable UI components
│   ├── auth/            # Authentication forms & context
│   ├── courses/         # Course-related components
│   ├── dashboard/       # User dashboard components
│   ├── home/            # Homepage feature components
│   ├── blog/            # Blog-related components
│   ├── categories/      # Category display components
│   ├── footer/          # Footer sections
│   ├── layout/          # Layout utilities (Container, Section)
│   ├── Button.tsx       # Base button component
│   ├── Header.tsx       # Navigation header
│   ├── Footer.tsx       # Main footer
│   ├── Layout.tsx       # Global layout wrapper
│   └── PageHeader.tsx   # Reusable page header

├── /pages               # Page-level components (one per route)
│   ├── HomePage.tsx
│   ├── CoursesPage.tsx
│   ├── CategoriesPage.tsx
│   ├── BlogPage.tsx
│   ├── AboutPage.tsx
│   ├── DashboardPage.tsx
│   ├── BlogDetailPage.tsx
│   ├── resources/       # Resource pages
│   │   ├── Documentation.tsx
│   │   ├── HelpCenter.tsx
│   │   └── StudentSuccess.tsx
│   └── legal/           # Legal pages
│       ├── PrivacyPolicy.tsx
│       ├── TermsOfService.tsx
│       └── CookiePolicy.tsx

├── /data                # Static data and mock data
│   ├── courses.ts       # Course catalog
│   ├── categories.ts    # Course categories
│   ├── blog-posts.ts    # Blog content
│   └── testimonials.ts  # User testimonials

├── /types               # TypeScript type definitions
│   ├── course.ts
│   ├── category.ts
│   ├── blog.ts
│   └── testimonial.ts

├── /lib                 # Utility libraries
│   ├── api.ts           # API client functions
│   └── supabase.ts      # Supabase client setup

├── /utils               # Helper functions
│   └── cn.ts            # className utility (clsx + tailwind-merge)

├── App.tsx              # Root component with routing
├── main.tsx             # React entry point
└── index.css            # Global Tailwind styles

/supabase
├── /migrations          # Database migration scripts
│   ├── 20250205110601_mellow_night.sql      # Profiles table
│   └── 20250205111240_withered_shrine.sql   # Enrollments & Wishlist

/public                  # Static assets

Configuration Files:
├── vite.config.ts       # Vite bundler configuration
├── tsconfig.json        # TypeScript configuration
├── tsconfig.node.json   # TypeScript for Vite config
├── tailwind.config.js   # Tailwind CSS configuration
├── postcss.config.js    # PostCSS configuration
├── package.json         # Dependencies & scripts
├── index.html           # HTML entry point
└── .env                 # Environment variables
```

### Key Directory Explanations

**`/components`** - Reusable UI building blocks
- Organized by feature (auth, courses, dashboard)
- Each component is self-contained and testable
- Shares common components like Button, Layout helpers

**`/pages`** - Route-level components
- One component per route
- Handle page-specific logic and data fetching
- Import and compose smaller components

**`/data`** - Mock/Static data
- `courses.ts`: 6 sample courses with metadata
- `categories.ts`: 6 course categories with icons
- `blog-posts.ts`: 3 blog articles with full content
- `testimonials.ts`: 2 user testimonials

**`/types`** - TypeScript interfaces
- `course.ts`: Course interface
- `category.ts`: Category interface
- `blog.ts`: BlogPost interface
- `testimonial.ts`: Testimonial interface

**`/lib`** - External service integration
- `api.ts`: API client methods for Supabase operations
- `supabase.ts`: Supabase client initialization

---

## Core Features & Implementation

### 1. **Course Discovery & Browsing**
- **Location:** CoursesPage.tsx, CourseCard.tsx
- **Features:**
  - Advanced filtering (category, difficulty, duration, price, rating)
  - Search functionality
  - Sorting options (popularity, newest, rating, price)
  - Grid/List view toggle
  - Save filters and share filter links
  - Scroll-to-top button with progress bar
  - Wishlist functionality

**Key Implementation Details:**
```typescript
// Multi-level filtering
const filteredCourses = courses
  .filter(course => {
    // Category filter
    if (filters.category && course.category !== filters.category) return false;
    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      if (!course.title.toLowerCase().includes(searchLower) &&
          !course.instructor.toLowerCase().includes(searchLower)) {
        return false;
      }
    }
    // Price range filter
    const price = parseFloat(course.price.replace('$', ''));
    if (price < filters.priceRange[0] || price > filters.priceRange[1]) 
      return false;
    // ... more filters
  })
  .sort((a, b) => {
    // Sorting logic based on filters.sort
  });
```

### 2. **Course Details & Learning Path**
- **Location:** CourseDetailPage.tsx and sub-components
- **Features:**
  - Course overview with instructor info
  - Tab-based navigation (Overview, Curriculum, Tests, Reviews)
  - Interactive curriculum with expandable sections
  - Lesson content delivery (video, text, interactive)
  - Progress tracking
  - Quiz/Test system
  - Student reviews and ratings

**Curriculum Structure:**
```typescript
const courseSections = [
  {
    title: 'Getting Started',
    lessons: [
      { title: 'Course Introduction', type: 'video', duration: '5:20' },
      { title: 'Setting Up Environment', type: 'text', duration: '10:15' },
      { title: 'Basic Concepts Quiz', type: 'quiz', duration: '15:30' }
    ]
  }
  // More sections...
];
```

### 3. **User Dashboard & Progress Tracking**
- **Location:** DashboardPage.tsx and dashboard/* components
- **Features:**
  - Overview tab with progress visualization
  - My Courses tab with resume functionality
  - Purchase history with invoice downloads
  - Wishlist management
  - Certificate display and download
  - Profile management with avatar upload
  - Recommended courses based on interests

**Tab System:**
```typescript
const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'purchases'>('overview');

// Render different content based on activeTab
{activeTab === 'overview' && <OverviewTab {...props} />}
{activeTab === 'courses' && <CoursesTab {...props} />}
{activeTab === 'purchases' && <PurchasesTab {...props} />}
```

### 4. **Blog & Content Management**
- **Location:** BlogPage.tsx, BlogDetailPage.tsx, BlogCard.tsx
- **Features:**
  - Blog post listings with search and filtering
  - Category-based filtering (All, Technology, Education, Career, Development)
  - Sorting (Latest, Popular)
  - Detailed blog view with author info
  - Reading time estimate
  - View counts
  - Social sharing (Like, Bookmark, Share)
  - Related articles/tags

**Blog Post Structure:**
```typescript
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  authorRole: string;
  authorAvatar: string;
  date: string;
  readTime: string;
  category: 'Technology' | 'Education' | 'Career' | 'Development';
  tags: string[];
  views: number;
}
```

### 5. **Category Management**
- **Location:** CategoriesPage.tsx, CategoryCard.tsx
- **Features:**
  - All course categories display
  - Search and sort capabilities
  - Grid/List view toggle
  - Category statistics (course count, student count, rating)
  - Interactive cards with hover effects

---

## Authentication System

### Authentication Architecture

**Stack:** Supabase Auth (PostgreSQL backend)

### Authentication Flow

```
Sign Up Flow:
1. User fills SignUpForm (username, email, password)
2. Form submitted → useAuth().signUp()
3. Supabase auth.signUp() creates user
4. User metadata stored with username
5. Profile automatically created via DB trigger
6. User redirected to dashboard

Sign In Flow:
1. User fills SignInForm (email, password)
2. Form submitted → useAuth().signIn()
3. Supabase auth.signInWithPassword()
4. Session created and stored
5. User state updated in AuthContext
6. User redirected to dashboard

Sign Out Flow:
1. User clicks Sign Out
2. useAuth().signOut() called
3. Supabase session cleared
4. User state set to null
5. User redirected to home
```

### Auth Context Implementation

```typescript
// AuthContext.tsx
interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active sessions on mount
    supabase?.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase?.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription?.unsubscribe();
  }, []);

  // ... sign in, sign up, sign out methods
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
```

### Protected Route Pattern

```typescript
// In DashboardPage.tsx
export function DashboardPage() {
  const { user } = useAuth();

  // Redirect unauthenticated users
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Render dashboard
  return <div>Dashboard Content</div>;
}
```

### User Metadata

Supabase stores user metadata:
```typescript
{
  user_metadata: {
    username: "john_doe" // Set during signup
  }
}
```

---

## Data Models

### TypeScript Interfaces

**Course Model:**
```typescript
interface Course {
  title: string;
  instructor: string;
  duration: string;        // e.g., "12 weeks"
  students: number;        // Total enrolled students
  rating: number;          // 0-5 star rating
  image: string;           // Course image URL
  price: string;           // e.g., "$99.99"
  category: string;        // Course category
}
```

**Category Model:**
```typescript
interface Category {
  title: string;
  description: string;
  icon: React.ElementType;  // Lucide icon component
  courses: number;         // Number of courses in category
  color: string;           // Tailwind gradient color
}
```

**BlogPost Model:**
```typescript
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  authorRole: string;
  authorAvatar: string;
  date: string;            // "YYYY-MM-DD"
  readTime: string;        // e.g., "5 min read"
  category: 'Technology' | 'Education' | 'Career' | 'Development';
  tags: string[];
  views: number;
}
```

**Testimonial Model:**
```typescript
interface Testimonial {
  content: string;
  author: string;
  role: string;
  avatar: string;
}
```

### Database Schema

**User Profiles Table:**
```sql
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users,
  username text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

**Enrollments Table:**
```sql
CREATE TABLE enrollments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  course_id text NOT NULL,
  progress integer DEFAULT 0,         -- 0-100
  last_accessed timestamptz DEFAULT now(),
  completed boolean DEFAULT false,
  current_module text,                -- Track where user is
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, course_id)         -- Prevent duplicate enrollments
);
```

**Wishlist Table:**
```sql
CREATE TABLE wishlists (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  course_id text NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, course_id)         -- Prevent duplicates
);
```

### Database Triggers

**Auto-create Profile on User Signup:**
```sql
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Function that creates profile
CREATE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, username)
  VALUES (new.id, new.raw_user_meta_data->>'username');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

---

## Key Components Deep Dive

### 1. **Button Component**

**Purpose:** Reusable button across the application

```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-lg font-medium',
        {
          'bg-green-500 text-black hover:bg-green-400': variant === 'primary',
          'bg-gray-800 text-green-500 hover:bg-gray-700': variant === 'secondary',
          'px-4 py-2 text-sm': size === 'sm',
          'px-6 py-3 text-base': size === 'md',
          'px-8 py-4 text-lg': size === 'lg',
        },
        className
      )}
      {...props}
    />
  );
}
```

**Variants:**
- `primary`: Green background (main CTAs)
- `secondary`: Gray background with green text (alternative actions)
- `outline`: Border-based (less prominent actions)

**Sizes:**
- `sm`: Small buttons (tags, filters)
- `md`: Default size
- `lg`: Large buttons (hero CTAs)

### 2. **Layout Component**

**Purpose:** Global layout wrapper with header and footer

```typescript
export function Layout() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main>
        <Outlet />  {/* React Router outlet for page content */}
      </main>
      <Footer />
    </div>
  );
}
```

**Features:**
- Fixed header with navigation
- Sticky footer
- Dark theme (black background, white text)
- Routes nested within Layout automatically get header/footer

### 3. **Header Component**

**Purpose:** Navigation and authentication UI

**Key Features:**
```typescript
export function Header() {
  const { user, signOut } = useAuth();
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full bg-black/80 backdrop-blur">
      {/* Logo */}
      <GraduationCap /> EduTech

      {/* Navigation Links */}
      <nav>
        Courses, Categories, Blog, About Us
      </nav>

      {/* Auth Buttons */}
      {user ? (
        <>
          <Button>Dashboard</Button>
          <Button onClick={handleSignOut}>Sign Out</Button>
        </>
      ) : (
        <>
          <Button onClick={() => setShowSignIn(true)}>Sign In</Button>
          <Button onClick={() => setShowSignUp(true)}>Get Started</Button>
        </>
      )}

      {/* Modals */}
      {showSignIn && <SignInForm ... />}
      {showSignUp && <SignUpForm ... />}
    </header>
  );
}
```

**Implementation Details:**
- Fixed positioning (stays visible while scrolling)
- Navigation items highlighted when active using `NavLink` from react-router
- Modal-based auth forms (SignIn/SignUp)
- Shows different buttons for authenticated vs unauthenticated users
- Uses `useAuth()` hook for auth state

### 4. **CourseCard Component**

**Purpose:** Reusable course display card

```typescript
export function CourseCard({ course, onEnroll, onWishlist }) {
  return (
    <div className="rounded-xl bg-gray-800 p-4 hover:shadow-lg">
      {/* Course Image */}
      <img src={course.image} alt={course.title} />

      {/* Course Info */}
      <h3>{course.title}</h3>
      <p className="text-gray-400">{course.instructor}</p>

      {/* Metadata */}
      <div className="flex gap-4 text-sm">
        <span>⏱ {course.duration}</span>
        <span>👥 {course.students} students</span>
        <span>⭐ {course.rating}</span>
      </div>

      {/* Price and Actions */}
      <div className="flex justify-between">
        <span className="text-green-500">{course.price}</span>
        <Button onClick={onEnroll}>Enroll Now</Button>
        <Button variant="secondary" onClick={onWishlist}>
          <Heart />
        </Button>
      </div>
    </div>
  );
}
```

**Used In:**
- CoursesPage (course grid)
- HomePage (featured courses)
- Dashboard (recommended courses)

### 5. **DashboardPage Component**

**Purpose:** User's learning hub with multiple tabs

**Tab Structure:**
1. **Overview Tab** - Progress visualization, stats, continue learning
2. **Courses Tab** - Enrolled courses with filters and resume buttons
3. **Purchases Tab** - Invoice history and download links

**Key Features:**
```typescript
export function DashboardPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'purchases'>('overview');
  const [userCourses, setUserCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user enrollments and wishlist
    async function loadData() {
      const [enrollments, wishlist] = await Promise.all([
        getUserEnrollments(),
        getUserWishlist()
      ]);
      setUserCourses(enrollments);
    }
    loadData();
  }, [user]);

  // Tab navigation
  // Content rendering based on activeTab
  // Progress calculations
}
```

---

## State Management

### 1. **Global State - Authentication**

Uses **Context API** for auth state:
```typescript
// AuthContext provides:
- user: User | null
- loading: boolean
- signIn(): Promise<void>
- signUp(): Promise<void>
- signOut(): Promise<void>

// Accessed anywhere via:
const { user, signOut } = useAuth();
```

### 2. **Page-Level State**

Uses **useState** for page-specific data:
```typescript
// CoursesPage state
const [filters, setFilters] = useState<FilterState>({
  search: '',
  sort: 'popular',
  difficulty: 'all',
  category: null,
  // ...
});

// DashboardPage state
const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'purchases'>('overview');
const [userCourses, setUserCourses] = useState<Course[]>([]);
```

### 3. **URL Parameters for Filters**

Uses `useSearchParams` to persist filters in URL:
```typescript
const [searchParams, setSearchParams] = useSearchParams();

// Get from URL
const category = searchParams.get('category');

// Set in URL (creates shareable link)
setSearchParams({ category: 'Web Development', sort: 'rating' });
```

### 4. **Component Composition for Local State**

Each component manages its own state:
```typescript
// SignInForm manages its own form state
const [formData, setFormData] = useState({
  email: '',
  password: '',
});
const [error, setError] = useState('');
```

### Why No Redux/Zustand?

The app uses only React's built-in state management because:
1. **Simple data flow** - mostly reading/writing user and course data
2. **Minimal global state** - only auth needs to be global
3. **Easy to understand** - Context API sufficient for the requirements
4. **Less boilerplate** - no action creators, reducers needed

---

## API Integration

### API Layer (lib/api.ts)

**Purpose:** Encapsulate Supabase operations

**Key Functions:**

```typescript
// Enrollment Management
export async function enrollInCourse(courseTitle: string) {
  // Insert enrollment record
  // Handle duplicate enrollment (user already enrolled)
}

// Wishlist Management
export async function addToWishlist(courseTitle: string) {
  // Insert wishlist record
}

export async function removeFromWishlist(courseTitle: string) {
  // Delete from wishlist
}

// User Data Retrieval
export async function getUserEnrollments() {
  // Fetch user's enrolled courses
}

export async function getUserWishlist() {
  // Fetch user's wishlist
}

// Progress Tracking
export async function updateCourseProgress(courseTitle, progress, currentModule) {
  // Update enrollment with progress and module
}
```

### API Call Pattern

```typescript
// In components:
try {
  const enrollments = await getUserEnrollments();
  setUserCourses(enrollments);
} catch (error) {
  console.error('Failed to load courses', error);
  setError('Failed to load your courses');
}
```

### Error Handling

```typescript
try {
  const result = await enrollInCourse(courseId);
  
  if (result.alreadyEnrolled) {
    alert('You are already enrolled in this course');
  } else if (result.success) {
    navigate('/dashboard');
  }
} catch (error) {
  if (error.code === 'PGRST301') {
    // JWT token invalid
    signOut();
  } else {
    setError('Failed to enroll. Please try again.');
  }
}
```

---

## UI/UX Patterns

### 1. **Modal Dialogs**

Used for:
- Authentication forms (SignIn, SignUp)
- Content viewing (Video, Code examples)
- Confirmations (before starting test)

**Implementation:**
```typescript
function Modal({ isOpen, onClose, children }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={e => e.stopPropagation()}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

### 2. **Accordion/Expandable Sections**

Used for:
- Course curriculum
- FAQ sections
- Policy pages

**Implementation:**
```typescript
const [expandedSection, setExpandedSection] = useState<string | null>(null);

return (
  <motion.div>
    <button onClick={() => toggleSection(id)}>
      {title}
      <motion.div animate={{ rotate: isExpanded ? 90 : 0 }}>
        <ChevronRight />
      </motion.div>
    </button>

    <AnimatePresence>
      {expandedSection === id && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: 'auto' }}
          exit={{ height: 0 }}
        >
          {content}
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);
```

### 3. **Tabs**

Used for:
- Dashboard (Overview, Courses, Purchases)
- Course detail (Overview, Curriculum, Tests, Reviews)

**Implementation:**
```typescript
const [activeTab, setActiveTab] = useState('overview');

return (
  <>
    <div className="flex border-b">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={activeTab === tab.id ? 'border-green-500' : ''}
        >
          {tab.label}
        </button>
      ))}
    </div>

    <AnimatePresence mode="wait">
      <motion.div
        key={activeTab}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {renderTabContent()}
      </motion.div>
    </AnimatePresence>
  </>
);
```

### 4. **Progress Indicators**

**Circular Progress:**
```typescript
function CircularProgress({ percentage, children }) {
  return (
    <div className="relative">
      <svg className="h-32 w-32">
        <circle
          stroke="gray"
          fill="none"
          r="50"
        />
        <circle
          stroke="green"
          fill="none"
          r="50"
          strokeDasharray={`${percentage}, 100`}
        />
      </svg>
      {children}
    </div>
  );
}
```

**Linear Progress Bar:**
```typescript
<div className="h-2 bg-gray-700 rounded-full">
  <div
    className="h-full bg-green-500"
    style={{ width: `${progress}%` }}
  />
</div>
```

### 5. **Cards with Hover Effects**

Used for courses, blog posts, categories

```typescript
<motion.div
  whileHover={{ y: -8 }}  // Lift on hover
  className="rounded-xl bg-gray-800 p-6 transition-shadow hover:shadow-lg"
>
  <img src={image} className="group-hover:scale-105" />
  {/* content */}
</motion.div>
```

### 6. **Search with Icons**

```typescript
<div className="relative">
  <Search className="absolute left-3 text-gray-400" />
  <input
    type="text"
    placeholder="Search..."
    className="pl-10 pr-4 ..."
  />
</div>
```

### 7. **Animations with Framer Motion**

```typescript
// Page transitions
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  {content}
</motion.div>

// Staggered list animations
<motion.div
  variants={container}
  initial="hidden"
  animate="show"
>
  {items.map((item) => (
    <motion.div key={item} variants={item}>
      {item}
    </motion.div>
  ))}
</motion.div>

// Scroll-based animations
const { scrollYProgress } = useScroll();
const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
```

---

## Database & Supabase

### Supabase Setup

**Configuration (lib/supabase.ts):**
```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

**Environment Variables (.env):**
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### Database Design

**Normalized Structure:**

```
┌─────────────────────┐
│   auth.users        │ (Managed by Supabase Auth)
│  ─────────────────  │
│  • id (UUID)        │
│  • email            │
│  • user_metadata    │
└──────────┬──────────┘
           │
           ├─→ (1:1) profiles
           │   ├─ id (FK → auth.users)
           │   ├─ username
           │   └─ created_at
           │
           ├─→ (1:N) enrollments
           │   ├─ id
           │   ├─ user_id (FK → profiles)
           │   ├─ course_id
           │   ├─ progress
           │   ├─ completed
           │   └─ current_module
           │
           └─→ (1:N) wishlists
               ├─ id
               ├─ user_id (FK → profiles)
               └─ course_id
```

### Row Level Security (RLS)

**Profiles Table:**
```sql
-- Users can only read their own profile
CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- Users can only update their own profile
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);
```

**Enrollments Table:**
```sql
CREATE POLICY "Users can read own enrollments"
  ON enrollments FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own enrollments"
  ON enrollments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own enrollments"
  ON enrollments FOR UPDATE
  USING (auth.uid() = user_id);
```

**Benefits:**
- Enforces data isolation at database level
- Users can't access other users' data even with direct queries
- Security layer independent of frontend

### Cascade Delete

When a user is deleted:
- Profile is deleted (CASCADE)
- All enrollments are deleted (CASCADE)
- All wishlist entries are deleted (CASCADE)

```sql
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE
);

CREATE TABLE enrollments (
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE
);
```

---

## Performance & Optimization

### 1. **Code Splitting**

**React Router handles automatic code splitting:**
```typescript
const CoursesPage = lazy(() => import('./pages/CoursesPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));

// Components only loaded when route is accessed
```

### 2. **Lazy Loading Images**

**Curriculum sections:**
```typescript
{expandedSection === section.title && (
  // Content only renders when section is expanded
  <motion.div>
    {section.lessons.map(lesson => (
      <img src={lesson.image} loading="lazy" />
    ))}
  </motion.div>
)}
```

### 3. **Memoization**

```typescript
import { memo } from 'react';

// Prevents re-render if props haven't changed
export const CourseCard = memo(function CourseCard({ course }) {
  return <div>{course.title}</div>;
});
```

### 4. **Debouncing Search**

```typescript
const [searchQuery, setSearchQuery] = useState('');
const debouncedSearch = useMemo(
  () => debounce((query) => {
    // Perform search
  }, 300),
  []
);

<input
  onChange={(e) => debouncedSearch(e.target.value)}
/>
```

### 5. **Virtual Scrolling for Large Lists**

For very long course/blog lists, consider implementing virtual scrolling to only render visible items.

### 6. **Efficient State Updates**

```typescript
// ❌ Avoid: Re-renders entire array
const addCourse = (newCourse) => {
  setCourses([...courses, newCourse]);
};

// ✅ Better: Only affects enrollments in dashboard
const enrollInCourse = async (courseId) => {
  const enrollment = await api.enroll(courseId);
  setUserCourses(prev => [...prev, enrollment]);
};
```

### 7. **API Call Optimization**

```typescript
// Batch API calls when possible
const [enrollments, wishlist] = await Promise.all([
  getUserEnrollments(),
  getUserWishlist()
]);

// Instead of sequential calls
```

### 8. **Tailwind CSS Optimization**

The `cn()` utility combines classes efficiently:
```typescript
// cn = tailwind-merge + clsx
// Prevents conflicting Tailwind classes
const className = cn(
  'px-4 py-2',           // base
  variant === 'primary' && 'px-6',  // overrides px-4
);
// Result: "py-2 px-6" (not "px-4 px-6 py-2")
```

---

## Interview Questions & Answers

### **Architecture & Design**

**Q1: How is this application structured at a high level?**

A: The application follows a component-based architecture with:
- **Page Components:** Route-level components (HomePage, CoursesPage, DashboardPage)
- **Feature Components:** Domain-specific reusable components (CourseCard, BlogCard)
- **Base Components:** Shared UI elements (Button, Layout)
- **State Management:** Context API for auth (global), useState for page/component level
- **API Layer:** Encapsulated Supabase operations in lib/api.ts

The app uses React Router for client-side routing with nested layouts:
```
App (Routes)
└── Layout (Header + Outlet + Footer)
    ├── HomePage
    ├── CoursesPage
    ├── DashboardPage (protected route)
    └── etc.
```

---

**Q2: Why was Context API chosen instead of Redux/Zustand?**

A: For this application, Context API is sufficient because:
1. **Limited Global State:** Only authentication needs to be truly global
2. **Simple Data Flow:** No complex state transitions or side effects
3. **Reduced Boilerplate:** No actions, reducers, middleware needed
4. **Built-in Solution:** React 16.3+ provides everything needed
5. **Small App Size:** Adding Redux would increase bundle size for minimal benefit

The application uses:
- **Context:** Auth state (user, loading, sign in/up/out methods)
- **useState:** Page-level state (filters, active tabs, form data)
- **URL Params:** Filter persistence (search params)

---

**Q3: How does authentication work in this app?**

A: The authentication system uses Supabase Auth:

1. **Sign Up:**
   - User submits email, password, username
   - Supabase Auth creates user account
   - Username stored in user metadata
   - DB trigger automatically creates profile

2. **Sign In:**
   - Credentials validated by Supabase
   - Session token created
   - useAuth hook updates user state

3. **Session Persistence:**
   ```typescript
   useEffect(() => {
     // Check for existing session on app load
     supabase.auth.getSession();
     
     // Listen for auth state changes
     supabase.auth.onAuthStateChange((event, session) => {
       setUser(session?.user);
     });
   }, []);
   ```

4. **Protected Routes:**
   ```typescript
   if (!user) return <Navigate to="/" />;
   ```

---

**Q4: What is the purpose of each major directory?**

A: 
- **`/components`:** Reusable UI components organized by feature
- **`/pages`:** Route-level components (one per URL route)
- **`/data`:** Static mock data (courses, blog posts, categories)
- **`/types`:** TypeScript interfaces and type definitions
- **`/lib`:** External service integration (Supabase, API)
- **`/utils`:** Helper functions (cn() for classNames)
- **`/supabase`:** Database migrations and schema

---

### **State Management**

**Q5: How is data fetching and state management handled in the DashboardPage?**

A:
```typescript
export function DashboardPage() {
  const { user } = useAuth();  // Global auth state
  const [activeTab, setActiveTab] = useState('overview');  // Local UI state
  const [userCourses, setUserCourses] = useState([]);      // Local data state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUserData() {
      // Only load if user is authenticated
      if (!user) return;

      try {
        // Batch API calls with Promise.all
        const [enrollments, wishlistItems] = await Promise.all([
          getUserEnrollments(),
          getUserWishlist()
        ]);
        
        // Transform raw API data
        const courses = enrollments.map(enrollment => ({
          ...getCourseData(enrollment.course_id),
          progress: enrollment.progress,
          completed: enrollment.completed,
        }));

        setUserCourses(courses);
      } catch (error) {
        setError('Failed to load courses');
      } finally {
        setLoading(false);
      }
    }

    loadUserData();
  }, [user]);

  // Redirect if not authenticated
  if (!user) return <Navigate to="/" />;

  // Render with loading state
  if (loading) return <LoadingSpinner />;

  // Render with error state
  if (error) return <ErrorMessage message={error} />;

  // Render dashboard
}
```

---

**Q6: How are complex filters managed in the CoursesPage?**

A: The app uses a combination of strategies:

```typescript
// 1. Local filter state
const [filters, setFilters] = useState<FilterState>({
  search: '',
  sort: 'popular',
  difficulty: 'all',
  category: null,
  priceRange: [0, 200],
  rating: null,
});

// 2. URL params for persistence
const [searchParams, setSearchParams] = useSearchParams();
const category = searchParams.get('category');

// 3. Computed filtered list
const filteredCourses = courses
  .filter(course => {
    // Multiple filter conditions
    if (filters.category && course.category !== filters.category) return false;
    if (filters.search && !matchesSearch(course)) return false;
    if (!matchesPriceRange(course)) return false;
    return true;
  })
  .sort((a, b) => {
    // Dynamic sorting
    switch (filters.sort) {
      case 'price-low': return parseFloat(a.price) - parseFloat(b.price);
      case 'rating': return b.rating - a.rating;
      // ...
    }
  });

// 4. Memoized filter functions
const matchesPriceRange = useCallback((course) => {
  const price = parseFloat(course.price.replace('$', ''));
  return price >= filters.priceRange[0] && price <= filters.priceRange[1];
}, [filters.priceRange]);
```

This approach:
- Keeps filters in component state
- Persists filters in URL (shareable links)
- Computes filtered list in real-time
- Optimizes performance with memoization

---

**Q7: How would you add a feature to save filters as presets?**

A: Here's the implementation:

```typescript
// Add to component state
const [savedFilters, setSavedFilters] = useState<SavedFilter[]>([]);

// Function to save current filter
const saveFilter = (name: string) => {
  setSavedFilters(prev => [...prev, {
    name,
    filter: { ...filters }
  }]);
  // Persist to localStorage
  localStorage.setItem('savedFilters', JSON.stringify(savedFilters));
};

// Function to load saved filter
const loadFilter = (name: string) => {
  const saved = savedFilters.find(f => f.name === name);
  if (saved) {
    setFilters(saved.filter);
  }
};

// Function to delete saved filter
const deleteFilter = (name: string) => {
  setSavedFilters(prev => prev.filter(f => f.name !== name));
};

// UI
<button onClick={() => saveFilter('My Favorite Filters')}>
  Save Filters
</button>

<select onChange={(e) => loadFilter(e.target.value)}>
  {savedFilters.map(f => (
    <option key={f.name}>{f.name}</option>
  ))}
</select>
```

---

### **Components & UI**

**Q8: Explain the CourseCard component and its reusability.**

A: The CourseCard is a controlled component that displays course information:

```typescript
interface CourseCardProps {
  course: Course;
  onEnroll?: () => void;
  onWishlist?: () => void;
  isWishlisted?: boolean;
}

export function CourseCard({
  course,
  onEnroll,
  onWishlist,
  isWishlisted = false
}) {
  return (
    <div className="rounded-xl bg-gray-800 hover:shadow-lg">
      {/* Course image with lazy loading */}
      <img src={course.image} loading="lazy" />

      {/* Course metadata */}
      <h3>{course.title}</h3>
      <p>{course.instructor}</p>

      {/* Stats */}
      <div className="flex gap-4">
        <span>⏱ {course.duration}</span>
        <span>👥 {formatNumber(course.students)} students</span>
        <span>⭐ {course.rating}/5</span>
      </div>

      {/* Price and actions */}
      <div className="flex justify-between">
        <span>{course.price}</span>
        <Button onClick={onEnroll}>Enroll</Button>
        <Button
          variant="secondary"
          onClick={onWishlist}
          className={isWishlisted ? 'bg-red-500' : ''}
        >
          <Heart fill={isWishlisted ? 'red' : 'none'} />
        </Button>
      </div>
    </div>
  );
}
```

**Reusability:**
- Used in HomePage (featured courses)
- Used in CoursesPage (search results)
- Used in Dashboard (recommended courses)
- All callbacks are optional and customizable

---

**Q9: How does animation work with framer-motion?**

A: The app uses framer-motion for:

```typescript
// 1. Page transitions
<motion.div
  initial={{ opacity: 0, y: 20 }}    // Start state
  animate={{ opacity: 1, y: 0 }}      // End state
  exit={{ opacity: 0, y: -20 }}       // Exit animation
  transition={{ duration: 0.3 }}      // Timing
>
  {content}
</motion.div>

// 2. Hover effects
<motion.div
  whileHover={{ scale: 1.05 }}        // On hover
  whileTap={{ scale: 0.95 }}          // On click
>
  Button
</motion.div>

// 3. Conditional animations with AnimatePresence
<AnimatePresence mode="wait">
  {expandedSection === section.id && (
    <motion.div
      key="expanded"
      initial={{ height: 0 }}
      animate={{ height: 'auto' }}
      exit={{ height: 0 }}
    >
      {content}
    </motion.div>
  )}
</AnimatePresence>

// 4. Scroll-based animations
const { scrollYProgress } = useScroll();
const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.5]);

// 5. Staggered animations
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};
```

---

### **Database & API**

**Q10: Describe the relationship between enrollments and the database.**

A: Enrollments model user course enrollment:

```sql
-- Table structure
CREATE TABLE enrollments (
  id uuid PRIMARY KEY,
  user_id uuid REFERENCES profiles(id),
  course_id text,            -- Reference to courses.title
  progress integer,           -- 0-100 percentage
  completed boolean,          -- Course finished?
  current_module text,        -- Last accessed module
  last_accessed timestamptz,  -- Timestamp of last activity
  created_at timestamptz,     -- Enrollment date
  UNIQUE(user_id, course_id)  -- Prevent duplicate enrollments
);
```

**API Operations:**

```typescript
// Enroll in course
export async function enrollInCourse(courseTitle: string) {
  const { data: { user } } = await supabase.auth.getUser();
  
  const { data, error } = await supabase
    .from('enrollments')
    .insert({
      user_id: user.id,
      course_id: courseTitle,
      progress: 0,
      current_module: 'Introduction'
    })
    .select();

  // Handle already enrolled
  if (error?.code === '23505') { // Unique constraint
    return { alreadyEnrolled: true };
  }
  
  return { success: true, enrollment: data };
}

// Update progress
export async function updateCourseProgress(
  courseTitle: string,
  progress: number,
  currentModule: string
) {
  const { data: { user } } = await supabase.auth.getUser();

  return supabase
    .from('enrollments')
    .update({
      progress,
      current_module: currentModule,
      last_accessed: new Date().toISOString(),
      completed: progress === 100
    })
    .match({ user_id: user.id, course_id: courseTitle });
}

// Get user enrollments
export async function getUserEnrollments() {
  const { data: { user } } = await supabase.auth.getUser();

  const { data } = await supabase
    .from('enrollments')
    .select('*')
    .eq('user_id', user.id);

  return data || [];
}
```

**Key Design Decisions:**
- UNIQUE constraint prevents duplicate enrollments
- Tracks progress percentage (0-100)
- Stores current module for resume functionality
- Timestamps for analytics
- Foreign key to profiles for data integrity

---

**Q11: How would you implement a review system for courses?**

A: Here's a complete implementation:

```typescript
// 1. Add review type
interface Review {
  id: string;
  courseId: string;
  userId: string;
  rating: number;    // 1-5
  content: string;
  createdAt: string;
  author: string;
  avatar: string;
}

// 2. Create reviews table
CREATE TABLE reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id text NOT NULL,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  rating integer CHECK (rating >= 1 AND rating <= 5),
  content text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(course_id, user_id)  -- One review per user per course
);

// 3. Add API functions
export async function submitReview(
  courseId: string,
  rating: number,
  content: string
) {
  const { data: { user } } = await supabase.auth.getUser();
  
  return supabase
    .from('reviews')
    .insert({
      course_id: courseId,
      user_id: user.id,
      rating,
      content
    })
    .select();
}

export async function getCourseReviews(courseId: string) {
  return supabase
    .from('reviews')
    .select(`
      *,
      profiles:user_id(username, avatar)
    `)
    .eq('course_id', courseId)
    .order('created_at', { ascending: false });
}

// 4. ReviewForm Component
export function ReviewForm({ courseId, onClose }) {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await submitReview(courseId, rating, content);
      onClose();
    } catch (error) {
      alert('Failed to submit review');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Rating</label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map(value => (
            <button
              key={value}
              onClick={() => setRating(value)}
              type="button"
            >
              <Star
                filled={value <= rating}
                className={value <= rating ? 'fill-yellow-500' : ''}
              />
            </button>
          ))}
        </div>
      </div>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Share your experience..."
        required
      />

      <Button type="submit" disabled={!rating || !content}>
        Submit Review
      </Button>
    </form>
  );
}

// 5. Reviews Display Component
export function ReviewsList({ courseId }) {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    async function loadReviews() {
      const { data } = await getCourseReviews(courseId);
      setReviews(data || []);
      
      // Calculate average rating
      const avg = data?.reduce((sum, r) => sum + r.rating, 0) / data?.length;
      setAverageRating(avg);
    }
    loadReviews();
  }, [courseId]);

  return (
    <div>
      <div className="flex items-center gap-4">
        <span className="text-3xl font-bold">{averageRating.toFixed(1)}</span>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map(i => (
            <Star key={i} filled={i <= Math.round(averageRating)} />
          ))}
        </div>
        <span>({reviews.length} reviews)</span>
      </div>

      <div className="space-y-4 mt-6">
        {reviews.map(review => (
          <div key={review.id} className="border-b pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src={review.profiles.avatar} />
                <span>{review.profiles.username}</span>
              </div>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(i => (
                  <Star key={i} filled={i <= review.rating} />
                ))}
              </div>
            </div>
            <p className="text-gray-300">{review.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

### **Real-World Scenarios**

**Q12: How would you handle a user who enrolls in the same course twice?**

A: The database UNIQUE constraint prevents this:

```sql
UNIQUE(user_id, course_id)
```

When a duplicate enrollment is attempted:
```typescript
export async function enrollInCourse(courseTitle: string) {
  try {
    const { error } = await supabase
      .from('enrollments')
      .insert({ user_id, course_id: courseTitle });

    if (error?.code === '23505') {
      // Unique constraint violation
      return {
        success: false,
        alreadyEnrolled: true,
        message: 'You are already enrolled in this course'
      };
    }
    // ...
  }
}
```

**In the UI:**
```typescript
const result = await enrollInCourse(course.id);

if (result.alreadyEnrolled) {
  alert('You are already enrolled in this course!');
  navigate('/dashboard');
} else if (result.success) {
  alert('Successfully enrolled!');
}
```

---

**Q13: How would you implement course recommendations?**

A: Several approaches:

```typescript
// 1. Rule-based (current implementation)
// Get courses from categories user is already enrolled in
function getRecommendedCourses(userEnrollments: any[]) {
  const userCategories = userEnrollments.map(e => e.category);
  
  return courses.filter(course =>
    userCategories.includes(course.category) &&
    !userEnrollments.find(e => e.id === course.id)
  );
}

// 2. Popularity-based
function getPopularCourses() {
  return courses
    .sort((a, b) => b.students - a.students)
    .slice(0, 3);
}

// 3. Rating-based
function getHighRatedCourses() {
  return courses
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);
}

// 4. Machine Learning approach (future)
// Could use a recommendation service like:
// - Collaborative filtering
// - Content-based filtering
// - Hybrid approach
```

---

**Q14: How do you handle errors and loading states?**

A: Comprehensive error handling pattern:

```typescript
export function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCourses() {
      try {
        setLoading(true);
        setError(null);
        
        const data = await fetchCourses();
        setCourses(data);
      } catch (err) {
        // Log to error tracking service
        console.error('Failed to load courses:', err);
        
        // Set user-friendly error message
        if (err.code === 'NETWORK_ERROR') {
          setError('Unable to connect. Check your internet.');
        } else if (err.code === 'UNAUTHORIZED') {
          setError('Please log in to view courses');
        } else {
          setError('Failed to load courses. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    }

    loadCourses();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent" />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="rounded-xl bg-red-500/10 border border-red-500 p-4">
        <p className="text-red-500">{error}</p>
        <button onClick={() => window.location.reload()}>
          Try Again
        </button>
      </div>
    );
  }

  // Empty state
  if (courses.length === 0) {
    return (
      <div className="text-center py-12">
        <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-400">No courses found</p>
      </div>
    );
  }

  // Success state
  return <CourseGrid courses={courses} />;
}
```

---

**Q15: What's the most important lesson from building this app?**

A: **Separation of Concerns:**

1. **Component Responsibility:** Each component has one job
   - Button: Render styled button
   - CourseCard: Display course information
   - CoursesPage: Manage course listing page

2. **Data Flow:** Unidirectional and predictable
   - Parent passes data down
   - Child calls parent callbacks
   - No prop drilling with Context where needed

3. **API Layer Abstraction:** Don't mix UI and API logic
   ```typescript
   // ❌ Bad: API logic in component
   export function CourseCard() {
     const handleEnroll = () => {
       supabase.from('enrollments').insert(...);
     };
   }

   // ✅ Good: Abstracted API
   export function CourseCard({ onEnroll }) {
     const handleEnroll = () => {
       onEnroll();  // Let parent handle API
     };
   }
   ```

4. **Scalability:** This structure scales to 100+ pages
   - Add new pages without modifying existing code
   - Reuse components across features
   - Update API methods in one place

---

## Additional Tips for Interview

1. **Know Your Data Flow:** Understand how data moves from API → Component → UI
2. **Explain Trade-offs:** Why Context API instead of Redux? Why this component structure?
3. **Think About Edge Cases:** What if network fails? What if user is logged out?
4. **Performance:** Mention optimization strategies you could implement
5. **Testing:** Suggest how you'd test critical flows
6. **Accessibility:** Mention semantic HTML, ARIA labels, keyboard navigation
7. **Future Improvements:** What would you add next? How would you scale?

---

## Summary of Key Concepts

| Concept | Implementation |
|---------|-----------------|
| **Routing** | React Router v6 with nested layouts |
| **State Management** | Context API (auth) + useState (local) + URL params |
| **API Integration** | Supabase with RLS policies |
| **Animations** | Framer Motion with smooth transitions |
| **Styling** | Tailwind CSS with custom color scheme |
| **Type Safety** | TypeScript interfaces for all data |
| **Database** | PostgreSQL via Supabase with migrations |
| **Authentication** | Supabase Auth with session persistence |
| **Error Handling** | Try/catch with user-friendly error messages |
| **Performance** | Code splitting, lazy loading, memoization |

---

Good luck with your interview! This guide covers the major aspects of the application. Focus on understanding the architecture, being able to explain design decisions, and demonstrating knowledge of both frontend and backend concepts.
