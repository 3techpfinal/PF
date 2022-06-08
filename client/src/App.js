import './App.css';
/////////// PROVIDERS ///////////////

import { Route, Routes } from 'react-router-dom';
import { PayPalScriptProvider} from "@paypal/react-paypal-js";
import  CartProvider  from './Cart/CartProvider';
import { useAuth0 } from "@auth0/auth0-react";

/////////// PROVIDERS FIN ///////////////

//////////////////////////////// RUTAS ///////////////////////////////////////

////home////
import Landing from './Pages/Landing';

////products////
import UploadProduct from './Products/UploadProduct'
import EditProduct from './Products/EditProduct'
import ProductDetails from './Products/ProductDetails';

////admin////
import Dashboard from './Admin/DashboardPage'
import ProductsTable from './Admin/ProductsTable'
import UserTable from './Admin/UsersTable'

/// user ////
import Profile from './Pages/Profile'
import PasswordChange from './Pages/PasswordChange'
import WishList from './Components/ListComponents'

/// payment ////
import Cart from './Cart/CartPage.jsx'
import OrdersTable from './Admin/OrdersTable'
import OrderSummary from './Orders/OrderSummaryPage'
import OrderPayment from './Orders/OrderPaymentPage'

//////////////////////////////// RUTAS FIN ///////////////////////////////////////

function App() {
  return (

    <PayPalScriptProvider options={{ "client-id": 'AQ0xQs7KJfypFz2RqDQlSnT9qYlzBaGyXFsPaTVDQIbgpvD8n1TXUV5Qh-h6vzVdlzd4QjGDFdqOJrup' || '' }}>
      <CartProvider>
        <Routes>
          {/* <Route path='/' element={<><SearchInput /> <FilterByCategory />  <Btn href={"/contact"} text={"Contact Us!"} />  <Btn href={"/login"} text={"Login"} /> </>} /> */}
          <Route path='/' element={<Landing/>} />
          <Route path='/admin/uploadproduct' element={<UploadProduct/>}/>
          <Route path='/admin/editdproduct/:id' element={<EditProduct/>}/>
          <Route path='/product/:id' element={<ProductDetails/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/admin/dashboard' element={<Dashboard/>}/>
          <Route path='/admin/userstable' element={<UserTable/>}/>
          <Route path='/orderstable' element={<OrdersTable/>}/>
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
