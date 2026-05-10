import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [sponsors, setSponsors] = useState([]);

  useEffect(() => {
    fetch('/sponsors.json')
      .then(res => res.json())
      .then(data => {
        let allSponsors = [];
        Object.values(data).forEach(tierList => {
          allSponsors = allSponsors.concat(tierList);
        });
        setSponsors(allSponsors);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <section className="page active fade-in" style={{ display: 'block' }}>
      <div className="hero">
        <div className="hero-content">
          <h1>Precision-driven robotics through iterative engineering.</h1>
          <p className="tagline">We are FTC Team 26256. Building advanced mechanical systems and writing structured automation to compete at the highest level of the FIRST Tech Challenge.</p>
          <div className="hero-actions">
            <Link to="/robot" className="btn btn-primary">View Robot Specs</Link>
            <Link to="/sponsors" className="btn btn-secondary">Become a Sponsor</Link>
          </div>
        </div>
        <div className="hero-visual">
          <div className="logo-hero-container">
            <div className="wireframe-glow" style={{ borderRadius: '50%' }}></div>
            <img 
              src="/assets/swervologo.jpg"
              alt="SWERVO 26256 Logo" 
              className="logo-hero-img" 
            />
          </div>
        </div>
      </div>

      <div className="sponsor-marquee-container">
        <div className="sponsor-marquee-track">
          {sponsors.length > 0 && Array(3).fill().map((_, loopIndex) => (
            <React.Fragment key={loopIndex}>
              {sponsors.map((s, i) => (
                <a href={s.url} target="_blank" rel="noopener noreferrer" title={s.name} key={`${loopIndex}-${i}`}>
                  <img src={s.logo} alt={s.name} className="marquee-logo" onError={(e) => { e.target.style.display = 'none'; e.target.nextElementSibling.style.display = 'inline'; }} />
                  <span className="marquee-fallback" style={{ display: 'none' }}>{s.name}</span>
                </a>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="stat-strip">
        <div className="stat-item">
          <span className="stat-value">2</span>
          <span className="stat-label">24-25 Competitions</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">3</span>
          <span className="stat-label">24-25 Awards</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">5-5</span>
          <span className="stat-label">24-25 Record</span>
        </div>
      </div>
    </section>
  );
}

export default Home;
