import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import InvoiceForm from './components/invoice/InvoiceForm';
import SignIn from './components/signin/SignIn';
import SignUp from './components/signin/SignUp';
import Sidebar from './components/Sidebar';
import { AuthProvider } from './components/useAuth';

function App() {
  const [userSignedIn, setUserSignedIn] = useState(false);
  const useMicroserviceA = true; // Set your desired value here

  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="flex">
          {userSignedIn && <Sidebar />} {/* Show Sidebar only if user is signed in */}
          <div className="flex-1">
            <Header /> {/* Show Header regardless of user authentication status */}
            <Routes>
              {/* Display Home component by default */}
              <Route
                path="/"
                element={<Home setUserSignedIn={setUserSignedIn} useMicroserviceA={useMicroserviceA} />}
              />

              {/* Show these routes only if user is signed in */}
              {userSignedIn && (
                <>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/invoice" element={<InvoiceForm />} />
                </>
              )}

              {/* Other routes */}
              <Route path="/signup" element={<SignUp />} />
              <Route
                path="/signin"
                element={<SignIn setUserSignedIn={setUserSignedIn} useMicroserviceA={useMicroserviceA} />}
              />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
