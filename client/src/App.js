import './App.css';
import { Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing';
import NavBar from './components/NavBar'
import Prueba from '../src/pages/pruebaDeComponentes'
import CargarProducto from './pages/cargarProducto'
import ProductDetails from './components/products/ProductDetails';
import Loading from './pages/Loading';

function App() {
  return (
    <Routes>

      {/* <Route path='/' element={<><SearchInput /> <FilterByCategory />  <Btn href={"/contact"} text={"Contact Us!"} />  <Btn href={"/login"} text={"Login"} /> </>} /> */}
      <Route path='/' element={<Landing/>} />
      <Route path='/navbar' element={<NavBar/>}/>
      <Route path='/prueba' element={<Prueba/>}/>
      <Route path='/cargarproducto' element={<CargarProducto/>}/>
      <Route path='/product/:id' element={<ProductDetails/>}/>
      <Route path='/loading' element={<Loading/>}/>
    </Routes>
  );
}

export default App;
