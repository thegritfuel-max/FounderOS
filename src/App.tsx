import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './pages/AuthPage';
import { DashboardLayout } from './pages/Dashboard/DashboardLayout';
import { Overview } from './pages/Dashboard/Overview';
import { Market } from './pages/Dashboard/Market';
import { Simulation } from './pages/Dashboard/Simulation';
import { Mentor } from './pages/Dashboard/Mentor';
import { Reports } from './pages/Dashboard/Reports';
import { Analysis } from './pages/Dashboard/Analysis';
import { Roadmap } from './pages/Dashboard/Roadmap';
import { Finance } from './pages/Dashboard/Finance';
import { ProductBuilder } from './pages/Dashboard/ProductBuilder';
import { Settings } from './pages/Dashboard/Settings';
import { Navbar } from './components/Navbar';
import { ErrorBoundary } from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen bg-[#FAFAFA]">
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/signup" element={<AuthPage />} />
            
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Overview />} />
              <Route path="analysis" element={<Analysis />} />
              <Route path="market" element={<Market />} />
              <Route path="product" element={<ProductBuilder />} />
              <Route path="finance" element={<Finance />} />
              <Route path="roadmap" element={<Roadmap />} />
              <Route path="simulation" element={<Simulation />} />
              <Route path="reports" element={<Reports />} />
              <Route path="mentor" element={<Mentor />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
