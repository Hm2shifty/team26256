import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import swervoLogo from '/assets/swervologo.jpg';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header>
      <div className="container nav-container">
        <Link to="/" className="logo" onClick={closeMenu}>
          <img src={swervoLogo} alt="SWERVO Logo" style={{ height: '36px', width: '36px', borderRadius: '50%', objectFit: 'cover', marginRight: '10px', verticalAlign: 'middle' }} />
          SWERVO <span className="team-number">26256</span>
        </Link>

        <button className="mobile-menu-btn" aria-label="Toggle Menu" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        <nav className={`nav-links ${isMenuOpen ? 'show' : ''}`}>
          <NavLink to="/" onClick={closeMenu} className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink>
          <NavLink to="/gallery" onClick={closeMenu} className={({ isActive }) => (isActive ? 'active' : '')}>Gallery</NavLink>
          <NavLink to="/portfolio" onClick={closeMenu} className={({ isActive }) => (isActive ? 'active' : '')}>Portfolio</NavLink>
          <NavLink to="/robot" onClick={closeMenu} className={({ isActive }) => (isActive ? 'active' : '')}>Robot</NavLink>
          {/* Team page hidden — re-add NavLink here when ready */}
          <NavLink to="/sponsors" onClick={closeMenu} className={({ isActive }) => (isActive ? 'active' : '')}>Sponsors</NavLink>
          <NavLink to="/stats" onClick={closeMenu} className={({ isActive }) => (isActive ? 'active' : '')}>Stats</NavLink>
          <NavLink to="/notebook" onClick={closeMenu} className={({ isActive }) => (isActive ? 'active' : '')}>Notebook</NavLink>
          <NavLink to="/contact" onClick={closeMenu} className={({ isActive }) => (isActive ? 'active' : '')}>Contact</NavLink>
        </nav>
        
        <div className="nav-actions">
          <a href="https://www.instagram.com/ftc26256/" target="_blank" rel="noopener noreferrer" className="nav-social-icon" aria-label="Instagram">
            <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>
          <Link to="/registration" className="btn btn-primary nav-cta" onClick={closeMenu}>Join Team</Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
