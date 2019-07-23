import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import ChatScreen from './chat_components/Layout';

import Login from './Login';
import LoginScreen from './Loginscreen';
import UserPage from './UserPage';
import RateScreen from './RateScreen';

var apiBaseUrl = "http://192.168.44.130:8000/api/";
/*
Module:Dropzone
Dropzone is used for local file selection
*/
import Dropzone from 'react-dropzone';
/*
Module:superagent
superagent is used to handle post/get requests to server
*/
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
var request = require('superagent');
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
/*
HistoryClientScreen page
*/
class HistoryUserScreen extends Component {
  constructor(props){
    super(props);
    this.state={
	  userid :this.props.user.id,
      searchItems:[],
      searchPreview:[],
	  datestep:12,
      category:'Model',
      location:'San Francisco,CA',
      price:'100',
      role:'user',
      username:'',
	  msg:'',
	  tmpe:'',
	  emailmsg:'',
    role:this.props.role,
    chatPage: false,
    }
  }
  componentDidMount(){
    var self = this;
	axios.get('/api/users/' + this.state.userid)
	.then(function (response) {
	  if (response.data.code ==200){
		console.log(response.data.user);
		var user = response.data.user;
		var dateItems = response.data.user.dateItems;
		axios.get('api/users/getallusers/client')
		.then(function (response) {
		  if (response.data.code ==200){
			console.log(response.data.user);
			var clients = response.data.user;
			var appointlist = [];
			var nowdate = new Date();
			for(var i=0;i<dateItems.length;i++){
				var d = new Date(Date.parse(dateItems[i].enddate.replace(/-/g,   "/").replace(/T/g,   " ").replace(/Z/g,   "")));
				for(var j = 0;j< clients.length;j++){
					if(dateItems[i].clientid == clients[j].id ){
						dateItems[i].client = clients[j];
						dateItems[i].location = user.location;
						appointlist.push(dateItems[i]);
						break
					}
				}
			}
			console.log(appointlist);
			self.setState({searchItems:appointlist});
			self.renderSearchlist(appointlist);

		  }
		  console.log(response);
		})
		.catch(function (error) {
		  console.log(error);
		});
		//self.setState({searchItems:appointlist});
		//self.renderSearchlist(appointlist);

	  }
	  console.log(response);
	})
	.catch(function (error) {
	  console.log(error);
	});

  	//this.renderSearchlist(this.state.searchItems);
  }
  componentWillReceiveProps(nextProps){
    console.log("nextProps",nextProps);
  }

  handleMenuChange(value){
    console.log("menuvalue",value);
    this.setState({role:value});
    //this.setState({menuValue:value,                   loginComponent:localloginComponent,                   loginRole:loginRole})
  }
  handleSearchClick(event) {
    var self = this;

	axios.get('/api/users/' + this.state.userid)
	.then(function (response) {
	  if (response.data.code ==200){
		console.log(response.data.user);
		var user = response.data.user;
		var dateItems = response.data.user.dateItems;
		axios.get('api/users/getallusers/client')
		.then(function (response) {
		  if (response.data.code ==200){
			console.log(response.data.user);
			var clients = response.data.user;
			var appointlist = [];
			var nowdate = new Date();
			for(var i=0;i<dateItems.length;i++){
				var d = new Date(Date.parse(dateItems[i].enddate.replace(/-/g,   "/").replace(/T/g,   " ").replace(/Z/g,   "")));
        var littledate = new Date();
        littledate.setDate( littledate.getDate()- self.state.datestep*30 );
				for(var j = 0;j< clients.length;j++){
					if(dateItems[i].clientid == clients[j].id &&  d > littledate ){
						dateItems[i].client = clients[j];
						dateItems[i].location = user.location;
						appointlist.push(dateItems[i]);
						break
					}
				}
			}
			console.log(appointlist);
			self.setState({searchItems:appointlist});
			self.renderSearchlist(appointlist);

		  }
		  console.log(response);
		})
		.catch(function (error) {
		  console.log(error);
		});
		//self.setState({searchItems:appointlist});
		//self.renderSearchlist(appointlist);

	  }
	  console.log(response);
	})
	.catch(function (error) {
	  console.log(error);
	});



  }
  handleDateStepChange(value){
    console.log("datestep value", value);
    this.setState({datestep:value});
  }

  renderSearchlist(searchItems){
    var self = this;
    var searchPreview=[];

    console.log("Inside renderSearchList!!!");
    self.setState({searchItems:searchItems});
    searchPreview = this.renderSearchTable(searchItems);
    this.setState({searchPreview});

    this.setState({role:this.props.role,user:this.props.user});
  }


