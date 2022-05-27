import './App.css';
import { Route, Routes } from 'react-router-dom';
import ContactContainer from './components/contact/ContactContainer';
import LoginContainer from './components/login/LoginContainer';
import Landing from './pages/Landing';
import NavBar from './components/NavBar'
import Prueba from '../src/pages/pruebaDeComponentes'
import CargarProducto from './pages/cargarProducto'
import ProductDetails from './components/products/ProductDetails';

function App() {
  return (
    <Routes>
      <Route path='/contact' element={<> <ContactContainer /> </>} />
      <Route path='/login' element={<> <LoginContainer /> </>} />

      {/* <Route path='/' element={<><SearchInput /> <FilterByCategory />  <Btn href={"/contact"} text={"Contact Us!"} />  <Btn href={"/login"} text={"Login"} /> </>} /> */}
      <Route path='/' element={<Landing/>} />
      <Route path='/navbar' element={<NavBar/>}/>
      <Route path='/prueba' element={<Prueba/>}/>
      <Route path='/cargarproducto' element={<CargarProducto/>}/>
      <Route path='/product' element={<ProductDetails/>}/>
    </Routes>
  );
}

export default App;
