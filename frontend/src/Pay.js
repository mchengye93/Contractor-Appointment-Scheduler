import React, { Component } from 'react';
import logo from './logo.svg';
import Checkout from './Checkout';
import './App.css';

class Pay extends Component {
  constructor(props){
    super(props);
    this.state={
    userid :this.props.user.id,
    price:this.props.user.price
    }
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Payment System</h2>
        </div>
        <p className="App-intro">
          <Checkout
            name={'Service Payment'}
            description={'Payment from userid:'+this.state.userid}
            amount={this.state.price}
          />
        </p>
      </div>
    );
  }
}

export default Pay;
