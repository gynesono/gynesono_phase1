import React from 'react';
import {Link} from 'react-router-dom'; 
import Leftmenu from "./Navigation/Leftmenu";
import Header from "./Navigation/Header";
function ReportPaymentsByCustomers(){
    return(
      
<div className="main-wrapper">
    <div className="page-wrapper">
        <div className="content">
            <div className="row">
                <Header/>
                <Leftmenu/>

                <div className="col-sm-4 col-3">
                    <h4 className="page-title">Customers</h4>
                </div>
            </div>

            <div className="row filter-row">
                <div className="col-sm-1">
                    <label>From</label>
                </div>
                <div className="col-sm-2">
                    <input className="form-control" type="text" value="15/01/2022" />
                </div>
                <div className="col-sm-1">
                    <label>To</label>
                </div>
                <div className="col-sm-2">
                    <input className="form-control" type="text" value="15/01/2022" />
                </div>
                <div className="col-sm-1">
                    <label>Status</label>
                </div>
                <div className="col-sm-2">
                    <select className="form-control" aria-label="Default select example">
                        <option>Select</option>
                        <option value="1">Paid</option>
                        <option value="2" selected>Partially Paid</option>
                        <option value="3">SPending</option>
                    </select>
                </div>
                <div className="col-sm-1 col-md-2">
                    <a href="#" className="btn btn-success btn-block"> Search </a>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <div className="table-responsive">
                        <table id="myTable" className="table table-border table-striped custom-table datatable mb-0">
                            <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Visit Date</th>
                                <th>Customer Name</th>
                                <th>Gross Amount
                                    <span className="text-primary">24,000</span>
                                </th>
                                <th>Discount
                                    <span className="text-warning">1,000</span>
                                </th>
                                <th>Net Amount
                                    <span className="text-info">23,000</span>
                                </th>
                                <th>Rec Amount
                                    <span className="text-success">19,000</span>
                                </th>
                                <th>Balance Amount
                                    <span className="text-danger">3,000</span></th>
                                <th className="text-right">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>34545757</td>
                                <td>15/01/2022</td>
                                <td>Rucha Agrwal</td>
                                <td>1,000</td>
                                <td>0</td>
                                <td>1,000</td>
                                <td>1,000</td>
                                <td>0</td>
                                <td className="text-right">
                                <Link to='/customerAccounting'
                                       className="btn btn btn-primary float-right"><i
                                            className="fa fa-edit"></i> View</Link>
                                </td>
                            </tr>
                            <tr>
                                <td>5686888</td>
                                <td>15/01/2022</td>
                                <td>Tina Verma</td>
                                <td>1,000</td>
                                <td>0</td>
                                <td>1,000</td>
                                <td>1,000</td>
                                <td>0</td>
                                <td className="text-right">
                                <Link to='/customerAccounting'
                                       className="btn btn btn-primary float-right"><i
                                            className="fa fa-edit"></i> View</Link>
                                </td>
                            </tr>
                            <tr>
                                <td>899799</td>
                                <td>15/01/2022</td>
                                <td>Rohini Singh</td>
                                <td>1,000</td>
                                <td>0</td>
                                <td>1,000</td>
                                <td>1,000</td>
                                <td>0</td>
                                <td className="text-right">
                                <Link to='/customerAccounting'
                                       className="btn btn btn-primary float-right"><i
                                            className="fa fa-edit"></i> View</Link>
                                </td>
                            </tr>
                            <tr>
                                <td>365685</td>
                                <td>15/01/2022</td>
                                <td>Usha Patil</td>
                                <td>1,000</td>
                                <td>0</td>
                                <td>1,000</td>
                                <td>1,000</td>
                                <td>0</td>
                                <td className="text-right">
                                <Link to='/customerAccounting'
                                       className="btn btn btn-primary float-right"><i
                                            className="fa fa-edit"></i> View</Link>
                                </td>
                            </tr>
                            <tr>
                                <td>089797</td>
                                <td>15/01/2022</td>
                                <td>Priyanka Rane</td>
                                <td>1,000</td>
                                <td>0</td>
                                <td>1,000</td>
                                <td>0</td>
                                <td><span className="text-danger">1,000</span></td>
                                <td className="text-right">
                                <Link to='/customerAccounting'
                                       className="btn btn btn-primary float-right"><i
                                            className="fa fa-edit"></i> View</Link>
                                </td>
                            </tr>
                            <tr>
                                <td>5685687</td>
                                <td>15/01/2022</td>
                                <td>Komal Pawar</td>
                                <td>1,000</td>
                                <td>0</td>
                                <td>1,000</td>
                                <td>1,000</td>
                                <td>0</td>
                                <td className="text-right">
                                <Link to='/customerAccounting'
                                       className="btn btn btn-primary float-right"><i
                                            className="fa fa-edit"></i> View</Link>
                                </td>
                            </tr>
                            <tr>
                                <td>5686786</td>
                                <td>15/01/2022</td>
                                <td>Radhika Sen</td>
                                <td>1,000</td>
                                <td>0</td>
                                <td>1,000</td>
                                <td>1,000</td>
                                <td>0</td>
                                <td className="text-right">
                                <Link to='/customerAccounting'
                                       className="btn btn btn-primary float-right"><i
                                            className="fa fa-edit"></i> View</Link>
                                </td>
                            </tr>
                            <tr>
                                <td>6868867</td>
                                <td>15/01/2022</td>
                                <td>Shital Pawar</td>
                                <td>1,000</td>
                                <td>0</td>
                                <td>1,000</td>
                                <td>1,000</td>
                                <td>0</td>
                                <td className="text-right">
                                <Link to='/customerAccounting'
                                       className="btn btn btn-primary float-right"><i
                                            className="fa fa-edit"></i> View</Link>
                                </td>
                            </tr>
                            <tr>
                                <td>8978978</td>
                                <td>15/01/2022</td>
                                <td>Rani Lagate</td>
                                <td>1,000</td>
                                <td>0</td>
                                <td>1,000</td>
                                <td>1,000</td>
                                <td>0</td>
                                <td className="text-right">
                                <Link to='/customerAccounting'
                                       className="btn btn btn-primary float-right"><i
                                            className="fa fa-edit"></i> View</Link>
                                </td>
                            </tr>
                            <tr>
                                <td>456678</td>
                                <td>15/01/2022</td>
                                <td>Ankia Shirke</td>
                                <td>1,000</td>
                                <td>0</td>
                                <td>1,000</td>
                                <td>1,000</td>
                                <td>0</td>
                                <td className="text-right">
                                <Link to='/customerAccounting'
                                       className="btn btn btn-primary float-right"><i
                                            className="fa fa-edit"></i> View</Link>
                                </td>
                            </tr>
                            <tr>
                                <td>678678</td>
                                <td>15/01/2022</td>
                                <td>Aishwarya Sign</td>
                                <td>1,000</td>
                                <td>0</td>
                                <td>1,000</td>
                                <td>1,000</td>
                                <td>0</td>
                                <td className="text-right">
                                <Link to='/customerAccounting'
                                       className="btn btn btn-primary float-right"><i
                                            className="fa fa-edit"></i> View</Link>
                                </td>
                            </tr>
                            <tr>
                                <td>5756757</td>
                                <td>15/01/2022</td>
                                <td>Aavani Khan</td>
                                <td>1,000</td>
                                <td>0</td>
                                <td>1,000</td>
                                <td>1,000</td>
                                <td>0</td>
                                <td className="text-right">
                                <Link to='/customerAccounting'
                                       className="btn btn btn-primary float-right"><i
                                            className="fa fa-edit"></i> View</Link>
                                </td>
                            </tr>
                            <tr>
                                <td>345345</td>
                                <td>15/01/2022</td>
                                <td>Madhuri Kalate</td>
                                <td>1,000</td>
                                <td>20%</td>
                                <td>800</td>
                                <td>800</td>
                                <td>0</td>
                                <td className="text-right">
                                <Link to='/customerAccounting'
                                       className="btn btn btn-primary float-right"><i
                                            className="fa fa-edit"></i> View</Link>
                                </td>
                            </tr>
                            <tr>
                                <td>355345</td>
                                <td>15/01/2022</td>
                                <td>Deepali Wakadkar</td>
                                <td>1,000</td>
                                <td>0</td>
                                <td>1,000</td>
                                <td>0</td>
                                <td><span className="text-danger">800</span></td>
                                <td className="text-right">
                                <Link to='/customerAccounting'
                                       className="btn btn btn-primary float-right"><i
                                            className="fa fa-edit"></i> View</Link>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <div className="sidebar-overlay" data-reff=""></div>
    </div>
    );
}
export default ReportPaymentsByCustomers;