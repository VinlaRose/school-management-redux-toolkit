import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import WardsView from './components/WardsView';
import { Route, Routes } from 'react-router';
import { Link } from 'react-router-dom';
import PatientsView from './components/PatientsView';
import { HomeView } from './components/HomeView';

function App() {
  return (
    <div className="App">
      
      <nav>
            <ul>
              <li>
                
                <Link to="/patients">Patients</Link>
              </li>
              <li>
                <Link to="/wards">Wards</Link>
              </li>
              <li>
                <Link to="/">Hospital</Link>
              </li>
              
            </ul>


           

    
          </nav>
          
      <Routes>
        <Route path="/patients" element={<PatientsView/>} />
        <Route path="/wards" element={<WardsView/>} />
        <Route path="/" element={<HomeView/>} />
       
        
        
      </Routes>
      {/* <div className="footer">
  <p> <a href="https://github.com/VinlaRose/patient-management">Github</a> </p>
</div> */}
    </div>
  );
}

export default App;
