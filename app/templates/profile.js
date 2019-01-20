import "./profile.html"
import React from "react";
import ReactDOM from 'react-dom';

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
			 	<button name={tag} onClick={this.deleteTag}> Delete Tag </button>
				<div> {tag} </div>
			 </div>);
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
	  <div>
	  {this.state.userName}'s Selected Specialties
		  <ul>
		  	{this.renderTags()}
		  </ul>
		  <input type="text" value={this.state.newTag} onChange={this.updateNewTag.bind(this)} />
		  <button onClick={this.saveNewTag.bind(this)}> Add Tag </button>
		  <button onClick={this.saveChanges.bind(this)}> Save Changes </button>

		  <div>
		  You have {this.state.duckDuckCoins} Duck Duck Coins!
		  Help other programmers out to earn more of this useless fake currency!
		  </div>
	  </div>
  )
  }
};

ReactDOM.render(<Profile />, document.getElementById("profile"));
