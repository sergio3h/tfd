import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import PassengersPage from './pages/Passengers';
import DriversPage from './pages/Drivers';
import VehiclesPage from './pages/Vehicles';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/passengers" element={<PassengersPage />} />
          <Route path="/drivers" element={<DriversPage />} />
          <Route path="/vehicles" element={<VehiclesPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
