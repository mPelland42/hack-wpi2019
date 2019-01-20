import React from "react";
import ReactDOM from 'react-dom';
import Background from './images/ducky.jpg';
import {FormControl, FormGroup, ControlLabel, HelpBlock} from "react-bootstrap"


class Nav extends React.Component {
  constructor(props, context) {
    super(props, context);

    console.log(props);
    console.log(context);

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
        <nav className="fh5co-nav" role="navigation">
              <div className="top-menu">
                <div className="container">
                  <div className="row">
                    <div className="col-xs-4">
		                   <span id="fh5co-logo"> <img src="images/logo_white.svg" height="80px" href="index.html"></img></span>
                    </div>
                    <div className="col-xs-8 text-right menu-1 nav-menu">
                      <ul>
                        <li className="active"><a href="index.html">Home</a></li>
                        <li><a href="courses.html">Search Ducks</a></li>
                        { this.props.username ? <li><a href="profile.html">My Profile</a></li> : '' }
                        <li><a href="contact.html">About</a></li>
                        { this.props.username ? '' : <li className="btn-cta"><a href="/login-github"><span><i className="fab fa-github"></i> Login with GitHub</span></a></li> }
                        { this.props.username ? <li><a><i className="fab fa-github"></i> Logged in as <b>{this.props.username}</b></a></li> : '' }
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
    );
  }
}

export { Nav };
