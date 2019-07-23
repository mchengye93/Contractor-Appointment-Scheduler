import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import axios from 'axios';

import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';

import Login from './Login';
import LoginScreen from './Loginscreen';
import UserPage from './UserPage';

class PaymentScreen extends Component {
  constructor(props){
    super(props);
    this.state={
    //user:this.props.user,
	  //userid :this.props.user.id,
    paymentItems:this.props.payment,
    paymentPreview:[],
    }
  }
  componentDidMount(){

  this.renderPaymentlist(this.state.paymentItems);
  }
  componentWillReceiveProps(nextProps){
    console.log("nextProps",nextProps);
  }

  renderPaymentlist(paymentItems){
    var self = this;
    var paymentPreview=[];

    console.log("Inside renderPaymentList!!!");
    self.setState({paymentItems:paymentItems});
    paymentPreview = this.renderPaymentTable(paymentItems);
    this.setState({paymentPreview});

    //this.setState({role:this.props.role,user:this.props.user});

  }

  render() {
    // console.log("props",this.props);
    console.log("inside render!!!");
    return (

      <div>
      <MuiThemeProvider>
      <div>

      <div className="App">
        <div className="container">
            {this.state.paymentPreview}
            </div>
          </div>
      </div>


      </MuiThemeProvider>
      </div>
    );
  }
  /*
  renderPaymentPage() {
    <form action="/charge" method="POST">
  <script
  src="https://checkout.stripe.com/checkout.js" class="stripe-button"
  data-key="pk_test_DpgzzNo47jvMTWz9tq8wESll"
  data-amount="999"
  data-name="Payment"
  data-description="Paying contractor"
  data-image="https://stripe.com/img/documentation/checkout/marketplace.png"
  data-locale="auto">
  </script>
</form>
  }*/

renderPaymentTable(data) {

  console.log("Inside renderPaymentTable!!");
  console.log(data);

  var self = this;
  return(
    <MuiThemeProvider>
        <div>
    <div className="noteontainer">
    <table className="notetable">
    <tr>
    <th>ID</th>
    <th>PAYMENT_ID</th>
    <th>DATE_ID</th>
    <th>FROM_USER_ID</th>
    <th>TO_USER_ID</th>
    <th>AMOUNT</th>
    <th>TIMESTAMP</th>
    <th>DESCRIPTION</th>
    <th></th>
    </tr>
    <tbody>
     {this.renderResultRows(data)}
    </tbody>
    </table>
    </div>
    </div>
      </MuiThemeProvider>
    );
  }
  renderResultRows(paymentItems) {
    console.log("Inside renderResultRow!")
    var self = this;



  var t = {min:3,max:10};
    return paymentItems.map((data,index) =>{
      return (
        <tr key={index} data-item={data} onClick={(event) =>this.fetchDetails(event)}>
        <td data-title="id">{data.id} </td>
        <td data-title="paymentId">{data.paymentId} </td>
        <td data-title="dateId">{data.dateId} </td>
        <td data-title="fromUserId">{data.fromUserId} </td>
        <td data-title="toUserId">{data.toUserId}</td>
        <td data-title="amount">{data.amount}</td>
        <td data-title="timeStamp">{data.timeStamp}</td>
        <td data-title="description">{data.description}</td>
        </tr>
      );
    });
  }
}

export default PaymentScreen;
