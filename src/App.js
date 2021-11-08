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

class App extends Component {
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
            <MDBNavbarBrand href='/' className='py-0 font-weight-bold'>
              {/* <Logo style={{ height: '2.5rem', width: '2.5rem' }} />*/ }  
              
              <strong><MDBIcon icon='home' /></strong>
              
            </MDBNavbarBrand>
            <MDBNavbarToggler
              onClick={this.toggleCollapse('mainNavbarCollapse')}
            />
            <MDBCollapse id='mainNavbarCollapse' isOpen={collapseID} navbar>
              <MDBNavbarNav right>
                <MDBNavItem>
                  <MDBNavLink
                    onClick={this.closeCollapse('mainNavbarCollapse')}
                    to='/usuarios'
                  >
                    <strong>Usuarios</strong>
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink
                    onClick={this.closeCollapse('mainNavbarCollapse')}
                    to='/palabras'
                  >
                    <strong>Palabras</strong>
                  </MDBNavLink>
                </MDBNavItem>

                <MDBNavItem className='mr-2'>
                  <MDBTooltip
                    placement='bottom'
                    domElement
                    style={{ display: 'block' }}
                  >
                    <a
                      className='nav-link Ripple-parent'
                      href='https://mdbootstrap.com/support/cat/react/'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <strong>
                        <MDBIcon icon='question-circle' />
                      </strong>
                    </a>
                    <span>SUPPORT</span>
                  </MDBTooltip>
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

export default App;
