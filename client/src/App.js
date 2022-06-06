import './App.css';
/////////// PROVIDERS ///////////////
import { Route, Routes } from 'react-router-dom';
import { PayPalScriptProvider} from "@paypal/react-paypal-js";
import  CartProvider  from './Cart/CartProvider';
import { useAuth0 } from "@auth0/auth0-react";


/////////// RUTAS ///////////////
import Landing from './Pages/Landing';
import CargarProducto from './Products/UploadProduct'
import ProductDetails from './Products/ProductDetails';
import Loading from './Components/Loading';
import Profile from './Pages/Profile'
import LoginButton from './Components/Login.jsx'
import Cart from './Cart/CartPage.jsx'
import Dashboard from './Admin/DashboardPage'
import UserTable from './Admin/UsersTable'
import OrdersTable from './Admin/OrdersTable'
import ProductsTable from './Admin/ProductsTable'
import PasswordChange from './Pages/PasswordChange'
import OrderSummary from './Orders/OrderSummaryPage'
import OrderPayment from './Orders/OrderPaymentPage'

import WishList from './Components/ListComponents'



function App() {
  return (

    <PayPalScriptProvider options={{ "client-id": 'AQ0xQs7KJfypFz2RqDQlSnT9qYlzBaGyXFsPaTVDQIbgpvD8n1TXUV5Qh-h6vzVdlzd4QjGDFdqOJrup' || '' }}>
      <CartProvider>
        <Routes>
          {/* <Route path='/' element={<><SearchInput /> <FilterByCategory />  <Btn href={"/contact"} text={"Contact Us!"} />  <Btn href={"/login"} text={"Login"} /> </>} /> */}
          <Route path='/' element={<Landing/>} />
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
          <Route path='/ordersummary' element={<OrderSummary/>}/>
          <Route path='/orderpayment/:id' element={<OrderPayment/>}/>
          <Route path='/wishlist' element={<WishList/>}/>
        </Routes>
      </CartProvider>
    </PayPalScriptProvider>
    
  );
}

export default App;
