import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Home from './Home';
import Add from './Add'
import NavBar from './NavBar';
import NotFound from './NotFound';

function App() {

  return (
    <Router>
      <div className='App'>
        <NavBar></NavBar>
        <div className='content'>
          <Routes>
            <Route path='/' element={<Home></Home>}></Route>
            <Route path='/add' element={<Add></Add>}></Route>
            <Route path='/clients/:id' element={<Add></Add>}></Route>
            <Route path='*' element={<NotFound></NotFound>}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
