import React from 'react';
import CustomerInfo from './Doctor_Component/CustomerInfo';

function ObsAddCustomerVisit(){
    return(
        <div className="main-wrapper">
             <div className="page-wrapper">
        <div className="content">
        <h4 className="page-title">Obs Visit Details</h4>
        <CustomerInfo
                        patientID={this.props.patientID}
                        firstName={this.props.firstName}
                        lastName={this.props.lastName}
                        age={this.props.age}
                        lmp={this.props.lmp}
                        maritalStatus={this.props.maritalStatus}
                        />
        <div class="row">
                <div class="col-xl-4  col-sm-6 stretch-card grid-margin">
                    <div class="card">
                        <div class="card-body">
                            <img src="./assets/img/3rd-Trimester.jpg" width="80%"/>
                        </div>
                    </div>
                </div>
                <div class="col-xl-8  col-sm-6 stretch-card grid-margin">
                    <div class="card">
                        <div class="card-body">
                            <div class="mb-3 row">
                                <div class="col-sm-3">
                                    <label>weight <span class="text-danger"></span></label>
                                </div>
                                <div class="col-sm-2">
                                    <input class="form-control" type="text" value="72"/>
                                </div>
                                <div class="col-sm-2">
                                    <label>BP <span class="text-danger"></span></label>
                                </div>
                                <div class="col-sm-4">
                                    <input class="form-control" type="text" value="80/120"/>
                                </div>
                            </div>
                            <div class="mb-2 row filter-row">
                               
                                <div class="col-xl-3">
                                    <label>Family History (if any) </label>
                                </div>
                                <div class="col-xl-8">
                                    <textarea class="form-control" rows="1"></textarea>
                                </div>
                                <div class="col-xl-3">
                                    <label>Clinical remarks and observations </label>
                                </div>
                                <div class="col-xl-8">
                                    <textarea class="form-control" rows="1"></textarea>
                                </div>
                            </div>
                            <div class="mb-2 row filter-row">
                                <div class="col-xl-3">
                                    <label>Blood Test </label>
                                </div>
                                <div class="col-xl-8">
                                    <select class="form-control" aria-label="Default select example" multiple>
                                        <option>Select</option>
                                        <option value="1"selected>CBC</option>
                                        <option value="2" >Thyroid Function Test</option>
                                        <option value="3">Vitamin B12</option>
                                        <option value="4"selected>Double Marker</option>
                                        <option value="5">Triple Marker</option>
                                    </select>
                                </div>
                            </div>

                            <div class="mb-2 row filter-row">
                                <div class="col-xl-3">
                                    <label>USG </label>
                                </div>
                                <div class="col-xl-6">
                                    <select class="form-control" aria-label="Default select example">
                                        <option selected>Select</option>
                                        <option value="1">Early Pregnancy Trimester</option>
                                        <option value="2">NT Scan</option>
                                        <option value="3">Growth Scan</option>
                                        <option value="4" selected>Anomaly Scan</option>
                                        <option value="5">Cardiac Evaluation</option>
                                        <option value="6">Late Ops - 3rd Trimester</option>
                                    </select>
                                    <div>
                                        <input type="checkbox" id="Included" name="Include" value="Included"/>
                                        <label for="Include">Include USG and Blood Tests?</label>
                                      </div>
                                </div>
                            </div>
                            <div class="mb-2 row filter-row">
                                <div class="col-xl-3">
                                    <label>Diagnostic Center </label>
                                </div>
                                <div class="col-xl-8">
                                    <select class="form-control" aria-label="Default select example">
                                        <option>Diagnostic Center</option>
                                        <option value="1" selected>Acculab Diagnostics Centre, Sonography, Blood
                                            Testing,
                                            X-Ray
                                        </option>
                                        <option value="2">ABC Diagnostics and Pathology</option>
                                        <option value="3">Three</option>
                                    </select>
                                </div>

                            </div>
                            <div class="mb-2 row filter-row">
                                <div class="col-xl-3">
                                    <label>Referral Comment</label>
                                </div>
                                <div class="col-xl-8 col-md-3">
                                    <textarea class="form-control" rows="2"></textarea>
                                </div>
                            </div>
                            <div class="mb-2 row filter-row">
                                <div class="col-xl-3 col-md-2">
                                </div>
                                <div class="col-xl-2 col-md-2">
                                    <a href="#" class="btn btn-success btn-block"> Add</a>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mb-2 row">
                <div class="col-md-12">
                    <div class="table-responsive">
                        <table class="table table-border table-striped custom-table datatable mb-0">
                            <thead>
                            <tr>
                                <th>Prescription</th>
                                <th>Diagnostic Center</th>
                                <th class="text-right">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Thyroid Function Test</td>
                                <td>ABC Diagnostics and Pathology
                                </td>
                                <td class="text-right">
                                    <div class="dropdown dropdown-action">
                                        <a href="#" class="action-icon dropdown-toggle"
                                           data-toggle="dropdown"
                                           aria-expanded="false"><i
                                                class="fa fa-ellipsis-v"></i></a>
                                        <div class="dropdown-menu dropdown-menu-right">
                                            <a class="dropdown-item" href="edit-customer.html"><i
                                                    class="fa fa-pencil m-r-5"></i> Edit</a>
                                            <a class="dropdown-item" href="#" data-toggle="modal"
                                               data-target="#delete_patient"><i
                                                    class="fa fa-trash-o m-r-5"></i>
                                                Delete</a>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Anomaly, Double Marker</td>
                                <td>Acculab Diagnostics Centre, Sonography, Blood Testing, X-Ray
                                </td>
                                <td class="text-right">
                                    <div class="dropdown dropdown-action">
                                        <a href="#" class="action-icon dropdown-toggle"
                                           data-toggle="dropdown"
                                           aria-expanded="false"><i
                                                class="fa fa-ellipsis-v"></i></a>
                                        <div class="dropdown-menu dropdown-menu-right">
                                            <a class="dropdown-item" href="edit-customer.html"><i
                                                    class="fa fa-pencil m-r-5"></i> Edit</a>
                                            <a class="dropdown-item" href="#" data-toggle="modal"
                                               data-target="#delete_patient"><i
                                                    class="fa fa-trash-o m-r-5"></i>
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
            <div class="mb-2 row">
                <div class="col-xl-3 col-md-2">
                    <a href="#" class="btn btn-success btn-block"> Save</a>
                </div>
                <div class="col-xl-3 col-md-2">
                    <a href="#" class="btn btn-success btn-block"> Referral Letter</a>
                </div>
            </div>
        </div>
    </div>
        <CustomerInfo/>
        </div>
        )
}
export default ObsAddCustomerVisit;
