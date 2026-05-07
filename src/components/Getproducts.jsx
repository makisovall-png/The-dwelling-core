import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';
import './Getproducts.css';
import Navbar from './Navbar';
import { useCart } from '../context/CartContext';

const Get_products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState('all');

  const navigate = useNavigate()
  const img_url = "https://vallary.alwaysdata.net/static/images/"

  const fetchProducts = async() =>{
    try{
      setLoading(true)
      const response = await axios.get("https://vallary.alwaysdata.net/api/get_products")
      setProducts(response.data)
      setLoading(false)
    }
    catch(error){
      setLoading(false)
      setError(error.message)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  // Filter products based on keywords in name or description
  const filteredProducts = () => {
    if (activeCategory === 'all') {
      return products;
    }
    
    return products.filter(product => {
      const name = product.product_name?.toLowerCase() || '';
      const description = product.product_description?.toLowerCase() || '';
      const keyword = activeCategory.toLowerCase();
      
      // Check if keyword appears in name or description
      return name.includes(keyword) || description.includes(keyword);
    });
  };

  const getCategoryCount = (category) => {
    if (category === 'all') return products.length;
    
    return products.filter(product => {
      const name = product.product_name?.toLowerCase() || '';
      const description = product.product_description?.toLowerCase() || '';
      return name.includes(category) || description.includes(category);
    }).length;
  };

  return (
    <div className="get-products-container">
      {/* Reusable Navbar */}
      <Navbar />

      {/* Category Filter Bar */}
      <div className="category-filter-bar">
        <div className="category-links">
          <button 
            className={activeCategory === 'all' ? 'cat-active' : ''} 
            onClick={() => setActiveCategory('all')}
          >
            All ({products.length})
          </button>
          <button 
            className={activeCategory === 'curtains' ? 'cat-active' : ''} 
            onClick={() => setActiveCategory('curtains')}
          >
            Curtains ({getCategoryCount('curtains')})
          </button>
          <button 
            className={activeCategory === 'dining' ? 'cat-active' : ''} 
            onClick={() => setActiveCategory('dining')}
          >
            Dining Area ({getCategoryCount('dining')})
          </button>
          <button 
            className={activeCategory === 'living' ? 'cat-active' : ''} 
            onClick={() => setActiveCategory('living')}
          >
            Living Room ({getCategoryCount('living')})
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="products-main">
        <div className="products-header">
          <h1>Our Collections</h1>
          <p>Discover beautiful pieces for your home</p>
        </div>

        {loading && <Loader />}
        {error && <div className="error-message">{error}</div>}

        {!loading && !error && (
          <div className="products-grid">
            {filteredProducts().length === 0 ? (
              <div className="no-products">
                <p>No products found in this category.</p>
                <p>Try adding products with names like "curtains", "dining table", or "living room rug"</p>
              </div>
            ) : (
              filteredProducts().map((product, index) => (
                <div className="product-card" key={index}>
                  <div className="product-image">
                    <img 
                      src={img_url + product.product_photo}
                      alt={product.product_name}
                    />
                  </div>
                  <div className="product-info">
                    <h3>{product.product_name}</h3>
                    <p className="product-description">
                      {product.product_description?.slice(0, 100)}...
                    </p>
                    <div className="product-price">Ksh {product.product_cost}</div>
                    <button 
                      className="purchase-button"
                      onClick={() => navigate("/makepayment", { state: { product } })}
                    >
                      Purchase Now
                    </button>
                    <button 
                      className="add-to-cart-btn"
                      onClick={() => addToCart(product)}
                    >
                     Add to Cart 🛒
                    </button>
                    
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>About Us</h3>
            <p>DesignSpace is your premier destination for modern interior design. We bring elegance and style to every room in your home with our carefully curated collections.</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveCategory('curtains'); window.scrollTo(0, 0); }}>Curtains</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveCategory('dining'); window.scrollTo(0, 0); }}>Dining Area</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveCategory('living'); window.scrollTo(0, 0); }}>Living Room</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveCategory('all'); window.scrollTo(0, 0); }}>All Products</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Contact Us</h3>
            <p>Email: info@designspace.com</p>
            <p>Phone: (555) 123-4567</p>
            <p>Location: Nairobi, Kenya</p>
          </div>
          <div className="footer-section">
            <h3>Follow Us</h3>
            <p>Instagram | Facebook | Twitter</p>
            <p>@DesignSpace</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 DesignSpace. All rights reserved. | Transforming homes, one design at a time.</p>
        </div>
      </footer>
    </div>
  )
}

export default Get_products