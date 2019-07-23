import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import axios from 'axios';
/*
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
*/

import UserPage from './UserPage';


const AnyReactComponent = ({ text }) => <div>{text}</div>;

class MyMap extends Component {

  constructor(props){

    super(props);


    this.state={
      //userLongitudes: [],
      //userLatitudes: [],
      user:this.props.user,
      userid :this.props.user.id,
      location:this.props.user.location,
      longitude:this.props.user.latitude,
      latitude: this.props.user.longitude,
      username: this.props.user.username,
    }
   // postShit();
  }


/*postShit(event){

      var self = this;

      console.log("USER Name: "+this.props.user.username+ " ID: "+this.props.user.id);
      var payload={
        "longitude":this.state.user.latitude,
        "latitude": this.state.user.longitude,
      }


      console.log("PAYLOAD "+payload);

      axios.post('/api/dates/'+this.state.userid, payload)
      .then(function (response) {
          console.log("response "+response);
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

  }*/


  render() {

    //this.postShit(event);
    console.log("*****longitude "+parseFloat(this.props.user.longitude));
    console.log("****latitude " +parseFloat(this.props.user.latitude));


    var long1 = parseFloat(this.props.user.longitude);
    var latit = parseFloat(this.props.user.latitude);

    console.log("LONG "+long1);
    console.log("LAT "+latit);

    return (
      <GoogleMapReact
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
        style={{height: '300px', width: '400px'}}
      >
        <AnyReactComponent
          lat={latit}
          lng={long1}
          text={this.props.user.username} />
        <AnyReactComponent
          //lat={37.7723}
          //lng={-122.4523}
          //text={'USF2'}
          />
      </GoogleMapReact>
    );
  }
}

MyMap.defaultProps = {

  center: {lat: 37.77, lng: -122.45},
  zoom: 11
};

export default MyMap;
