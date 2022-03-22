import React, { Component } from 'react';
import CustomerInfo from './Doctor_Component/CustomerInfo';
import Leftmenu from './Navigation/Leftmenu';
import Header from './Navigation/Header';

class NonObsAddCustomerVisit extends Component {

    state = {
        weight: 0,
        bp: 0,
        customerID: 0,
        serviceCategory: "",
        serviceName: "",
        diagnosticCenter: "",
        familyHistory: "",
        clinicalRemarks: "",
        referralComment: "",
        list: [],
        serviceNames: [],
        serviceNamesforBloodTest: [],
        serviceNamesforUSG: [],
        

    }
    componentDidMount() {
        // window.alert("Patient ID : " + this.props.ptId);
        const nameString = sessionStorage.getItem("customerID");
        const customerID = JSON.parse(nameString);
        this.setState({ customerID: customerID });
        this.handleServiceNameforBloodTest("Blood Test");
        this.handleServiceNameforUSG("Sonography");
    }
    handleServiceNameforBloodTest = (serviceCategory) => {
        // window.alert(serv iceCategory);
        const requestHeader = {
            "content-Type": "application/json",
            accessIDKey: "9999"
        };
        const requestOptions = {
            method: 'POST',
            headers: requestHeader,
            body: JSON.stringify({

                customerID: 3,
                serviceCategory: serviceCategory
            })
        };
        fetch('http://localhost:3000/api/Admin/getBillingMasterDataSCategory', requestOptions)
            .then(response => response.json())

            .then(data => this.setState({ serviceNamesforBloodTest: data.Items }))
            .then(() => this.setState({ serviceNamesforBloodTestlength: this.state.serviceNamesforBloodTest.length }))
        // .then(() => console.log(this.state.serviceNamesforBloodTest.length))
    }

    handleServiceNameforUSG = (serviceCategory) => {
        const requestHeader = {
            "content-Type": "application/json",
            accessIDKey: "9999"
        };
        const requestOptions = {
            method: 'POST',
            headers: requestHeader,
            body: JSON.stringify({

                customerID: 3,
                serviceCategory: serviceCategory
            })
        };
        fetch('http://localhost:3000/api/Admin/getBillingMasterDataSCategory', requestOptions)
            .then(response => response.json())

            .then(data => this.setState({ serviceNamesforUSG: data.Items }))
            .then(() => this.setState({ serviceNamesforUSGlength: this.state.serviceNamesforUSG }))

    }

    handleServiceName = () => {

        const requestHeader = {
            "content-Type": "application/json",
            accessIDKey: this.state.Token
        };
        const requestOptions = {
            method: 'POST',
            headers: requestHeader,
            body: JSON.stringify({

                customerID: this.state.customerID,
                serviceCategory: this.state.sCategory
            })
        };
        fetch('http://localhost:3000/api/Admin/getBillingMasterDataSCategory', requestOptions)
            .then(response => response.json())

            .then(data => this.setState({ serviceNames: data.Items }))
    }

    //this will be called when Patient is attended and doctor has to send the data to table.

    /* handleSubmit = async e => {
        e.preventDefault();
        const response = await fetch('http://localhost:3000/api/Doctor/postPatientVisitDetails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                
                customerID: this.state.customerID,
                weight: this.state.weight,
                bp: this.state.bp,
                
            }),
        });

        const body = await response.text();

        this.setState({ responseToPost: body });
        // After Appointment Added
        alert("Appointment Added Successfully");

        this.setState({ ptFirstName: "" });
        this.setState({ ptLastName: "" });
        this.setState({ mn: "" });
        this.setState({ rm: "" });
        this.setState({ tm: "" });
        document.getElementById("myDate").value = "";


    }; */

    //InsertIntoTable
    handleTable = (event) => {
        event.preventDefault();
        this.setState(state => {
            const val = {
                serviceName: this.state.serviceName,
                diagnosticCenter: this.state.diagnosticCenter,
            }
            const list = [...state.list, val];
            return {
                serviceName: '',
                diagnosticCenter: '',
            };
        });

    };

