import React from "react";
import { Component } from "react";


function getToken() {
  const tokenString = sessionStorage.getItem("token");
  const userToken = JSON.parse(tokenString);
  return userToken?.token;
}

class Header extends Component {
  state = {
    response: "",
    post: "",
    Token: "",
    customerID: "",
  };
 
  componentDidMount() {
    
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    this.setState({ Token: userToken });
    const customerIDString = sessionStorage.getItem("customerID");
    const customerID = parseInt(customerIDString);
    this.setState({ customerID: customerID });
    const roleString = sessionStorage.getItem("userRole");
    const userRole = JSON.parse(roleString);
    this.setState({ userRole: userRole });
    const nameString = sessionStorage.getItem("userName");
    const userName = JSON.parse(nameString);
    this.setState({ userName: userName });
  }
  render() {
    return (
      <>
        <div className="main-wrapper">
          <div className="header">
            <div className="header-left">
              <a href="dashboard.js" className="logo">
                <i
                  className="fa fa-user-md fa-2x"
                  style={{ color: "white" }}
                ></i>
                <span>GyneSono</span>
              </a>
            </div>
            <a id="toggle_btn" href="javascript:void(0);">
              <i className="fa fa-bars"></i>
            </a>
            <a
              id="mobile_btn"
              className="mobile_btn float-left"
              href="#sidebar"
            >
              <i className="fa fa-bars"></i>
            </a>
            <ul class="nav user-menu float-right">

              <li className="nav-item dropdown has-arrow">
                <a href="" class="dropdown-toggle nav-link user-link" data-toggle="dropdown">
                  <span>{this.state.userName}</span>
                </a>
                <div className="dropdown-menu">
                  <a className="dropdown-item" href="profile.html">My Profile</a>
                  <a className="dropdown-item" href="signin.html">Logout</a>
                </div>
              </li>
            </ul>

            <div className="dropdown mobile-user-menu float-right">
              <a
                href=""
                className="nav-link dropdown-toggle"
                data-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fa fa-ellipsis-v"></i>
              </a>
              <div className="dropdown-menu dropdown-menu-right">
                <a className="dropdown-item" href="profile.html">
                  My Profile
                </a>
                <a className="dropdown-item" href="signin.html">
                  Logout
                </a>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Header;
