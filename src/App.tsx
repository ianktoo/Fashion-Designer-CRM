
import React from 'react';
import { HashRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './lib/auth';

import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DesignerDashboardPage from './features/dashboard/pages/DesignerDashboardPage';
import ClientListPage from './features/clients/pages/ClientListPage';
import ClientDetailPage from './features/clients/pages/ClientDetailPage';
import AppointmentsPage from './features/appointments/pages/AppointmentsPage';
import IdeasPage from './features/ideas/pages/IdeasPage';
import ClientPortalPage from './features/portal/pages/ClientPortalPage';
import ClientBookingPage from './features/portal/pages/ClientBookingPage';
import LoginPage from './features/auth/pages/LoginPage';


const DesignerLayout = () => {
    const auth = React.useContext(AuthContext);
    if (!auth?.isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-950 font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-6 py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          {/* Client-facing routes */}
          <Route path="/portal" element={<ClientPortalPage />} />
          <Route path="/booking/:shortId" element={<ClientBookingPage />} />
          
          {/* Designer-facing routes */}
          <Route path="/login" element={<LoginPage />} />

          <Route element={<DesignerLayout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DesignerDashboardPage />} />
            <Route path="/clients" element={<ClientListPage />} />
            <Route path="/clients/:clientId" element={<ClientDetailPage />} />
            <Route path="/appointments" element={<AppointmentsPage />} />
            <Route path="/ideas" element={<IdeasPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;
