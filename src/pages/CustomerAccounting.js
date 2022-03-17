import React, { useEffect, Component, useState } from "react";
import { Link } from "react-router-dom";
import Leftmenu from "./Navigation/Leftmenu";
import Header from "./Navigation/Header";
class CustomerAccounting extends Component {
  state = {
    response: '',
    post: '',
    responseToPost: '',
    counterValue: '',
    billDate:'',
    sCategory:'',
    selectServiceName: '',
    sCost: 0,
    discount: 0,
    discountReason: '',
    netAmount:0,
    paymentMode:'',
    paymentInfo:'',
    paidAmount:0,
    balance: 0,
    serviceName: [],
    list: [],
  };
  
  componentDidMount() {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    const customerIDString = sessionStorage.getItem('customerID');
    const customerID = parseInt(customerIDString);
    this.setState({ Token: userToken });
    this.setState({ customerID: customerID });
    this.handleBillId(customerID);
    //this.handleBillId();
  }

  //Bill id
  handleBillId = (customerID) => {
    const requestHeader = {
      "content-Type": "application/json",
      accessIDKey: this.state.Token
    };
    const requestOptions = {
      method: 'POST',
      headers: requestHeader,
      body: JSON.stringify({
        counterName: "billing",
        customerID: customerID
      })
    };
    fetch('http://localhost:3000/api/Utils/getCounterValue', requestOptions)
      .then(response => response.json())
      .then(data => this.setState({ counterValue: data.Items[0].counter_value }));
  };

  //bill date
  

  //Service Category
  handleServiceCategory = () => {
    const requestHeader = {
      "content-Type": "application/json",
      accessIDKey: this.state.Token
    };
    const requestOptions = {
      method: 'POST',
      headers: requestHeader,
      body: JSON.stringify({
        //serviceID: 2,
        customerID: this.state.customerID,
        serviceCategory: this.state.sCategory
      })
    };
    fetch('http://localhost:3000/api/Admin/getBillingMasterDataSCategory', requestOptions)
      .then(response => response.json())
      //.then(data => console.log(data));
      .then(data => this.setState({ serviceName: data.Items }));
     console.log(this.state.serviceName);
  }
  
  //Service Name
  handleServiceName = () => {
    const requestHeader = {
      "content-Type": "application/json",
      accessIDKey: this.state.Token
    };
    const requestOptions = {
      method: 'POST',
      headers: requestHeader,
      body: JSON.stringify({
        serviceID: 2,
        customerID: this.state.customerID,
        serviceCategory: this.state.sCategory,
        serviceName: this.state.selectServiceName
      })
    };
    fetch('http://localhost:3000/api/Admin/getBillingMasterDataSName', requestOptions)
      .then(response => response.json())
      .then(data => this.setState({ sCost: data.Items[0].serviceCost }));
  }
  
  //calculate discount
  handleDiscount = (e) => {
    let discount = e.target.value;
    this.setState({discount : discount})
    let temp = this.state.sCost - discount;
    //console.log(temp);
    //console.log(this.setState({netAmount: temp}));
    this.setState({netAmount: temp});
    this.setState({balance:temp});
  }
  
  //calculate Balance Amount
  handleBalance = (e) => {
    let paidAmount = e.target.value;
    this.setState({paidAmount:paidAmount})
    let temp1 = this.state.netAmount - paidAmount;
    this.setState({balance: temp1});
    // var temp1 = this.handleDiscount() - this.state.paidAmount;
    // return temp1;
  }
  
  //InsertIntoTable
  handleTable = (event) => {
    event.preventDefault();
    this.setState(state => {
      const val = {
        counterValue : this.state.counterValue,
        billDate : this.state.billDate,
        sCategory : this.state.sCategory,
        selectServiceName : this.state.selectServiceName,
        sCost : this.state.sCost,
        discount : this.state.discount,
        discountReason : this.state.discountReason,
        netAmount : this.state.netAmount,
        paymentMode : this.state.paymentMode,
        paymentInfo : this.state.paymentInfo,
        paidAmount : this.state.paidAmount,
        balance : this.state.balance
      }
      const list = [...state.list,val];
      return {
        list,
        counterValue: '',
        billDate: '',
        sCategory: '',
        selectServiceName: '',
        sCost: 0,
        discount: 0,
        discountReason: '',
        netAmount: 0,
        paymentMode: '',
        paymentInfo: '',
        paidAmount: 0,
        balance: 0
      };
    }); 
    this.handleBillId(this.state.customerID);
  };
  //call api from table
  changeHandler = (counterValue,billDate,sCategory,selectServiceName,sCost,discount,discountReason,netAmount,paymentMode,paymentInfo,paidAmount,balance) => {
    const requestHeader = {
      "content-Type": "application/json",
      accessIDKey: this.state.Token
    }; 
    const requestOption = {
         method: 'POST',
         headers: requestHeader,
         body: JSON.stringify({ 
         customerID : this.state.customerID,
         bill_id : counterValue,
         bill_date : billDate,
         service_category : sCategory,    
         service_name : selectServiceName,
         gross_amount : sCost,
         discount : discount,
         discount_reason : discountReason,
         net_amount : netAmount,
         payment_mode : paymentMode,
         payment_info : paymentInfo,
         paid_amount : paidAmount,
         balance : balance 
        }) 
       }
       fetch('http://localhost:3000/api/CustomerAccounting/postCustomerAccounting', requestOption)
       .then(response =>  console.log(response.status));       
   };

