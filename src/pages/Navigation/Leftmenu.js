import React from "react";
import {Link} from 'react-router-dom'; 

function Leftmenu(){
    
        // const [ dashboardIsOpen, setDashboardIsOpen ] = useState(false);
        // const [ signIsOpen, setSignIsOpen ] = useState(false);
        
        // function dash()
        // {
        //     setDashboardIsOpen(true);
        // }
        // function sign()
        // {
        //     setSignIsOpen(true);
        // }
    return (
   

<div className="sidebar" id="sidebar">
<div className="sidebar-inner slimscroll">
    <div id="sidebar-menu" className="sidebar-menu">
        <ul>
            <li className="menu-title">Main</li>
            <li>
            <Link to="/dashboard" > 
            <i className="fa fa-dashboard"></i>  <span>Dashboard</span>  
             </Link>
            
            </li> 
            <li className="submenu">
                <a href=""><i className="fa fa-calendar"></i> <span> Appointment </span> <span
                        className="menu-arrow"></span></a> 

                <ul style={{display:'none'}}>
                    <li><Link to="/appoinmentSearch">Appointments</Link></li>
                   
                </ul>
                
            </li>
            <li className="submenu">
                <a href=""><i className="fa fa-user"></i> <span> Customer </span> <span
                        className="menu-arrow"></span></a>
                <ul style={{display:'none'}}>
                    <li><Link to="/customerSearch">Search Customer</Link></li>
                    <li><Link to="/customerRegistration">Customer Registration</Link></li>
                </ul>
            </li>
            <li className="submenu">
                <a href=""><i className="fa fa-money"></i> <span> Billing </span> <span
                        className="menu-arrow"></span></a>
                <ul style={{display: 'none'}}>
                    <li><Link to='/customerAccounting'> Customer Accounting</Link></li>
                </ul>
            </li>
            
            <li className="menu-title">Reports</li>
            <li className="submenu">
                <a href=""><i className="fa fa-flag-o"></i> <span> Reports </span> <span className="menu-arrow"></span></a>
                <ul style={{display: 'none'}}>
                    <li><Link to='/reportPaymentsByCustomers'> Customer Payments </Link></li>
                </ul>
            </li>
            
            <li className="menu-title">Admin</li>
            <li className="submenu">
                <a href=""><i className="fa fa-flag-o"></i> <span> Services </span> <span className="menu-arrow"></span></a>
                <ul style={{display: 'none'}}>
                    <li><Link to='/addServices'> Add Services </Link></li>
                </ul>
            </li>
           
                
           
        </ul>
    </div>
</div>

</div>

 );
}

export default Leftmenu;