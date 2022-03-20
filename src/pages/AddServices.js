import Leftmenu from './Navigation/Leftmenu';
import Header from './Navigation/Header';
import React, { Component } from "react";
import PrintServices from './PrintServices';
import DeleteServices from "./DeleteServices";
class AddServices extends Component {
    state = {
        response: '',
        post: '',
        responseToPost: '',
        responseToPostt: '',
        Isprint: true,
        open: true,
    };

    componentDidMount() {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        const customerIDString = sessionStorage.getItem('customerID');
        const customerID = parseInt(customerIDString);
        this.setState({ Token: userToken });
        this.setState({ customerID: customerID });
        this.handleOnload(customerID);
    }

    handleOnload =  async (customerID)  => {
        
        const requestHeader = {
            "content-Type": "application/json",
            accessIDKey: this.state.Token
        };
        
        const response = await fetch('https://xl73257esa.execute-api.us-east-1.amazonaws.com/preprod/getservicesmasterdata', {
        //const response = await fetch('http://localhost:3000/api/Admin/getBillingMasterData', {
            method: 'POST',
            headers: requestHeader,
            body: JSON.stringify({
                customerID: customerID
            }),
        });
    

        const body = await response.json();
        this.setState({ responseToPost: body.Items });
    }
  

    handleDate = (str) => {

        const m = str.split("-");
        let str_date = m[2] + "/" + m[1] + "/" + m[0];
        this.setState({ datee: str_date })

    }
    handleEdit = async (key) => {
        const requestHeader = {
            "content-Type": "application/json",
            accessIDKey: this.state.Token
        };
        
        const response = await fetch('https://xl73257esa.execute-api.us-east-1.amazonaws.com/preprod/getservicemasterdatabyid', {
        //const response = await fetch('http://localhost:3000/api/Admin/getBillingMasterDataById', {

            method: 'POST',
            headers: requestHeader,
            body: JSON.stringify({
                serviceID: key,
                customerID: this.state.customerID
            }),
        });

        const body = await response.json();
        this.setState({
            id: body.Items[0].service_id,
            sName: body.Items[0].serviceName,
            sCost: body.Items[0].serviceCost,
            sCategory: body.Items[0].serviceCategory,
        });

    }

    DeleteItems = async (key) => {
        const requestHeader = {
            "content-Type": "application/json",
            accessIDKey: this.state.Token
        };
        window.location.reload(true);
        
        const response = await fetch('https://xl73257esa.execute-api.us-east-1.amazonaws.com/preprod/deleteservicebyid', {
        //const response = await fetch('http://localhost:3000/api/Admin/dropBillingTableRow', {
            method: 'POST',
            headers: requestHeader,
            body: JSON.stringify({
                serviceID: key,
                customerID: this.state.customerID
            }),
        });


    }
print=()=>
{
    this.setState({ Isprint: false });
}
delete=(items)=>

{
  this.setState({open: !this.state.open})
  this.setState({ svid: items.service_id });
  this.setState({ svName: items.serviceName });
  this.setState({ svCategory: items.serviceCategory });
 
}

    handleSubmit = async e => {
        e.preventDefault();
        const requestHeader = {
            "content-Type": "application/json",
            accessIDKey: this.state.Token
        };
        console.log(this.state.Token);
        const requestOptions = {
            method: 'POST',
            headers: requestHeader,

            body: JSON.stringify({
                serviceCategory: this.state.sCategory,
                serviceName: this.state.sName,
                serviceCost: this.state.sCost,
                customerID: this.state.customerID
            }),

        }
        // After Appointment Added
        
        const response = await fetch('https://xl73257esa.execute-api.us-east-1.amazonaws.com/preprod/postservicemasterdata', requestOptions)
        //const response = await fetch('http://localhost:3000/api/Admin/postBillingMasterData', requestOptions)
        
        const body = await response.text();

        this.setState({ responseToPostt: body });
  


    };

