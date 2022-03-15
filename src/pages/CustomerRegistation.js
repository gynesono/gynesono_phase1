import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Leftmenu from "./Navigation/Leftmenu";
import Header from "./Navigation/Header";
class CustomerRegistation extends Component {
    state = {
        response: '',
        post: '',
        responseToPost: '',
    };

    componentDidMount() {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        const customerIDString = sessionStorage.getItem('customerID');
        const customerID = parseInt(customerIDString);
        this.setState({ Token: userToken });
        this.setState({ customerID: customerID });

        const roleString = sessionStorage.getItem('userRole');
        const userRole = JSON.parse(roleString);
        this.setState({ userRole: userRole });
        this.setState({ mn: this.props.mn});
        this.setState({ ptFirstName: this.props.ptFirstName});
        this.setState({ ptLastName: this.props.ptLastName});
    }


    handleDate = (str) => {

        const m = str.split("-");
        let str_date = m[2] + "/" + m[1] + "/" + m[0];
        this.setState({ datee: str_date })

    }
    
  handleOnloadDate = (str) => {
    const m = str.split("/");
    let str_date = m[2] + "-" + m[1] + "-" + m[0];
    return str_date;
  }


    handleSubmit = async e => {
        e.preventDefault();
        const requestHeader = {
            "content-Type": "application/json",
            accessIDKey: this.state.Token
        };

        const response = await fetch('http://localhost:3000/api/Patients/postPatient', {
            method: 'POST',
            headers: requestHeader,
            body: JSON.stringify({

                Salutation: this.state.psalu,
                patientGender: this.state.pGender,
                patientAge: this.state.PAge,
                patientEmail: this.state.pEmail,
                patientHusbandName: this.state.pHusbandName,
                patientAddress: this.state.pAddress,
                patientCity: this.state.pCity,
                patientState: this.state.pState,
                patientPortalConsent: this.state.pPortalConsent,
                customerID: this.state.customerID,
                customerCategory: "Gynecologist",
                patientFirstName: this.state.ptFirstName,
                patientLastName: this.state.ptLastName,
                patientMobileNumber: this.state.mn,
                LMP: this.state.datee,
                ObsNonObs: this.state.obsNobs,
                patientMaritalStatus: this.state.pMaritalStatus
            }),
        });

        const body = await response.text();

        this.setState({ responseToPost: body });
        // After Appointment Added
       
        




    };
    
    

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="main-wrapper">
                    <div className="page-wrapper">
                        <div className="content">
                            <Header />
                            <Leftmenu />
                            <div className="row">
                                <div className="col-lg-8 offset-lg-2">
                                    <h4 className="page-title">Register Customer</h4>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-8 offset-lg-2">
                                    
                                    <div className="mb-2 row">
                                        <div className="col-sm-2">
                                            <label>Salutation </label>
                                        </div>
                                        <div className="col-sm-4">
                                            <select className="form-control" aria-label="Default select example" name="psalu" value={this.state.value} onChange={(e) => this.setState({ psalu: e.target.value })}>
                                                <option>Select</option>
                                                <option value="Mrs." >Mrs.</option>
                                                <option value="Ms">Ms</option>
                                                <option value="Mr">Mr</option>
                                            </select>
                                        </div>
                                        <div className="col-sm-2">
                                            <label>Marital Status </label>
                                        </div>
                                        <div className="col-sm-4">
                                            <select className="form-control" aria-label="Default select example" value={this.state.value} onChange={(e) => this.setState({ pMaritalStatus: e.target.value })}>
                                                <option>Select</option>
                                                <option value="Married" >Married</option>
                                                <option value="Unmarried">Unmarried</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="mb-2 row">
                                        <div className="col-sm-2">
                                            <label>First Name<span className="text-danger">*</span></label>
                                        </div>
                                        <div className="col-sm-4">
                                            <input className="form-control" type="text" name="patientFirstName" value={this.state.ptFirstName} onChange={e => this.setState({ ptFirstName: e.target.value })} />
                                        </div>
                                        <div className="col-sm-2">
                                            <label>Last Name <span className="text-danger">*</span></label>
                                        </div>
                                        <div className="col-sm-4">
                                            <input className="form-control" type="text" name="patientLastName" value={this.state.ptLastName} onChange={e => this.setState({ ptLastName: e.target.value })} />
                                        </div>
                                    </div>

                                    <div className="md-2 row">
                                        <div className="col-sm-2">
                                            <label className="gen-label">Gender</label>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="form-group gender-select" value={this.state.value} onChange={e => this.setState({ pGender: e.target.value })}>
                                                <div className="form-check-inline">
                                                    <label className="form-check-label">
                                                        <input type="radio" name="gender" value="Male" className="form-check-input" />Male
                                                    </label>
                                                </div>
                                                <div className="form-check-inline">
                                                    <label className="form-check-label">
                                                        <input type="radio" name="gender" value="Female" className="form-check-input" />Female
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-2">
                                            <label>Age</label>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="cal-icon">
                                                <input type="text" className="form-control" name="PAge" value={this.state.PAge} onChange={e => this.setState({ PAge: e.target.value })} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="md-2 row">
                                        <div className="col-sm-2">
                                            <label>LMP</label>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="">
                                           
                                                <input type="date" id="myDate" className="form-control" name="date" pattern="\d{4}-\d{2}-\d{2}" value={this.state.dt} onChange={e => this.handleDate(e.target.value)} />
                                            </div>
                                        </div>

