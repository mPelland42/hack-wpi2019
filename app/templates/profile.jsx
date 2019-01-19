import React from "react";
import { render } from "react-dom";


class Profile extends React.Component{

  //no props
  constructor(props){
    super(props);
	var username = session['github_user'];
	var xhr = new XMLHttpRequest();
	xhr.open('GET', "/tags", true);
	xhr.onreadystatechange = this.accessTags;
	this.state = {
		username: username,
		tags: [],
		newTag = ""
	}
  }

  accessTags(){
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
			 </div);
	  });
  }

  updateNewTag(e){
	  this.setState({newTag, e.target.value});
  }

  saveNewTag(e){
	this.tags.push(this.state.newTag);
	this.setState({newTag: ""});
  }

  saveChanges(){
	//make the request to store in the database
  }


  render(){
	  //list of all tags
	  <div>
	  Your tags
		  <ul>
		  	{this.renderTags()}
		  </ul>
		  <input type="text" value={this.state.newTag} onChange={this.updateNewTag.bind(this)} >
		  <button onClick={this.saveNewTag.bind(this)}> Add Tag </button>
		  <button onClick={this.saveChanges.bind(this)}> Save Changes </button>
	  </div>
  }
};
