import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Leftmenu from './Navigation/Leftmenu';
import Header from './Navigation/Header';
import CustomerRegistation from './CustomerRegistation';

class AppointmentSearch extends Component {
  state = {
    response: '',
    post: '',
    responseToPost: '',
    date: '',
    IsAppointmentEdit: true,
  };

  componentDidMount() {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    const customerIDString = sessionStorage.getItem('customerID');
    const customerID = parseInt(customerIDString);
    this.setState({ Token: userToken });
    this.setState({ customerID: customerID });
    this.handleOnload(customerID);

  }
  handleOnload = async (customerID) => {

    const requestHeader = {
      "content-Type": "application/json",
      accessIDKey: this.state.Token
    };
    const response = await fetch('http://localhost:3000/api/Appointments/getAppointmentsforDash', {
      method: 'POST',
      headers: requestHeader,
      body: JSON.stringify({
        customerID: customerID,
      }),
    });

    const body = await response.json();
    this.setState({ responseToPost: body.Items });
  }


  handleDate = (str) => {

    const m = str.split("-");
    let str_date = m[2] + "/" + m[1] + "/" + m[0];
    this.setState({ date: str_date })

  }
  CancelStatus = async (key) => {
    const requestHeader = {
      "content-Type": "application/json",
      accessIDKey: this.state.Token
    };
    window.location.reload(true);

    const response = await fetch('http://localhost:3000/api/Appointments/setAppointmentsStatus', {
      method: 'POST',
      headers: requestHeader,
      body: JSON.stringify({
        appointmentID: key,
        customerID: this.state.customerID,
        appointmentStatus: "Cancelled"
      }),

    });

  }

  handleSubmit = async e => {
    e.preventDefault();
    const requestHeader = {
      "content-Type": "application/json",
      accessIDKey: this.state.Token
    };
    const response = await fetch('http://localhost:3000/api/Appointments/getAllAppointmentsByDate', {
      method: 'POST',
      headers: requestHeader,
      body: JSON.stringify({
        appointmentDate: this.state.date,
        customerID: this.state.customerID,

      }),
    });

    const body = await response.json();
    this.setState({ responseToPost: body.Items });
  };

  handleName = (items) => {
    this.setState({ FirstName: items.patient_details.patient_first_name });
    this.setState({ LastName: items.patient_details.patient_last_name });
    this.setState({ Contact: items.patient_details.patient_contact_no });
    this.setState({ IsAppointmentEdit: false });
    console.log(items)
  }

  render() {
    if (!this.state.IsAppointmentEdit) {
      return (
        <CustomerRegistation ptFirstName={this.state.FirstName} ptLastName={this.state.LastName} mn={this.state.Contact} />)
    }
    else {
      return (

        <div className="main-wrapper">
          <div className="page-wrapper">
            <div className="content">
              <Header />
              <Leftmenu />
              <div className="row">
                <div className="col-sm-4 col-3">
                  <h4 className="page-title">Appointments</h4>
                </div>
                <div className="col-sm-8 col-9 text-right m-b-20">
                  <Link to="/appointmentAdd" className="btn btn btn-primary float-right"><i
                    className="fa fa-plus"></i> Add Appointment</Link>
                </div>
              </div>
              <form onSubmit={this.handleSubmit}>
                <div className="row filter-row">
                  <div className="col-xl-2">
                    <label className="focus-label">Appointment Date</label>
                  </div>
                  <div className="col-xl-2">
                    <input type="date" className="form-control floating" value={this.state.aptDate1} onChange={e => this.handleDate(e.target.value)} />
                  </div>


                  <div className="col-xl-1">

                    <button type="submit" className="btn btn-success btn-block" >Search</button>
                  </div>
                </div>
              </form>
              <table className="table table-border table-striped custom-table datatable mb-0">
                <thead>
                  <tr>
                    <th className="ant-table-cell">Appointment ID</th>
                    <th className="ant-table-cell">Customer Name</th>
                    <th className="ant-table-cell">Appointment Date</th>
                    <th className="ant-table-cell">Appointment Time</th>
                    <th className="ant-table-cell">Contact Number</th>
                    <th className="ant-table-cell">Remark</th>
                    <th className="ant-table-cell">Status</th>
                    <th className="ant-table-cell">Register</th>
                 <th className="ant-table-cell">Action</th>

                  </tr>
                </thead>


                {this.state.responseToPost.length > 0 && (
                  <tbody>

                    {this.state.responseToPost.map((items) => (


                      <tr key={items.appointment_id}>
                        <td>{items.appointment_id}</td>
                        <td>{`${items.patient_details.patient_first_name} ${items.patient_details.patient_last_name}`}</td>
                        <td>{items.appointment_date}</td>
                        <td>{items.appointment_time}</td>
                        <td>{items.patient_details.patient_contact_no}</td>
                        <td>{items.patient_details.patient_appointment_remarks}</td>
                        <td className="text-warning">{items.appointment_status}</td>
                        <td>
                          <button className="btn btn btn-primary float-right" onClick={() => this.handleName(items)}><i
                            className="fa fa-plus" ></i> Register Customer</button>

                        </td>

                        <td className="text-right">
                          <div className="dropdown dropdown-action">
                            <a className="action-icon dropdown-toggle" data-toggle="dropdown"
                              aria-expanded="false"><i className="fa fa-ellipsis-v"></i></a>
                            <div className="dropdown-menu dropdown-menu-right">
                              <Link to={"/appointmentUpdate/" + items.appointment_id} className="dropdown-item"><i
                                className="fa fa-pencil m-r-5"></i> Edit</Link>
                              <button className="dropdown-item" data-toggle="modal"
                                data-target="#delete_patient" onClick={() => this.CancelStatus(items.appointment_id)}><i className="fa fa-trash-o m-r-5"></i> Cancel</button>
                            </div>
                          </div>
                        </td>
                      </tr>


                    ))}</tbody>
                )}
              </table>






            </div>
          </div>


          <div className="sidebar-overlay" data-reff=""></div>
        </div>

      );
    }
  }
}
export default AppointmentSearch;





































