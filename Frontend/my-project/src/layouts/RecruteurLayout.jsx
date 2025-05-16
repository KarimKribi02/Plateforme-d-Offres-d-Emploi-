// src/layouts/RecruteurLayout.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';

export default function RecruteurLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar role="recruteur" />
      <div className="flex-grow bg-gray-100 p-6 ml-64">
        <Outlet /> 
         
      </div>
    </div>
  );
}
