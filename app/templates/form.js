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
      <div className="button" style={ {backgroundColor: 'rgba(200,200,200,0.7)', color: '#222' } }>
      <h1 style={ {paddingTop: '50px', marginBottom: '35px'} }>
      Find a DuckBuddy
        </h1>
    <h3>Name of Project </h3>
    <input type="text" value={this.state.name} onChange={this.handleNameChange.bind(this)}/>
    <h3>Description </h3>
    <input type="text" value={this.state.description} onChange={this.handleDescriptionChange.bind(this)}/>
    <h3>
    Languages and Skills
      </h3><ul style={ {marginTop: '20px'} }>
		  	{this.renderTags()}
		  </ul><div style={ {paddingBottom: '20px', paddingRight: '20px', paddingLeft: '20px'} }>
		  <input type="text" style={ {verticalAlign: 'middle'} }value={this.state.newTag} onChange={this.updateNewTag.bind(this)} />
		  <button className="btn btn-info btn-sm" onClick={this.saveNewTag.bind(this)}> Add Tag </button>
		  <button className="btn btn-success btn-sm" onClick={this.saveChanges.bind(this)}> Save Changes </button>
      </div>
    </div>
  )
  }
  
};
  
  class BackgroundImg extends React.Component {

	  constructor(props){
		  super(props);
		  this.state = {status: "setting up"};
	  }

	  startSharing(){
		console.log("making the http call");
		this.xhr = new XMLHttpRequest();
  		this.xhr.open('POST', "https://api.screenleap.com/v2/screen-shares", true);
  		this.xhr.onreadystatechange = this.linkMade.bind(this);
		this.xhr.setRequestHeader("accountid", "mpelland42");
		this.xhr.setRequestHeader("authtoken", "JjvVEXNKEE") ;
        this.xhr.setRequestHeader("isSecure", "true");
        this.xhr.send();
	  }

	  linkMade(){
		  var response = JSON.parse(this.xhr.responseText);
		  console.log(response);
		  var screenleap = new Screenleap();
		  screenleap.startSharing("IN_BROWSER", response);
		  this.xhr2 = new XMLHttpRequest();
    	  this.xhr2.open('POST', "/ducking", true);
		  console.log(response.viewerUrl);
  		  this.xhr2.send(JSON.stringify(response));
	  }

	  getCorrectView(){
		  if (this.state.status == "setting up"){
			  return (
				  <header id="fh5co-header" className="fh5co-cover" role="banner" style={ {backgroundImage: `url(${Background})`} } data-stellar-background-ratio="0.5">
		                <div className="overlay"></div>
		                <div className="container">
		                  <div className="row">
		                    <div className="col-md-8 col-md-offset-2 text-center">
		                      <div className="display-t">
		                        <div className="display-tc">
		                          <FormExample />
		  						<Button type="submit" onClick={this.startSharing.bind(this)}>Submit</Button>
		                        </div>
		                      </div>
		                    </div>
		                  </div>
		                </div>
		          </header>
			  )
		  }
		  else if(this.state.status == "waiting for connection"){
			  <div class="fh5co-loader"></div>
		  }
		  else{
			  <div> Sharing Screen </div>
		  }
	  }

    render() {
		//var view = this.getCorrectView()
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
                        <Form />
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
