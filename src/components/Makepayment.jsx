import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Loader from './Loader'
import axios from 'axios'

const Makepayment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    // HOOKS MUST BE FIRST - before any conditional returns
    const [number, setNumber] = useState("")
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    
    // Get either a single product OR cart items
    const { product, cart, total } = location.state || {};
    
    // Calculate total amount
    let totalAmount = 0;
    let displayProduct = null;
    
    if (cart && cart.length > 0) {
        // Multiple items from cart
        totalAmount = total || cart.reduce((sum, item) => sum + (item.product_cost * item.quantity), 0);
        displayProduct = {
            product_name: `${cart.length} items in cart`,
            product_description: cart.map(item => `${item.product_name} x${item.quantity}`).join(', '),
            product_cost: totalAmount,
            product_photo: cart[0]?.product_photo || ''
        };
    } else if (product) {
        // Single product from GetProducts
        totalAmount = product.product_cost;
        displayProduct = product;
    } else {
        // No product or cart data - show error but hooks are already called
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0f0f0' }}>
                <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', textAlign: 'center' }}>
                    <h2>No items to pay for</h2>
                    <button onClick={() => navigate('/products')} style={{ marginTop: '1rem', padding: '0.5rem 1rem', background: '#667eea', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                        Back to Products
                    </button>
                </div>
            </div>
        );
    }

    const img_url = "https://vallary.alwaysdata.net/static/images/"

    const handlesubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const formdata = new FormData()
            formdata.append("phone", number)
            formdata.append("amount", totalAmount)

            const response = await axios.post("https://vallary.alwaysdata.net/api/mpesa_payment", formdata)

            setLoading(false)
            setSuccess(response.data.message)
            
            // Clear cart after successful payment
            if (cart && cart.length > 0) {
                localStorage.removeItem('cart');
                setTimeout(() => {
                    navigate('/products');
                }, 2000);
            }
        }
        catch(error) {
            setLoading(false)
            setError(error.message)
        }
    }

    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
            <div style={{ background: 'white', borderRadius: '24px', padding: '2rem', maxWidth: '500px', width: '100%', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
                <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', fontSize: '1rem', color: '#667eea', cursor: 'pointer', marginBottom: '1rem' }}>
                    ← Back
                </button>

                <h1 style={{ textAlign: 'center', fontSize: '1.8rem', marginBottom: '0.5rem', color: '#333' }}>Complete Your Payment</h1>
                <p style={{ textAlign: 'center', color: '#666', marginBottom: '2rem' }}>Lipa na M-Pesa</p>

                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <img 
                        src={displayProduct.product_photo?.startsWith('http') ? displayProduct.product_photo : img_url + displayProduct.product_photo} 
                        alt={displayProduct.product_name}
                        style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '16px', marginBottom: '1rem' }}
                    />
                    <h2 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>{displayProduct.product_name}</h2>
                    <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1rem' }}>{displayProduct.product_description}</p>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#667eea' }}>Ksh {totalAmount}</div>
                </div>

                {loading && <Loader />}
                {success && <div style={{ background: '#10b981', color: 'white', padding: '0.75rem', borderRadius: '8px', textAlign: 'center', marginBottom: '1rem' }}>{success}</div>}
                {error && <div style={{ background: '#ef4444', color: 'white', padding: '0.75rem', borderRadius: '8px', textAlign: 'center', marginBottom: '1rem' }}>{error}</div>}

                <form onSubmit={handlesubmit}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Phone Number</label>
                        <input 
                            type="tel" 
                            style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '8px', fontSize: '1rem' }}
                            placeholder="Enter phone number e.g., 2547XXXXXXXX"
                            required
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                        />
                        <p style={{ fontSize: '0.75rem', color: '#999', marginTop: '0.25rem' }}>Format: 2547XXXXXXXX (no leading 0)</p>
                    </div>

                    <button type="submit" style={{ width: '100%', padding: '0.75rem', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: '600', cursor: 'pointer' }}>
                        Make Payment
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Makepayment