import { Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import CoursesPage from "@/pages/CoursesPage";
import CourseDetailPage from "@/pages/CourseDetailPage";
import TestSeriesPage from "@/pages/TestSeriesPage";
import TestSeriesDetailPage from "@/pages/TestSeriesDetailPage";
import LoginPage from "@/pages/LoginPage";
import AdminDashboard from "@/pages/AdminDashboard";
import StudentDashboard from "@/pages/StudentDashboard";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import GalleryPage from "@/pages/GalleryPage";
import BlogPage from "@/pages/BlogPage";   // ✅ add this
import NotFound from "@/pages/NotFound";
import ProtectedRoute from "@/components/ProtectedRoute";

export const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/courses" element={<CoursesPage />} />
    <Route path="/courses/:id" element={<CourseDetailPage />} />
    <Route path="/test-series" element={<TestSeriesPage />} />
    <Route path="/test-series/:id" element={<TestSeriesDetailPage />} />
    <Route path="/login" element={<LoginPage />} />

    <Route
      path="/admin"
      element={
        <ProtectedRoute requiredRole="admin">
          <AdminDashboard />
        </ProtectedRoute>
      }
    />

    <Route
      path="/dashboard"
      element={
        <ProtectedRoute requiredRole="student">
          <StudentDashboard />
        </ProtectedRoute>
      }
    />

    <Route path="/about" element={<AboutPage />} />
    <Route path="/gallery" element={<GalleryPage />} />

    {/* BLOG PAGE */}
    <Route path="/blog" element={<BlogPage />} />

    <Route path="/contact" element={<ContactPage />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRouter;