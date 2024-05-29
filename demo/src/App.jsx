import React from 'react';
import { BrowserRouter ,Routes, Route } from 'react-router-dom';
import AdminPage from './pages/AdminPage';
import GuestPage from './pages/GuestPage';
import  AuthProvider  from './context/AuthContext.jsx';

const App = () => {
    return (
        <AuthProvider>
           <BrowserRouter>
              <Routes>
                    <Route path="/admin" component={AdminPage} />
                    <Route path="/" component={GuestPage} />
              </Routes>
           </BrowserRouter>
        </AuthProvider>
    );
};

export default App;
