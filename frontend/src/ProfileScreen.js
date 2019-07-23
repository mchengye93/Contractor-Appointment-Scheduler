import React, { Component } from 'react';
import './App.css';

import LoginScreen from './Loginscreen';
import UserPage from './UserPage';
import DropDownMenu from 'material-ui/DropDownMenu';
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
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import axios from 'axios';
var request = require('superagent');
/*
 * show profile edit/modify password
 *
*/
class ProfileScreen extends Component {
  constructor(props){
    super(props);
    console.log(props);

    this.state={
      user:this.props.user,
      userid:this.props.user.id,
    username:this.props.user.username,
    email: this.props.user.email,
      password: this.props.user.password,
      gender: this.props.user.gender,
      location: this.props.user.location,
      category: this.props.user.category,
      price: this.props.user.price,
      description: this.props.user.description,
    
    }
  }
  componentDidMount(){

  }
  componentWillMount(){
  }
  /* check email address */
  isValidEmailAddress(emailAddress) {
     var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
     return pattern.test(emailAddress);
  };
  /* check num */
  checkNum(input) {
    var m = (/^[\d]+(\.[\d]+)?$/).exec(input);
    return m;
  }
  /* edit user profile button click function */
  handleClick(event){
    var self = this;
    //To be done:check for empty values before hitting submit
  if(this.state.email.length==0 || this.state.gender.length==0 ||  this.state.location.length==0 || this.state.category.length==0 || this.state.price.length==0 ||  this.state.description.length==0){
    alert("Input Value must not be empty!");
  }
  else if(this.state.gender != 'Male' && this.state.gender!= 'Female' && this.state.gender != 'Other'){
    alert("Please select a gender!");
  }else if( !this.isValidEmailAddress(this.state.email)){
    alert("Email format is wrong!");
  }else if(!this.checkNum( this.state.price )){
    alert("Price must be number!");
  }else {
      var payload={
      "email":this.state.email,
      "gender":this.state.gender,
      "location":this.state.location,
    "category": this.state.category,
      "price":this.state.price,
      "description":this.state.description
      }
      axios.post('/api/users/'+this.state.userid, payload)
     .then(function (response) {
       console.log(response);
       if(response.data.code == 200){
        //  console.log("registration successfull");
       alert("Edit profile successfully!");

       }
       else{
         console.log("some error ocurred",response.data.code);
       }
     })
     .catch(function (error) {
       console.log(error);
     });
    }

  }
  /* modify password button click function */
  handleClickPwd(event){
    // console.log("values in register handler",role);
    var self = this;
    //To be done:check for empty values before hitting submit
    if(this.state.password.length>0 ){
      var payload={
      "password":this.state.password
      }
      axios.post('/api/users/pwd/'+this.state.userid, payload)
     .then(function (response) {
       console.log(response);
       if(response.data.code == 200){
        //  console.log("registration successfull");
       alert("Edit password successfully!");
       self.setState({password:""});
       }
       else{
         console.log("some error ocurred",response.data.code);
       }
     })
     .catch(function (error) {
       console.log(error);
     });
    }
    else{
      alert("Input field value is missing");
    }

  }
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

handleCategoryChange(value){
  console.log("categoryvalue", value);
  this.setState({category:value});
}

handleLocationChange(value){
  console.log("location value", value);
  this.setState({location:value});
}

handleGenderChange(value){
  console.log("gender value: ", value);
  this.setState({gender:value})
}


