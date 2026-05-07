import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Navbar from './Navbar';
import './Cart.css';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="cart-container">
        <Navbar />
        <div className="empty-cart">
          <h2>Your cart is empty 🛒</h2>
          <p>Add some beautiful products to your cart!</p>
          <button className="continue-shopping" onClick={() => navigate('/products')}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <Navbar />
      
      <div className="cart-main">
        <h1 className="cart-title">Your Shopping Cart</h1>
        
        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <img 
                  src={item.product_photo || 'https://via.placeholder.com/80'} 
                  alt={item.product_name}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <h3>{item.product_name}</h3>
                  <p>Ksh {item.product_cost}</p>
                </div>
                <div className="cart-item-quantity">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>
                <div className="cart-item-price">
                  Ksh {item.product_cost * item.quantity}
                </div>
                <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                  🗑️
                </button>
              </div>
            ))}
          </div>
          
          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Total Items:</span>
              <span>{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</span>
            </div>
            <div className="summary-row total">
              <span>Total Amount:</span>
              <span>Ksh {getCartTotal()}</span>
            </div>
            <button 
              className="checkout-btn" 
              onClick={() => navigate('/makepayment', { state: { cart: cartItems, total: getCartTotal() } })}
            >
              Proceed to Checkout
            </button>
            <button className="clear-cart-btn" onClick={clearCart}>
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;