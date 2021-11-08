import React from 'react';
import {
  MDBEdgeHeader,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBJumbotron,
  MDBIcon,
  MDBAnimation,
  MDBBtn 
} from 'mdbreact';
import MenuLink from '../components/menuLink';
import MyDatatablePage from '../pages/MyDatatablePage';

const CSSPage = () => {
  return (
    <>
    { /*<MDBEdgeHeader color='indigo darken-3' className='sectionPage' />*/ }
      <MDBAnimation type='fadeIn' duration='500ms'>

      <br /><br />
        <MDBContainer>
          <MDBRow>
            
            <MDBCol size="9">
              <br /> <MyDatatablePage />
            </MDBCol>

            <MDBCol size="3">
            <br />
                <MDBJumbotron className='mt-3'>
                  <h4 className='text-center'>Registrar usuario</h4><br />
                  <form>
                  <input type="text" placeholder="Nombre completo" id="defaultFormLoginEmailEx" className="form-control" />
                  <br />
                  <input type="email" placeholder="Correo electrónico" id="defaultFormLoginPasswordEx" className="form-control" />
                  <div className="text-center mt-4">
                    <MDBBtn color="indigo" type="submit">Registrar usuario</MDBBtn>
                  </div>
                </form>
                </MDBJumbotron>
            </MDBCol>
          

          
          </MDBRow>

        </MDBContainer>
      </MDBAnimation>
    </>
  );
};

export default CSSPage;
