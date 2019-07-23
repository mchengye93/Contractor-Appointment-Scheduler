import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import axios from 'axios';

import Login from './Login';
import LoginScreen from './Loginscreen';
import UserPage from './UserPage';

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
Searchscreen page
*/
class SearchScreen extends Component {
  constructor(props){
    super(props);
    this.state={
	  userid :this.props.user.id,
      searchItems:[],
      searchPreview:[],
      gender:'Female',
      category:'Model',
      location:'San Francisco,CA',
      price:'100',
      role:'client',
      username:'',
	  msg:'',
	  tmpe:'',
	  emailmsg:'',
    avgRating:null,
    }
  }
  componentDidMount(){

  this.renderSearchlist(this.state.searchItems);
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

    var payload= {
      "category":this.state.category,
      "price": this.state.price
    }
    axios.get('api/users/search/'+this.state.category+'/'+this.state.gender+'/'+this.state.price+'/'+this.state.location)
    .then(function (response) {
      if (response.data.code ==200){
        console.log(response.data.user);
        console.log(self.state.username);
        var users = [];
        var tusers = response.data.user;
        for(var i=0;i<response.data.user.length;i++){
          if(tusers[i].username.indexOf(self.state.username)>-1 ){
            users.push(tusers[i]);
          }
        }
        self.setState({searchItems:users});
       self.renderSearchlist(users);
        self.renderSearchlist(response.data.user);

      }
      console.log(payload);
      console.log(response);
    })
    .catch(function (error) {
      console.log(payload);
      console.log(error);
    });

  }

  handleGenderChange(value){
    console.log("gender value: ", value);
    this.setState({gender:value})
  }

  handleCategoryChange(value){
    console.log("category value", value);
    this.setState({category:value});
  }

  handlePriceChange(value){
    console.log("price value", value);
    this.setState({price:value});
  }

