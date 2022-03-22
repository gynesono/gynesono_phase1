import React from 'react';
import CustomerInfo from './Doctor_Component/CustomerInfo';
import Header from './Navigation/Header';
import Leftmenu from './Navigation/Leftmenu';

function NonObsCustomerService() {
    return (
        <div class="main-wrapper">
           

<div className="page-wrapper">
    <div className="content">
       <Header/><Leftmenu/> 
    <CustomerInfo/>
    <div class="col-xl-12 stretch-card grid-margin">
                <div class="card">
                    <div class="card-body">
                        <div class="d-flex justify-content-between flex-wrap">
                            <div>
                                <div><h4 class="page-title">Customer Service History</h4></div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="table-responsive">
                                    <table class="table table-border table-striped custom-table datatable mb-0">
                                        <thead>
                                        <tr>
                                            <th>USG type</th>
                                            <th>Date</th>
                                            <th>DC</th>
                                            <th>USG Report</th>
                                            <th>Blood Report</th>
                                            <th class="text-right">Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>1St Trimester</td>
                                            <td>01/06/2021</td>
                                            <td>Acculab</td>
                                            <td>
                                                <a href="#" target="_blank"
                                                   class="btn btn btn-primary"><i
                                                        class="fa fa-download"></i> Summary Report</a>&nbsp;&nbsp;&nbsp;&nbsp;
                                                <a href="#" target="_blank"
                                                   class="btn btn btn-primary"><i
                                                        class="fa fa-download"></i> Scan</a>
                                            </td>
                                            <td>Not Available</td>
                                            <td class="text-right">
                                                <div class="dropdown dropdown-action">
                                                    <a href="#" class="action-icon dropdown-toggle"
                                                       data-toggle="dropdown"
                                                       aria-expanded="false"><i class="fa fa-ellipsis-v"></i></a>
                                                    <div class="dropdown-menu dropdown-menu-right">
                                                        <a class="dropdown-item" href="#"><i
                                                                class="fa fa-pencil m-r-5"></i> Edit</a>
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
                                            <td class="text-right">
                                                <div class="dropdown dropdown-action">
                                                    <a href="#" class="action-icon dropdown-toggle"
                                                       data-toggle="dropdown"
                                                       aria-expanded="false"><i class="fa fa-ellipsis-v"></i></a>
                                                    <div class="dropdown-menu dropdown-menu-right">
                                                        <a class="dropdown-item" href="#"><i
                                                                class="fa fa-pencil m-r-5"></i> Edit</a>
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
export default NonObsCustomerService;