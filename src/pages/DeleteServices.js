import React, { Component } from "react";


    class DeleteServices extends Component {
      state = {
          open:true,
      };
      componentDidMount() {
   
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        const customerIDString = sessionStorage.getItem('customerID');
        const customerID = parseInt(customerIDString);
        this.setState({ Token: userToken });
        this.setState({ customerID: customerID });
        var appID = parseInt(window.location.href.split("/")[4])
        this.setState({ id: appID });
       
    
      }

      delete=()=>

      {
        this.setState({open: !this.state.open})
      }
    
      DeleteItems = async () => {
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
                serviceID: this.props.Service_id,
                customerID: this.state.customerID
            }),
        });
  
    }
   
  render(){

    return (
      
    <div className='main_view'>
        <div className={this.state.open ? 'open' : 'close'}>
       
               
<div className="content">
<br></br>
        <center><h4>Do you Really Wants to Delete that Service ? </h4><h5>Service Category:{this.props.Service_Category}</h5><h5>Service Name: {this.props.Service_Name}</h5>
        <br></br>
     <button className="btn btn-danger submit-btn" onClick={()=>window.location.reload(true)}>No</button> &nbsp;
  <button className="btn btn-danger submit-btn" onClick={()=>this.DeleteItems()}>Yes</button>
  
  {/* <button onClick={()=>this.DeleteItems(items.Patient_id)}>Yes</button> */}
  </center>
        </div>
    </div>
    
{/*    
    <button onClick={()=>this.delete()}>Switch</button> */}
</div>

    );
  }
}
  export default DeleteServices;
