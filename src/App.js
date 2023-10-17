import './App.css';
import Create from './components/create';
import Read from './components/read';

function App() {
  return (
   <div className="main">
        <h1 className="main-header">TUTORIAL CANDIDATES</h1>       
        {/* <div>
       <Create/> 
        </div>          */}
        <div style={{ marginTop: 20}}>
        <Read/>
        </div>            
    </div>
      
  );
}

export default App;

