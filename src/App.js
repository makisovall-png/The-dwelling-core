import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link  } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Signin from './components/Signin';
import NotFound from './components/NotFound';
import Addproducts from './components/Addproducts';
import Getproducts from './components/Getproducts';
import Home from './components/Home';
import Makepayment from './components/Makepayment';
import { CartProvider } from './context/CartContext';
import Cart from './components/Cart';
import About from './components/About';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path = '/' element = {<Home />} />
            <Route path = '/products' element = {<Getproducts />} />
            <Route path = '/addproducts' element = {<Addproducts />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/cart" element={<Cart />} />
            <Route path = '/makepayment' element ={<Makepayment />} />
            <Route path="/about" element={<About />} />
            <Route path = '*' element = {<NotFound />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;