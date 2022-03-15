import { Link } from 'react-router-dom';
import Leftmenu from './Navigation/Leftmenu';
import Header from './Navigation/Header';
import React, { Component } from "react";

class AppointmentUpdate extends Component {


  state = {
    response: '',
    post: '',
    responseToPost: '',
    id: parseInt(window.location.href.split("/")[4])
  };

  componentDidMount() {
   
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    const customerIDString = sessionStorage.getItem('customerID');
    const customerID = parseInt(customerIDString);
    this.setState({ Token: userToken });
    this.setState({ customerID: customerID });
    this.handleOnload(customerID)
    var appID = parseInt(window.location.href.split("/")[4])
    this.setState({ id: appID });

  }

  handleOnload = async (customerID) => {
    const requestHeader = {
      "content-Type": "application/json",
      accessIDKey: this.state.Token
    };

    const response = await fetch('http://localhost:3000/api/Appointments/getAppointmentsByAppId', {

      method: 'POST',
      headers: requestHeader,
      body: JSON.stringify({
        appointmentID: this.state.id,
        customerID: customerID,


      }),

    });

    const body = await response.json();
    this.setState({
      id: body.Items[0].appointment_id,
      datee: this.handleOnloadDate(body.Items[0].appointment_date),
      tm: body.Items[0].appointment_time,
      ptFirstName: body.Items[0].patient_details.patient_first_name,
      ptLastName: body.Items[0].patient_details.patient_last_name,
      rm: body.Items[0].patient_details.patient_appointment_remarks,
      mn: body.Items[0].patient_details.patient_contact_no,
    });

  }

  handleDateSubmit = (str) => {

    const m = str.split("-");
    let str_date = m[2] + "/" + m[1] + "/" + m[0];

    return str_date;

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
    
    const response = await fetch('http://localhost:3000/api/Appointments/setAppointment', {
      method: 'POST',
      headers: requestHeader,

      body: JSON.stringify({
        customerID: this.state.customerID,
        appointmentID: this.state.id,
        appointmentDate: this.handleDateSubmit(this.state.datee),
        appointmentTime: this.state.tm,
        patientFirstName: this.state.ptFirstName,
        patientLastName: this.state.ptLastName,
        patientMobileNumber: this.state.mn,
        appointmentRemarks: this.state.rm,
      }),

    });

    const body = await response.json();

    this.setState({ responseToPost: body });


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
                      <label>Appointment ID</label>
                    </div>
                    <div className="col-sm-4">
                      <input className="form-control" type="text" value={this.state.id} disabled readonly />
                    </div>
                  </div>
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
                      <input type="date" className="form-control" name="date" value={this.state.datee} onChange={e => this.setState({ datee: e.target.value })} />

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
                                                minlength="10" maxlength="10" className="form-control" value={this.state.mn} onChange={e => this.setState({ mn: e.target.value })} />
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
                      <button className="btn btn-primary" type="submit" >Update Appointment</button>
                      <Link to="/appoinmentSearch" className="btn btn-primary">Cancel</Link>
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
export default AppointmentUpdate;



