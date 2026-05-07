import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signin.css';
import Navbar from './Navbar';

const SignIn = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  // List of admin emails (you can add more)
  const adminEmails = ['admin@designspace.com', 'vallary@gmail.com'];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      console.log('Login:', formData.email, formData.password);
      
      // Check if user is admin
      const isAdmin = adminEmails.includes(formData.email);
      
      // Store user in localStorage with role
      localStorage.setItem('user', JSON.stringify({ 
        email: formData.email, 
        role: isAdmin ? 'admin' : 'user'
      }));
      
      // Redirect to products page after login
      navigate('/products');
    } else {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords don't match!");
        return;
      }
      console.log('Signup:', formData);
      
      // New signups are regular users (not admin)
      localStorage.setItem('user', JSON.stringify({ 
        email: formData.email, 
        name: formData.name,
        role: 'user'
      }));
      
      // Redirect to products page after signup
      navigate('/products');
    }
  };

  return (
    <div className="auth-container">
      <Navbar />
      
      <div className="auth-card">
        <div className="auth-header">
          <h1>DesignSpace</h1>
          <p>Transform your home with style</p>
        </div>

        <div className="auth-toggle">
          <button 
            className={isLogin ? 'active' : ''} 
            onClick={() => setIsLogin(true)}
          >
            Sign In
          </button>
          <button 
            className={!isLogin ? 'active' : ''} 
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          )}

          {isLogin && (
            <div className="forgot-password">
              <a href="#">Forgot password?</a>
            </div>
          )}

          <button type="submit" className="auth-button">
            {isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <div className="auth-divider">
          <span>or continue with</span>
        </div>

        <div className="social-auth">
          <button className="social-button google">
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Google
          </button>
          <button className="social-button apple">
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path fill="currentColor" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.02.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            Apple
          </button>
        </div>

        <div className="auth-footer">
          <p>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              className="switch-button"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
      
      {/* Hero section removed as requested */}
    </div>
  );
};

export default SignIn;