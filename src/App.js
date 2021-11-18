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

// 1 = Admin, 2 = Capturador, 3 = User
function getCurrentUser() {
  console.log('Local storage: ' + localStorage.getItem('userType'));
  // return 2;
  return localStorage.getItem('userType');
}

class App extends Component {


  render() {

    
    let navbar;
    let permissions = getCurrentUser();
    if(permissions == 1) {
      navbar = <AdminNavbar />;
    } else if(permissions == 2) {
      navbar = <CapturadorNavbar />;
    } else  {
      navbar = <UserNavbar />;
    }

    return (

      <div>{navbar}</div>    
      
      // <AdminNavbar />
      // <CapturadorNavbar />
      // <UserNavbar />
    );
  }
}

export default App;
