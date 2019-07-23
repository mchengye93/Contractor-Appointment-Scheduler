import React, { Component } from 'react';
import './App.css';
import './react-big-calendar.css';
import DropDownMenu from 'material-ui/DropDownMenu';
/*
Screen:LoginScreen
Loginscreen is the main screen which the user is shown on first visit to page and after
hitting logout
*/
import LoginScreen from './Loginscreen';
import UserPage from './UserPage';
/*
Module:Material-UI
Material-UI is used for designing ui of the app
*/
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import {blue500, red500, greenA200} from 'material-ui/styles/colors';

/*
Module:Dropzone
Dropzone is used for local file selection
*/
import Dropzone from 'react-dropzone';
/*
Module:superagent
superagent is used to handle post/get requests to server
*/
import TextField from 'material-ui/TextField';
import axios from 'axios';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';

import BigCalendar from 'react-big-calendar';
import moment from 'moment';
BigCalendar.momentLocalizer(moment);
var request = require('superagent');
/* Note list page */
class DateScreen extends Component {
  constructor(props){
    super(props);
	  console.log(props);
	const minDate = new Date();
    const maxDate = new Date();
    minDate.setFullYear(minDate.getFullYear());
    minDate.setHours(0, 0, 0, 0);
	maxDate.setHours(0, 0, 0, 0);

    this.state={
      role:this.props.user.role,
      filesPreview:[],
      filesToBeSent:[],
      draweropen:false,
      printcount:10,
      printingmessage:'',
      printButtonDisabled:false,
      user:this.props.user,
	  dateItems:this.props.user.dateItems,//You need get all date list
	  dateList:this.props.user.dateItems,
      notePreview:[],
      userid:this.props.user.id,
    }
  }
  componentDidMount(){
  if(this.state.role == "user"){

		
    //this.setState({dataItems:this.props.user.dateItems});
    //console.log(this.state.dateItems);
		//this.renderNotelist(this.state.dateItems);
   
    
    this.renderDateList(this.state.dateItems);
	}
	else //client
	  {

		return(
		  <div>
		  <p>Login as:</p>
		  <DropDownMenu value={this.state.category} onChange={(event,index,value)=>this.handleMenuChange(value)}>
			  <MenuItem value={"user"} primaryText="user"/>
			  <MenuItem value={"client"} primaryText="client" />
		  </DropDownMenu>
		  </div>
		);
	  }

  }

