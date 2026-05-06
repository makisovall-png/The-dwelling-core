import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { getCartCount } = useCart();
  
  const isLoggedIn = localStorage.getItem('user') !== null;
  const cartCount = getCartCount();
  
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
        
        <button 
          className={location.pathname === '/about' ? 'nav-link active' : 'nav-link'}
          onClick={() => navigate('/about')}
        >
          About
        </button>
        
        {isLoggedIn ? (
          <>
            
            <button 
              className={location.pathname === '/addproducts' ? 'nav-link active' : 'nav-link'}
              onClick={() => navigate('/addproducts')}
            >
              Add Product
            </button>
            <button 
              className={location.pathname === '/cart' ? 'nav-link active' : 'nav-link'}
              onClick={() => navigate('/cart')}
            >
              Cart 🛒 {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
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
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;