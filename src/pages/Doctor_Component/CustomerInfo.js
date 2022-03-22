import React from "react";
//import { Link } from 'react-router-dom';

//function CustomerInfo(props) {
 class CustomerInfo extends React.Component {
    render() { 
        return (

            <div className="col-xl-6 col-md-12 col-sm-12 stretch-card grid-margin">
                <div className="card">
                    <div className="card-body">
                        <div className="mb-2  row">
                            <div className="col-sm-4 col-3">
                                <h4 className="page-title">Customer Info</h4>
                            </div>
                        </div>

                        <div className="mb-2 row">
                            <div className="col-lg-12">
                            <div className="mb-2 row">
                                   {/* <div className="col-sm-4">
                                        <label>Patient ID</label>
                                    </div>
                                     <div className="col-sm-4">
                                       
                                        {this.props.patientID} 
                                    </div> */}

                                </div>
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
                               {/*  <div className="md-2 row">
                                    <div className="col-sm-4">
                                        <label className="gen-label">Pregnancy Stage</label>
                                    </div>
                                    <div className="col-sm-4">3rd Trimester
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default CustomerInfo;