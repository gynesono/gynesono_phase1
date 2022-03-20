import Leftmenu from './Navigation/Leftmenu';
import Header from './Navigation/Header';
import React, { Component } from "react";
class AddServices extends Component {
    state = {
        response: '',
        post: '',
        responseToPost: '',
        responseToPostt: '',
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
        const response = await fetch('http://localhost:3000/api/Admin/getBillingMasterData', {
            method: 'POST',
            headers: requestHeader,
            body: JSON.stringify({
                customerID: customerID
            }),
        });
    

        const body = await response.json();
        this.setState({ responseToPost: body.Items });
        this.print();
     
    }
  

    handleDate = (str) => {

        const m = str.split("-");
        let str_date = m[2] + "/" + m[1] + "/" + m[0];
        this.setState({ datee: str_date })

    }
    

   
print=()=>
{
window.print();

}

    
    render() {
        return (

            <div className="main-wrapper">

               
                    <div className="content">
                       
                       
                        <p style={{color:'HotPink', fontSize:'14px',fontWeight:'bold', textAlign:'center' }}>{this.state.responseToPostt}</p>
                        <form onSubmit={this.handleSubmit}>
                            <div className="row">
                               
                                    <div className="mb-2 row">
                                        <div className="m-t-20 text-center">

                                            {/* <button className="btn btn-danger submit-btn" type="submit" onClick={() => window.print()}>Print</button> &nbsp;  */}

                                        </div>
                                    </div>
                            </div>
                        </form>
                        <br></br><br></br><br></br><br></br><br></br> 
                      {/* <...................................COMPANY LOGO PART...................................>  */}
                        <br></br><br></br><br></br><br></br><br></br>
                        
                        <table className="table table-border table-striped custom-table datatable mb-0">
                            <thead>
                                <tr>
                                    <th className="ant-table-cell">Service ID</th>
                                    <th className="ant-table-cell">Service Category</th>
                                    <th className="ant-table-cell">Service Name</th>
                                    <th className="ant-table-cell">Service Cost</th>
                                  

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

                            
                                        </tr>


                                    ))}</tbody>
                            )}
                        </table>

                    </div>
               

            </div>



        );
    }
}
export default AddServices;



