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
  MDBIcon, 
  MDBBtn
} from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from '../Routes';
import axios from 'axios';

async function logout() {
  const response = await axios.delete('http://localhost:4001/manager/logout')
  .then(resp=>{
    console.log(resp.data);
    window.location.replace('/login');
  })  
  .catch(error=>{
    alert('Ha ocurrido un error al intentar conectarse al servidor');
    console.log(error.response);
  });
  console.log(response);
  localStorage.removeItem("userType");
  localStorage.removeItem('TOKEN_AUTH');
  localStorage.removeItem('USER_NAME');
} // logout()

class CapturadorNavbar extends Component {
  state = {
    collapseID: ''
  };

  toggleCollapse = collapseID => () =>
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : ''
    }));

  closeCollapse = collID => () => {
    const { collapseID } = this.state;
    window.scrollTo(0, 0);
    collapseID === collID && this.setState({ collapseID: '' });
  };

  render() {
    const overlay = (
      <div
        id='sidenav-overlay'
        style={{ backgroundColor: 'transparent' }}
        onClick={this.toggleCollapse('mainNavbarCollapse')}
      />
    );

    const { collapseID } = this.state;

    return (
      <Router>
        <div className='flyout'>
          <MDBNavbar color='#ef5350 red lighten-1' dark expand='md' fixed='top' scrolling>
          
           <MDBNavbarBrand className='py-0 font-weight-bold'>
              {/* <Logo style={{ height: '2.5rem', width: '2.5rem' }} />*/ }                
              <strong>¡Hola, {localStorage.getItem('USER_NAME')}!</strong>            
            </MDBNavbarBrand>

            <MDBNavbarToggler
              onClick={this.toggleCollapse('mainNavbarCollapse')}
            />
            <MDBCollapse id='mainNavbarCollapse' isOpen={collapseID} navbar>
              <MDBNavbarNav right>

                <MDBNavItem>
                  <MDBNavLink
                    onClick={this.closeCollapse('mainNavbarCollapse')}
                    to='/palabras'
                  >
                    <strong>Palabras</strong>
                  </MDBNavLink>
                </MDBNavItem>

                <MDBNavItem>
                <MDBNavLink
                    onClick={logout}
                    to='#!'
                  >
                    <strong>Logout</strong>
                  </MDBNavLink>
                </MDBNavItem>

              </MDBNavbarNav>
            </MDBCollapse>
          </MDBNavbar>
          {collapseID && overlay}
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

export default CapturadorNavbar;
