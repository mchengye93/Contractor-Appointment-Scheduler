import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import Login from './Login';
/*
  Register page
*/
class Register extends Component {
  constructor(props){
    super(props);
	  console.log(this.props.role);
    this.state={
      username:'',
      email:'',
      password:'',
      gender:'',
      location:'',
      latitude: '',
      longitude: '',
      category:'',
      price:'',
      description:'',
      role:this.props.role,
    }
  }
  componentWillReceiveProps(nextProps){
    console.log("nextProps",nextProps);
  }
  /* check email */
  isValidEmailAddress(emailAddress) {
     var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
     return pattern.test(emailAddress);
  };
  /* check num */
  checkNum(input) {
    var m = (/[\d]+(\.[\d]+)?/).exec(input);
    return m;
  }

  /* register btn click function */
  handleClick(event,role){

    console.log("the role right now: ", role);

    if(role == "user"){
      console.log("enters in user if block");
      // console.log("values in register handler",role);
      var self = this;
      //To be done:check for empty values before hitting submit
      if(this.state.username.length==0 || this.state.email.length==0 ||  this.state.password.length==0 ||  this.state.gender.length==0 ||  this.state.location.length==0 || this.state.category.length == 0 || this.state.price.length==0 ||  this.state.description.length==0){
  		  alert("Input Value must not be empty!");
    	}
    	else if(this.state.gender != 'Male' && this.state.gender!= 'Female' && this.state.gender != 'Other'){
    		alert("Please select a gender!");
    	}else if( !this.isValidEmailAddress(this.state.email)){
    		alert("Email format is wrong!");
    	}else if(!this.checkNum( this.state.price )){
    		alert("Price must be number!");
    	}
      else{
        var payload={
    		  "username": this.state.username,
    		  "email":this.state.email,
    		  "password":this.state.password,
    		  "gender":this.state.gender,
    		  "location":this.state.location,
          "latitude": this.state.latitude,
          "longitude": this.state.longitude,
    		  "category": this.state.category,
    		  "price":this.state.price,
    		  "description":this.state.description,
          "role":this.state.role,
  	    }
  	    axios.post('/api/users', payload)

    	  .then(function (response) {
      	  console.log(response);
      	  if(response.data.code == 200){
      	  //  console.log("registration successfull");
      	     var loginscreen=[];
      	     loginscreen.push(<Login parentContext={this} appContext={self.props.appContext} role={role}/>);
      	     var loginmessage = "Not Registered yet? Go to registration";
      	     self.props.parentContext.setState({loginscreen:loginscreen,
        		   loginmessage:loginmessage,
        		   buttonLabel:"Register",
        		   isLogin:true
      	     });
      	     alert("Resgister successfully!");
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

    else{

    	// console.log("values in register handler",role);
    	var self = this;
    	//To be done:check for empty values before hitting submit
     	if(this.state.username.length==0 || this.state.email.length==0 ||  this.state.password.length==0 ||  this.state.gender.length==0 ||  this.state.location.length==0 ||  this.state.description.length==0){
      		alert("Input Value must not be empty!");
    	}
    	else if(this.state.gender != 'Male' && this.state.gender!= 'Female' && this.state.gender != 'Other'){
      		alert("Please select a gender!");
    	}else if( !this.isValidEmailAddress(this.state.email)){
      		alert("Email format is wrong!");
    	}

    	else{
        var payload={
          "username": this.state.username,
          "email":this.state.email,
          "password":this.state.password,
          "gender":this.state.gender,
          "location":this.state.location,
          "latitude": this.state.latitude,
          "longitude": this.state.longitude,
          "category": "clientuser",
      	   "price":0,
      	   "description":this.state.description,
      	   "role":this.state.role,
        }
        axios.post('/api/users', payload)

        .then(function (response) {
          console.log(response);
          if(response.data.code == 200){
            //  console.log("registration successfull");
             var loginscreen=[];
             loginscreen.push(<Login parentContext={this} appContext={self.props.appContext} role={role}/>);
             var loginmessage = "Not Registered yet? Go to registration";

             self.props.parentContext.setState({loginscreen:loginscreen,
               loginmessage:loginmessage,
               buttonLabel:"Register",
               isLogin:true
             });
             alert("Resgister successfully!");
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
  }

  handleMenuChange(value){
    console.log("menuvalue",value);
    this.setState({role:value});
    //this.setState({menuValue:value,                   loginComponent:localloginComponent,                   loginRole:loginRole})
  }


  handleLocationChange(value){
    //console.log("location value", value);

    if(value === "San Francisco,CA") {
      this.setState({latitude:"37.7766"});
      console.log("location value", this.state.latitude);
      this.setState({longitude:"-122.4507"});
      console.log("SF");
    } else if(value === "San Jose,CA") {
      this.setState({latitude:"37.3382"});
      this.setState({longitude:"-121.8863"});
      console.log("SJ");
    } else if(value === "Los Angeles,CA") {
      this.setState({latitude:"34.0522"});
      this.setState({longitude:"-118.2437"});
      console.log("LA");
    } else if(value === "San Diego,CA") {
      this.setState({latitude:"32.7157"});
      this.setState({longitude:"-117.1611"});
      console.log("SD");
    }

    this.setState({location:value});
  }

  handleLatitudeChange(value) {
    console.log("location value", value);
    if(value === "San Francisco,CA") {
      this.setState.latitude = 37.7766;
      this.setState.longitude = -122.4507;
    }
    console.log("Lat: ",this.state.latitude);
  //this.setState({latitude:value});
  }

  handleGenderChange(value){
    console.log("gender value: ", value);
    this.setState({gender:value})
  }

  handleCategoryChange(value){
    console.log("category value", value);
    this.setState({category:value});
  }

  render() {
    // console.log("props",this.props);
    if(this.state.role =='user') {
      return (
        <div>
          <MuiThemeProvider>
            <div>
            <AppBar
               title="Register" />
             <TextField
               hintText="Enter your Username"
               floatingLabelText="Username"
               onChange = {(event,newValue) => this.setState({username:newValue})}
               />
             <br/>
             <TextField
               hintText={"Enter your Email"}
               floatingLabelText={"Email"}
               onChange = {(event,newValue) => this.setState({email:newValue})}
               />
             <br/>
             <TextField
               type = "password"
               hintText="Enter your Password"
               floatingLabelText="Password"
               onChange = {(event,newValue) => this.setState({password:newValue})}
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
  		      <TextField
               hintText="Enter your price"
               floatingLabelText="price"
               onChange = {(event,newValue) => this.setState({price:newValue})}
            />
             <br/>
  		      <TextField
               hintText="Enter your description"
               floatingLabelText="description"
               onChange = {(event,newValue) => this.setState({description:newValue})}
               />
             <br/>
             <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event,this.props.role)}/>
            </div>
           </MuiThemeProvider>
        </div>
      );
    }


    else{
          // this.setState({price:0});
          // this.setState({category:"client"});
      return (

        <div>
          <MuiThemeProvider>
            <div>
            <AppBar
               title="Register" />
             <TextField
               hintText="Enter your Username"
               floatingLabelText="Username"
               onChange = {(event,newValue) => this.setState({username:newValue})}
               />
             <br/>
             <TextField
               hintText={"Enter your Email"}
               floatingLabelText={"Email"}
               onChange = {(event,newValue) => this.setState({email:newValue})}
               />
             <br/>
             <TextField
               type = "password"
               hintText="Enter your Password"
               floatingLabelText="Password"
               onChange = {(event,newValue) => this.setState({password:newValue})}
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

  		      <TextField
               hintText="Enter your description"
               floatingLabelText="description"
               onChange = {(event,newValue) => this.setState({description:newValue})}
               />
             <br/>
             <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event,this.props.role)}/>
            </div>
           </MuiThemeProvider>
        </div>
      );
    }
  }
}

const style = {
  margin: 15,
};

export default Register;
