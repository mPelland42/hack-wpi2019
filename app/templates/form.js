import {FormControl, FormGroup, ControlLabel, HelpBlock, Button} from "react-bootstrap"
import "./form.html"
import React from "react";
import ReactDOM from 'react-dom';
import Background from './images/ducky.jpg';
class Form extends React.Component{

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
    name:"",
    description:""
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
        {tag} <button className="btn btn-danger btn-sm" style={ {float: 'right', marginRight: '10px'} } name={tag} onClick={this.deleteTag}> Delete Tag </button>
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

  handleNameChange(e){
    this.setState({name:e.target.value})
  }

  handleDescriptionChange(e){
    this.setState({description:e.target.value})
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
    <div className="button">
    <h2>Name of Project </h2>
    <input type="text" value={this.state.name} onChange={this.handleNameChange.bind(this)}/>
    <h2>Description </h2>
    <input type="text" value={this.state.description} onChange={this.handleDescriptionChange.bind(this)}/>
    <h2>
    Languages and Skills
      </h2><ul>
        {this.renderTags()}
      </ul>
      <input type="text" value={this.state.newTag} onChange={this.updateNewTag.bind(this)} />
      <button className="btn btn-info btn-sm" onClick={this.saveNewTag.bind(this)}> Add Tag </button>
      <button className="btn btn-success btn-sm" onClick={this.saveChanges.bind(this)}> Save Changes </button>
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
                  <div className="col-md-8 col-md-offset-2 text-center">
                    <div className="display-t">
                      <div className="display-tc">
                        <Form />
                      </div>
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

export { FormExample };