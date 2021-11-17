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
import Routes from '../Routes';

class UserNavbar extends Component {


  render() {
    


    return (
      <Router>
        <div className='flyout'>
          <MDBNavbar color='#ef5350 red lighten-1' dark expand='md' fixed='top' scrolling>
            <MDBNavbarBrand href='/' className='py-0 font-weight-bold'>
              {/* <Logo style={{ height: '2.5rem', width: '2.5rem' }} />*/ }                
              <strong><MDBIcon icon='home' /></strong>              
            </MDBNavbarBrand>
          </MDBNavbar>
          <main style={{ marginTop: '4rem' }}>
            <Routes />
          </main>
          <MDBFooter color='#ef5350 red lighten-1'>
            <p className='footer-copyright mb-0 py-3 text-center'>
              &copy; {new Date().getFullYear()} Copyright:
              <a href='https://www.MDBootstrap.com'> TheHangManGameTeamOne </a>
            </p>
          </MDBFooter>
        </div>
      </Router>
    );
  }
}

export default UserNavbar;
