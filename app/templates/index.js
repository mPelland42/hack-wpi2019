import React from "react";
import ReactDOM from 'react-dom';
import './index.html';
import { Nav } from './nav.js';
import { Header } from './header.js';

var username = document.getElementById('nav').getAttribute('data-username');
ReactDOM.render(<Nav username={username}/>, document.getElementById('nav'));
ReactDOM.render(<Header />, document.getElementById('header'));
