import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Sun, Moon, Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const { t } = useTranslation();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const navLinks = [
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.skills'), href: '#skills' },
    { name: t('nav.projects'), href: '#projects' },
    // { name: t('nav.awards'), href: '#awards' },
    { name: t('nav.certificates'), href: '#certificates' },
    // { name: t('nav.code'), href: '#code' },
  ];

  return (
    <nav className="navbar glass">
      <div className="container nav-container">
        <a href="#" className="logo">
          <span className="text-gradient">Ziad Ashraf</span>
        </a>

        <div className="nav-actions hidden-mobile">
          <ul className="nav-links">
            {navLinks.map((link, idx) => (
              <li key={idx}>
                <a href={link.href}>{link.name}</a>
              </li>
            ))}
          </ul>
          
          <div className="icon-buttons">
            <button onClick={toggleTheme} className="icon-btn" aria-label="Toggle Theme">
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </div>
          
          <a href="#contact" className="btn btn-primary">{t('nav.contact')}</a>
        </div>

        <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="mobile-menu glass">
          <ul className="mobile-nav-links">
            {navLinks.map((link, idx) => (
              <li key={idx}>
                <a href={link.href} onClick={() => setIsMenuOpen(false)}>{link.name}</a>
              </li>
            ))}
          </ul>
          <div className="mobile-actions">
            <button onClick={toggleTheme} className="icon-btn">
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
