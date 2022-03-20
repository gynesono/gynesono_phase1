import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import DashAppoint from './Dashboard_Component/DashAppoint'
import DashAttend from './Dashboard_Component/DashAttend';
import DashCancel from './Dashboard_Component/DashCancel';
import DashPending from './Dashboard_Component/DashPending';
import Leftmenu from './Navigation/Leftmenu';
import Header from './Navigation/Header';
import AppointmentUpdate from './AppointmentUpdate';

class Dashboard extends Component {
    state = {
        response: '',
        post: '',
        responseToPost: '',
        customerID: '',
        AppointmentEdit:true ,
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
        this.handleOnload(customerID)
    }


    CancelStatus = async (key) => {
        const requestHeader = {
            "content-Type": "application/json",
            accessIDKey: this.state.Token
        };
        const response = await fetch('https://t4zz9wmi6f.execute-api.us-east-1.amazonaws.com/preprod/setappointmentstatus', {
        //const response = await fetch('http://localhost:3000/api/Appointments/setAppointmentsStatus', {
          method: 'POST',
          headers: requestHeader,
          body: JSON.stringify({appointmentID: key,
            customerID:this.state.customerID,
            appointmentStatus: "Cancelled"

          }),
          
        });
       
        window.location.reload(true);
      }



    handleOnload = async (customerID) => {
        const requestHeader = {
            "content-Type": "application/json",
            accessIDKey: this.state.Token
        };
        const response = await fetch('https://t4zz9wmi6f.execute-api.us-east-1.amazonaws.com/preprod/getappointmentsfordash', {
        //const response = await fetch('http://localhost:3000/api/Appointments/getAppointmentsforDash', {
            method: 'POST',
            headers: requestHeader,
            body: JSON.stringify({
                customerID: customerID
            }),

        });


        const body = await response.json();

        this.setState({ responseToPost: body.Items });
    };

    DashCancelCount = () => {
        let count=0;
        for (var i=0;i<this.state.responseToPost.length;i++)
        {
        if(this.state.responseToPost[i].appointment_status==="Cancelled")
        {
            count++;
        }
        
        }
        return count;
    }
    DashPandingCount = () => {
        let count=0;
        for (var i=0;i<this.state.responseToPost.length;i++)
        {
        if(this.state.responseToPost[i].appointment_status==="Open")
        {
            count++;
        }
        
        }
        return count;
    }
    handleEdit = (items) => {
        this.setState({ FName: items.patient_details.patient_first_name });
        this.setState({ LName: items.patient_details.patient_last_name });
        this.setState({ Mobile: items.patient_details.patient_contact_no });
        this.setState({ appointment_ID: items.appointment_id });
        this.setState({ Remark: items.patient_details.patient_appointment_remarks });
        this.setState({ AppTime: items.appointment_time });
        this.setState({ AppDate: items.appointment_date });
        
        
    
        this.setState({ AppointmentEdit: false });
        console.log(items)
      }
    

    render() {
        if(!this.state.AppointmentEdit){
            return(
              <AppointmentUpdate ptFirstName={this.state.FName} ptLastName={this.state.LName} mn={this.state.Mobile} datee={this.state.AppDate} tm={this.state.AppTime} rm={this.state.Remark} appointment_id={this.state.appointment_ID} />
            )}
            else{
        return (
            <div className="main-wrapper">


                <div className="page-wrapper">
                    <div className="content">
                        <div className="row">
                            <Header />
                            <Leftmenu />
                            <DashAppoint dashAppoint={this.state.responseToPost.length} />
                            <DashAttend />
                            <DashCancel dashCancel={this.DashCancelCount()}/> 
                            <DashPending dashPanding={this.DashPandingCount()}/>

                        </div>
                        <div className="row">
                            <div className="col-12 col-md-6 col-lg-8 col-xl-8 appointment-table">
                                <div className="card">
                                    <div className="card-header">
                                        <div className="row">

                                            <div className="col-sm-6 col-3"><h4 className="page-title">Today's Appointments</h4></div>
                                            <div className="col-sm-6 col-9 text-right m-b-20"><Link to="/appointmentAdd"
                                                className="btn btn btn-primary  float-right"
                                                href="appointment-add.html"><i className="fa fa-plus"></i> Add Appointment</Link>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card-body">
                                        <table className="table table-border table-striped custom-table datatable mb-0">
                                            <thead>
                                                <tr>
                                             
                                                    <th className="ant-table-cell">Customer Name</th>
                                                    <th className="ant-table-cell">Appointment Date</th>
                                                    <th className="ant-table-cell">Appointment Time</th>
                                                    <th className="ant-table-cell">Status</th>
                                                    <th className="ant-table-cell">Action</th>
                                                </tr>
                                            </thead>

                                            {this.state.responseToPost.length > 0 && (
                                                <tbody>
                                                    {this.state.responseToPost.map((items) => (


                                                        <tr key={items.appointment_id}>
                                                          
                                                            <td>{`${items.patient_details.patient_first_name} ${items.patient_details.patient_last_name}`}</td>
                                                            <td>{items.appointment_date}</td>
                                                            <td>{items.appointment_time}</td>
                                                            <td className="text-warning">{items.appointment_status}</td>
                                                            <td className="text-right">
                                                                <div className="dropdown dropdown-action">
                                                                    <a className="action-icon dropdown-toggle" data-toggle="dropdown"
                                                                        aria-expanded="false"><i className="fa fa-ellipsis-v"></i></a>
                                                                    <div className="dropdown-menu dropdown-menu-right">
                                                                        {/* <Link to={"/appointmentUpdate/" + items.appointment_id} className="dropdown-item" ><i
                                                                            className="fa fa-pencil m-r-5"></i> Edit</Link> */}
                                                                            <button  className="dropdown-item" onClick={() => this.handleEdit(items)}><i
                                className="fa fa-pencil m-r-5"></i> Edit</button>
                                                                        <button className="dropdown-item" data-toggle="modal"
                                                            data-target="#delete_patient" onClick={()=>this.CancelStatus(items.appointment_id)}><i className="fa fa-trash-o m-r-5"></i> Cancel</button>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}</tbody>
                                            )}
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-4 col-xl-4">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row">
                                            <h5 className="page-title">Customer Total</h5>
                                        </div>
                                        <div className="row">
                                            <p className="chart-label"><i className="fa fa-caret-up"></i>15% Higher than Last Month</p>
                                            <img src="./assets/img/report.png" width="100%" />
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12 col-sm-12 col-lg-12 col-xl-12">
                                                <div className="dash-widget">
                                                    <div className="dash-widget-info text-right">
                                                        MTD<h3><a href="report-payments-by-customers.html" style={{ color: 'gray' }}>150</a></h3>
                                                        YTD<h3><a href="report-payments-by-customers.html" style={{ color: 'gray' }}>6,530</a></h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="sidebar-overlay" data-reff=""></div>

            </div>
        );
    }

}}

export default Dashboard;