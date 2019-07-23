import React from 'react'
//import fetchUser from './fetchUser';

export class UserLogin extends React.Component {

	state = {
    	userName: '',
    	email: '',
    	password: ''
   	};

   	handleSignIn = this.handleSignIn.bind(this);

  	handleSignIn(e) {
    	e.preventDefault();
    	const { userName, email, password } = this.state;
    	//this.props.dispatch(fetchUser({ userName, email, password }));
    	console.log(this.state);
  	}


   	handleChange(column, value) {
    	const newState = {};
    	newState[column] = value;
    	this.setState(newState);
  }
  

render() {

	const { userName, email, password } = this.state;

  	return (
      	<div className="container">

        	<h1>Login Foo</h1>

	        <form className="form" onSubmit={e => this.handleSignIn(e)}>
	          <input
	            type="text"
	            placeholder="user name"
	            value={userName}
	            onChange={e => this.handleChange('userName', e.target.value)} /><br />
	            <input
	            type="text"
	            placeholder="email"
	            value={email}
	            onChange={e => this.handleChange('email', e.target.value)} /><br />
	          <input
	            type="password"
	            placeholder="Password"
	            value={password}
	            onChange={e => this.handleChange('password', e.target.value)} /><br />
	          <button type="submit">Login</button>
	        </form>
      	</div>
    );
  }

}



export default UserLogin;

