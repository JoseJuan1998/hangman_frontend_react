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
import axios from 'axios';

async function registrarUsuario() {
  
  let regName = document.getElementById('regName').value;
  let regEmail = document.getElementById('regEmail').value;
 
  let reqData = {
    "name": regName, 
    "credential": {
      "email": regEmail, 
      "password": "DummyPassword321", 
      "password_confirmation": "DummyPassword321",
      "admin": false, 
      "active": "false"
    }
  }
  
  console.log(reqData);
  const response = await axios.post('http://hangmangame1-usuarios.eastus.cloudapp.azure.com:4001/api/users', reqData);
  console.log(response.data);
  window.location.reload(false);
} //registrarUsuario()

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
                  <input id="regName" type="text" placeholder="Nombre completo" className="form-control" />
                  <br />
                  <input id="regEmail" type="email" placeholder="Correo electrónico" className="form-control" />
                  <div className="text-center mt-4">
                    <MDBBtn onClick={registrarUsuario} color="indigo">Registrar usuario</MDBBtn>
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
