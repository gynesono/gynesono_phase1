import { Link } from 'react-router-dom';
import Leftmenu from './Navigation/Leftmenu';
import Header from './Navigation/Header';
import React, { Component } from "react";
class AppointmentAdd extends Component {
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


    }


    handleDate = (str) => {

        const m = str.split("-");
        let str_date = m[2] + "/" + m[1] + "/" + m[0];
        this.setState({ datee: str_date })

    }


    handleSubmit = async e => {
        e.preventDefault();
        const requestHeader = {
            "content-Type": "application/json",
            accessIDKey: this.state.Token
        };
        const requestOptions = {
            method: 'POST',
            headers: requestHeader,
            body: JSON.stringify({
                date: this.state.datee,
                time: this.state.tm,
                customerID: this.state.customerID,
                customerCategory: "Gynecologist",
                patientFirstName: this.state.ptFirstName,
                patientLastName: this.state.ptLastName,
                patientMobileNumber: this.state.mn,
                appointmentRemarks: this.state.rm,
                appointmentStatus: 'Open'
            }),
        }
        const response = await fetch('http://localhost:3000/api/Appointments/postAppointments', requestOptions).catch(error => alert('Error! ' + error.message))
        //.then(response => alert('Response! added' ))
        // .then(response => alert('Response! ' + error.message)).catch(error => alert('Error! ' + error.message))
        const body = await response.text();

        this.setState({ responseToPost: body });

        window.location.reload(true);



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
                                <div className="col-lg-8 offset-lg-2"><h4 className="page-title">Add Appointment</h4></div>
                            </div>
                            <div className="row">
                                <div className="col-lg-8 offset-lg-2">

                                    <div className="mb-2 row">
                                        <div className="col-sm-2">
                                            <label>First Name</label>
                                        </div>
                                        <div className="col-sm-4">
                                            <input type="text" className="form-control" name="patientFirstName" value={this.state.ptFirstName} onChange={e => this.setState({ ptFirstName: e.target.value })} />

                                        </div>
                                        <div className="col-sm-2">
                                            <label>Last Name</label>
                                        </div>
                                        <div className="col-sm-4">
                                            <input type="text" className="form-control" name="patientLastName" value={this.state.ptLastName} onChange={e => this.setState({ ptLastName: e.target.value })} />
                                        </div>
                                    </div>
                                    <div className="mb-2 row">
                                        <div className="col-sm-2">
                                            <label>Date</label>
                                        </div>
                                        <div className="col-sm-4">
                                            <input type="date" id="myDate" className="form-control" name="date" pattern="\d{4}-\d{2}-\d{2}" value={this.state.dt} onChange={e => this.handleDate(e.target.value)} />

                                        </div>
                                        <div className="col-sm-2">
                                            <label>Time</label>
                                        </div>
                                        <div className="col-sm-4">
                                            <input type="time" className="form-control" name="time" value={this.state.tm} onChange={e => this.setState({ tm: e.target.value })} />
                                        </div>
                                    </div>
                                    <div className="mb-2 row">
                                        <div className="col-sm-2">
                                            <label>Mobile Number</label>
                                        </div>
                                        <div className="col-sm-4">
                                            <input type="text" id="uname" name="patientMobileNumber" required size="10"
           placeholder="Username"
           minlength="10" maxlength="10"   className="form-control"   value={this.state.mn} onChange={e => this.setState({ mn: e.target.value })} />
                                        </div>
                                        <div className="col-sm-2">
                                            <label>Remark</label>
                                        </div>
                                        <div className="col-sm-4">
                                            <input type="text" className="form-control" name="appointmentRemarks" value={this.state.rm} onChange={e => this.setState({ rm: e.target.value })} />
                                        </div>
                                    </div>
                                    <div className="mb-2 row">
                                        <div className="m-t-20 text-center">
                                            <button className="btn btn-danger submit-btn" type="submit" >Create Appointment</button> &nbsp;
                                            <Link to="/appoinmentSearch" className="btn btn-danger submit-btn">Cancel</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </form>

        );
    }
}
export default AppointmentAdd;



