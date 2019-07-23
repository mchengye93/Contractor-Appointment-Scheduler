import React, { Component } from 'react';
import './App.css';
import UserLogin from './components/UserLogin';

class App extends Component {

  constructor() {
    super();
    this.state = {users: []};
  }
  

  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }

  /*fetch('http://localhost:3000/UserLogin', {
  method: 'POST',
  headers: {
    'Accept': '../../app',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    firstParam: 'userName',
    secondParam: 'yourOtherValue',
  })
})*/

  render() {
    return (
      <div className="App">
      <div className="first">
        <h1>Users</h1>
        {this.state.users.map(user =>
          <div key={user.id}>{user.username}</div>
        )}
        </div>
        <div className="second">
          <UserLogin users={this.state.users} />
        </div>
      </div>
    );
  }
}

export default App;