  componentWillMount(){

  }
  transferDateitemsEvent(dataItems){
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
		  if(dataItems[i].msg != ''){
			  cell['title'] = 'Have been booked;Message:' + dataItems[i].msg;
		  }else{
			  cell['title'] = 'Have been booked';
		  }
		  
	  }
      cell['desc'] = dataItems[i].clientid;
      cell['id'] = i;
      eventlist.push(cell);
    }
    return eventlist;
  }
  /*user date list show*/
  renderDateList(dataItems){
    this.setState({dataItems:dataItems});
    this.state.dateItems = dataItems;
    var events = this.transferDateitemsEvent(dataItems);
    console.log("events:");
    console.log(events);
    var datenow = new Date();
    if(events.length > 0){
      datenow = events[0].start;
    }
    console.log(this.state.dateItems);
    var self = this;
    var localloginComponent = [];
    if(1){
      localloginComponent.push(
        <MuiThemeProvider>
          <div  {...this.props}>
              <BigCalendar
                selectable
                defaultView='week'
                views={['month','week', 'day','agenda']}
                events = {events}
                scrollToTime={new Date(1970, 1, 1, 6)}
                defaultDate={datenow}
                onSelectEvent={event => this.handleBigCalDel(event)}
                onSelectSlot={(slotInfo) => this.handleBigCal(slotInfo)}
              />
          </div>
        </MuiThemeProvider>
      )
   }
   this.setState({notePreview:localloginComponent});
    
  }
  handleBigCal(slotInfo){
	  console.log(slotInfo);
    //onsole.log(id);
    if(slotInfo.action == "select"){
	    var self = this;
      var payload={
        "startdate":slotInfo.start,
        "enddate": slotInfo.end,
      }
      console.log(payload);
      axios.post('/api/dates/'+this.state.userid, payload)
      .then(function (response) {
       console.log(response);
	     var ss = self;
       if(response.data.code == 200){
         console.log("note create successfull");
         //console.log(response.data.user);
         //var uploadScreen=[];
         //uploadScreen.push(<UserPage appContext={self.props.appContext} role={self.state.loginRole} user={response.data.user} />)
         self.setState({newtitle:""});
         self.setState({newcontent:""});
         alert("Congradulations!Create Appointdate Successfully!");
         axios.get('api/users/'+self.state.userid)
           .then(function (response) {
           console.log(response);
           if(response.data.code == 200){
           console.log("note create successfull");
           //alert("create successfully");
           console.log(response.data.user);
           //var uploadScreen=[];
           //uploadScreen.push(<UserPage appContext={self.props.appContext} role={self.state.loginRole} user={response.data.user} />)
           //ss.setState({newtitle:""});
           
           //self.renderNotelist(response.data.user.dateItems);
           
           self.setState({user:response.data.user});
           self.setState({dataItems:response.data.user.dateItems});
           self.renderDateList(response.data.user.dateItems);
           }
           else if(response.data.code == 404){
           console.log("Date create fail");
           alert(response.data.success)
           }
           else{
           console.log("Date create fail");
           alert("Date create fail");
           }
           })
           .catch(function (error) {
           console.log(error);
           });
       }
       else if(response.data.code == 404){
         console.log("Date create fail");
         alert(response.data.success)
       }
       else{
         console.log("Date create fail");
         alert("Date  create fail");
       }
       })
       .catch(function (error) {
       console.log(error);
       });
    }
  }
  handleBigCalDel(e){
	var index = e.id;
    console.log(index);
    console.log(this.state.dateItems);
    var self = this;
	if(e.desc != -1){
		axios.get('/api/dates/client/-1/items/'+this.state.dateItems[index].id)//api/dates/1/items/1
		   .then(function (response) {
		   console.log(response);
		   if(response.data.code == 200){
			 console.log("cancel successfull");
			 //console.log(response.data.user);
			 //var uploadScreen=[];
			 //uploadScreen.push(<UserPage appContext={self.props.appContext} role={self.state.loginRole} user={response.data.user} />)
			 alert("Congradulations!Cancel booking Successfully!");
			 axios.get('/api/users/'+self.state.userid)//api/notes/1/items/1
			   .then(function (response) {
			   console.log(response);
			   if(response.data.code == 200){
			   console.log("get successfull");
			   //console.log(response.data.user);
			   //var uploadScreen=[];
			   //uploadScreen.push(<UserPage appContext={self.props.appContext} role={self.state.loginRole} user={response.data.user} />)
			   self.setState({user:response.data.user});
			   //self.setState({dataItems:response.data.user.dateItems});
			   self.state.dataItems = response.data.user.dateItems;
			   console.log(self.state.dataItems);
			   self.setState({ dataItems: self.state.dataItems}, function() {
					self.renderDateList(response.data.user.dateItems);
			   });
			   //self.renderNotelist(response.data.user.dateItems);

			   }
			   else if(response.data.code == 404){
			   console.log("get fail");
			   //alert(response.data.success)
			   }
			   else{
			   console.log("get fail");
			   //alert("Note update fail");
			   }
			   })
			   .catch(function (error) {
			   console.log(error);
			   });

		   }
		   else if(response.data.code == 404){
			 console.log("Note update fail");
			 alert(response.data.success)
		   }
		   else{
			 console.log("Note update fail");
			 alert("Note update fail");
		   }
		   })
		   .catch(function (error) {
		   console.log(error);
		   });
	}else{
		axios.get('/api/dates/'+this.state.userid+"/items/"+this.state.dateItems[index].id)//api/dates/1/items/1
		   .then(function (response) {
		   console.log(response);
		   if(response.data.code == 200){
			 console.log("note delete successfull");
			 //console.log(response.data.user);
			 //var uploadScreen=[];
			 //uploadScreen.push(<UserPage appContext={self.props.appContext} role={self.state.loginRole} user={response.data.user} />)
			 self.setState({edittitle:""});
			 self.setState({editcontent:""});
			 alert("Congradulations!Delete date info Successfully!");
			 axios.get('/api/users/'+self.state.userid)//api/notes/1/items/1
			   .then(function (response) {
			   console.log(response);
			   if(response.data.code == 200){
			   console.log("get successfull");
			   //console.log(response.data.user);
			   //var uploadScreen=[];
			   //uploadScreen.push(<UserPage appContext={self.props.appContext} role={self.state.loginRole} user={response.data.user} />)
			   self.setState({user:response.data.user});
			   //self.setState({dataItems:response.data.user.dateItems});
			   self.state.dataItems = response.data.user.dateItems;
			   console.log(self.state.dataItems);
			   self.setState({ dataItems: self.state.dataItems}, function() {
					self.renderDateList(response.data.user.dateItems);
			   });
			   //self.renderNotelist(response.data.user.dateItems);

			   }
			   else if(response.data.code == 404){
			   console.log("get fail");
			   //alert(response.data.success)
			   }
			   else{
			   console.log("get fail");
			   //alert("Note update fail");
			   }
			   })
			   .catch(function (error) {
			   console.log(error);
			   });

		   }
		   else if(response.data.code == 404){
			 console.log("Note update fail");
			 alert(response.data.success)
		   }
		   else{
			 console.log("Note update fail");
			 alert("Note update fail");
		   }
		   })
		   .catch(function (error) {
		   console.log(error);
		   });
	}
  }

  handleMenuChange(value){
    console.log("category value",value);
    this.setState({category:value});
  }
  /*
  clost nav
  */
  handleCloseClick(event,index){
    // console.log("filename",index);
    var filesToBeSent=this.state.filesToBeSent;
    filesToBeSent.splice(index,1);
    // console.log("files",filesToBeSent);
    var filesPreview=[];
    for(var i in filesToBeSent){
      filesPreview.push(<div>
        {filesToBeSent[i][0].name}
        <MuiThemeProvider>
        <a href="#" onClick={(event) => this.handleDivClick(event)}><FontIcon
          className="material-icons customstyle"
          color={blue500}

        >edit</FontIcon></a>
        </MuiThemeProvider>
        </div>
      )
    }
    this.setState({filesToBeSent,filesPreview});
  }
  handleChangeEditMinDate = (event, date) => {
    this.setState({editmindate: date});
  };
  handleChangeEditMaxDate = (event, date) => {
    this.setState({editmaxdate: date});
  }; 

