import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import HiOrLo from './components/HiLo/HiOrLo';



function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/hilo' element={<HiOrLo/>}/>
      </Routes>
    </div>
  );
}

export default App;
