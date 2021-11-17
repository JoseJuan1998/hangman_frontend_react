import React, { Component } from 'react';
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavItem,
  MDBFooter,
  MDBNavLink,
  MDBTooltip,
  MDBIcon
} from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';
import { ReactComponent as Logo } from './assets/logo.svg';
import Routes from './Routes';
import AdminNavbar from './pages/AdminNavbar';
import CapturadorNavbar from './pages/CapturadorNavbar';
import UserNavbar from './pages/UserNavbar';


class App extends Component {


  render() {


    return (
      <AdminNavbar />
    );
  }
}

export default App;
