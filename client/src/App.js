import './App.css';
import { Route, Routes } from 'react-router-dom';
import Landing from './Pages/Landing';
import NavBar from './components/NavBar'
import Prueba from './pruebaDeComponentes'
import CargarProducto from './components/Products/UploadProduct'
import ProductDetails from './components/Products/ProductDetails';
import Loading from './components/Loading';
import Profile from './Pages/Profile'
import LoginButton from '../src/components/Login.jsx'
import Cart from './components/Cart/CartPage.jsx'


import  CartProvider  from './components/Cart/CartProvider';
import { useAuth0 } from "@auth0/auth0-react";

import Dashboard from './components/Admin/DashboardPage'
import UserTable from './components/Admin/UsersTable'
import OrdersTable from './components/Admin/OrdersTable'
import ProductsTable from './components/Admin/ProductsTable'
import PasswordChange from './Pages/PasswordChange'

function App() {
  return (
    <CartProvider>
    <Routes>
      {/* <Route path='/' element={<><SearchInput /> <FilterByCategory />  <Btn href={"/contact"} text={"Contact Us!"} />  <Btn href={"/login"} text={"Login"} /> </>} /> */}
      <Route path='/' element={<Landing/>} />
      <Route path='/navbar' element={<NavBar/>}/>
      <Route path='/admin/uploadproduct' element={<CargarProducto/>}/>
      <Route path='/product/:id' element={<ProductDetails/>}/>
      <Route path='/loading' element={<Loading/>}/>
      <Route path='/admin/profile' element={<Profile/>}/>
      <Route path='/login' element={<LoginButton/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/admin/dashboard' element={<Dashboard/>}/>
      <Route path='/admin/userstable' element={<UserTable/>}/>
      <Route path='/admin/orderstable' element={<OrdersTable/>}/>
      <Route path='/admin/productstable' element={<ProductsTable/>}/>
      <Route path='/passwordchange' element={<PasswordChange/>}/>


    </Routes>
    </CartProvider>
    
  );
}

export default App;
