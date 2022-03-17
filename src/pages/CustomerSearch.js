import Leftmenu from "./Navigation/Leftmenu";
import Header from "./Navigation/Header";
import React, { Component } from 'react';
import CustomerUpdate from "./CustomerUpdate";
import { Link } from 'react-router-dom';
import CustomerAccounting from "./CustomerAccounting";

class CustomerSearch extends Component {
    state = {
        response: '',
        post: '',
        responseToPost: '',
        date: '',
        IsCustomerEdit: true,
        billingButton: '',
    };

    componentDidMount() {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        const customerIDString = sessionStorage.getItem('customerID');
        const customerID = parseInt(customerIDString);
        this.setState({ Token: userToken });
        this.setState({ customerID: customerID });

    }

    handleSelectedRadioButton = async (e) => {
        var radio = document.getElementsByName('patient');
        for (var i = 0; i < radio.length; i++) {
            if (radio[i].checked) {
                let ptInfo = radio[i].value;
                const ptInfoArray = ptInfo.split(",");
                this.setState({ ptId: ptInfoArray[0] });
                this.setState({ ptfName: ptInfoArray[1] });
                this.setState({ ptlName: ptInfoArray[2] });
                this.setState({ ptAge: ptInfoArray[3] });
                this.setState({ ptLMP: ptInfoArray[4] });
                this.setState({ ptMaritalStatus: ptInfoArray[5] });
            }

        }

    }
    handleBillingBtnClick = async e => { 
        this.setState({ billingButton: true });
    }

    handleSubmit = async e => {
        e.preventDefault();
        const requestHeader = {
            "content-Type": "application/json",
            accessIDKey: this.state.Token
        };
        var ptLastName = this.state.ptLastName;
        var ptFirstName = this.state.ptFirstName;
        if (!ptLastName) {
            this.setState({ ptLastName: "" });
        }
        if (!ptFirstName) {
            this.setState({ ptFirstName: "" });
        }
        if (ptLastName == null) { ptLastName = ""; }
        const response = await fetch('http://localhost:3000/api/Patients/getPatientsByName', {
            method: 'POST',
            headers: requestHeader,

            body: JSON.stringify({

                customerID: this.state.customerID,
                patientFirstName: this.state.ptFirstName,
                patientLastName: this.state.ptLastName
            }),

        });

        const body = await response.json();

        this.setState({ responseToPost: body.Items });
    };
    DeleteItems = async (key) => {
        const requestHeader = {
            "content-Type": "application/json",
            accessIDKey: this.state.Token
        };
        window.location.reload(true);
        const response = await fetch('http://localhost:3000/api/Patients/dropPatientTableRow', {
            method: 'POST',
            headers: requestHeader,
            body: JSON.stringify({
                PatientID: key,
                customerID: this.state.customerID
            }),
        });

    }
    handleUpdate = (items) => {
        this.setState({ FirstName: items.patient_details.patient_first_name });
        this.setState({ LastName: items.patient_details.patient_last_name });
        this.setState({ Contact: items.patient_details.patient_contact_no });
        this.setState({ Pid: items.Patient_id });
        this.setState({ PortalConsent: items.Patient_portal_consent });
        this.setState({ HusbandName: items.patient_details.patient_husband_name });
        this.setState({ pGender: items.patient_details.patient_gender });
        this.setState({ PState: items.patient_details.patient_state });
        this.setState({ pAddress: items.patient_details.patient_address });
        this.setState({ LMP: items.patient_details.lmp });
        this.setState({ PSalutation: items.patient_details.patient_salutation });
        this.setState({ PObs: items.patient_details.obs_nonobs });
        this.setState({ PEmail: items.patient_details.patient_email });
        this.setState({ PMStatus: items.patient_details.patient_marital_status });
        this.setState({ PAge: items.patient_details.patient_age });
        this.setState({ pCity: items.patient_details.patient_city });

        this.setState({ IsCustomerEdit: false });
        console.log(items)
    }