  onSubmitTable = (e) =>{
  e.preventDefault();
  for(var i=0; i < this.state.list.length; i++)
  {
     this.changeHandler(this.state.list[i].counterValue,this.state.list[i].billDate,this.state.list[i].sCategory,this.state.list[i].selectServiceName,this.state.list[i].sCost,this.state.list[i].discount,
     this.state.list[i].discountReason,this.state.list[i].netAmount,this.state.list[i].paymentMode,this.state.list[i].paymentInfo,this.state.list[i].paidAmount,this.state.list[i].balance)
  }
}

  //handle receipt_id
  handleReceiptId = () => {
    const requestHeader = {
      "content-Type": "application/json",
      accessIDKey: this.state.Token
    };
    const requestOptions = {
      method: 'POST',
      headers: requestHeader,
      body: JSON.stringify({
        counterName: "receipt",
        customerID: parseInt(this.state.customerID)
      })
    };
    fetch('http://localhost:3000/api/Utils/getCounterValue', requestOptions)
      .then(response => response.json())
      //.then(data=>console.log(data));
      .then(data => this.setState({ receiptID : data.Items[0].counter_value }));
  };

  //Cancel button
  handleCancel = () => {
    return {
      counterValue: '',
      billDate:'',
      sCategory:'',
      selectServiceName: '',
      sCost: 0,
      discount: 0,
      discountReason: '',
      netAmount:0,
      paymentMode:'',
      paymentInfo:'',
      paidAmount:0,
      balance: 0
  }
  }