                                        <div className="col-sm-2">
                                            <label>Obs/Non-Obs </label>
                                        </div>
                                        <div className="col-sm-4">
                                            <select className="form-control" aria-label="Default select example" name="obsNobs" value={this.state.obsNobs} onChange={e => this.setState({ obsNobs: e.target.value })}  >
                                                <option>Select</option>
                                                <option value="Obs" >Obs</option>
                                                <option value="Non Obs">Non Obs</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="mb-2 row">
                                        <div className="col-sm-2">
                                            <label>Husband Name</label>
                                        </div>
                                        <div className="col-sm-4">
                                            <input className="form-control" type="text" name="pHusbandName" value={this.state.pHusbandName} onChange={e => this.setState({ pHusbandName: e.target.value })} />
                                        </div>

                                        <div className="col-sm-2">
                                            <label className="gen-label">Customer Portal Consent</label>
                                        </div>
                                        <div className="col-sm-4">

                                            <div className="form-check-inline">

                                                <input type="checkbox" value="yes" checked={this.state.value} onChange={e => this.setState({ pPortalConsent: e.target.value })} />

                                            </div>

                                        </div>

                                    </div>

                                    <div className="mb-2 row">
                                        <div className="col-sm-2">
                                            <label>Mobile <span className="text-danger">*</span></label>
                                        </div>
                                        <div className="col-sm-4">
                                        
                                            <input type="text" id="uname" name="name" required size="10"
           placeholder="Username"
           minlength="10" maxlength="10" className="form-control" value={this.state.mn} onChange={e => this.setState({ mn: e.target.value })} />
                                        </div>
                                        <div className="col-sm-2">
                                            <label>Email </label>
                                        </div>
                                        <div className="col-sm-4">
                                            <input className="form-control" type="text" name="pEmail" value={this.state.pEmail} onChange={e => this.setState({ pEmail: e.target.value })} />
                                        </div>
                                    </div>
                                    <div className="mb-2 row">
                                        <div className="col-sm-2">
                                            <label>City <span className="text-danger">*</span></label>
                                        </div>
                                        <div className="col-sm-4">
                                            <input className="form-control" type="text" name="pCity" value={this.state.pCity} onChange={e => this.setState({ pCity: e.target.value })} />
                                        </div>
                                        <div className="col-sm-2">
                                            <label>State <span className="text-danger">*</span></label>
                                        </div>
                                        <div className="col-sm-4">
                                            <select className="form-control" aria-label="Default select example" name="pState" value={this.state.pState} onChange={e => this.setState({ pState: e.target.value })}  >
                                                <option>Select</option>
                                                <option value="Andhra Pradesh">Andhra Pradesh</option>
                                                <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                                                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                                <option value="Assam">Assam</option>
                                                <option value="Bihar">Bihar</option>
                                                <option value="Chandigarh">Chandigarh</option>
                                                <option value="Chhattisgarh">Chhattisgarh</option>
                                                <option value="Dadar and Nagar Haveli">Dadar and Nagar Haveli</option>
                                                <option value="Daman and Diu">Daman and Diu</option>
                                                <option value="Delhi">Delhi</option>
                                                <option value="Lakshadweep">Lakshadweep</option>
                                                <option value="Puducherry">Puducherry</option>
                                                <option value="Goa">Goa</option>
                                                <option value="Gujarat">Gujarat</option>
                                                <option value="Haryana">Haryana</option>
                                                <option value="Himachal Pradesh">Himachal Pradesh</option>
                                                <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                                                <option value="Jharkhand">Jharkhand</option>
                                                <option value="Karnataka">Karnataka</option>
                                                <option value="Kerala">Kerala</option>
                                                <option value="Madhya Pradesh">Madhya Pradesh</option>
                                                <option value="Maharashtra">Maharashtra</option>
                                                <option value="Manipur">Manipur</option>
                                                <option value="Meghalaya">Meghalaya</option>
                                                <option value="Mizoram">Mizoram</option>
                                                <option value="Nagaland">Nagaland</option>
                                                <option value="Odisha">Odisha</option>
                                                <option value="Punjab">Punjab</option>
                                                <option value="Rajasthan">Rajasthan</option>
                                                <option value="Sikkim">Sikkim</option>
                                                <option value="Tamil Nadu">Tamil Nadu</option>
                                                <option value="Telangana">Telangana</option>
                                                <option value="Tripura">Tripura</option>
                                                <option value="Uttar Pradesh">Uttar Pradesh</option>
                                                <option value="Uttarakhand">Uttarakhand</option>
                                                <option value="West Bengal">West Bengal</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="mb-2 row">
                                        <div className="col-sm-2">
                                            <label>Address</label>
                                        </div>
                                        <div className="col-sm-10">
                                            <textarea className="form-control" rows="3" name="pAddress" value={this.state.pAddress} onChange={e => this.setState({ pAddress: e.target.value })} />
                                        </div>
                                    </div>

                                    <div className="mb-4 row">
                                        <div className="col-xl-4">&nbsp;<button className="btn btn-danger submit-btn" type="submit" >Register
                                            Customer</button>
                                        </div>
                                        <div className="col-xl-4">&nbsp;<Link to="/customeraccounting" className="btn btn-danger submit-btn">Billing</Link>
                                        </div>
                                        <div className="col-xl-4">&nbsp;<Link to="/customerSearch" className="btn btn-danger submit-btn">Cancel</Link>
                                        </div>
                                       
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="sidebar-overlay" data-reff=""></div>
                </div>
            </form>
        );
    }
}
export default CustomerRegistation;