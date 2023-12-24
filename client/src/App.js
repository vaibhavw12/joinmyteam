import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard';
import AddJob from './components/AddJob';
import ViewDetails from './components/ViewDetails';
import EditJob from './components/EditJob';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Dashboard></Dashboard>}></Route>
          <Route path='/register' element={<SignUp></SignUp>}></Route>
          <Route path='/sign-in' element={<SignIn></SignIn>}></Route>
          <Route path='/sign-in/add-job' element={<AddJob></AddJob>}></Route>
          <Route path='/sign-in/view-job/:jobId' element={<ViewDetails></ViewDetails>}></Route>
          <Route path='/sign-in/edit-job/:jobId' element={<EditJob></EditJob>}></Route>
      </Routes>
    </BrowserRouter>
  );  
}

export default App;