  render() {
    return (
      <div className="main-wrapper">
        <Header />
        <Leftmenu />
        <div className="page-wrapper">
          <div className="content">
            <div className="upper">
              <form onSubmit={this.handleTable}>
                <div className="row">
                  <div className="col-lg-8 offset-lg-2"><br /><br />
                    <h4 className="page-title">Customer Accounting</h4>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-8 offset-lg-2">
                    <div className="mb-2 row">
                      <div className="col-sm-2">
                        <label>Bill ID<span className="text-danger">*</span></label>
                      </div>
                      <div className="col-sm-3">
                      <input type="number" className="form-control" id="countervalue" value={this.state.counterValue} onChange={e => this.setState({ counterValue: e.target.value })} required disabled/>
                        {/* {this.state.counterValue} */}</div>
                      <div className="col-sm-2"><label>Bill Date<span className="text-danger">*</span></label>
                      </div>
                      <div className="col-sm-3">
                        <input class="form-control" type="date" id="billdate" value={this.state.billDate} onChange={e => this.setState({ billDate: e.target.value })} required/>
                      </div>
                    </div>

                    <div class="mb-2 row">
                      <div class="col-sm-2">
                        <label>First Name<span className="text-danger">*</span></label>
                      </div>
                      <div class="col-sm-3">{this.props.firstName}</div>
                      <div class="col-sm-2">
                        <label>Last Name<span className="text-danger">*</span></label>
                      </div>
                      <div class="col-sm-3">{this.props.lastName}</div>
                    </div>

                    <div className="mb-2 row">
                      <div className="col-sm-2">
                        <label className="col-form-label">Service Category<span className="text-danger">*</span></label>
                      </div>
                      <div className="col-sm-3">
                        <select className="form-control" aria-label="Default select example" value={this.state.sCategory} onChange={(e) => this.setState({ sCategory: e.target.value }, this.handleServiceCategory)} required>
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
                        <label for="Service Name" className="col-form-label">Service Name<span className="text-danger">*</span></label>
                      </div>
                      <div className="col-sm-3">
                        <select className="form-control" aria-label="Default select example" value={this.state.selectServiceName} onChange={(e) => this.setState({ selectServiceName: e.target.value }, this.handleServiceName)} required>
                          <option>Select</option>
                          {
                            this.state.serviceName.map((item) => (
                              <option value={item.serviceName}>{item.serviceName}</option>
                            ))
                          }
                        </select>
                      </div>
                    </div>
                    <div className="md-2 row">
                      <div className="col-sm-2">
                        <label for="grossAmount" className="col-form-label">Gross Amount<span className="text-danger">*</span></label>
                      </div>
                      <div className="col-sm-3">
                        <input type="number" className="form-control" id="grossAmount" value={this.state.sCost} onChange={e => this.setState({ sCost: e.target.value })} required/>
                      </div>
                    </div><br/>
                    <div className="mb-2 row">
                      <div className="col-sm-2">
                        <label for="discount" className="col-form-label">Discount<span className="text-danger">*</span></label>
                      </div>
                      <div className="col-sm-3">
                        <input type="number" className="form-control" id="discount" value={this.state.discount} onChange={e => this.handleDiscount(e)} required/>
                      </div>
                      <div className="col-sm-2">
                        <label className="col-form-label">Discount Reason<span className="text-danger">*</span></label>
                      </div>
                      <div className="col-sm-3">
                        <select className="form-control" aria-label="Default select example" value={this.state.discountReason} onChange={e => this.setState({discountReason: e.target.value})} required>
                          <option>Select</option>
                          <option value="Relative">Relative</option>
                          <option value="Family Friend">Family Friend</option>
                          <option value="Permanent Patient">Permanent Patient</option>
                        </select>
                      </div>
                    </div>
                    <div className="mb-2 row">
                      <div className="col-sm-2">
                        <label for="netAmount" className="col-form-label">Net Amount<span className="text-danger">*</span></label>
                      </div>
                      <div className="col-sm-3">
                        {/* <input type="number" className="form-control" id="netAmount" value={this.state.netAmount && this.handleDiscount()} onChange={(e) => this.setState({netAmount: e.target.value})}/> */}
                        <input type="number" className="form-control" id="netAmount" value={this.state.netAmount} disabled required/>
                      </div>
                    </div>
                    <div className="mb-2 row">
                      <div className="col-sm-2">
                        <label className="col-form-label">Payment Mode<span className="text-danger">*</span></label>
                      </div>
                      <div className="col-sm-3">
                        <select className="form-control" aria-label="Default select example" id="paymentMode" value={this.state.paymentMode} onChange={e => this.setState({paymentMode: e.target.value })} required>
                          <option>Select</option>
                          <option value="UPI">UPI</option>
                          <option value="Internet Banking">Internet Banking</option>
                          <option value="Cash">Cash</option>
                          <option value="Debit Card">Debit Card</option>
                        </select>
                      </div>
                      <div className="col-sm-2">
                        <label for="paymentinfo" className="col-form-label">Payment Information<span className="text-danger">*</span></label>
                      </div>
                      <div className="col-sm-3">
                        <input type="text" className="form-control" id="paymentinfo" value={this.state.paymentInfo} onChange={e => this.setState({paymentInfo: e.target.value })} required/>
                      </div>
                    </div>
                    <div className="mb-2 row">
                      <div className="col-sm-2">
                        <label for="paidAmount" className="col-form-label">Paid Amount<span className="text-danger">*</span></label>
                      </div>
                      <div className="col-sm-3"><input type="number" className="form-control" id="paidAmount" value={this.state.paidAmount} onChange={e => this.handleBalance(e)} required/>
                      </div>
                      <div className="col-sm-2">
                        <label for="balance" className="col-form-label">Balance<span className="text-danger">*</span></label>
                      </div>
                      <div className="col-sm-3">
                      {/* <input type="number" className="form-control" id="balance" value={this.handleBalance()} onChange={e => this.setState({balance: e.target.value})} disabled/> */}
                        <input type="number" className="form-control" id="balance" value={this.state.balance} disabled required/>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mb-2 row">
                  <div className="m-t-20 text-center">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button className="btn btn-danger submit-btn" type="submit" >Add</button>&nbsp;&nbsp;
                    <button className="btn btn-danger submit-btn" type="submit" onClick={() => this.handleCancel()}>Cancel</button>
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

              {this.state.list.map((item,index=0) => (
                    <tbody key={index+1}>
                        <td>{item.counterValue}</td>
                        <td>{item.billDate}</td>
                        <td>{this.props.firstName}</td>
                        <td>{this.props.lastName}</td>
                        <td>{item.sCategory}</td>
                        <td>{item.selectServiceName}</td>
                        <td>{item.sCost}</td>
                        <td>{item.discount}</td>
                        <td>{item.discountReason}</td>
                        <td>{item.netAmount}</td>
                        <td>{item.paymentMode}</td>
                        <td>{item.paymentInfo}</td>
                        <td>{item.paidAmount}</td>
                        <td>{item.balance}</td>
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
                    ))}                 
            </table>
            <div className="mb-2 row" >
              <div className="m-t-20 text-center">
                <form onSubmit={this.onSubmitTable}>
                  <button type="submit" className="btn btn-danger submit-btn" onClick={this.handleReceiptId}>Submit</button>&nbsp;&nbsp;&nbsp;
                  <button type="submit" className="btn btn-danger submit-btn">Print</button>&nbsp;&nbsp;&nbsp;
                  <button className="btn btn-danger submit-btn">Cancel</button><br /><br /><br /></form>

                  <p>receipt id is :- {this.state.receiptID}</p>
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










