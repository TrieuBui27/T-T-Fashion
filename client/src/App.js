import './App.css';
import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Customer
import CustomerProvider from './customer/contexts/MyProvider';
import CustomerMain from './customer/components/MainComponent';

// Admin
import AdminProvider from './admin/contexts/MyProvider';
import AdminLogin from './admin/components/LoginComponent';
import AdminMain from './admin/components/MainComponent';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          {/* Tất cả route /admin/* dùng AdminProvider */}
          <Route path="/admin/*" element={
            <AdminProvider>
              <AdminLogin />
              <AdminMain />
            </AdminProvider>
          } />

          {/* Tất cả route còn lại dùng CustomerProvider */}
          <Route path="/*" element={
            <CustomerProvider>
              <CustomerMain />
            </CustomerProvider>
          } />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;