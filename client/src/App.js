import './App.css';
import { Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing';
import NavBar from './components/NavBar'
import Prueba from './pruebaDeComponentes'
import CargarProducto from './pages/UploadProduct'
import ProductDetails from './components/products/ProductDetails';
import Loading from './pages/Loading';
import Profile from './pages/Profile'
import Cart from './components/Cart/CartPage.jsx'
import Dashboard from './components/Admin/pageAdmin'
import  CartProvider  from './components/Cart/CartProvider';

function App() {
  return (
    <CartProvider>
    <Routes>
      {/* <Route path='/' element={<><SearchInput /> <FilterByCategory />  <Btn href={"/contact"} text={"Contact Us!"} />  <Btn href={"/login"} text={"Login"} /> </>} /> */}
      <Route path='/' element={<Landing/>} />
      <Route path='/navbar' element={<NavBar/>}/>
      <Route path='/prueba' element={<Prueba/>}/>
      <Route path='/uploadproduct' element={<CargarProducto/>}/>
      <Route path='/product/:id' element={<ProductDetails/>}/>
      <Route path='/loading' element={<Loading/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/admin/dashboard' element={<Dashboard/>}/>
    </Routes>
    </CartProvider>
    
  );
}

export default App;
