import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header>
      <div className="container nav-container">
        <Link to="/" className="logo" onClick={closeMenu}>
          <img src="/assets/swervologo.jpg" alt="SWERVO Logo" style={{ height: '34px', width: '34px', borderRadius: '50%', objectFit: 'cover', marginRight: '8px', verticalAlign: 'middle', flexShrink: 0 }} />
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
          <a href="https://github.com/SWERVO-26256" target="_blank" rel="noopener noreferrer" className="nav-social-icon" aria-label="GitHub">
            <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
          </a>
          <a href="https://www.instagram.com/ftc26256/" target="_blank" rel="noopener noreferrer" className="nav-social-icon" aria-label="Instagram">
            <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>
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
