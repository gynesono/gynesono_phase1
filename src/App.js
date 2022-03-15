import Login from './Login';
import Leftmenu from './pages/Navigation/Leftmenu';
import Dashboard from './pages/Dashboard';
import AppointmentSearch from './pages/AppointmentSearch';
import CustomerSearch from './pages/CustomerSearch';
import CustomerRegistation from './pages/CustomerRegistation';
import CustomerAccounting from './pages/CustomerAccounting';
import ReportPaymentsByCustomers from './pages/ReportPaymentsByCustomers';
import AppointmentAdd from './pages/AppointmentAdd';
import AppointmentUpdate from './pages/AppointmentUpdate';
import AddServices from './pages/AddServices';
import CustomerUpdate from './pages/CustomerUpdate';
import React from 'react';
import { BrowserRouter} from 'react-router-dom';
import {Routes } from 'react-router-dom';
import {Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      
      <div >
       
       <Routes>
            <Route exact path='/' element={< Login />}></Route>
            <Route exact path="/Login" element={< Login />}></Route>
            <Route exact path="/Leftmenu" element={<Leftmenu/>} />
            <Route exact path="/dashboard" element={<Dashboard/>} />
            <Route exact path="/appoinmentSearch" element={<AppointmentSearch/>} />
            <Route exact path="/customerRegistration" element={<CustomerRegistation/>} />
            <Route exact path="/customerSearch" element={<CustomerSearch/>} />
            <Route exact path="/customerAccounting" element={<CustomerAccounting/>} />
            <Route exact path="/reportPaymentsByCustomers" element={<ReportPaymentsByCustomers/>} />
            <Route exact path="/CustomerUpdate" element={<CustomerUpdate/>} />
            <Route exact path="/appointmentAdd" element={<AppointmentAdd/>} />
            <Route exact path="/customerAccounting" element={<CustomerAccounting/>} />
            <Route exact path="/appointmentUpdate/:appointment_id" element={<AppointmentUpdate/>} />
            <Route exact path="/addServices" element={<AddServices/>} />

       
             
       </Routes>
     </div>
  
  </BrowserRouter>
  );
}
export default App;