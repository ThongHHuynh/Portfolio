import "./Header.css";

function Header() {
  return (
    <header className="site-header">
      <div className="header-brand">
        <a href="#home" className="brand-name">
          Thong Huynh
        </a>
      </div>
      <nav className="header-nav" aria-label="Primary">
        <a href="#about">About</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  );
}

export default Header;