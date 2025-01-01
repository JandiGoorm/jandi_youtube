import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Videos from './videos.js';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

function Header() {
  return (
    <header style={headerStyle}>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <img
          src="/logo.svg"
          alt="YouTube Logo"
          style={logoStyle}
        />
      </Link>
    </header>
  );
}

function Home() {
  return (
    <div className='App'>
      <Videos/>
    </div>
  );
}

function About() {
  return <h1 style={pageStyle}>About Page</h1>;
}

const headerStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: '10px 20px',
  backgroundColor: '#ffffff',
  color: 'white',
};

const logoStyle = {
  height: '40px',
  cursor: 'pointer',
};

const pageStyle = {
  textAlign: 'center',
  marginTop: '50px',
};

export default App;
