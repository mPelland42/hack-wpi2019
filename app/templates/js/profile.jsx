import "profile.html"
import React from "react";
import { ReactDOM } from "react-dom";


class Profile extends React.Component{

  //no props
  constructor(props){
    super(props);
	var username = "mpelland42";
	var xhr = new XMLHttpRequest();
	xhr.open('GET', "/tags", true);
	xhr.send("user="+username);
	xhr.onreadystatechange = this.accessTags;
	this.state = {
		username: username,
		tags: [],
		newTag: ""
	}
  }

  accessTags(){
	  console.log("accessing tags");
	  if (xhr.readyState == 4 && xhr.status == 200) {
        var response = JSON.parse(xhr.responseText);
        alert(response.ip);
		console.log(response);
    }
  }

  deleteTag(){
	  delete this.state.tags[tag]
  }

  renderTags(){
	  return this.state.tags.map(function(tag){
		 return (<div>
			 	<button onCLick={this.deleteTag.bind(tag)}> Delete Tag </button>
				<div> {tag} </div>
			 </div>);
	  });
  }

  updateNewTag(e){
	  this.setState({newTag: e.target.value});
  }

  saveNewTag(e){
	this.tags.push(this.state.newTag);
	this.setState({newTag: ""});
  }

  saveChanges(){
	var saveTags = new XMLHttpRequest();
  	saveTags.open('POST', "/saveTags", true);
	saveTags.onLoad = function() {
		console.log(this.responseText);
	}
	saveTags.send("user=" + this.state.userName + "&tags=" + JSON.stringify(this.state.tags));
  }


  render(){
	  //list of all tags
	  <div>
	  Your tags
		  <ul>
		  	{this.renderTags()}
		  </ul>
		  <input type="text" value={this.state.newTag} onChange={this.updateNewTag.bind(this)} />
		  <button onClick={this.saveNewTag.bind(this)}> Add Tag </button>
		  <button onClick={this.saveChanges.bind(this)}> Save Changes </button>
	  </div>
  }
};

ReactDOM.render(<Profile />, document.getElementById("profile"));
