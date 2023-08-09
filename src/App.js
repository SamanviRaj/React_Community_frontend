import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import InvoiceForm from './components/invoice/InvoiceForm';


function App() {
  return (
    <div className="flex">
      <BrowserRouter>
        <Sidebar />
        <div className="flex-1">
          <Header />
          <Routes>
            <Route path='/' exact element={<Home/>} />
            <Route path='/dashboard' element={<Dashboard/>} />
            <Route path='/dashboard' element={<Dashboard/>} />
            {/* Add more routes */}
            <Route path='/invoice' element={<InvoiceForm/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
