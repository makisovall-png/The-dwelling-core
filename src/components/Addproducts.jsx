import React, { useState } from 'react'
import Loader from './Loader';
import './Addproducts.css';
import Navbar from './Navbar';

const Add_products = () => {

  const [product_name, setProductname] = useState("");
  const [product_description, setProductDescription] = useState("");
  const [product_cost, setProductCost] = useState("");
  const [product_photo, setProductphoto] = useState("");
  const [category, setCategory] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formdata = new FormData()
      formdata.append("product_name", product_name)
      formdata.append("product_description", product_description)
      formdata.append("product_cost", product_cost)
      formdata.append("product_photo", product_photo)
      formdata.append("category", category)

      const response = await fetch("https://vallary.alwaysdata.net/api/add_product", {
        method: 'POST',
        body: formdata
      })
      
      const data = await response.json()
      
      setLoading(false)
      setSuccess(data.message)

      setProductname("");
      setProductDescription("");
      setProductCost("");
      setProductphoto("");
      setCategory("");

      setTimeout(() => {
        setSuccess("");
      }, 5000);
    }
    catch(error) {
      setLoading(false)
      setError(error.message)

      setTimeout(() => {
        setError("");
      }, 5000);
    }
  }

  return (
    <div className="add-products-container">
      <Navbar />
      
      <div className="add-products-card">
        <div className="add-products-header">
          <h1>Add New Product</h1>
          <p>Fill in the details below to add a new curtain design</p>
        </div>

        {loading && <Loader />}
        {success && <div className="success-message">{success}</div>}
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="add-products-form">
          <div className="form-group">
            <input
              type="text"
              placeholder="Product Name"
              className="form-input"
              required
              value={product_name}
              onChange={(e) => setProductname(e.target.value)}
            />
          </div>

          <div className="form-group">
            <textarea
              placeholder="Product Description"
              className="form-textarea"
              required
              value={product_description}
              onChange={(e) => setProductDescription(e.target.value)}
              rows="4"
            />
          </div>

          <div className="form-group">
            <input
              type="number"
              placeholder="Price (in USD)"
              className="form-input"
              required
              value={product_cost}
              onChange={(e) => setProductCost(e.target.value)}
            />
          </div>

          <div className="form-group">
            <select 
              className="form-input"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              <option value="curtains">Curtains</option>
              <option value="dining">Dining Table Area</option>
              <option value="living">Living room</option>
            </select>
          </div>

          <div className="form-group">
            <label className="file-label">Product Photo</label>
            <input
              type="file"
              className="form-file"
              required
              accept="image/*"
              onChange={(e) => setProductphoto(e.target.files[0])}
            />
          </div>

          <button type="submit" className="submit-button">
            Add Product
          </button>
        </form>
      </div>
    </div>
  )
}

export default Add_products