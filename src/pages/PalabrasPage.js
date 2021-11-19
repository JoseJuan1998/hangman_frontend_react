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
import MyWordsPage from '../pages/MyWordsPage';


function validateUser() {       
  let permissions = localStorage.getItem('userType');
  if(permissions != 1 && permissions != 2) {
    window.location.replace('/');
  }    
}


const CSSPage = () => {
  validateUser();
  return (
    <>
    { /*<MDBEdgeHeader color='indigo darken-3' className='sectionPage' />*/ }
      <MDBAnimation type='fadeIn' duration='500ms'>

      <br /><br />
        <MDBContainer>
          <MDBRow>
            
            <MDBCol size="9">
              <br /> <MyWordsPage />
            </MDBCol>

            <MDBCol size="3">
            <br />
                <MDBJumbotron className='mt-3'>
                  <h4 className='text-center'>Nueva palabra</h4><br />
                  <form>
                  <input type="text" placeholder="Escribir palabra" id="defaultFormLoginEmailEx" className="form-control" />
                  <div className="text-center mt-4">
                    <MDBBtn color="indigo" type="submit">Registrar palabra</MDBBtn>
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
