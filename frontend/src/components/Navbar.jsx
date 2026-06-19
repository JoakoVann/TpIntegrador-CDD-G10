import './Navbar.css'

export default function Navbar({ activeTab, onTabChange }) {
  return (
    <header className="navbar">
      <div className="navbar__brand">
        <div className="navbar__logo">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <path d="M8 21h8M12 17v4" />
          </svg>
        </div>
        <div className="navbar__brand-text">
          <span className="navbar__brand-name">SignalLab</span>
          <span className="navbar__brand-sub">Procesamiento de Señales</span>
        </div>
      </div>

      <nav className="navbar__tabs">
        <button
          id="tab-digitalizacion"
          className={`navbar__tab ${activeTab === 'digitalizacion' ? 'navbar__tab--active' : ''}`}
          onClick={() => onTabChange('digitalizacion')}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M3 9h18M9 21V9" />
          </svg>
          Digitalización
        </button>

        <button
          id="tab-codificacion"
          className={`navbar__tab ${activeTab === 'codificacion' ? 'navbar__tab--active' : ''}`}
          onClick={() => onTabChange('codificacion')}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
          Codificación
        </button>
      </nav>
    </header>
  )
}
