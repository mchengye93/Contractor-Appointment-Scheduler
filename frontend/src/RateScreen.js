import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import HistoryClientScreen from './HistoryClientScreen'
class RateScreen extends Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.number,
    editing: PropTypes.bool,
    starCount: PropTypes.number,
    starColor: PropTypes.string,
    onStarClick: PropTypes.func,
    renderStarIcon: PropTypes.func,
    renderStarIconHalf: PropTypes.func
  };

  static defaultProps = {
    starCount: 5,
    value: 0,
    editing: true,
    starColor: '#ffb400',
    emptyStarColor: '#333'
  };

  constructor(props) {
    super(props);
    console.log(props);
    console.log("props data",props.data);
    if (props.role!='user'){
    console.log("props.role:", props.role);
    console.log("props data",props.data);
    console.log("props.data.user", props.data.user);
    console.log("Role of user getting rate: props.data.role:", props.data.user.role);


    this.state = {
      searchItems:[],
      userid:props.data.user.id,

      datestep:12,
      value: props.value,
      fromUserId: props.data.clientid,
      toUserId:props.data.dateId,
      dateId:props.data.id,
      rating:'0',
      review:'',
      role:'client',
    };
  }
  else {
    this.state = {
      searchItems:[],
      userid:props.data.dateId,
      datestep:12,
      value: props.value,
      fromUserId: props.data.dateId,
      toUserId:props.data.clientid,
      dateId:props.data.id,
      rating:'0',
      review:'',
      role:'user',
    };

  }
  }

  componentWillReceiveProps(nextProps) {
    const { value } = nextProps;

    if (value != null && (value !== this.state.value)) {
      this.setState({ value });
    }
  }

  onChange(value) {
    const { editing } = this.props;

    if (!editing) {
      return;
    }

    this.setState({ value });
  }

  onStarClick(index, value, name) {
    const { onStarClick, editing } = this.props;
    this.setState({rating:value})
    console.log(this.state.rating);

    if (!editing) {
      return;
    }

    onStarClick && onStarClick(index, value, name);
  }

  renderStars() {
    const { name, starCount, starColor, emptyStarColor, editing } = this.props;
    const { value } = this.state;
    const starStyles = (i, value) => ({
      float: 'right',
      cursor: editing ? 'pointer' : 'default',
      color: value >= i ? starColor : emptyStarColor
    });
    const radioStyles = {
      display: 'none',
      position: 'absolute',
      marginLeft: -9999
    };

    // populate stars
    let starNodes = [];

    for (let i = starCount; i > 0; i--) {
      const id = `${name}_${i}`;
      const starNodeInput = (
        <input
          key={`input_${id}`}
          style={radioStyles}
          className="dv-star-rating-input"
          type="radio"
          name={name}
          id={id}
          value={i}
          checked={value === i}
          onChange={this.onChange.bind(this, i, name)} />
      );
      const starNodeLabel = (
        <label
          key={`label_${id}`}
          style={starStyles(i, value)}
          className={'dv-star-rating-star ' + (value >= i ? 'dv-star-rating-full-star' : 'dv-star-rating-empty-star')}
          htmlFor={id}
          onClick={this.onStarClick.bind(this, i, value, name)} >
          {this.renderIcon(i, value, name)}
        </label>
      );
      //console.log("Value in Render Star:", value);
      //this.setState({review:value});
      starNodes.push(starNodeInput);
      starNodes.push(starNodeLabel);
    }

    return starNodes;
  }

  renderIcon(index, value, name) {
    const { renderStarIcon, renderStarIconHalf } = this.props;

    if (
      typeof renderStarIconHalf === 'function' &&
      Math.ceil(value) === index &&
      value % 1 !== 0
    ) {
      return renderStarIconHalf(index, value, name);
    }

    if (typeof renderStarIcon === 'function') {
      return renderStarIcon(index, value, name);
    }

    return <i style={{fontStyle: 'normal'}}>&#9733;</i>;
  }

  handleClick(event,value) {
    var self = this;
    var average = 0;
    console.log("the value right now: ", this.state.value);


      if(this.state.value===0){
        alert("The rating cannot be 0!");
      }
      else {

        var currentScreen=[];
       // self=this;

        axios.post('/api/rate/'+this.state.value+'/'+ this.state.dateId+'/'+this.state.fromUserId+'/'+this.state.toUserId+'/'+this.state.review)
        .then(function (response) {
         // var avgRating = 0;
          if(response.data.code === 200){

             console.log("rating response: ",response);
             var ratingScreen=[];
             ratingScreen.push(<RateScreen value={value}/>);
             alert("Rating successful!");

             }

             })
        .catch(function (error) {
          console.log(error);
        });

        if (this.state.role == 'client'){
          axios.post('/api/dates/userGotRated/'+this.state.dateId+'/'+this.state.value);
          console.log("user got rated!");
        }

        //get user's new average and update user's rating
        else {
          axios.post('/api/dates/clientGotRated/'+this.state.dateId+'/'+this.state.value);
          console.log("client got rated!");
        }
        //update user's rating
       axios.get('/api/rate/average/'+this.state.toUserId).then(function (response) {
           // var avgRating = 0;
            if(response.data.code === 200){
               console.log("Average rating of rated user",response);
               average = response.data.rateAvg;
               }

               })
          .catch(function (error) {
            console.log(error);
          });



      }


      //update on dateItem if client or user rated the appointment

  }

  render() {
    const { editing, className } = this.props;
    const classes = cx('dv-star-rating', {
      'dv-star-rating-non-editable': !editing
    }, className);

    return (
      <div>
        <MuiThemeProvider>
          <div>
            <div style={{display: 'inline-block', position: 'relative'}} className={classes}>
              <h2> Rate User Here: </h2>
                {this.renderStars()}
                <br />
                <TextField
                type="text"
                hintText="Please leave a review!"
                value = {this.state.review}
                floatingLabelText="Review"
                onChange = {(event,newValue) => this.setState({review:newValue})} />
                <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event,this.props.value)}/>
            </div>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

const style = {
  margin: 15,
};

export default RateScreen;