  handleLocationChange(value){
    console.log("location value", value);
    this.setState({location :value});
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
    return (
      <div>
      <MuiThemeProvider>
      <div>

	Category:
      <DropDownMenu value={this.state.category} onChange={(event,index,value)=>this.handleCategoryChange(value)}>
      <MenuItem value={"Model"} primaryText="Model" />
      <MenuItem value={"Photographer"} primaryText="Photographer" />
      <MenuItem value={"Designer"} primaryText="Designer" />
      </DropDownMenu>

      Gender:
      <DropDownMenu value={this.state.gender} onChange={(event,index,value)=>this.handleGenderChange(value)}>
      <MenuItem value={"Female"} primaryText="Female" />
      <MenuItem value={"Male"} primaryText="Male" />
      <MenuItem value={"Other"} primaryText="Other"/>
      </DropDownMenu>

      Price:
      <DropDownMenu value={this.state.price} onChange={(event,index,value)=>this.handlePriceChange(value)}>
      <MenuItem value={"25"} primaryText="<=25" />
      <MenuItem value={"50"} primaryText="<=50" />
      <MenuItem value={"75"} primaryText="<=75" />
      <MenuItem value={"100"} primaryText="<=100" />
      </DropDownMenu>

      Location:
      <DropDownMenu value={this.state.location} onChange={(event,index,value)=>this.handleLocationChange(value)}>
      <MenuItem value={"San Francisco,CA"} primaryText="San Francisco,CA" />
      <MenuItem value={"San Jose,CA"} primaryText="San Jose,CA" />
      <MenuItem value={"Los Angeles,CA"} primaryText="Los Angeles,CA" />
      <MenuItem value={"San Diego,CA"} primaryText="San Diego,CA" />
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
		  <th>USERNAME</th>
		  <th>CATEGORY</th>
      <th>GENDER</th>
		  <th>PRICE</th>
		  <th>LOCATION</th>
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
	handleViewUser(event,index){
		console.log(index);
	}
  handleBigCal(slotInfo){
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
  /*user date list show*/
  renderDateList(data){
    //this.setState({dataItems:dataItems});
    //this.state.dateItems = dataItems;
    console.log(data.dateItems);
	console.log(data);
    var events = this.transferDateitemsEvent(data.dateItems,data.email);
    console.log("events:");
    console.log(events);
    var datenow = new Date();
    if(events.length > 0){
      datenow = events[0].start;
    }
    //console.log(this.state.dateItems);
    var self = this;
    var localloginComponent = [];
    if(1){
      localloginComponent.push(
        <MuiThemeProvider>

          <div  {...this.props}>
              <RaisedButton label="Return Search page" primary={true} style={style} onClick={() => this.renderSearchlist(this.state.searchItems)}/>
              <BigCalendar
                selectable
                defaultView='week'
                views={['month','week', 'day','agenda']}
                events = {events}
                scrollToTime={new Date(1970, 1, 1, 6)}
                defaultDate={datenow}
                onSelectEvent={event => this.handleBigCalOP(event)}
                onSelectSlot={(slotInfo) => this.handleBigCal(slotInfo)}
              />
          </div>
        </MuiThemeProvider>
      )
   }
   this.setState({searchPreview:localloginComponent});

  }
  handleBigCalOP(e){
	  console.log(e);
	  this.setState({tmpe:e});
	  if(e.desc == -1){
		var localloginComponent=[];
		localloginComponent.push(
		  <MuiThemeProvider>
			<div>
			 <TextField
			   type="text"
			   hintText="Enter your additional message"
			   floatingLabelText="message"
			   onChange = {(event,newValue) => this.setState({msg:newValue})}
			   />
			   <br/>
			    <TextField
			   type="text"
			   hintText="Enter your Email message"
			   floatingLabelText="email content"
			   onChange = {(event,newValue) => this.setState({emailmsg:newValue})}
			   />
			   <br/>
			   <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleSubmitmsg(event)}/>
			   <RaisedButton label="Cancel" primary={true} style={style} onClick={(event) => this.handleCancelMsg(event)}/>
		   </div>
		   </MuiThemeProvider>
		)
		this.setState({searchPreview:localloginComponent});
	  }else{
		  alert("This time has been booked!");
	  }
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
      console.log("Error from searchscreen post/api/mail");
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

      if (data.rating!=0){
      localloginComponent.push(
        <MuiThemeProvider>
        <div>
          <p>ID:{data.id} </p>
          <p>Username: {data.username}</p>
          <p>Email: {data.email}</p>
          <p>Gender: {data.gender}</p>
          <p>Location: {data.location}</p>
          <p>Rating : {data.avgRating}</p>
          <p>Price: {data.price}</p>
          <p>Description: {data.description} </p>
          <p>Rating: {data.rating} </p>
           <br/>
           <RaisedButton label="Return to Search page" primary={true} style={style} onClick={(event) => this.handleCancelMsg(event)}/>
         </div>
         </MuiThemeProvider>
      )
    }

    else {
      localloginComponent.push(
        <MuiThemeProvider>
        <div>
          <p>ID:{data.id} </p>
          <p>Username: {data.username}</p>
          <p>Email: {data.email}</p>
          <p>Gender: {data.gender}</p>
          <p>Location: {data.location}</p>
          <p>Price: {data.price}</p>
          <p>Description: {data.description} </p>
           <br/>
           <RaisedButton label="Return to Search page" primary={true} style={style} onClick={(event) => this.handleCancelMsg(event)}/>
         </div>
         </MuiThemeProvider>
       )
    }
      this.setState({searchPreview:localloginComponent});
    }
    renderResultRows(searchItems) {
      console.log("Inside renderResultRow!")
      var self = this;
	  var t = {min:3,max:10};
      return searchItems.map((data,index) =>{
        return (
          <tr key={index} data-item={data} onClick={(event) =>this.fetchDetails(event)}>
          <td data-title="username" onClick={(event) =>this.handleGetProfile(data)} ><a className="usershow" ><b>{data.username}</b></a></td>
          <td data-title="category">{data.category} </td>
          <td data-title="gender">{data.gender} </td>
          <td data-title="price">{data.price}</td>
          <td data-title="location">{data.location}</td>
		  <td data-title="option">
				<RaisedButton label="View Available Time" primary={true} style={style} onClick={(event) => this.renderDateList(data)}/>
		  </td>
          </tr>
        );
      });
    }

  }

  const style = {
    margin: 15,
  };

  export default SearchScreen;
