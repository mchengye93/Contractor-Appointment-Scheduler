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

class RatingScreen extends Component {
  constructor(props){
    super(props);
    this.state={
    //user:this.props.user,
	  //userid :this.props.user.id,
    ratingItems:this.props.ratings,
    ratingPreview:[],
    }
  }
  componentDidMount(){

  this.renderratinglist(this.state.ratingItems);
  }
  componentWillReceiveProps(nextProps){
    console.log("nextProps",nextProps);
  }

  renderratinglist(ratingItems){
    var self = this;
    var ratingPreview=[];

    console.log("Inside renderratingList!!!");
    self.setState({ratingItems:ratingItems});
    ratingPreview = this.renderRatingTable(ratingItems);
    this.setState({ratingPreview});

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
            {this.state.ratingPreview}
            </div>
          </div>
      </div>


      </MuiThemeProvider>
      </div>
    );
  }
  /*
  renderratingPage() {
    <form action="/charge" method="POST">
  <script
  src="https://checkout.stripe.com/checkout.js" class="stripe-button"
  data-key="pk_test_DpgzzNo47jvMTWz9tq8wESll"
  data-amount="999"
  data-name="rating"
  data-description="Paying contractor"
  data-image="https://stripe.com/img/documentation/checkout/marketplace.png"
  data-locale="auto">
  </script>
</form>
  }*/

renderRatingTable(data) {

  console.log("Inside renderratingTable!!");
  console.log(data);

  var self = this;
  return(
    <MuiThemeProvider>
        <div>
    <div className="noteontainer">
    <table className="notetable">
    <tr>
    <th>APPOINTMENT_ID</th>
    <th>FROM_USER_ID</th>
    <th>RATING</th>
    <th>REVIEW</th>

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
  renderResultRows(ratingItems) {
    console.log("Inside renderResultRow!")
    var self = this;



  var t = {min:3,max:10};
    return ratingItems.map((data,index) =>{
      return (
        <tr key={index} data-item={data} onClick={(event) =>this.fetchDetails(event)}>
        <td data-title="appointmentId">{data.dateId} </td>
        <td data-title="fromUserId">{data.fromUserId} </td>
        <td data-title="rating">{data.rating}</td>
        <td data-title="review">{data.review}</td>
        </tr>
      );
    });
  }
}

export default RatingScreen;
