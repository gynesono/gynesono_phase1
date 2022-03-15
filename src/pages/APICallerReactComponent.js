import React, { Component } from 'react';


class APICallerReactComponent extends Component {
  state = {
    response: '',
    post: '',
    responseToPost: '',
  };
  
  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }
  
  callApi = async () => {
    const response = await fetch();
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    
    return body;
  };
  
  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('http://localhost:3000/api/Appointments/getAllAppointmentsByDate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ appointmentDate: this.state.aptDate1,
      customerID: parseInt(this.state.custID)}),
    });
   
    const body = await response.text();
    
    this.setState({ responseToPost: body });
  };
  
render() {
    return (
      <div>
        <label>
          <p>Appointment Date</p>
          <input type="aptDate" value={this.state.aptDate1} onChange={e => this.setState({ aptDate1: e.target.value })}/>
        </label>
        <label>
          <p>Customer ID</p>
          <input type="custID" value={this.state.custID} onChange={e => this.setState({ custID: e.target.value })}/>
        </label>
        <p>{this.state.response}</p>
        <form onSubmit={this.handleSubmit}>
          <p>
            <h2>Post to API's:</h2>
            
          </p>
          
          <button type="submit">Submit</button>
        </form>
        <p>{this.state.responseToPost}</p>
        
      </div>
    );
  }
}

export default APICallerReactComponent;