    render() {
        if (!this.state.IsCustomerEdit) {
            return (

                <CustomerUpdate ptFirstName={this.state.FirstName} ptLastName={this.state.LastName} mn={this.state.Contact}
                    Patient_id={this.state.Pid} pPortalConsent={this.state.PortalConsent} pHusbandName={this.state.HusbandName}
                    psalu={this.state.PSalutation} pGender={this.state.pGender} PAge={this.state.PAge} pEmail={this.state.PEmail}
                    pAddress={this.state.pAddress} pCity={this.state.pCity} pState={this.state.PState} datee={this.state.LMP}
                    obsNobs={this.state.PObs} pMaritalStatus={this.state.PMStatus}
                />)
        }else if (this.state.billingButton) {
            return (<div><CustomerAccounting
                ptId = {this.state.ptId}
                firstName={this.state.ptfName}
                lastName={this.state.ptlName}
                
            /> </div>)}
        else {
            return (
                <div className="main-wrapper">
                    <div className="page-wrapper">
                        <div className="content">
                            <Header />
                            <Leftmenu />
                            <div className="row">
                                <div className="col-sm-4 col-3">
                                    <h4 className="page-title">Customers</h4>
                                </div>
                                <div className="col-sm-8 col-9 text-right m-b-20">
                                    <Link to="/customerRegistration" className="btn btn btn-primary float-right"><i
                                        className="fa fa-plus"></i> Register Customer</Link>
                                </div>
                            </div>
                            <div className="row filter-row">

                                <div className="mb-2 row">
                                    <div className="col-sm-2">
                                        <label>First Name </label>
                                    </div>
                                    <div className="col-sm-4">
                                        <input className="form-control" type="text" name="patientFirstName" value={this.state.ptFirstName} onChange={e => this.setState({ ptFirstName: e.target.value })} />
                                    </div>
                                    <div className="col-sm-2">
                                        <label>Last Name </label>
                                    </div>
                                    <div className="col-sm-4">
                                        <input className="form-control" type="text" name="patientLastName" value={this.state.ptLastName} onChange={e => this.setState({ ptLastName: e.target.value })} />
                                    </div>
                                </div>

                                <div className="col-xl-1">
                                    <form onSubmit={this.handleSubmit}>
                                        <button href="#" className="btn btn-success btn-block"> Search </button>
                                    </form>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-12">
                                    <div className="table-responsive">
                                        <table className="table table-border table-striped custom-table datatable mb-0">
                                            <thead>
                                                <tr>
                                                    <th></th>
                                                    <th>Name</th>
                                                    <th>Age</th>
                                                    <th>Address</th>
                                                    <th>Phone</th>
                                                    <th>Email</th>
                                                    <th className="text-right">Action</th>
                                                </tr>
                                            </thead>
                                            {this.state.responseToPost.length > 0 && (
                                                <tbody>
                                                    {this.state.responseToPost.map((items) => (


                                                        <tr key={items.Patient_id}><td className="text-right">
                                                            <label className="form-check-label">
                                                                <input type="radio" name="patient" value={
                                                                    items.Patient_id
                                                                    + "," + items.patient_details.patient_first_name
                                                                    + "," + items.patient_details.patient_last_name
                                                                    + "," + items.patient_details.patient_age
                                                                    + "," + items.patient_details.lmp
                                                                    + "," + items.patient_details.patient_marital_status
                                                                }
                                                                    className="form-check-input"
                                                                    onClick={this.handleSelectedRadioButton}
                                                                />
                                                            </label>
                                                        </td>
                                                            <td>{`${items.patient_details.patient_first_name} ${items.patient_details.patient_last_name}`}</td>
                                                            <td>{items.patient_details.patient_age}</td>
                                                            <td>{items.patient_details.patient_address}</td>
                                                            <td>{items.patient_details.patient_contact_no}</td>
                                                            <td>{items.patient_details.patient_email}</td>


                                                            <td className="text-right">
                                                                <div className="dropdown dropdown-action">
                                                                    <a className="action-icon dropdown-toggle" data-toggle="dropdown"
                                                                        aria-expanded="false"><i className="fa fa-ellipsis-v"></i></a>
                                                                    <div className="dropdown-menu dropdown-menu-right">
                                                                        <button className="dropdown-item" onClick={() => this.handleUpdate(items)}><i
                                                                            className="fa fa-pencil m-r-5"></i> Edit</button>
                                                                        <button
                                                                            className="dropdown-item" data-toggle="modal"
                                                                            onClick={() => {
                                                                                const confirmBox = window.confirm(
                                                                                    "Do you really want to delete Patient?"
                                                                                )
                                                                                if (confirmBox === true) {
                                                                                    this.DeleteItems(items.Patient_id)
                                                                                }
                                                                            }}><i className="fa fa-trash-o m-r-5"></i> Delete</button>

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
                        </div>
                        <div className="mb-3 row">
                            <div >&nbsp;<button className="btn btn-danger submit-btn">Obs</button>
                            </div>
                            <div >&nbsp;<button className="btn btn-danger submit-btn">Non Obs</button>
                            </div>
                            <div>&nbsp;<button className="btn btn-danger submit-btn" onClick={this.handleBillingBtnClick}>Billing</button>
                            </div>
                        </div>
                    </div>

                    <div className="sidebar-overlay" data-reff=""></div>
                </div>

            );
        }
    }
}
export default CustomerSearch;