    render() {
        if (!this.state.Isprint) {
            return (
               
              <PrintServices/>)
          }
         else if(!this.state.open){
            return(
                <DeleteServices Service_id={this.state.svid} Service_Name={this.state.svName} Service_Category={this.state.svCategory}/>
            )

        } 
          else {
        return (

            <div className="main-wrapper">

                <div className="page-wrapper">
                    <div className="content">
                        <Header />
                        <Leftmenu />
                        <div className="row">
                            <div className="col-lg-8 offset-lg-2"><h4 className="page-title">Add Services</h4></div>
                        </div>
                        <p style={{color:'HotPink', fontSize:'14px',fontWeight:'bold', textAlign:'center' }}>{this.state.responseToPostt}</p>
                        <form onSubmit={this.handleSubmit}>
                            <div className="row">
                                <div className="col-lg-8 offset-lg-2">
                
                                    <div className="mb-2 row">
                                        <div className="col-sm-2">
                                     
                                            <label>Service Category</label>
                                        
                                        </div>
                       
                           
                                        <div className="col-sm-4">
                                            <select className="form-control" aria-label="Default select example" value={this.state.sCategory} onChange={(e) => this.setState({ sCategory: e.target.value })} required>
                                                <option>Select</option>
                                                <option value="Blood Test" >Blood Test</option>
                                                <option value="Sonography">Sonography</option>
                                                <option value="OPD" >OPD</option>
                                                <option value="First Visit">First Visit</option>
                                                <option value="Second Visit">Second Visit</option>
                                            </select>
                                        </div>
                                        <div className="col-sm-2">
                                            <label>Service Name</label>
                                        </div>
                                        <div className="col-sm-4">
                                            <input type="text" className="form-control" name="sName" value={this.state.sName} onChange={e => this.setState({ sName: e.target.value })} required />
                                        </div>
                                    </div>

                                    <div className="mb-2 row">
                                        <div className="col-sm-2">
                                            <label>Service Cost</label>
                                        </div>
                                        <div className="col-sm-4">
                                            <input type="text" className="form-control" maxlength="10" name="sCost" value={this.state.sCost} onChange={e => this.setState({ sCost: e.target.value })} required />
                                        </div>

                                    </div>

                                    <div className="mb-2 row">
                                        <div className="m-t-20 text-center">

                                            <button className="btn btn-danger submit-btn" type="submit" >Save Services</button> &nbsp;

                                            {/* <button className="btn btn-danger submit-btn" type="submit" onClick={() => window.print()}>Print</button> &nbsp; */}
                                            <button className="btn btn-danger submit-btn" type="submit" onClick={() => this.print()}>Print</button> &nbsp;
                                            <button className="btn btn-danger submit-btn" type="submit" >Download</button> &nbsp;


                                        </div>
                                    </div>

                                </div>

                            </div>
                        </form>
                        <table className="table table-border table-striped custom-table datatable mb-0">
                            <thead>
                                <tr>
                                    <th className="ant-table-cell">Service ID</th>
                                    <th className="ant-table-cell">Service Category</th>
                                    <th className="ant-table-cell">Service Name</th>
                                    <th className="ant-table-cell">Service Cost</th>
                                    <th className="ant-table-cell">Action</th>

                                </tr>
                            </thead>


                            {this.state.responseToPost.length > 0 && (
                                <tbody>
                                    {this.state.responseToPost.map((items) => (


                                        <tr key={items.service_id}>
                                            <td>{items.service_id}</td>
                                            <td>{items.serviceCategory}</td>
                                            <td>{items.serviceName}</td>
                                            <td>{items.serviceCost}</td>

                                            <td className="text-right">
                                                <div className="dropdown dropdown-action">
                                                    <a className="action-icon dropdown-toggle" data-toggle="dropdown"
                                                        aria-expanded="false"><i className="fa fa-ellipsis-v"></i></a>
                                                    <div className="dropdown-menu dropdown-menu-right">
                                                        <button className="dropdown-item" data-toggle="modal"
                                                            data-target="#delete_patient" onClick={() => this.handleEdit(items.service_id)}><i
                                                                className="fa fa-pencil m-r-5"></i> Edit</button>

                                          

                                                        {/* <button className="dropdown-item" data-toggle="modal"
                                                            data-target="#delete_patient" onClick={() => this.DeleteItems(items.service_id)}><i className="fa fa-trash-o m-r-5"></i> Delete</button> */}
                                                            <button
                                                            className="dropdown-item" data-toggle="modal" onClick={()=>this.delete(items)}
                                                           ><i className="fa fa-trash-o m-r-5"></i> Delete</button>
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



        );
    }
}}
export default AddServices;