/*
  Function:toggleDrawer
  Parameters: event
  Usage:This fxn is used to toggle drawer state
  */
toggleDrawer(event){
  // console.log("drawer click");
  this.setState({draweropen: !this.state.draweropen})
}

/*
  Function:handleLogout
  Parameters: event
  Usage:This fxn is used to end user session and redirect the user back to login page
  */
handleLogout(event){
  // console.log("logout event fired",this.props);
  var loginPage =[];
  loginPage.push(<LoginScreen appContext={this.props.appContext}/>);
  this.props.appContext.setState({loginPage:loginPage,uploadScreen:[]})
}
  render() {
    //console.log(this.props.user.dateItems);
    //this.generateRows();
    /*
    let rowComponents = this.generateRows(this.props.user.dateItems);
      let table_rows = []
      let table_headers = [];
      let data = this.props.users.dateItems;
    if (this.props.user.dateItems.length >0){
      let headers = Object.keys(this.props.user.dateItems[0]);
        headers.forEach(header => table_headers.push(<TableCell key={header}>{header}</TableCell>));
    }*/
    return (
      <div className="App">

          <div className="container">

              {this.state.notePreview}
          </div>
      </div>
    );
  }
}

const style = {
  margin: 15,
};
const style1 = {
  margin: 0,
};
export default DateScreen;
