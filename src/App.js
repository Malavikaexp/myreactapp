import './App.css';
import Read from './components/read';
import Update from './components/update'
import { Routes,Route } from 'react-router-dom'

function App() {
  return (
   <div className="main">
        <h1 className="main-header">TUTORIAL CANDIDATES</h1>       
        {/* <div>
       <Create/> 
        </div>          */}
        <div style={{ marginTop: 20}}>
        <Routes>
        <Route path = '/' element = {<Read/>} />
        <Route path = '/update/:id' element = {<Update/>} />
        </Routes>
        </div>            
    </div>
      
  );
}

export default App;

