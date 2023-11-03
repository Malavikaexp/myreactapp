import './App.css';
import Read from './components/read';
import Update from './components/update'
import CartList from './components/cartlist'
import { Routes,Route } from 'react-router-dom'
import Cart from './components/cart';

function App() {
  return (
   <div className="main">
        <h1 className="main-header">TUTORIAL</h1>       
        {/* <div>
       <Create/> 
        </div>          */}
        <div style={{ marginTop: 20}}>
        <Routes>
        <Route path = '/' element = {<Read/>} />
        <Route path = '/update/:id' element = {<Update/>} />
        <Route path = '/cartlist' element = {<CartList/>} />
        <Route path = '/cart' element = {<Cart/>} />
        </Routes>
        </div>            
    </div>
      
  );
}

export default App;

