import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RegistrationForm from './Registration/RegistrationForm';
import LoginForm from './Login/LoginForm';
import PaymentForm from './Payment/PaymentForm'; 
import './App.css';
import MovieHome from './MoviePage/moviehome';
import AddMovieForm from './AddMovie/AddMovieForm';
const App = () => {
  return (
    <Router>  
      <div>
        <nav className="navbar">
          <ul>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/payment">Make Payment</Link> 
            </li>
            <li>
              <Link to="/movieHome"> MovieHome</Link>
            </li>
            <li>
              <Link to="/addMovie"> AddMovie</Link>
            </li>
          </ul>
        </nav>

        
        <Routes>
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/payment" element={<PaymentForm />} /> 
          <Route path="/movieHome" element={<MovieHome />} />
          <Route path="/addMovie" element={<AddMovieForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
