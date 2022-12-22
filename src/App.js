import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import Home from './pages/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Form from './pages/Form';
import { Footer } from './components/footer/Footer';
import PageNotFound from './pages/PageNotFound'
import React, { useEffect, useState } from 'react';
import { dessertApi } from './api/dessertApi';
import { LogIn } from './components/form/LogIn';
import { CreateNewUser } from './components/form/CreateNewUser';
import { getAllDesserts } from './services/ApiServices';
import ListUser from './pages/ListUser';
import DessertListUser from './pages/DessertListUser';
import { CreateNewList } from './components/form/CreateNewList';
import { CreateNewDessertUser } from './components/form/CreateNewDessertUser';
import Profile from './pages/Profile';
import { errorMessage } from './components/messages/Messages';
import { Menu } from './components/navegation/Navbar';


export default function App() {
  const [desserts, setDessert] = useState([]);
  const [loading, setIsLoader] = useState(true);

  const fetchCharacters = async () => {
    setIsLoader(true);
    try {
      const response = await getAllDesserts();
      setDessert(response.data.data);
    } catch (error) {
      errorMessage(error);
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
          <Route path="/" element={<Menu />}>
            <Route index element={<Home characters={desserts}/>} />
            <Route path="/new" element={<Form />}/>
            <Route path="*" element={<PageNotFound />} />
            <Route path="/register" element={<CreateNewUser/>} />
            <Route path='/myLists' element={< ListUser/>}/>
            <Route path='/newList' element={< CreateNewList/>}/>
            <Route path="/myList" element={<DessertListUser />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/newDessertUser" element={<CreateNewDessertUser />}/>
            <Route path="/profile" element={<Profile />}/>
          </Route>
        </Routes>
        <Footer />
      </Router>
    </div >
  );
}
