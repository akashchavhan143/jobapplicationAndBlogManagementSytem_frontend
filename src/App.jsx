import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import Home from './pages/forall/Home';
import Login from './pages/forall/Login';
import Register from './pages/forall/Register';

import JobApplications from './pages/User/JobApplications';

import Blogs from './pages/User/MyBolgs';
import JobPortalAccounts from './pages/User/JobPortalAccounts';
import Notifications from './pages/Notifications';
import BlogComments from './pages/BlogComments';
import ProtectedRoute from './components/ProtectedRoute';
import BlogPage from './pages/BlogPage';
import BlogForm from './editor/BlogForm';
import BlogList from './editor/BlogListPage';
import BlogDetail from './editor/BlogDetail';
import Dashboard from './pages/User/Dashboard';
import AdminDashboard from './pages/Admin/AdminDashboard';
import ManageUsers from './pages/Admin/ManageUsers';
import ManageBlogs from './pages/Admin/ManageBlogs';
import ManageVacancies from './pages/Admin/ManageVacancies';
import JobVacancyPage from './pages/forall/JobVacancyPage';

function App() {
  return (
    <ConfigProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/blogs" element={<BlogList />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/job-applications" element={<ProtectedRoute><JobApplications /></ProtectedRoute>} />
          <Route path="/my-blogs" element={<ProtectedRoute><Blogs /></ProtectedRoute>} />
          <Route path="/blogs" element={<ProtectedRoute><BlogPage /></ProtectedRoute>} />
          <Route path="/blog-form" element={<ProtectedRoute><BlogForm /></ProtectedRoute>} />
          <Route path="/blog-list" element={<ProtectedRoute><BlogList /></ProtectedRoute>} />
          <Route path="/blog-detail/:id" element={<ProtectedRoute><BlogDetail /></ProtectedRoute>} />
          <Route path="/job-portal-accounts" element={<ProtectedRoute><JobPortalAccounts /></ProtectedRoute>} />
          <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
          <Route path="/blog-comments" element={<ProtectedRoute><BlogComments /></ProtectedRoute>} />
          {/* this is for admin only */}
          <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard/></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute><ManageUsers/></ProtectedRoute>} />
          <Route path="/admin/blogs" element={<ProtectedRoute><ManageBlogs/></ProtectedRoute>} />
          <Route path="/admin/vacancies" element={<ProtectedRoute><ManageVacancies/></ProtectedRoute>} />

          {/* anyone can can acces */}
            <Route path="/job-vacancies" element={<ProtectedRoute><JobVacancyPage/></ProtectedRoute>} />
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;
