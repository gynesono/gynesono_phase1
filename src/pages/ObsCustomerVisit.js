import React, { Component } from 'react';
import Header from './Navigation/Header';
import Leftmenu from './Navigation/Leftmenu';
import { Link } from 'react-router-dom';
import ObsAddCustomerVisit from './ObsAddCustomerVisit';
import CustomerInfo from './Doctor_Component/CustomerInfo';

class ObsCustomerVisit extends Component {

    state = {
        response: '',
        post: '',
        responseToPost: '',
        IsAddVisit: '',
    };

    componentDidMount() {
        this.setState({patient_id:this.props.patientID});
        this.setState({firstName: this.props.firstName});
        this.setState({lastName:this.props.lastName});
        this.setState({lmp:this.props.lmp});
        this.setState({maritalStatus:this.props.maritalStatus});
        this.setState({age:this.props.age});
        const nameString = sessionStorage.getItem("customerID");
        const customerID = JSON.parse(nameString);
        this.setState({ customerID: customerID });
        
        this.handleOnload(customerID);
    }

    handleOnload = async (customerID) => {

        const response = await fetch("http://localhost:3000/api/Doctor/getPatientVisitDetails", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                patient_id: this.props.patientID,
                customerID: parseInt(customerID)
            }),
        });

        const body = await response.json();

        this.setState({ responseToPost: body.Items });

        console.log(this.state.responseToPost);
    };

    handleAddVisit = () => {
        window.alert("Add Obs Visit");
        this.setState({IsAddVisit:true});
    }

    render() {
        if(this.state.IsAddVisit){return(<div><ObsAddCustomerVisit 
            firstName={this.props.firstName} 
            lastName={this.props.lastName} 
            age={this.props.age} 
            lmp={this.props.lmp}
            maritalStatus={this.props.maritalStatus}
            patientID={this.props.patientID}
            />
           
            </div>);}else{
        return (

            <div className="main-wrapper">
                <div className="page-wrapper">
                    <div className="content">

                        <Header /><Leftmenu />
                        <h4 className="page-title">Obs Visit Details</h4>
                        <CustomerInfo
                        patientID={this.props.patientID}
                        firstName={this.props.firstName}
                        lastName={this.props.lastName}
                        age={this.props.age}
                        lmp={this.props.lmp}
                        maritalStatus={this.props.maritalStatus}
                        />
                        
                        

                        <div className="col-xl-12 col-md-12 col-sm-6 stretch-card grid-margin">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-4 col-3">
                                            <h4 className="page-title">Customer Visits</h4>
                                        </div>
                                        <div className="col-sm-8 col-9 text-right m-b-20">
                                            <button onClick={this.handleAddVisit}
                                                className="btn btn btn-primary float-right"><i
                                                    className="fa fa-plus"></i> Add Visit</button>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="table-responsive">
                                                <table className="table table-border table-striped custom-table datatable mb-0">
                                                    <thead>
                                                        <tr>
                                                            <th>Visit No.</th>
                                                            <th>Visit Date</th>
                                                            <th>BP</th>
                                                            <th>Wt</th>
                                                            <th>Remark</th>
                                                            <th className="text-right">Action</th>
                                                        </tr>
                                                    </thead>
                                                    {this.state.responseToPost.length > 0 && (
                                <tbody>
                                {this.state.responseToPost.map((items) => (

                                   
                                <tr key={items.visit_id}>
                                    <td>{items.visit_id}</td>
                                <td>{items.visit_date}</td>
                                
                                <td>{items.clinical_Remarks.bp}</td>
                                <td>{items.clinical_Remarks.weight}</td>
                                <td>{items.clinical_Remarks.clinical_Remarks}</td>
                                
                                    <td className="text-right">
                                        <div className="dropdown dropdown-action">
                                            <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown"
                                               aria-expanded="false"><i className="fa fa-ellipsis-v"></i></a>
                                            <div className="dropdown-menu dropdown-menu-right">
                                            <Link to={""} className="dropdown-item" href="#"><i
                                                        className="fa fa-pencil m-r-5"></i> Edit</Link>
                                                <a className="dropdown-item" href="#" data-toggle="modal"
                                                   data-target="#delete_patient"><i className="fa fa-trash-o m-r-5"></i>
                                                    Delete</a>
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
                            </div>
                        </div>

                        <div className="mb-2 row text-right">
                            <div className="col-xl-2">&nbsp;<a href="customer-accounting.html" className="btn btn-primary submit-btn">Billing</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
                                }

    }
}
export default ObsCustomerVisit;