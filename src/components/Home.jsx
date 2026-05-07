import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <Navbar />
      
      {/* Hero Carousel Section */}
      <div className="hero-carousel">
        <div className="carousel-slide">
          <div className="carousel-content">
            <h1>Welcome to DesignSpace</h1>
            <p>Transform your house into a dream home with our curated collections</p>
            <button className="shop-now" onClick={() => navigate('/products')}>Shop Now</button>
          </div>
        </div>
      </div>

      {/* Featured Rooms Section */}
      <div className="featured-rooms">
        <h2>Inspiring Room Designs</h2>
        <p>Explore beautifully designed spaces for every room</p>
        
        <div className="rooms-grid">
          <div className="room-card" onClick={() => navigate('/products')}>
            <img src="https://images.pexels.com/photos/1571459/pexels-photo-1571459.jpeg?w=400&h=300&fit=crop" alt="Living Room" />
            <div className="room-overlay">
              <h3>Living Room</h3>
              <p>Cozy sofas, elegant rugs, and warm lighting</p>
            </div>
          </div>
          
          <div className="room-card" onClick={() => navigate('/products')}>
            <img src="https://media.istockphoto.com/id/1425003727/photo/modern-christmas-interior-in-blue-tones-3d-rendering.jpg?s=1024x1024&w=is&k=20&c=fqL11yw0OUTx1-6SvS2WoXp-63Hu2Chu1Inyml4e318=" alt="Dining Room" />
            <div className="room-overlay">
              <h3>Dining Room</h3>
              <p>Modern tables, stylish chairs, perfect for family</p>
            </div>
          </div>
          
          <div className="room-card" onClick={() => navigate('/products')}>
            <img src="https://media.istockphoto.com/id/2208103079/photo/comfortable-large-bed-in-beautiful-room-interior-design.jpg?s=1024x1024&w=is&k=20&c=JC0Tytbql_jnA76QlvXLvujjS7bQz-xfT7AcJWb6G10=" alt="Bedroom" />
            <div className="room-overlay">
              <h3>Bedroom</h3>
              <p>Luxury curtains, cozy bedding, peaceful ambiance</p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="why-choose-us">
        <h2>Why Choose DesignSpace?</h2>
        <div className="features-grid">
          <div className="feature">
            <div className="feature-icon">🎨</div>
            <h3>Premium Quality</h3>
            <p>Handpicked materials from trusted suppliers</p>
          </div>
          <div className="feature">
            <div className="feature-icon">🚚</div>
            <h3>Free Delivery</h3>
            <p>Free shipping across Kenya on all orders</p>
          </div>
          <div className="feature">
            <div className="feature-icon">💳</div>
            <h3>M-Pesa Payment</h3>
            <p>Secure and instant M-Pesa payments</p>
          </div>
          <div className="feature">
            <div className="feature-icon">🔄</div>
            <h3>Easy Returns</h3>
            <p>30-day return policy, no questions asked</p>
          </div>
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="testimonials">
        <h2>What Our Customers Say</h2>
        <div className="testimonial-grid">
          <div className="testimonial-card">
            <p>"DesignSpace transformed my living room! The quality is amazing."</p>
            <h4>- Sarah M.</h4>
          </div>
          <div className="testimonial-card">
            <p>"Fast delivery and beautiful curtains. Highly recommend!"</p>
            <h4>- John K.</h4>
          </div>
          <div className="testimonial-card">
            <p>"The dining table is exactly what I wanted. 5 stars!"</p>
            <h4>- Mary W.</h4>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="cta-section">
        <h2>Ready to Transform Your Home?</h2>
        <p>Browse our collection and find the perfect pieces for your space</p>
        <button className="cta-button" onClick={() => navigate('/products')}>Explore Products</button>
      </div>

      {/* Footer */}
      <footer className="home-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>DesignSpace</h3>
            <p>Transforming homes across Kenya with premium interior design pieces.</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/products'); }}>Products</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/about'); }}>About Us</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Contact</h3>
            <p>Email: info@designspace.com</p>
            <p>Phone: (555) 123-4567</p>
            <p>Nairobi, Kenya</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 DesignSpace. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;