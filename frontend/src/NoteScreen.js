import React, { Component } from 'react';
import './App.css';
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
import TextField from 'material-ui/TextField';
import axios from 'axios';
var request = require('superagent');
/* Note list page */
class NoteScreen extends Component {
  constructor(props){
    super(props);
    console.log(props);

    this.state={
      role:'student',
      filesPreview:[],
      filesToBeSent:[],
      draweropen:false,
      printcount:10,
      printingmessage:'',
      printButtonDisabled:false,
      user:this.props.user,
    noteItems:this.props.user.noteItems,
      notePreview:[],
      newtitle:'',
      newcontent:'',
      userid:this.props.user.id,
      edittitle:'abc',
      editcontent:'ccc',
    }
  }
  componentDidMount(){
    this.renderNotelist(this.state.noteItems);
  }
  componentWillMount(){

  }

  fetchDetails = (e) => {
    const data = e.target.getAttribute('data-item');
    console.log('We need to get the details for ', data);
  }
  isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }
  renderNotelist(noteItems){
  var self = this;
    var notePreview=[];
  console.log(noteItems);
  self.setState({noteItems:noteItems});
    notePreview = this.renderResultTable(noteItems);
    this.setState({notePreview});

    this.setState({role:this.props.role,user:this.props.user});
  }
  /*show table > tr*/
  renderResultRows(noteItems) {
    var self = this;
    return noteItems.map((data,index) =>{
        return (
            <tr key={index} data-item={data} onClick={(event) =>this.fetchDetails(event)}>
                <td data-title="id">{data.id}</td>
                <td data-title="title">{data.title}</td>
                <td data-title="content">{data.content}</td>
        <td data-title="content">
            <RaisedButton label="Edit" primary={true} style={style} onClick={(event) => self.handleNoteEditClick(event,index)}/>
            <RaisedButton label="Delete" primary={true} style={style} onClick={(event) => self.handleNoteDelClick(event,index)}/>
        </td>
            </tr>
        );
    });
  }
  /* show table */
  renderResultTable(data) {
    var self = this;
    return(
    <MuiThemeProvider>
      <div>
      <div className="noteheader">
       <center><h3>Note list</h3></center>
      <RaisedButton  label="NewNote" primary={true} style={style1} onClick={(event) => this.handleNoteCreateClick(event)}/>
      </div>
      <div className="notecontainer">
           <table className="notetable">
            <tr>
            <th>ID</th>
            <th>TITLE</th>
            <th>CONTENT</th>
            <th></th>
            </tr>
            <tbody>

            {!this.isEmpty(data)
                        ? this.renderResultRows(data)
                        : ''}
             </tbody>
          </table>
       </div>
       </div>
      </MuiThemeProvider>
  );
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
  /*
  note edit
  */
  handleNoteEditClick(event,i){
    var self = this;
    console.log(i);
    console.log(event.target.getAttribute('data-tag'));
    //this.setState({edittitle:this.state.user.noteItems[i].title});
   // this.setState({editcontent:this.state.user.noteItems[i].content});
    this.state.edittitle = this.state.noteItems[i].title;
    this.state.editcontent = this.state.noteItems[i].content;
    console.log(this.state.edittile );
    var localloginComponent = [];
  localloginComponent.push(
    <MuiThemeProvider>
    <div>
     <TextField
       type="text"
       hintText="Enter Note title"
       value={this.state.edittitle}
       floatingLabelText="Title"
       onChange = {(event,newValue) => this.onTodoChange(newValue,0,i)}
       />
     <br/>
       <TextField
       type="text"
       hintText="Enter Note Content!"
       value = {this.state.editcontent}
       floatingLabelText="Content"
       onChange = {(event,newValue) => this.onTodoChange(newValue,1,i)}
       />
       <br/>
       <RaisedButton label="Edit" primary={true} style={style} onClick={(event) => this.handleNoteEditData(event,i)}/>
       <RaisedButton label="Cancel" primary={true} style={style} onClick={() => this.renderNotelist(this.state.noteItems)}/>
     </div>
     </MuiThemeProvider>
  )
     this.setState({notePreview:localloginComponent})
    //this.props.appContext.setState({userPage:userPage,uploadScreen:[]})

  }
  /*
   note del click
  */
  handleNoteDelClick(event,i){
    var self = this;
    console.log(i);
    console.log(event.target.getAttribute('data-tag'));
    axios.get('/api/notes/'+this.state.userid+"/items/"+this.state.noteItems[i].id)//api/notes/1/items/1
       .then(function (response) {
       console.log(response);
       if(response.data.code == 200){
         console.log("note delete successfull");
         //console.log(response.data.user);
         //var uploadScreen=[];
         //uploadScreen.push(<UserPage appContext={self.props.appContext} role={self.state.loginRole} user={response.data.user} />)
         self.setState({edittitle:""});
         self.setState({editcontent:""});
         alert("Congradulations!Delete Note info Successfully!");
     axios.get('/api/users/'+self.state.userid)//api/notes/1/items/1
       .then(function (response) {
       console.log(response);
       if(response.data.code == 200){
       console.log("get successfull");
       //console.log(response.data.user);
       //var uploadScreen=[];
       //uploadScreen.push(<UserPage appContext={self.props.appContext} role={self.state.loginRole} user={response.data.user} />)

       self.renderNotelist(response.data.user.noteItems);
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
  /*
   get input content change
  */
  onTodoChange(value,index,i){
    console.log(index);
    var titlev = this.state.edittitle;
    var contilev = this.state.editcontent;
    //console.log(this.state.edittitle);
    if(index == 0){
    titlev = value;
    }else{
    contilev = value;
    }
    var localloginComponent = [];
    localloginComponent.push(
        <MuiThemeProvider>
        <div>
         <TextField
           type="text"
           hintText="Enter Note title"
           value={titlev}
           floatingLabelText="Title"
           onChange = {(event,newValue) => this.onTodoChange(newValue,0,i)}
           />
         <br/>
           <TextField
           type="text"
           hintText="Enter Note Content!"
           value = {contilev}
           floatingLabelText="Content"
           onChange = {(event,newValue) => this.onTodoChange(newValue,1,i)}
           />
           <br/>
           <RaisedButton label="Create" primary={true} style={style} onClick={(event) => this.handleNoteEditData(event,i)}/>
           <RaisedButton label="Cancel" primary={true} style={style} onClick={() => this.renderNotelist(this.state.noteItems)}/>
         </div>
         </MuiThemeProvider>
      )
    this.setState({edittitle:titlev});
  this.setState({editcontent:contilev});
  this.setState({notePreview:localloginComponent})
  }
  handleNoteEditData(event,i){
    var self = this;
    console.log(this.state.edittitle);
    console.log(this.state.editcontent);
    console.log(this.state.noteItems[i]);
    if(this.state.edittitle.length>0 && this.state.editcontent.length>0) {
      var payload={
      "title":this.state.edittitle,
      "content":this.state.editcontent,
      }
      console.log(payload);
      axios.post('/api/notes/'+this.state.userid+"/items/"+this.state.noteItems[i].id, payload)//api/notes/1/items/1
       .then(function (response) {
       console.log(response);
       if(response.data.code == 200){
       console.log("note update successfull");
       //console.log(response.data.user);
       //var uploadScreen=[];
       //uploadScreen.push(<UserPage appContext={self.props.appContext} role={self.state.loginRole} user={response.data.user} />)
       self.setState({edittitle:""});
       self.setState({editcontent:""});
       alert("Congradulations!Update Note info Successfully!");
       axios.get('/api/users/'+self.state.userid)//api/notes/1/items/1
         .then(function (response) {
         console.log(response);
         if(response.data.code == 200){
         console.log("get successfull");
         //console.log(response.data.user);
         //var uploadScreen=[];
         //uploadScreen.push(<UserPage appContext={self.props.appContext} role={self.state.loginRole} user={response.data.user} />)

         self.renderNotelist(response.data.user.noteItems);
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
    } else{
      alert("title or content is null!");
    }

  }
  /* create note */
  handleNoteCreateClick(event){
   var self = this;
    var localloginComponent = [];
    if(1){
     localloginComponent.push(
          <MuiThemeProvider>
            <div>
             <TextField
               type="text"
               hintText="Enter Note title"
               floatingLabelText="Title"
               onChange = {(event,newValue) => this.setState({newtitle:newValue})}
               />
             <br/>
               <TextField
                 type="text"
                 hintText="Enter Note Content!"
                 floatingLabelText="Content"
                 onChange = {(event,newValue) => this.setState({newcontent:newValue})}
                 />
               <br/>
               <RaisedButton label="Create" primary={true} style={style} onClick={(event) => this.handleNoteUploadData(event)}/>
         <RaisedButton label="Cancel" primary={true} style={style} onClick={() => this.renderNotelist(this.state.noteItems)}/>
           </div>
           </MuiThemeProvider>
        )
  }
     this.setState({notePreview:localloginComponent})
}
 /* update note */
 handleNoteUploadData(event){
    var self = this;
    if(this.state.newtitle.length>0 && this.state.newcontent.length>0) {
      var payload={
        "title":this.state.newtitle,
        "content":this.state.newcontent,
      }
      console.log(payload);
      axios.post('/api/notes/'+this.state.userid, payload)
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
         alert("Congradulations!Create Note Successfully!");
     axios.get('api/users/'+self.state.userid)
       .then(function (response) {
       console.log(response);
       if(response.data.code == 200){
       console.log("note create successfull");
       console.log(response.data.user);
       //var uploadScreen=[];
       //uploadScreen.push(<UserPage appContext={self.props.appContext} role={self.state.loginRole} user={response.data.user} />)
       //ss.setState({newtitle:""});
       //ss.setState({newcontent:""});
       self.renderNotelist(response.data.user.noteItems);
       }
       else if(response.data.code == 404){
       console.log("Note create fail");
       alert(response.data.success)
       }
       else{
       console.log("Note create fail");
       alert("Note create fail");
       }
       })
       .catch(function (error) {
       console.log(error);
       });
       }
       else if(response.data.code == 404){
         console.log("Note create fail");
         alert(response.data.success)
       }
       else{
         console.log("Note create fail");
         alert("Note create fail");
       }
       })
       .catch(function (error) {
       console.log(error);
       });
     } else{
       alert("title or content is null");
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
  render() {
    //console.log(this.props.user.noteItems);
    //this.generateRows();
    /*
    let rowComponents = this.generateRows(this.props.user.noteItems);
      let table_rows = []
      let table_headers = [];
      let data = this.props.users.noteItems;
    if (this.props.user.noteItems.length >0){
      let headers = Object.keys(this.props.user.noteItems[0]);
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
export default NoteScreen;
