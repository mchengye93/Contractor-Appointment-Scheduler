import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import FontIcon from 'material-ui/FontIcon';
import {blue500, red500, greenA200} from 'material-ui/styles/colors';
import LoginScreen from './Loginscreen'
// import ChatScreen from './chat_components/Layout';

import ProfileScreen from './ProfileScreen';
import NoteScreen from './NoteScreen';
import DateScreen from './DateScreen';
import SearchScreen from './SearchScreen'
import PaymentScreen from './PaymentScreen';
import RatingScreen from './RatingScreen';
import Checkout from './Checkout';
import Pay from './Pay';
import StripeProvider from './components/Provider';
import HistoryUserScreen from './HistoryUserScreen';

import axios from 'axios';
/*User page include nav */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {draweropen: false,currentScreen:[]};
  }
  componentDidMount(){
    var currentScreen=[];
    //currentScreen.push(<ProfileScreen appContext={this.props.appContext} role={this.props.role} user={this.props.user} />);
	  //console.log("lala");
	currentScreen.push(<NoteScreen appContext={this.props.appContext} role={this.props.role} user={this.props.user} />);
    this.setState({currentScreen})
  }
  /**
   * Toggle opening and closing of drawer
   * @param {*} event
   */
  toggleDrawer(event){
  // console.log("drawer click");
  this.setState({draweropen: !this.state.draweropen})
  }
  /*nav bar click*/
  handleMenuClick(event,page){
    switch(page){
      case "notelist":
		  // console.log("need to open uploadapge")
		  console.log(this.props);
		  var currentScreen=[];
		  currentScreen.push(<NoteScreen appContext={this.props.appContext} role={this.props.role} user={this.props.user}/>);
		  this.setState({currentScreen})
      	break;
      case "profile":
		  // console.log("need to open pastfiles")
		  var currentScreen=[];
		  currentScreen.push(<ProfileScreen appContext={this.props.appContext} role={this.props.role} user={this.props.user}/>);
      this.setState({currentScreen});

      	break;
        case "history":
  		  // console.log("need to open pastfiles")
  		  var currentScreen=[];
  		  currentScreen.push(<HistoryUserScreen appContext={this.props.appContext} role={this.props.role} user={this.props.user}/>);
            this.setState({currentScreen});

        	break;
      case "datelist":
        var currentScreen=[];
		    //currentScreen.push(<DateScreen appContext={this.props.appContext} role={this.props.role} user={this.props.user}/>);
		    this.setState({currentScreen})
		  // console.log("need to open uploadapge")
		    console.log(this.props);
        self = this;
        axios.get('/api/users/'+self.props.user.id)//api/notes/1/items/1
           .then(function (response) {
           console.log(response);
           if(response.data.code == 200){
           console.log("get successfull");
           //console.log(response.data.user);
           //var uploadScreen=[];
           //uploadScreen.push(<UserPage appContext={self.props.appContext} role={self.state.loginRole} user={response.data.user} />)
           self.setState({user:response.data.user});
           self.setState({dataItems:response.data.user.dateItems});
             console.log(response.data.user.dateItems);
             //currentScreen.push(<ProfileScreen appContext={this.props.appContext} role={this.props.role} user={response.data.user}/>);
             currentScreen.push(<DateScreen appContext={self.props.appContext} role={self.props.role} user={response.data.user}/>);
             self.setState({currentScreen});
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

      	break;

        case "payment":

        var currentScreen=[];
        self=this;
        axios.get('api/payment/retrieve/')
        .then(function (response) {
          if (response.data.code ==200){
            console.log(response);


            self.setState({paymentItems:response.data.Payment});
            currentScreen.push(<PaymentScreen appContext={self.props.appContext} payment={response.data.Payment}/>);
            self.setState({currentScreen});
          }
        //  console.log(payload);
          console.log(this.state.paymentItems);
        })
        .catch(function (error) {
          //console.log(payload);
          console.log(error);
        });
        break;

        case "ratings":

        var currentScreen=[];
        self=this;
        console.log(this.props.user.id);
        axios.get('api/rate/retrieve/'+this.props.user.id)
        .then(function (response) {
          if (response.data.code ==200){
            console.log(response);


            self.setState({ratingsItems:response.data.rate});
            currentScreen.push(<RatingScreen appContext={self.props.appContext} ratings={response.data.rate}/>);
            self.setState({currentScreen});
          }
        //  console.log(payload);
          console.log(this.state.ratingsItems);
        })
        .catch(function (error) {
          //console.log(payload);
          console.log(error);
        });
        break;


        // case "chat":
        // var currentScreen=[];
        // currentScreen.push(<ChatScreen appContext={this.props.appContext} role={this.props.role} user={this.props.user} />);
        // this.setState({currentScreen});
        //   break;


      case "logout":
		  var loginPage =[];
		  loginPage.push(<LoginScreen appContext={this.props.appContext}/>);
		  this.props.appContext.setState({loginPage:loginPage,uploadScreen:[]})
      	break;
    }
    this.setState({draweropen:false})
  }
  render() {
    return (
      <div className="App">
        <MuiThemeProvider>
          <AppBar
            title="Control Panel"
            onLeftIconButtonTouchTap={(event) => this.toggleDrawer(event)}
          />
        </MuiThemeProvider>
        <MuiThemeProvider>
          <Drawer open={this.state.draweropen}>
              <div>
              <MenuItem onClick={(event) => this.handleMenuClick(event,"notelist")}>
                  Note list
              </MenuItem>
              <MenuItem onClick={(event) => this.handleMenuClick(event,"profile")}>
                  Profile
              </MenuItem>
              <MenuItem onClick={(event) => this.handleMenuClick(event,"ratings")}>
                  Ratings
              </MenuItem>
              <MenuItem onClick={(event) => this.handleMenuClick(event,"history")}>
                        History
                    </MenuItem>
			  <MenuItem onClick={(event) => this.handleMenuClick(event,"datelist")}>
                  Calendar
              </MenuItem>
              <MenuItem onClick={(event) => this.handleMenuClick(event,"payment")}>
                  Payment History
              </MenuItem>
              <MenuItem onClick={(event) => this.handleMenuClick(event,"logout")}>
                  Logout
              </MenuItem>
              </div>
          </Drawer>
        </MuiThemeProvider>
        <div>
          {this.state.currentScreen}
        </div>
      </div>
    );
  }
}

export default App;
