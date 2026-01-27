'use client'

import { useState } from 'react'

export default function Header() {
  const [menuAberto, setMenuAberto] = useState(false)

  return (
    <header className="bg-secondary border-b border-gray-700 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="text-2xl font-bold text-gradient">⚡</div>
          <div>
            <h1 className="text-xl font-bold">The High-Performance</h1>
            <p className="text-xs text-gray-400">Closer</p>
          </div>
        </div>

        {/* Nav Desktop */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="text-gray-300 hover:text-accent transition-colors">
            Calculadora
          </a>
          <a href="#" className="text-gray-300 hover:text-accent transition-colors">
            Sobre
          </a>
          <a href="#" className="text-gray-300 hover:text-accent transition-colors">
            Contato
          </a>
          <button className="btn-primary text-sm">
            Lista VIP
          </button>
        </nav>

        {/* Menu Mobile */}
        <button
          onClick={() => setMenuAberto(!menuAberto)}
          className="md:hidden text-white"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Menu Mobile Dropdown */}
      {menuAberto && (
        <div className="md:hidden bg-primary border-t border-gray-700 p-4 space-y-4">
          <a href="#" className="block text-gray-300 hover:text-accent transition-colors">
            Calculadora
          </a>
          <a href="#" className="block text-gray-300 hover:text-accent transition-colors">
            Sobre
          </a>
          <a href="#" className="block text-gray-300 hover:text-accent transition-colors">
            Contato
          </a>
          <button className="btn-primary w-full text-sm">
            Lista VIP
          </button>
        </div>
      )}
    </header>
  )
}
