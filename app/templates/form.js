import React from "react";
import ReactDOM from 'react-dom';
import "./form.html";
import Background from './images/ducky.jpg';
import {FormControl, FormGroup, ControlLabel, HelpBlock} from "react-bootstrap"


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
      <form>
        <FormGroup
          controlId="formBasicText"
        >
          <ControlLabel>Working example with validation</ControlLabel>
          <FormControl
            type="text"
            value={this.state.value}
            placeholder="Name of project"
            onChange={this.handleChange}
          />
          <FormControl.Feedback />
          <HelpBlock>Validation is based on string length.</HelpBlock>
        </FormGroup>
      </form>
    );
  }
}

var sectionStyle = {
    width: "100%",
    height: "400px",
    backgroundImage: `url(${Background})`
  };
  
  class Section extends React.Component {
    render() {
      return (
        <section style={ sectionStyle }>
        </section>
      );
    }
  }

ReactDOM.render(<FormExample />, document.getElementById('form'));
