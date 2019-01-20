import React from "react";
import ReactDOM from 'react-dom';
import "./form.html";
import Background from './images/ducky.jpg';
//import screenleap from "./js/screenleap.js"
import {FormControl, FormGroup, ControlLabel, HelpBlock, Button} from "react-bootstrap"

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

const formInstance = (
  <form className="fieldgroup">
    <FieldGroup
      id="formControlsText"
      type="text"
      label="Name of Project"
      placeholder="project name"
    />

  <FormGroup controlId="formControlsTextarea">
      <ControlLabel>Project Description</ControlLabel>
      <FormControl componentClass="textarea" placeholder="Describe project here" />
    </FormGroup>

    <FormGroup controlId="formControlsSelectMultiple">
      <ControlLabel>Languages & Skills</ControlLabel>
      <FormControl componentClass="select" multiple>
        <option value="c++">C++</option>
        <option value="c#">C#</option>
        <option value="python">Python</option>
        <option value="web_development">Web Development</option>
      </FormControl>
    </FormGroup>


  </form>
);


class FormExample extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      value: ''
    };
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  render() {
    return (
      formInstance
    );
  }
}

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
		  <div>
		  { this.getCorrectView() }
		  </div>
      );
    }
  }

ReactDOM.render(<BackgroundImg />, document.getElementById('bimg'));
//ReactDOM.render(<FormExample />, document.getElementById('form'));

export { FormExample };