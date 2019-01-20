import "./profile.html"
import React from "react";
import ReactDOM from 'react-dom';
import Background from './images/ducky.jpg';
import DuckCoin from './images/duckduckcoin.png'
import {FormExample} from "./form.js"

class Profile extends React.Component{

  //no props
  constructor(props){
    super(props);
	this.xhr = new XMLHttpRequest();
	this.xhr.open('GET', "/userInfo", true);
	this.xhr.onreadystatechange = this.accessUserInfo.bind(this);
	this.xhr.send();
	this.state = {
		userName: "",
		tags: [],
		newTag: "",
		duckDuckCoins: 0
	}
	this.accessUserInfo = this.accessUserInfo.bind(this);
	this.deleteTag = this.deleteTag.bind(this);
	this.renderTags = this.renderTags.bind(this);
	this.updateNewTag = this.updateNewTag.bind(this);
	this.saveNewTag = this.saveNewTag.bind(this);
	this.saveChanges = this.saveChanges.bind(this);
  }

  accessUserInfo(){
	  console.log("accessing tags");
	  if (this.xhr.readyState == 4 && this.xhr.status == 200) {
        var response = JSON.parse(this.xhr.responseText);
		//response is userData object
		this.setState(response);
	}
  }

  deleteTag(e){
	  var index = this.state.tags.indexOf(e.target.name);
	  if (index !== -1) this.state.tags.splice(index, 1);
	  this.forceUpdate();
  }

  renderTags(){
	  return this.state.tags.map(function(tag){
		 return (<div>
			 	{tag} <button className="btn btn-danger btn-sm" style={ {float: 'right', marginRight: '10px', marginTop:'5px'} } name={tag} onClick={this.deleteTag}> Delete Tag </button>
			 <div style={ {clear: 'both'} }></div></div>);
	  }.bind(this));
  }

  updateNewTag(e){
	  this.setState({newTag: e.target.value});
  }

  saveNewTag(e){
	console.log(this.state.newTag);
	if(!this.state.tags.includes(this.state.newTag) && this.state.newTag != ""){
		this.state.tags.push(this.state.newTag);
	}
	this.setState({newTag: ""});
  }

  saveChanges(){
	var saveTags = new XMLHttpRequest();
  	saveTags.open('POST', "/saveTags", true);
	saveTags.onLoad = function() {
		console.log(this.responseText);
	}
	var sendString = JSON.stringify(this.state)
	console.log(sendString);
	saveTags.send(sendString);
  }

  render(){
	  //list of all tags
	  return (
	  <div className="button" style={ {backgroundColor: 'rgba(200,200,200,0.7)', color: '#222' } }>
		<h1 style={ {paddingTop: '50px', marginBottom: '35px'} }>
	  {this.state.userName}'s Selected Specialties
		  </h1><ul style={ {marginTop: '20px'} }>
		  	{this.renderTags()}
		  </ul>
		  <input type="text" style={ {verticalAlign: 'middle'} }value={this.state.newTag} onChange={this.updateNewTag.bind(this)} />
		  <button className="btn btn-info btn-sm" onClick={this.saveNewTag.bind(this)}> Add Tag </button>
		  <button className="btn btn-success btn-sm" onClick={this.saveChanges.bind(this)}> Save Changes </button>

		  <div style={ {paddingTop:'20px', marginBottom: '-15px'} }>
		  You have </div> <span style={ {fontSize: '60px', verticalAlign: 'middle'} }> {this.state.duckDuckCoins}</span><img src={DuckCoin} height="175px" width="175px" /> 
			<div style={ {paddingBottom: '20px', paddingRight: '20px', paddingLeft: '20px', marginTop: '-10px'} }>Duck Duck Coins! Help other programmers out to earn more of this useless fake currency!
		  </div>
	  </div>
  )
  }
};
  
  class BackgroundImg extends React.Component {
    render() {
      return (
        <header className="fh5co-cover-2" role="banner" style={ {backgroundImage: `url(${Background})`} } data-stellar-background-ratio="0.5">
              <div className="overlay"></div>
              <div className="container">
                <div className="row">
                  <div className="col-md-8 col-md-offset-2 text-center" style={ {display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		textAlign: 'center', minHeight: '100vh'}} >
                    <div style={ {verticalAlign:'center'} }>
                        <Profile />
                    </div>
                  </div>
                </div>
              </div>

        </header>
      );
    }
  }

ReactDOM.render(<BackgroundImg />, document.getElementById('bimg'));

//ReactDOM.render(<Profile />, document.getElementById("profile"));
