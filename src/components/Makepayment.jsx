import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Loader from './Loader'
import axios from 'axios'

const Makepayment = () => {
    // destructure the details from the get products components
    // the use location hok allows us to get/destructure the contents from the previoys components
    const {product} = useLocation().state || {}

    //declare the navigate hook
    const navigate = useNavigate()

    //console.log("the details passed from get products are:",product )
    //Below we specify the image base url
     const img_url = "https://vallary.alwaysdata.net/static/images/"

     //initialise hooks to manage the state of the application 
     const [number, setNumber] = useState("")

     //create a function that will handle the submit function
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

        // create a function that will handle the submit action
    const handlesubmit = async (e) =>{
        // prevent the site from reloading
        e.preventDefault()

        // update the loading hook
        setLoading(true)

        try{
            // create a form data object
            const formdata = new FormData()

            // append the data to the form data
            formdata.append("phone", number)
            formdata.append("amount", product.product_cost)

            const response = await axios.post("https://vallary.alwaysdata.net/api/mpesa_payment", formdata)

            // set loading back to default
            setLoading(false)

            // update the success hook with the message
            setSuccess(response.data.message)
        }
        catch(error){
            // if there is an error respond to error
            setLoading(false)

            // update the error hook with the error message
            setError(error.message)
        }
    }


  return (
    <div className='row justify-content-center'>
        {/* <button className="btn btn-outline-primary">Back to products</button> */}
      <h1 className='text-success'>Make Payment- Lipa na Mpesa</h1>
      <div className="col-md-1">
            <input type="button"
            className="btn btn-primary"
            value="Back" 
            onClick={() => navigate("/") } />
        </div>

      <div className="col-md-8 card shadow p-4">
        <img src= {img_url + product.product_photo} alt="Product Name" className='product_img' />
        <div className="card-body">
            <h2 className="text-info">{product.product_name}</h2>

            <p className="text-dark">{product.product_description}</p>

            <b className="text-warning">Ksh {product.product_cost}</b> <br />

            <form onSubmit={handlesubmit}>
                 {/* bind the loading hook */}
                {loading && <Loader />}
                <h3 className="text-success"> {success} </h3>
                <h4 className="text-danger"> {error} </h4>
                <input type="number" 
                className='form-control'
                placeholder='Enter the phone number 2547XXXXXXXX'
                required
                value = {number}
                onChange={() => setNumber()}/> <br />

                <input type="submit"
                value = "Make Payment" 
                className='btn btn-success'/>
            </form>
        </div>
      </div>
    </div>
  )
}

export default Makepayment
