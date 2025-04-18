import React from 'react'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  return (
    <>
       <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">MonApp</h1>
        <ul className="flex space-x-4">
          <li><a href="#" className="text-gray-700 hover:text-blue-500">Accueil</a></li>
          <li><a href="#" className="text-gray-700 hover:text-blue-500">À propos</a></li>
          <li><a href="#" className="text-gray-700 hover:text-blue-500">Contact</a></li>
        </ul>
      </nav>

      {/* Contenu principal */}
      <main className="flex flex-col items-center justify-center text-center mt-20">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Bienvenue sur MonApp !</h2>
        <p className="text-gray-600 mb-6">Une belle interface moderne avec React + TailwindCSS.</p>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition">
          Commencer
        </button>
      </main>
    </div>

    
    </>
  )
}

export default App