  render() {
    // console.log("props",this.props);
  //  if(this.state.chatPage = false){
    return (
      <div>
      <MuiThemeProvider>
      <div>
		  Date:
		  <DropDownMenu value={this.state.datestep} onChange={(event,index,value)=>this.handleDateStepChange(value)}>
		  <MenuItem value={12} primaryText="Within One year" />
		  <MenuItem value={1} primaryText="Within One month" />
		  <MenuItem value={6} primaryText="Within Six month" />
		  </DropDownMenu>
		  <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleSearchClick(event)}/>

		  <div className="App">
			<div className="container">
				{this.state.searchPreview}
			 </div>
		  </div>
      </div>

      </MuiThemeProvider>
      </div>
    );


  }
  /* show table */
  renderSearchTable(data) {

    console.log("Inside renderSearchTable!!");
    console.log(data);

    var self = this;
    return(
      <MuiThemeProvider>

      	  <div>
		  <div className="notecontainer">
		  <table className="notetable">
		  <tr>
      <th>Appointment ID </th>
		  <th>Time</th>
		  <th>Location</th>
		  <th>Client</th>
      <th>Rate</th>
      <th>Chat</th>
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
	handleViewUser(event,index){
		console.log(index);
	}

  handleChatClick(data){
    var self = this;
    var localloginComponent=[];
    //localloginComponent.push(<ChatScreen appContext={this.props.appContext} username ={this.props.username}/>);
    localloginComponent.push(<ChatScreen user={this.props.user}/>);
    this.setState({searchPreview:localloginComponent});
  }

  handleRateClick(data){

  console.log(data);
  var localloginComponent=[];
  localloginComponent.push(<RateScreen data={data} role={this.state.role}/>);
  this.setState({searchPreview:localloginComponent});
  }
   transferDateitemsEvent(dataItems,email){
    var eventlist = [];
    for(var i=0;i<dataItems.length;i++){
      var cell = {};
      //cell['start'] = dataItems[i].startdate;
      //cell['end'] = dataItems[i].enddate;
      var ds = new Date(dataItems[i].startdate);
      var de = new Date(dataItems[i].enddate);
      cell['start'] = new Date(ds.getFullYear(), ds.getMonth(), ds.getDate(), ds.getHours(), ds.getMinutes(), ds.getSeconds(), 0);
      cell['end'] = new Date(de.getFullYear(), de.getMonth(), de.getDate(), de.getHours(), de.getMinutes(), de.getSeconds(), 0);
	  if(dataItems[i].clientid == -1){
		  cell['title'] = 'Free time';
	  }else{
		  if(dataItems[i].clientid == this.state.userid){
			  if(dataItems[i].msg != ''){
				  cell['title'] = 'Have been booked;My message:' + dataItems[i].msg;
			  }else{
				  cell['title'] = 'Have been booked';
			  }
		  }else{
			  cell['title'] = 'Have been booked';
		  }

	  }
      cell['desc'] = dataItems[i].clientid;
      cell['id'] = dataItems[i].id;
	  cell['email'] = email;
      eventlist.push(cell);
    }
    return eventlist;
  }


  handleCancelMsg(event){
	  this.renderSearchlist(this.state.searchItems);
  }
  handleSubmitmsg(event){
	  console.log(this.state.tmpe);
	  var e = this.state.tmpe;
	  var self = this;
	  if(this.state.msg != ''){
		  console.log("input not null");
	  }else{
		  console.log("input is null");
	  }
	  /* update data */
	  var payload= {
        "msg":this.state.msg
      }
	  axios.post('api/dates/client/'+this.state.userid+'/items/'+e.id,payload)
	  .then(function (response) {
	    if (response.data.code ==200){
		  console.log(response.data.user);
		  alert("Book time successfully and Email has been send!");
		  payload={
			  "emailmsg":self.state.emailmsg
		  }
		  axios.post('api/mail/'+e.email,payload)
		  .then(function (response) {
			console.log("email send!");
		  })
		  .catch(function (error) {
			console.log(payload);
			console.log(error);
		  });
		  self.handleSearchClick(event);


	    }
	  })
	  .catch(function (error) {
	    console.log(payload);
	    console.log(error);
	  });
  }
    fetchDetails = (e) => {
		const data = e.target.getAttribute('data-item');
		console.log('We need to get the details for ', data);
	  }

    handleGetProfile(data){
      console.log(data);
      var localloginComponent=[];
      localloginComponent.push(
        <MuiThemeProvider>
        <div>
          <p>ID:{data.id} </p>
          <p>Username: {data.username}</p>
          <p>Email: {data.email}</p>
          <p>Gender: {data.gender}</p>
          <p>Location: {data.location}</p>
           <br/>
           <RaisedButton label="Return to History page" primary={true} style={style} onClick={(event) => this.handleCancelMsg(event)}/>
         </div>
         </MuiThemeProvider>
      )
      this.setState({searchPreview:localloginComponent});
    }
    renderResultRows(searchItems) {

      console.log("Inside renderResultRow!")
      var self = this;
	  var t = {min:3,max:10};
      return searchItems.map((data,index) =>{

        if (data.clientGotRated ==0){
        return (
          <tr key={index} data-item={data} onClick={(event) =>this.fetchDetails(event)}>
          <td data-title="AppointmentID">{data.id}</td>
          <td data-title="Time">{data.startdate} - {data.enddate}</td>
          <td data-title="Location">{data.location}</td>
          <td data-title="username" onClick={(event) =>this.handleGetProfile(data.client)} ><a className="usershow">{data.client.username}</a></td>
          <td data-title="Rating">
                    <MuiThemeProvider>

                    <MenuItem onClick={(event) => this.handleRateClick(data)}>
                              Rate
                          </MenuItem>

                    </MuiThemeProvider></td>

                    <td data-title="Chat">

                    <MuiThemeProvider>

                    <MenuItem onClick={(event) => this.handleChatClick(data)}>
                              Click here to chat
                          </MenuItem>

                    </MuiThemeProvider></td>

          </tr>
        );
      }
      else {
        return (

        <tr key={index} data-item={data} onClick={(event) =>this.fetchDetails(event)}>
        <td data-title="AppointmentID">{data.id}</td>
        <td data-title="Time">{data.startdate} - {data.enddate}</td>
        <td data-title="Location">{data.location}</td>
        <td data-title="username" onClick={(event) =>this.handleGetProfile(data.client)} ><a className="usershow">{data.client.username}</a></td>
        <td data-title="Rating">{data.clientGotRated}</td>
        <td data-title="Chat" onClick={(event) =>this.handleChatClick(data.user)} ></td>
        </tr>
      );
      }
      });
    }

  }

  const style = {
    margin: 15,
  };

  export default HistoryUserScreen;
