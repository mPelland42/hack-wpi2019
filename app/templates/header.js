import React from "react";
import ReactDOM from 'react-dom';
import Background from './images/ducky.jpg';
import Duckon from './images/duck.png'

import {FormControl, FormGroup, ControlLabel, HelpBlock} from "react-bootstrap"

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}

$(document).ready( function () {
    $('#down').on('click',function () {
    $("html").scrollTop(0);
    $('html, body').animate({
        scrollTop: $(".main").offset().top }, 1000);
    });
});


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
                <h1>Frustrated Programmers in Your Area Want to Duck</h1>
                <h2><i>Pair up with another programmer and use <b>Rubber Duck Debugging</b> to solve your problems faster!</i></h2>
                <p><a className="btn btn-primary btn-lg btn-learn" href="#"><i className="icon-search"></i> Find a DuckBuddy™</a> <a className="btn btn-primary btn-lg btn-video" href="#"><img src={Duckon}></img>  Get Ducked</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <span id="down">&#8595;</span>

    </header>
    );
  }
}

export { Header }
