import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { CoursesPage } from './pages/CoursesPage';
import { CourseDetailPage } from './components/courses/CourseDetailPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { BlogPage } from './pages/BlogPage';
import { BlogDetailPage } from './pages/BlogDetailPage';
import { AboutPage } from './pages/AboutPage';
import { HelpCenter } from './pages/resources/HelpCenter';
import { StudentSuccess } from './pages/resources/StudentSuccess';
import { Documentation } from './pages/resources/Documentation';
import { PrivacyPolicy } from './pages/legal/PrivacyPolicy';
import { TermsOfService } from './pages/legal/TermsOfService';
import { CookiePolicy } from './pages/legal/CookiePolicy';
import { DashboardPage } from './pages/DashboardPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="courses" element={<CoursesPage />} />
        <Route path="courses/:courseId" element={<CourseDetailPage />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="blog" element={<BlogPage />} />
        <Route path="blog/:blogId" element={<BlogDetailPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="help" element={<HelpCenter />} />
        <Route path="success" element={<StudentSuccess />} />
        <Route path="docs" element={<Documentation />} />
        <Route path="privacy" element={<PrivacyPolicy />} />
        <Route path="terms" element={<TermsOfService />} />
        <Route path="cookies" element={<CookiePolicy />} />
        <Route path="dashboard" element={<DashboardPage />} />
      </Route>
    </Routes>
  );
}