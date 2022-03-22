import React from "react";

function NonObsVisitHistory(){

    return(
        
        <div className="page-wrapper">
            
        <div className="content"><div className="main-wrapper">
        <div className="col-xl-12 col-md-12 col-sm-6 stretch-card grid-margin">
        <div className="card">
            <div className="card-body">
                <div className="row">
                    <div className="col-sm-4 col-3">
                        <h4 className="page-title">Customer Visits</h4>
                    </div>
                    <div className="col-sm-8 col-9 text-right m-b-20">
                        <button
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
                                <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>01/10/2021</td>
                                    <td>80/120</td>
                                    <td>55</td>
                                    <td>Initial Visit</td>
                                    <td className="text-right">
                                        <div className="dropdown dropdown-action">
                                            <a href="#" className="action-icon dropdown-toggle"
                                               data-toggle="dropdown"
                                               aria-expanded="false"><i className="fa fa-ellipsis-v"></i></a>
                                            <div className="dropdown-menu dropdown-menu-right">
                                                <a className="dropdown-item" href="edit-customer.html"><i
                                                        className="fa fa-pencil m-r-5"></i> Edit</a>
                                                <a className="dropdown-item" href="#" data-toggle="modal"
                                                   data-target="#delete_patient"><i
                                                        className="fa fa-trash-o m-r-5"></i>
                                                    Delete</a>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>05/12/2021</td>
                                    <td>80/120</td>
                                    <td>55</td>
                                    <td>Second Visit</td>
                                    <td className="text-right">
                                        <div className="dropdown dropdown-action">
                                            <a href="#" className="action-icon dropdown-toggle"
                                               data-toggle="dropdown"
                                               aria-expanded="false"><i className="fa fa-ellipsis-v"></i></a>
                                            <div className="dropdown-menu dropdown-menu-right">
                                                <a className="dropdown-item" href="edit-customer.html"><i
                                                        className="fa fa-pencil m-r-5"></i> Edit</a>
                                                <a className="dropdown-item" href="#" data-toggle="modal"
                                                   data-target="#delete_patient"><i
                                                        className="fa fa-trash-o m-r-5"></i>
                                                    Delete</a>
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
    );
}
export default NonObsVisitHistory;