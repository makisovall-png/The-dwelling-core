import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if user is logged in
  const isLoggedIn = localStorage.getItem('user') !== null;
  
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => navigate('/')}>
        <h2>DesignSpace</h2>
      </div>
      
      <div className="navbar-links">
        <button 
          className={location.pathname === '/' ? 'nav-link active' : 'nav-link'}
          onClick={() => navigate('/')}
        >
          Home
        </button>
        
        {isLoggedIn ? (
          <>
            <button 
              className={location.pathname === '/products' ? 'nav-link active' : 'nav-link'}
              onClick={() => navigate('/products')}
            >
              Products
            </button>
            <button 
              className={location.pathname === '/addproducts' ? 'nav-link active' : 'nav-link'}
              onClick={() => navigate('/addproducts')}
            >
              Add Product
            </button>
            <button 
              className="nav-link logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button 
              className={location.pathname === '/signin' ? 'nav-link active' : 'nav-link'}
              onClick={() => navigate('/signin')}
            >
              Sign In
            </button>
            <button 
              className="nav-link"
              onClick={() => navigate('/signup')}
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;