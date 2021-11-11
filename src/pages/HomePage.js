import React from 'react';
import {
  MDBEdgeHeader,
  MDBFreeBird,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBCardBody,
  MDBIcon,
  MDBCard,
  MDBCardTitle,
  MDBCardImage,
  MDBCardText,
  MDBAnimation,
  MDBNavLink
} from 'mdbreact';
import './HomePage.css';

class HomePage extends React.Component {
  scrollToTop = () => window.scrollTo(0, 0);

  render() {
    return (
      <>
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <div className='mt-3 mb-5'>
          <MDBFreeBird>
            <MDBRow>
              <MDBCol
                md='10'
                className='mx-auto float-none white z-depth-1 py-2 px-2'
              >
                <MDBCardBody className='text-center'>
                  <h2 className='h2-responsive mb-4'>
                    <strong className='font-weight-bold'>

                      TheHangManGameTeamOne
                    </strong>
                  </h2>
                  <MDBRow />
                  <p>Bienvenido a la página de juegos en linea "TheHangManGameTeamOne".</p>
 
                </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </MDBFreeBird>

        </div>
      </>
    );
  }
}

export default HomePage;
