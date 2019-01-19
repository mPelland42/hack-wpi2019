import React from "react";
import ReactDOM from 'react-dom';
import "./form.html";
import Background from './images/ducky.jpg';
import {FormControl, FormGroup, ControlLabel, HelpBlock, Button} from "react-bootstrap"

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel className="fieldgroup">{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

const formInstance = (
  <form>
    <FieldGroup
      id="formControlsText"
      type="text"
      label="Name of Project"
      placeholder="project name"
    />

  <FormGroup controlId="formControlsTextarea">
      <ControlLabel className="fieldgroup">Project Description</ControlLabel>
      <FormControl componentClass="textarea" placeholder="Describe project here" />
    </FormGroup>

    <FormGroup controlId="formControlsSelectMultiple">
      <ControlLabel className="fieldgroup">Languages & Skills</ControlLabel>
      <FormControl componentClass="select" multiple>
        <option value="c++">C++</option>
        <option value="c#">C#</option>
        <option value="python">Python</option>
        <option value="web_development">Web Development</option>
      </FormControl>
    </FormGroup>

    <Button type="submit">Submit</Button>
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
    render() {
      return (
        <header id="fh5co-header" className="fh5co-cover" role="banner" style={ {backgroundImage: `url(${Background})`} } data-stellar-background-ratio="0.5">
              <div className="overlay"></div>
              <div className="container">
                <div className="row">
                  <div className="col-md-8 col-md-offset-2 text-center">
                    <div className="display-t">
                      <div className="display-tc">
                        <FormExample />
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
//ReactDOM.render(<FormExample />, document.getElementById('form'));