    render() {
        return (
            <div className="main-wrapper">

                <div className="page-wrapper">
                    <div className="content">
                        <Header /><Leftmenu />
                        <div className="mb-2 row">
                            <div className="col-sm-4 col-3">
                                <h4 className="page-title">Non-Obs Visit Details</h4>
                            </div>
                        </div>
                        <form onSubmit={this.handleSubmit}>
                            <div className="row">
                                <div className="col-xl-8  col-sm-6 stretch-card grid-margin">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="mb-2  row">
                                                <div className="col-sm-4 col-3">
                                                    <h4 className="page-title">NonObs Customer Visit</h4>
                                                </div>
                                            </div>

                                            <div className="mb-2 row">
                                                <div className="col-lg-12">
                                                    <div className="mb-2 row">
                                                        <div className="col-sm-4">
                                                            <label>Name </label>
                                                        </div>
                                                        <div className="col-sm-4">
                                                            {this.props.firstName} {this.props.lastName}
                                                        </div>

                                                    </div>

                                                    <div className="mb-2 row">
                                                        <div className="col-sm-4">
                                                            <label>Marital Status </label>
                                                        </div>
                                                        <div className="col-sm-4">
                                                            {this.props.maritalStatus}
                                                        </div>
                                                        <div className="col-sm-2">
                                                            <label>Age <span className="text-danger">*</span></label>
                                                        </div>
                                                        <div className="col-sm-2">
                                                            {this.props.age}
                                                        </div>
                                                    </div>
                                                    <div className="md-2 row">
                                                        <div className="col-sm-4">
                                                            <label>Last Menstrual Period </label>
                                                        </div>
                                                        <div className="col-sm-4">
                                                            {this.props.lmp}
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="card-body">

                                                <div className="mb-3 row">
                                                    <div className="col-sm-3">
                                                        <label for="weight">weight <span className="text-danger"></span></label>
                                                    </div>
                                                    <div className="col-sm-2">
                                                        <input className="form-control" type="text" id="weight" value={this.state.weight} onChange={e => this.setState({ weight: e.target.value })} />
                                                    </div>
                                                    <div className="col-sm-2">
                                                        <label for="bp">BP <span className="text-danger"></span></label>
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <input className="form-control" type="text" id="bp" value={this.state.bp} onChange={e => this.setState({ bp: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="mb-2 row filter-row">

                                                    <div className="col-xl-3">
                                                        <label>Family History (if any) </label>
                                                    </div>
                                                    <div className="col-xl-8">
                                                        <textarea className="form-control" rows="1" value={this.state.familyHistory} onChange={e => this.setState({ familyHistory: e.target.value })}></textarea>
                                                    </div>
                                                    <div className="col-xl-3">
                                                        <label>Clinical remarks and observations </label>
                                                    </div>
                                                    <div className="col-xl-8">
                                                        <textarea className="form-control" rows="1" value={this.state.clinicalRemarks} onChange={e => this.setState({ clinicalRemarks: e.target.value })}></textarea>
                                                    </div>
                                                </div>

                                                <div className="mb-2 row filter-row">
                                                    <div className="col-xl-3">
                                                        <label>Blood Test </label>
                                                    </div>
                                                    <div className="col-sm-3">

                                                        <select className="select" placeholder="Service Name" multiple >
                                                            <option>Select</option>
                                                            {
                                                                this.state.serviceNamesforBloodTest.map((item) => (
                                                                    <option value={item.serviceName}>{item.serviceName}

                                                                    </option>

                                                                )

                                                                )

                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="mb-2 row filter-row">
                                                    <div className="col-xl-3">
                                                        <label>Sonography </label>
                                                    </div>

                                                    <div className="col-sm-6">

                                                        <select className="select" placeholder="Service Name" multiple>
                                                            <option>Select</option>
                                                            {
                                                                this.state.serviceNamesforUSG.map((item) => (
                                                                    <option value={item.serviceName} key={item.patient_id}>{item.serviceName}</option>
                                                                ))
                                                            }
                                                        </select>
                                                         <div>
                                                            <input type="checkbox" id="Included" name="Include" value="Included" />
                                                            <label for="Include">Include USG and Blood Tests?</label>
                                                        </div> 
                                                    </div>
                                                </div>
                                                <div className="mb-2 row filter-row">
                                                    <div className="col-xl-3">
                                                        <label>Diagnostic Center </label>
                                                    </div>
                                                    <div className="col-xl-8">
                                                        <select className="form-control" aria-label="Default select example" value={this.state.diagnosticCenter} onChange={(e) => this.setState({ diagnosticCenter: e.target.value })}>
                                                            <option >Diagnostic Center</option>
                                                            <option value="1" selected>Acculab Diagnostics Centre, Sonography, Blood
                                                                Testing,
                                                                X-Ray
                                                            </option>
                                                            <option value="2">ABC Diagnostics and Pathology</option>
                                                            <option value="3">Shreya Pathology Lab</option>
                                                        </select>
                                                    </div>

                                                </div>
                                                <div className="mb-2 row filter-row">
                                                    <div className="col-xl-3">
                                                        <label>Referral Comment</label>
                                                    </div>
                                                    <div className="col-xl-8 col-md-3">
                                                        <textarea className="form-control" rows="2" value={this.state.referralComment} onChange={e => this.setState({ referralComment: e.target.value })}></textarea>
                                                    </div>
                                                </div>
                                                <div className="mb-2 row filter-row">
                                                    <div className="col-xl-3 col-md-2">
                                                    </div>
                                                    <div className="col-xl-2 col-md-2">
                                                        <button className="btn btn-success btn-block" type="submit" onClick={this.handleTable}>Add</button>&nbsp;&nbsp;&nbsp;
                                                        {/*  <a href="#" className="btn btn-success btn-block"> Add</a> */}
                                                    </div>

                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-2 row">
                                    <div className="col-md-12">
                                        <div className="table-responsive">
                                            <table className="table table-border table-striped custom-table datatable mb-0">

                                                <thead>
                                                    <tr>
                                                        <th className="ant-table-cell">Prescribed Service</th>
                                                        <th className="ant-table-cell">Diagnostic Center</th>
                                                    </tr>
                                                </thead>

                                                {this.state.list.map((item, index = 0) => (
                                                    <tbody key={index + 1}>

                                                        <td>{item.serviceName}</td>
                                                        <td>{item.diagnosticCenter}</td>


                                                        <td className="text-right">
                                                            <div className="dropdown dropdown-action">
                                                                <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown"
                                                                    aria-expanded="false"><i className="fa fa-ellipsis-v"></i></a>
                                                                <div className="dropdown-menu dropdown-menu-right">
                                                                    <a className="dropdown-item" href="edit-customer.html"><i
                                                                        className="fa fa-pencil m-r-5"></i> Edit</a>
                                                                    <a className="dropdown-item" href="#" data-toggle="modal"
                                                                        data-target="#delete_patient"><i className="fa fa-trash-o m-r-5"></i> Delete</a>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tbody>
                                                ))}
                                            </table>

                                        </div>
                                        <div className="mb-3 row">
                                            <div className="col-xl-3 col-md-2">
                                                <button className="btn btn-success btn-block"> Save</button>
                                            </div>
                                            <div className="col-xl-4 col-md-2">
                                                <button className="btn btn-success btn-block"> Referral Letter</button>
                                            </div>
                                            <div className="col-xl-3 col-md-2">
                                                <button className="btn btn-primary submit-btn">Billing</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        )
    }
}

export default NonObsAddCustomerVisit;