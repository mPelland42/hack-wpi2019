import React from "react";
import ReactDOM from 'react-dom';
import Background from './images/ducky.jpg';
import Duckon from './images/duck.png'
import {FormControl, FormGroup, ControlLabel, HelpBlock} from "react-bootstrap"


class Header extends React.Component {
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
      <header id="fh5co-header" className="fh5co-cover" role="banner" style={ {backgroundImage: 'url(images/ducky.jpg)'} } data-stellar-background-ratio="0.5">
      <div className="overlay"></div>
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-md-offset-2 text-center">
            <div className="display-t">
              <div className="display-tc">
                <h1>sad coders in your area want to duck :(</h1>
                <h2><i>pair up with another programmer and use rubber duck debugging to solve your problems faster</i></h2>
                <p><a className="btn btn-primary btn-lg btn-learn" href="#"><i className="icon-search"></i> Find a DuckBuddy™</a> <a className="btn btn-primary btn-lg btn-video" href="#"><img src={Duckon}></img>  Get Ducked</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
    );
  }
}

export { Header }