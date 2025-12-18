import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import './Header.css'
import logo from '../../assets/logo-paroquia.jpg'
import { Home, Presentation, Settings, Table } from 'lucide-react'

export const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="header-brand">
          <img src={logo} alt="Logo" className="header-logo" />
        </Link>
        
        <nav className="header-nav">
          <NavLink to="/" className="nav-link" title="Home">
            <span className="nav-icon"><Home /></span>
          </NavLink>
          <NavLink to="/bingo" className="nav-link" title="Bingo">
            <span className="nav-icon"><Table /></span>
          </NavLink>
          <NavLink to="/comerciais" className="nav-link" title="Comerciais">
            <span className="nav-icon"><Presentation /></span>
          </NavLink>
          <NavLink to="/admin" className="nav-link" title="Configurações">
            <span className="nav-icon"><Settings /></span>
          </NavLink>
        </nav>
      </div>
    </header>
  )
}