  render() {
    console.log("user role ", this.state.user.role);

    if(this.state.user.role == "user"){
    return (

      <div className="App">

          <div className="container">
         <p>Welcome {this.state.user.username}</p>
         <center><h3>Edit profile</h3></center>
         <MuiThemeProvider>
          <div>
           <TextField
           hintText={"Enter your Email"}
           floatingLabelText={"Email"}
           value={this.state.email}
           floatingLabelText="Email"
           onChange = {(event,newValue) => this.setState({email:newValue})}
           />
           <br/>
           Gender:
           <DropDownMenu value={this.state.gender} onChange={(event,index,value)=>this.handleGenderChange(value)}>
           <MenuItem value={"Female"} primaryText="Female" />
           <MenuItem value={"Male"} primaryText="Male" />
           <MenuItem value={"Other"} primaryText="Other"/>
           </DropDownMenu>
           <br/>
          Location:
           <DropDownMenu value={this.state.location} onChange={(event,index,value)=>this.handleLocationChange(value)}>
           <MenuItem value={"San Francisco,CA"} primaryText="San Francisco,CA" />
           <MenuItem value={"San Jose,CA"} primaryText="San Jose,CA" />
           <MenuItem value={"Los Angeles,CA"} primaryText="Los Angeles,CA" />
           <MenuItem value={"San Diego,CA"} primaryText="San Diego,CA" />
           </DropDownMenu>
           <br/>
       Category:
       <DropDownMenu value={this.state.category} onChange={(event,index,value)=>this.handleCategoryChange(value)}>
       <MenuItem value={"Model"} primaryText="Model" />
       <MenuItem value={"Photographer"} primaryText="Photographer" />
       <MenuItem value={"Designer"} primaryText="Designer" />
       </DropDownMenu>
           <br/>
           <br/>
           <TextField
           hintText="Enter your price(NUMBER)"
           floatingLabelText={"price"}
           value={this.state.price}
           floatingLabelText="price"
           onChange = {(event,newValue) => this.setState({price:newValue})}
           />
           <br/>
           <TextField
           hintText="Enter your description"
           floatingLabelText={"description"}
           value={this.state.description}
           floatingLabelText="description"
           onChange = {(event,newValue) => this.setState({description:newValue})}
           />
           <br/>
           <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
          </div>
       </MuiThemeProvider>
         <center><h3>Edit Password</h3></center>
         <MuiThemeProvider>
          <div>
           <TextField
           hintText={"Enter your Password"}
           floatingLabelText={"password"}
           floatingLabelText="password"
           type="password"
           onChange = {(event,newValue) => this.setState({password:newValue})}
           />
           <br/>
           <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClickPwd(event)}/>
          </div>
       </MuiThemeProvider>
          </div>
      </div>
    );
  }

  else{
    return(<div className="App">

        <div className="container">
       <p>Welcome {this.state.user.username}</p>
       <center><h3>Edit profile</h3></center>
       <MuiThemeProvider>
        <div>
         <TextField
         hintText={"Enter your Email"}
         floatingLabelText={"Email"}
         value={this.state.email}
         floatingLabelText="Email"
         onChange = {(event,newValue) => this.setState({email:newValue})}
         />
         <br/>
         Gender:
         <DropDownMenu value={this.state.gender} onChange={(event,index,value)=>this.handleGenderChange(value)}>
         <MenuItem value={"Female"} primaryText="Female" />
         <MenuItem value={"Male"} primaryText="Male" />
         <MenuItem value={"Other"} primaryText="Other"/>
         </DropDownMenu>
         <br/>

         Location:
          <DropDownMenu value={this.state.location} onChange={(event,index,value)=>this.handleLocationChange(value)}>
          <MenuItem value={"San Francisco,CA"} primaryText="San Francisco,CA" />
          <MenuItem value={"San Jose,CA"} primaryText="San Jose,CA" />
          <MenuItem value={"Los Angeles,CA"} primaryText="Los Angeles,CA" />
          <MenuItem value={"San Diego,CA"} primaryText="San Diego,CA" />
          </DropDownMenu>
          <br/>

         <br/>
         <TextField
         hintText="Enter your description"
         floatingLabelText={"description"}
         value={this.state.description}
         floatingLabelText="description"
         onChange = {(event,newValue) => this.setState({description:newValue})}
         />
         <br/>
         <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
        </div>
     </MuiThemeProvider>
       <center><h3>Edit Password</h3></center>
       <MuiThemeProvider>
        <div>
         <TextField
         hintText={"Enter your Password"}
         floatingLabelText={"password"}
         floatingLabelText="password"
         type="password"
         onChange = {(event,newValue) => this.setState({password:newValue})}
         />
         <br/>
         <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClickPwd(event)}/>
        </div>
     </MuiThemeProvider>
        </div>
    </div>
  );
  }
  }
}

const style = {
  margin: 15,
};
const style1 = {
  margin: 0,
};
export default ProfileScreen;
