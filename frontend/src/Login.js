import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios';

import UserPage from './UserPage';
import ClientPage from './ClientPage';
/*
 login page
*/
class Login extends Component {
  constructor(props){
    super(props);
    var localloginComponent=[];
    localloginComponent.push(
      <MuiThemeProvider>
        <div>
         <TextField
		   type="text"
           hintText="Enter your username"
           floatingLabelText="username"
           onChange = {(event,newValue) => this.setState({username:newValue})}
           />
         <br/>
           <TextField
             type="password"
             hintText="Enter your Password"
             floatingLabelText="Password"
             onChange = {(event,newValue) => this.setState({password:newValue})}
             />
           <br/>
           <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
       </div>
       </MuiThemeProvider>
    )
    this.state={
      username:'',
      password:'',
      loginComponent:localloginComponent
    }
  }
  componentWillMount(){
  // console.log("willmount prop values",this.props);
	  console.log("in student componentWillMount");
      var localloginComponent=[];
      localloginComponent.push(
        <MuiThemeProvider>
          <div>
           <TextField
             hintText="Enter your Username"
             floatingLabelText="username"
             onChange = {(event,newValue) => this.setState({username:newValue})}
             />
           <br/>
             <TextField
               type="password"
               hintText="Enter your Password"
               floatingLabelText="Password"
               onChange = {(event,newValue) => this.setState({password:newValue})}
               />
             <br/>
             <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
         </div>
         </MuiThemeProvider>
      )
      this.setState({loginComponent:localloginComponent})
  }
  /* login btn click function */
  handleClick(event){
    var self = this;
		if(this.state.username.length>0 && this.state.password.length>0) {
		var payload={
		  "username":this.state.username,
			"password":this.state.password,
		}
		axios.post('/api/users/check', payload)
	   .then(function (response) {
		 console.log(response);
		 if(response.data.code == 200){
		   console.log("Login successfull");
		   console.log(response.data.user);

		   var uploadScreen=[];
		   if(response.data.user.role == "user"){
		      uploadScreen.push(<UserPage appContext={self.props.appContext} role={response.data.user.role } user={response.data.user} />)
		   }else{
			    uploadScreen.push(<ClientPage appContext={self.props.appContext} role={response.data.user.role } user={response.data.user} />)
		   }
		   self.props.appContext.setState({loginPage:[],uploadScreen:uploadScreen})
		 }
		 else if(response.data.code == 404){
		   console.log("Username password do not match");
		   alert(response.data.success)
		 }
		 else{
		   console.log("Username does not exists");
		   alert("Username does not exist");
		 }
	   })
	   .catch(function (error) {
		 console.log(error);
	   });
	   } else{
		   alert("username or password is null");
	   }
  }
  /* change login page to  register page*/
  handleMenuChange(){
    //console.log("menuvalue",value);
     var localloginComponent=[];
      localloginComponent.push(
        <MuiThemeProvider>
          <div>
           <TextField
             hintText="Enter your Username"
             floatingLabelText="username"
             onChange = {(event,newValue) => this.setState({username:newValue})}
             />
           <br/>
             <TextField
               type="password"
               hintText="Enter your Password"
               floatingLabelText="Password"
               onChange = {(event,newValue) => this.setState({password:newValue})}
               />
             <br/>
             <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
         </div>
         </MuiThemeProvider>
      )
    this.setState({
                   loginComponent:localloginComponent,
                   })
  }
  render() {
    return (
      <div>
        <MuiThemeProvider>
        <AppBar
             title="Login"
           />
        </MuiThemeProvider>
        {this.state.loginComponent}
      </div>
    );
  }
}

const style = {
  margin: 15,
};

export default Login;
