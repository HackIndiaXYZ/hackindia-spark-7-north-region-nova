import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import About from './pages/About';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Scan from './pages/Scan';
import PatientForm from './pages/PatientForm';
import PatientDashboard from './pages/PatientDashboard';
import HospitalDashboard from './pages/HospitalDashboard';
import SuperAdminDashboard from './pages/SuperAdminDashboard';
import HospitalSelect from './pages/HospitalSelect';
import DoctorSelect from './pages/DoctorSelect';
import Queue from './pages/Queue';
import NotFound from './pages/NotFound';

import './style.css';

const WaitlessApp = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/scan" element={<Scan />} />

          {/* Protected Routes - Patient */}
          <Route path="/hospital" element={<ProtectedRoute allowedRoles={['patient']}><HospitalSelect /></ProtectedRoute>} />
          <Route path="/doctor" element={<ProtectedRoute allowedRoles={['patient']}><DoctorSelect /></ProtectedRoute>} />
          <Route path="/patient" element={<ProtectedRoute allowedRoles={['patient']}><PatientForm /></ProtectedRoute>} />
          <Route path="/queue" element={<ProtectedRoute allowedRoles={['patient']}><Queue /></ProtectedRoute>} />
          <Route path="/dashboard/patient" element={<ProtectedRoute allowedRoles={['patient']}><PatientDashboard /></ProtectedRoute>} />

          {/* Protected Routes - Hospital Admin */}
          <Route path="/dashboard/hospital" element={<ProtectedRoute allowedRoles={['admin']}><HospitalDashboard /></ProtectedRoute>} />

          {/* Protected Routes - Super Admin */}
          <Route path="/dashboard/admin" element={<ProtectedRoute allowedRoles={['super']}><SuperAdminDashboard /></ProtectedRoute>} />

          {/* Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default WaitlessApp;
