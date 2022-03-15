import React from 'react';
import Login from './Login';
import Header from './pages/Navigation/Header';
import Leftmenu from './pages/Navigation/Leftmenu';
import Dashboard from './pages/Dashboard';
import AppointmentSearch from './pages/AppointmentSearch';
import CustomerSearch from './pages/CustomerSearch';
import CustomerRegistation from './pages/CustomerRegistation';
import CustomerAccounting from './pages/CustomerAccounting';
import ReportPaymentsByCustomers from './pages/ReportPaymentsByCustomers';
import AppointmentAdd from './pages/AppointmentAdd';
import AppointmentUpdate from './pages/AppointmentUpdate'
import { BrowserRouter,Routes ,Route } from 'react-router-dom'

function Routepage(){
return (
    <div>
     
 <BrowserRouter>
 <Header /> 
<Leftmenu/> 
<Routes>    
<Route exact path="/" element={<Leftmenu/>} />
<Route path="/dashboard" element={<Dashboard/>} />
<Route path="/appoinmentSearch" element={<AppointmentSearch/>} />
<Route path="/customerRegistration" element={<CustomerRegistation/>} />
<Route path="/customerSearch" element={<CustomerSearch/>} />
<Route path="/customerAccounting" element={<CustomerAccounting/>} />
<Route path="/reportPaymentsByCustomers" element={<ReportPaymentsByCustomers/>} />
<Route path="/appointmentAdd" element={<AppointmentAdd/>} />
<Route path="/customerAccounting" element={<CustomerAccounting/>} />
<Route path="/appointmentUpdate/:appointment_id" element={<AppointmentUpdate/>} />
</Routes> 
</BrowserRouter>
</div>
);
}

export default Routepage;
