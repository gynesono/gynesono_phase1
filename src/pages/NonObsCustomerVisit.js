import React, { Component } from 'react';
import Header from './Navigation/Header';
import Leftmenu from './Navigation/Leftmenu';
import { Link } from 'react-router-dom';
import NonObsAddCustomerVisit from './NonObsAddCustomerVisit';
import CustomerInfo from './Doctor_Component/CustomerInfo';
class NonObsCustomerVisit extends Component {

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
                customerID: customerID
            }),
        });
        console.log("Patient ID : " + this.state.patient_id ); 
        const body = await response.json();

        this.setState({ responseToPost: body.Items });

        console.log(this.state.responseToPost);
    };
    handleAddVisit = () => {
        this.setState({IsAddVisit:true});
    }

    render() {
        if(this.state.IsAddVisit){return(<div><NonObsAddCustomerVisit 
            firstName={this.props.firstName} 
            lastName={this.props.lastName} 
            age={this.props.age} 
            lmp={this.props.lmp}
            maritalStatus={this.props.maritalStatus}
            patientID={this.props.patientID}
            />
           
            </div>);}
        return (

            <div class="main-wrapper">
                <div class="page-wrapper">
                    <div class="content">
                        <Header /><Leftmenu /><CustomerInfo
                        patientID={this.props.patientID}
                        firstName={this.props.firstName}
                        lastName={this.props.lastName}
                        age={this.props.age}
                        lmp={this.props.lmp}
                        maritalStatus={this.props.maritalStatus}
                        />
                        
                        <div class="col-xl-12 col-md-12 col-sm-6 stretch-card grid-margin">
                            <div class="card">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-sm-4 col-3">
                                            <h4 class="page-title">Customer Visits</h4>
                                        </div>
                                        <div class="col-sm-8 col-9 text-right m-b-20">
                                            <button onClick={this.handleAddVisit}
                                                class="btn btn btn-primary float-right"><i
                                                    class="fa fa-plus"></i> Add Visit</button>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="table-responsive">
                                                <table class="table table-border table-striped custom-table datatable mb-0">
                                                    <thead>
                                                        <tr>
                                                            <th>Visit No.</th>
                                                            <th>Visit Date</th>
                                                            <th>BP</th>
                                                            <th>Wt</th>
                                                            <th>Remark</th>
                                                            <th class="text-right">Action</th>
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

                        <div class="mb-2 row text-right">
                            <div class="col-xl-2">&nbsp;<a href="customer-accounting.html" class="btn btn-primary submit-btn">Billing</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )


    }
}
export default NonObsCustomerVisit;