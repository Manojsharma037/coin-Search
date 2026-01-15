import './App.css';
import {BrowserRouter as Router ,Route, Routes} from 'react-router-dom';
import {} from '@chakra-ui/react';
import CoinDetails from './components/CoinDetails';
import Coins from './components/Coins';
import Home from './components/Home';
import Exchanges from './components/Exchanges';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/exchanges' element={<Exchanges />}/>
        <Route path='/coins' element={<Coins />}/>
        <Route path='/coin/:id' element={<CoinDetails />}/>
      </Routes>
    </Router>
  );
}

export default App;
