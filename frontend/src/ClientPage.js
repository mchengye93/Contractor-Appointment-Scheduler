import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import FontIcon from 'material-ui/FontIcon';
import {blue500, red500, greenA200} from 'material-ui/styles/colors';
import LoginScreen from './Loginscreen'
//import ChatScreen from './chat_components/Layout';

import ProfileScreen from './ProfileScreen';
import NoteScreen from './NoteScreen';
import DateScreen from './DateScreen';
import SearchScreen from './SearchScreen';
import RatingScreen from './RatingScreen';
import LocationScreen from './LocationScreen';
import HistoryClientScreen from './HistoryClientScreen';

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
    currentScreen.push(<SearchScreen appContext={this.props.appContext} role={this.props.role} user={this.props.user} />);
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
      case "search":
      console.log(this.props);
      var currentScreen=[];
      currentScreen.push(<SearchScreen appContext={this.props.appContext} role={this.props.role} user={this.props.user}/>);
      this.setState({currentScreen})
      break;
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
      currentScreen.push(<HistoryClientScreen appContext={this.props.appContext} role={this.props.role} user={this.props.user}/>);
      this.setState({currentScreen});

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

      case "location":
      // console.log("need to open pastfiles")
      var currentScreen=[];
      currentScreen.push(<LocationScreen appContext={this.props.appContext} role={this.props.role} user={this.props.user}/>);
      this.setState({currentScreen});
      break;


      // case "chat":
      // var currentScreen=[];
      // currentScreen.push(<ChatScreen appContext={this.props.appContext} role={this.props.role} user={this.props.user} />);
      // this.setState({currentScreen});
      // break;


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
      <MenuItem onClick={(event) => this.handleMenuClick(event,"search")}>
      Search
      </MenuItem>
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

      <MenuItem onClick={(event) => this.handleMenuClick(event,"location")}>
      Locate Professional
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
