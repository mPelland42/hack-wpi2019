//waiting room component.  display loading animation until finding a pair

import React from "react";
import ReactDOM from 'react-dom';
import Background from './images/ducky.jpg';
import {Nav} from './nav.js'

class WaitingRoom extends React.Component{
	constructor(props){
		super(props);
		this.xhr = new XMLHttpRequest();
		this.xhr.open('GET', "/partner", true);
		this.xhr.onreadystatechange = this.displayButton.bind(this);
		this.xhr.send();

		this.state = {
			status: "waiting",
			viewUrl: ""
		}
	}

	displayButton(){
		console.log("response received");
		var response = JSON.parse(this.xhr.responseText);
		console.log("url is " + response.url);
		this.setState({status : "showButton", viewUrl: response.url});
	}

	viewScreen(){
		this.setState({status:"viewingScreen"});
		//window.location.href = this.state.viewUrl;
	}

	goHome(){
		window.location.href = window.location.href.split("waitingRoom")[0];
	}

	render(){
		return(
			<div style={ {"width": "100%", "height": "100vh"} }> 
			<Nav />
			{
				this.state.status == "viewingScreen" ?
				<div>
				<button onClick={this.goHome}> Go Home </button>
				<iframe src={this.state.viewUrl} style={ {"width": "100%", "height": "100vh"} }> </iframe>
				</div>
				:

		<header id="fh5co-header" className="fh5co-cover" role="banner" style={ {backgroundImage: `url(${Background})`} } data-stellar-background-ratio="0.5">
              <div className="overlay"></div>
              <div className="container">
                <div className="row">
                  <div className="col-md-8 col-md-offset-2 text-center">
                    <div className="display-t">
                      <div className="display-tc">
					  {this.state.status=="showButton"
					  	  ?
						  <button onClick={this.viewScreen.bind(this)}> Go To Chat Room </button>
						  :
						  <div className="fh5co-loader"></div>
					  }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
        </header>
	}
	</div>
	)
	}

}




ReactDOM.render(<WaitingRoom />, document.getElementById("waitingRoom"));
