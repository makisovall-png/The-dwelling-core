import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import './About.css';

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="about-container">
      <Navbar />
      
      <div className="about-content">
        <div className="about-card">
          <h1>About DesignSpace</h1>
          
          <div className="about-section">
            <h2>Our Story</h2>
            <p>DesignSpace was founded in 2024 with a simple mission: to help Kenyans transform their houses into beautiful, functional homes. What started as a small interior design blog has grown into a trusted destination for premium home furnishings.</p>
          </div>

          <div className="about-section">
            <h2>Our Mission</h2>
            <p>To provide high-quality, stylish home furnishings that are accessible to everyone. We believe that a beautiful home should not be a luxury — it should be a reality for every Kenyan family.</p>
          </div>

          <div className="about-section">
            <h2>Why Choose Us</h2>
            <div className="features-list">
              <div className="feature-item">
                <span>✅</span>
                <p>Premium quality products from trusted suppliers</p>
              </div>
              <div className="feature-item">
                <span>✅</span>
                <p>Secure M-Pesa payment integration</p>
              </div>
              <div className="feature-item">
                <span>✅</span>
                <p>Free delivery across Kenya</p>
              </div>
              <div className="feature-item">
                <span>✅</span>
                <p>7-day return policy</p>
              </div>
              <div className="feature-item">
                <span>✅</span>
                <p>24/7 customer support</p>
              </div>
            </div>
          </div>

          <div className="about-section">
            <h2>Contact Us</h2>
            <p>📞 Phone: (555) 123-4567</p>
            <p>✉️ Email: info@designspace.com</p>
            <p>📍 Location: Westlands, Nairobi, Kenya</p>
            <p>⏰ Hours: Monday - Saturday, 9AM - 6PM</p>
          </div>

          <button className="shop-now-btn" onClick={() => navigate('/products')}>
            Shop Now
          </button>
        </div>
      </div>

      <footer className="about-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>DesignSpace</h3>
            <p>Transforming homes across Kenya with premium interior design pieces.</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/products'); }}>Shop</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/about'); }}>About</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Follow Us</h3>
            <p>Instagram | Facebook | Twitter</p>
            <p>@DesignSpace</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 DesignSpace. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default About;