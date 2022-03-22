import React from 'react';
import CustomerInfo from "./Doctor_Component/CustomerInfo";

function ObsCustomerService() {
    return (
        <div className="main-wrapper">

            <div className="page-wrapper">
                <div className="content">

                    <CustomerInfo />
                    <div className="col-xl-12 stretch-card grid-margin">
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex justify-content-between flex-wrap">
                                    <div>
                                        <div><h4 className="page-title">Customer Service History</h4></div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="table-responsive">
                                            <table className="table table-border table-striped custom-table datatable mb-0">
                                                <thead>
                                                    <tr>
                                                        <th>USG type</th>
                                                        <th>Date</th>
                                                        <th>DC</th>
                                                        <th>USG Report</th>
                                                        <th>Blood Report</th>
                                                        <th className="text-right">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>1St Trimester</td>
                                                        <td>01/06/2021</td>
                                                        <td>Acculab</td>
                                                        <td>
                                                            <a href="./reports/ultrasound-summary.jpg" target="_blank"
                                                                className="btn btn btn-primary"><i
                                                                    className="fa fa-download"></i> Summary Report</a>&nbsp;&nbsp;&nbsp;&nbsp;
                                                            <a href="./reports/ultrasound-scan.jpg" target="_blank"
                                                                className="btn btn btn-primary"><i
                                                                    className="fa fa-download"></i> Scan</a>
                                                        </td>
                                                        <td>Not Available</td>
                                                        <td className="text-right">
                                                            <div className="dropdown dropdown-action">
                                                                <a href="#" className="action-icon dropdown-toggle"
                                                                    data-toggle="dropdown"
                                                                    aria-expanded="false"><i className="fa fa-ellipsis-v"></i></a>
                                                                <div className="dropdown-menu dropdown-menu-right">
                                                                    <a className="dropdown-item" href="#"><i
                                                                        className="fa fa-pencil m-r-5"></i> Edit</a>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>2nd Trimester</td>
                                                        <td>01/08/2021</td>
                                                        <td>AB Diagnostics</td>
                                                        <td>Not Available</td>
                                                        <td>Not Available</td>
                                                        <td className="text-right">
                                                            <div className="dropdown dropdown-action">
                                                                <a href="#" className="action-icon dropdown-toggle"
                                                                    data-toggle="dropdown"
                                                                    aria-expanded="false"><i className="fa fa-ellipsis-v"></i></a>
                                                                <div className="dropdown-menu dropdown-menu-right">
                                                                    <a className="dropdown-item" href="#"><i
                                                                        className="fa fa-pencil m-r-5"></i> Edit</a>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                            </div>
                            </div>
                            </div>
                            </div>
                    )
}
                    export default ObsCustomerService;