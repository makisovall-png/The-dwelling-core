import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link  } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Signin from './components/Signin';
import NotFound from './components/NotFound';
import Addproducts from './components/Addproducts';
import Getproducts from './components/Getproducts';
import Makepayment from './components/Makepayment';


function App() {
  return (
    <Router>
      <div className="App">
      
      <Routes>
        <Route path = '/' element = {<Getproducts/>} />
        <Route path = '/addproducts' element = {<Addproducts/>} />
        <Route path="/signin" element={<Signin />} />
        <Route path = '*' element = {<NotFound/>} />
        <Route path = '/Makepayment' element ={<Makepayment/>}/>
       
      </Routes>
    </div>
    </Router>
    
  
  );
}

export default App;
