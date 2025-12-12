import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

export const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="header-brand">
          <img src="/logo-paroquia.jpg" alt="Logo Paróquia" className="header-logo" />
          <span className="header-title">Paróquia N. Sra. de Lourdes</span>
        </Link>
        
        <nav className="header-nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/bingo" className="nav-link">Bingo</Link>
          <Link to="/comerciais" className="nav-link">Comerciais</Link>
          <Link to="/admin" className="nav-link">Configurações</Link>
        </nav>
      </div>
    </header>
  )
}