// import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav'
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Footer from './components/footer';
import SignUp from './components/SignUP';
import PrivateComponent from './components/PrivateComponent';
import Login from './components/Login';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import UpdateProduct from './components/UpdateProduct';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      {/* ########### NAVBAR ########### */}

      <Nav/>

      {/* ########### ROUTING ########### */}

      <Routes>

      {/* ########### ADDING PRIVATE COMPONENT  (EXCEPT SIGNUP) ########### */}

      <Route element={<PrivateComponent/>}>
      <Route path='/' element={<ProductList/>} />
      <Route path='/Add' element={<AddProduct/>} />
      <Route path='/Update/:id' element={<UpdateProduct/>} />
      <Route path='/Logout' element={<h1>Logout Listing Component</h1>} />
      <Route path='/Profile' element={<h1>Profile Listing Component</h1>} />
      </Route>

      <Route path='/Signup' element={<SignUp/>}/>
      <Route path='/login' element={<Login/>}/>
       </Routes>

      </BrowserRouter>


      {/* ########### FOOTER ########### */}

      <Footer />
    </div> 
  );
}

export default App;
