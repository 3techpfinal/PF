import './App.css';
import { Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing';
import NavBar from './components/NavBar'
import Prueba from './pruebaDeComponentes'
import CargarProducto from './pages/UploadProduct'
import ProductDetails from './components/products/ProductDetails';
import Loading from './pages/Loading';
import Profile from './pages/Profile'
import LoginButton from '../src/components/Login.jsx'
import Cart from './pages/CartPage'

import { useAuth0 } from "@auth0/auth0-react";

function App() {
  return (
    <Routes>
      {/* <Route path='/' element={<><SearchInput /> <FilterByCategory />  <Btn href={"/contact"} text={"Contact Us!"} />  <Btn href={"/login"} text={"Login"} /> </>} /> */}
      <Route path='/' element={<Landing/>} />
      <Route path='/navbar' element={<NavBar/>}/>
      <Route path='/prueba' element={<Prueba/>}/>
      <Route path='/uploadproduct' element={<CargarProducto/>}/>
      <Route path='/product/:id' element={<ProductDetails/>}/>
      <Route path='/loading' element={<Loading/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/login' element={<LoginButton/>}/>
      <Route path='/cart' element={<Cart/>}/>
    </Routes>
  );
}

export default App;
