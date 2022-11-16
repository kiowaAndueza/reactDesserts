import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import Home from './pages/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navbar } from './components/navegation/Navbar';
import Form from './pages/Form';
import { Footer } from './components/footer/Footer';
import PageNotFound from './pages/PageNotFound'
import React, { useEffect, useState } from 'react';
import { dessertApi } from './api/dessertApi';
import Swal from 'sweetalert2';

export default function App() {
  const [desserts, setDessert] = useState([]);
  const [loading, setIsLoader] = useState(true);

  const fetchCharacters = async (dessertApi) => {
    setIsLoader(true);
    try {
      const response = await fetch(dessertApi);
      const { data } = await response.json();
      setDessert(data);
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: 'Error ' + error,
        text: 'Do you want to continue?',
        icon: 'error',
        confirmButtonColor: "#0CC8A8",
        confirmButtonText: 'OK'
      });
    }
    setIsLoader(false);
  }

  useEffect(() => {
    fetchCharacters(dessertApi);
  }, [setDessert]);

  if (loading) {
    return (
      <div className='d-flex justify-content-center'>
        <div className="spinner-border text-dark d-flex justify-content-center" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className='app'>
      <Router>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Home characters={desserts}/>} />
            <Route path="/new" element={<Form />}/>
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
        <Footer />
      </Router>
    </div >
  );
}
