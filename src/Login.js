import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Dashboard from './pages/Dashboard';

import { useNavigate } from "react-router-dom";
//import './Login.css';

export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [email, setemail] = useState();
  const [responseToPost, setPost] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
           'Access-Control-Allow-Origin':'*'
        },
        body: JSON.stringify({userName: username,
          password: password,
          email: email
        }),
        isBase64Encoded: false
      };
    //https://gpn83tzx9c.execute-api.us-east-1.amazonaws.com/prepord/getlogin
//gyne@12345
    const response = await fetch('https://n2qfa92wqk.execute-api.us-east-1.amazonaws.com/prepord/getlogin', requestOptions);
   
    const body = await response.text();
    //window.alert(body.trim());
    //window.alert(body.length);
    var str = "Invalid credentials";
    var ans = body.trimEnd().localeCompare(str);
    
    if (body.length>100) {
      
        const token = JSON.parse(body).Attributes.accessKeyId; 
        const customerID = JSON.parse(body).Attributes.customer_id;
        const userName = JSON.parse(body).Attributes.user_name;
        const role = JSON.parse(body).Attributes.role;
        
        sessionStorage.setItem('token', JSON.stringify(token)); 
        sessionStorage.setItem('customerID', JSON.stringify(customerID)); 
        sessionStorage.setItem('userName', JSON.stringify(userName)); 
        sessionStorage.setItem('userRole', JSON.stringify(role)); 
        setIsLoggedIn(true);
       
     } else {
       setPost("Invalid user name or password or email address");
     }    
   
  }
  if (isLoggedIn) {
   return (<div>{navigate('/dashboard')}</div>)
   } else {
    return(
      <div className='App'>                
      <div className="page-wrapper">
          <div className="col-lg-4 offset-lg-2">
              <i className="fa fa-user-md fa-5x" style={{color:'hotpink', textAlign:'center', marginLeft:'50%'}}></i><h4 style={{marginLeft:'50%'}}>Gyno</h4>
              <div>&nbsp;</div>
              <p style={{color:'red', fontSize:'14px',fontWeight:'bold', textAlign:'center' }}>{responseToPost}</p>
              <h1 className="h3 mb-3 fw-normal"><center>Please sign in</center></h1>
             <div>
             <form onSubmit={handleSubmit}>
                  <div className="form-floating">
                      <input type="text" className="form-control" id="floatingInput" placeholder="Username" name= "un" onChange={e => setUserName(e.target.value)}/>
                  </div>
                  <div className="form-floating">
                      <input type="password" className="form-control" id="floatingPassword" placeholder="Password" name="pw" onChange={e => setPassword(e.target.value)}/>
                  </div>
                  <div className="form-floating">
                      <input type="email" className="form-control" id="floatingInput" placeholder="Email" name= "em" onChange={e => setemail(e.target.value)}/>
                  </div>
                  <div>&nbsp;</div>
                  <button type="submit" className="w-100 btn btn btn-lg btn-primary" style={{backgroundColor: 'hotpink'}}>Submit</button>
                  <p className="mt-5 mb-3 text-muted"><center>&copy; 2022</center></p>
                 
                  <br /><br/>
                </form>
                
              </div>
          </div>
          <div className="sidebar-overlay" data-reff=""></div>
      </div>         
      <h3 ></h3>
     </div> 

    )
}
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};

function setToken(userToken) {
    sessionStorage.setItem('token', JSON.stringify(userToken));
}