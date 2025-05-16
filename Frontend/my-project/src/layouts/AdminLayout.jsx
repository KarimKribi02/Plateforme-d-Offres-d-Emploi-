// src/layouts/AdminLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';


export default function AdminLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar role="admin" />
      <div className="flex-grow bg-gray-100 p-6 ml-64">
        <Outlet /> {/* ✅ Ceci affichera la page correspondante */}
      </div>
    </div>
  );
}
