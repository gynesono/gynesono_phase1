import React, { useEffect, Component, useState } from "react";
import { Link } from "react-router-dom";
import Leftmenu from "./Navigation/Leftmenu";
import Header from "./Navigation/Header";
class CustomerAccounting extends Component {
  state = {
    response: '',
    post: '',
    responseToPost: '',
    customerID: '',
    selectServiceName: '',
    counterValue: '',
    sCost: 0,
    discount: 0,
    balance: 0,
    paidAmount:0,
    netAmount:0,
    serviceName: [],
  };
  componentDidMount() {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    const customerIDString = sessionStorage.getItem('customerID');
    const customerID = parseInt(customerIDString);
    this.setState({ Token: userToken });
    this.setState({ customerID: customerID });
    this.handleBillId(customerID);
  }
  //Bill id
  handleBillId = async (customerID) => {
    console.log(customerID);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        counterName: "billing",
        customerId: customerID
      })
    };
    fetch('http://localhost:3000/api/Utils/getCounterValue', requestOptions)
      .then(response => response.json())
      .then(data => this.setState({ counterValue: data.Items[0].counter_value }));
  };

  
  handleServiceCategory = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        serviceID: 2,
        customerID: this.state.customerID,
        serviceCategory: this.state.sCategory
      })
    };
    fetch('http://localhost:3000/api/Billing/getBillingMasterData', requestOptions)
      .then(response => response.json())
      //.then(data => console.log(data));
      .then(data => this.setState({ serviceName: data.Items }));
    console.log(this.state.serviceName);
  }
  //Service Name
  handleServiceName = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        serviceID: 2,
        customerID: this.state.customerID,
        serviceCategory: this.state.sCategory,
        serviceName: this.state.selectServiceName
      })
    };
    fetch('http://localhost:3000/api/Billing/getBillingMasterDataSName', requestOptions)
      .then(response => response.json())
      .then(data => this.setState({ sCost: data.Items[0].service_cost }));
  }
  //calculate discount
  handleDiscount = () => {
    var temp = this.state.sCost - this.state.discount;
    return temp;
  }
  //calculate Balance Amount
  handleBalance = () => {
    var temp1 = this.handleDiscount() - this.state.paidAmount;
    return temp1;
  }
  render() {
    return (
      <div className="main-wrapper">
        <Header />
        <Leftmenu />
        <div className="page-wrapper">
          <div className="content">
            <div className="upper">
              <form onSubmit={this.handleBillId}>
                <div className="row">
                  <div className="col-lg-8 offset-lg-2"><br /><br />
                    <h4 className="page-title">Customer Accounting</h4>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-8 offset-lg-2">
                    <div className="mb-2 row">
                      <div className="col-sm-2">
                        <label>Bill ID </label>
                      </div>
                      <div className="col-sm-3">{this.state.counterValue}</div>
                      <div className="col-sm-2"><label>Bill Date </label>
                      </div>
                      <div className="col-sm-3">
                        <input class="form-control" type="date" />
                      </div>
                    </div>

                    <div class="mb-2 row">
                      <div class="col-sm-2">
                        <label>First Name </label>
                      </div>
                      <div class="col-sm-3">Avani</div>
                      <div class="col-sm-2">
                        <label>Last Name</label>
                      </div>
                      <div class="col-sm-3">Singh</div>
                    </div>

                    <div className="mb-2 row">
                      <div className="col-sm-2">
                        <label className="col-form-label">Service Category</label>
                      </div>
                      <div className="col-sm-3">
                        <select className="form-control" aria-label="Default select example" value={this.state.value} onChange={(e) => this.setState({ sCategory: e.target.value }, this.handleServiceCategory)}>
                          <option>Select Service Category</option>
                          <option value="Bloodtest">Bloodtest</option>
                          <option value="Sonography">Sonography</option>
                          <option value="xray">X-ray</option>
                          <option value="OPD">OPD</option>
                          <option value="MRI">MRI</option>
                          <option value="CTSCAN">CTSCAN</option>
                          <option value="FitstVisit">First Visit</option>
                          <option value="SecondVisit">Second Visit</option>
                        </select>
                      </div>
                      <div className="col-sm-2">
                        <label for="Service Name" className="col-form-label">Service Name</label>
                      </div>
                      <div className="col-sm-3">
                        <select className="form-control" aria-label="Default select example" value={this.state.value} onChange={(e) => this.setState({ selectServiceName: e.target.value }, this.handleServiceName)}>
                          <option>Select</option>
                          {
                            this.state.serviceName.map((item) => (
                              <option value={item.serviceName}>{item.service_name}</option>
                            ))
                          }
                        </select>
                      </div>
                    </div>
                    <div className="md-2 row">
                      <div className="col-sm-2">
                        <label for="grossAmount" className="col-form-label">Gross Amount</label>
                      </div>
                      <div className="col-sm-3">
                        <input type="number" className="form-control" id="grossAmount" value={this.state.sCost} onChange={e => this.setState({ sCost: e.target.value })} />
                      </div>
                    </div><br />

                    <div className="mb-2 row">
                      <div className="col-sm-2">
                        <label for="discount" className="col-form-label">Discount</label>
                      </div>
                      <div className="col-sm-3">
                        <input type="number" className="form-control" id="discount" value={this.state.discount} onChange={e => this.setState({ discount: e.target.value })} />
                      </div>
                      <div className="col-sm-2">
                        <label className="col-form-label">Discount Reason</label>
                      </div>
                      <div className="col-sm-3">
                        <select className="form-control" aria-label="Default select example">
                          <option>Select</option>
                          <option value="Relative">Relative</option>
                          <option value="Family Friend">Family Friend</option>
                          <option value="Permanent Patient">Permanent Patient</option>
                        </select>
                      </div>
                    </div>
                    <div className="mb-2 row">
                      <div className="col-sm-2">
                        <label for="netAmount" className="col-form-label">Net Amount</label>
                      </div>
                      <div className="col-sm-3">
                        <input type="number" className="form-control" id="netAmount" value={(this.state.sCost && this.state.discount) ? this.handleDiscount() : 0 } onChange={(e) => this.setState({netAmount: e.target.value })}/>
                      </div>
                    </div>
                    <div className="mb-2 row">
                      <div className="col-sm-2">
                        <label className="col-form-label">Payment Mode</label>
                      </div>
                      <div className="col-sm-3">
                        <select className="form-control" aria-label="Default select example" >
                          <option>Select</option>
                          <option value="UPI">UPI</option>
                          <option value="Internet Banking">Internet Banking</option>
                          <option value="Cash">Cash</option>
                          <option value="Debit Card">Debit Card</option>
                        </select>
                      </div>
                      <div className="col-sm-2">
                        <label for="paymentinfo" className="col-form-label">Payment Information</label>
                      </div>
                      <div className="col-sm-3">
                        <input type="text" className="form-control" id="paymentinfo" />
                      </div>
                    </div>
                    <div className="mb-2 row">
                      <div className="col-sm-2">
                        <label for="paidAmount" className="col-form-label">Paid Amount</label>
                      </div>
                      <div className="col-sm-3"><input type="number" className="form-control" id="paidAmount" value={this.state.paidAmount} onChange={e => this.setState({paidAmount: e.target.value})}/>
                      </div>
                      <div className="col-sm-2">
                        <label for="balance" className="col-form-label">Balance</label>
                      </div>
                      <div className="col-sm-3">
                        <input type="number" className="form-control" id="balance" value={this.handleBalance()} disabled/>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mb-2 row">
                  <div className="m-t-20 text-center">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button className="btn btn-danger submit-btn" type="submit">Add</button>&nbsp;&nbsp;&nbsp;
                    <button className="btn btn-danger submit-btn">Cancel</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div>
            <table className="table table-border table-striped">
              <thead>
                <tr>
                  <th className="ant-table-cell">Bill Id</th>
                  <th className="ant-table-cell">Bill Date</th>
                  <th className="ant-table-cell">First Name</th>
                  <th className="ant-table-cell">Last Name</th>
                  <th className="ant-table-cell">Service Category</th>
                  <th className="ant-table-cell">Service Name</th>
                  <th className="ant-table-cell">Gross Amount</th>
                  <th className="ant-table-cell">Discount </th>
                  <th className="ant-table-cell">Discount Reason</th>
                  <th className="ant-table-cell">Net Amount</th>
                  <th className="ant-table-cell">Payment Mode</th>
                  <th className="ant-table-cell">Payment Info</th>
                  <th className="ant-table-cell">Paid Amount</th>
                  <th className="ant-table-cell">Balance</th>
                  <th className="ant-table-cell">Action</th>
                </tr>
              </thead>
              {/* {displayTable.map((a) => (
                    <tbody>
                        <td>{a.counterValue}</td>
                        <td>{a.date}</td>
                        <td>Avani</td>
                        <td>Singh</td>
                        <td>{a.serviceCategory}</td>
                        <td>{a.serviceName}</td>
                        <td>{a.grossamount}</td>
                        <td>{a.discount}</td>
                        <td>{a.discountreason}</td>
                        <td>{a.netamount}</td>
                        <td>{a.paymentmode}</td>
                        <td>{a.paymentInfo}</td>
                        <td>{a.paidamount}</td>
                        <td>{a.balance}</td>
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
                    ))}                  */}
            </table>
            <div className="mb-2 row" >
              <div className="m-t-20 text-center">
                <form>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <button type="submit" className="btn btn-danger submit-btn">Save</button>&nbsp;&nbsp;&nbsp;
                  <button type="submit" className="btn btn-danger submit-btn">Print</button>&nbsp;&nbsp;&nbsp;
                  <button className="btn btn-danger submit-btn">Cancel</button><br /><br /><br /></form>
              </div>
            </div>
          </div>
        </div>
        <div className="sidebar-overlay" data-reff=""></div>
      </div>
    )
  }
}
export default CustomerAccounting;