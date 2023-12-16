import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './components/Home';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/register' element={<SignUp></SignUp>}></Route>
          <Route path='/sign-in' element={<SignIn></SignIn>}></Route>
      </Routes>
    </BrowserRouter>
  );  
}

export default App;
