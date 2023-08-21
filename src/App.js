import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import InvoiceForm from './components/invoice/InvoiceForm';
import SignIn from './components/signin/SignIn';
import SignUp from './components/signin/SignUp';

const useMicroserviceA = true;

function App() {
  return (
    <div className="flex">
      <BrowserRouter>
        <Sidebar />
        <div className="flex-1">
          <Header />
          <Routes>
          <Route path='/' element={<SignIn useMicroserviceA={useMicroserviceA}/>} />
            {/* <Route path='/home' exact element={<Home/>} /> */}
            <Route path='/dashboard' element={<Dashboard/>} />
            {/* Add more routes */}
            <Route path='/invoice' element={<InvoiceForm/>} />
            <Route path='/signup' element={<SignUp useMicroserviceA={useMicroserviceA}/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
