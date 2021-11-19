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


function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function validateUser() {       
       let permissions = localStorage.getItem('userType');
       if(permissions != 1) {
         window.location.replace('/');
       }    
}
        

async function registrarUsuario() {
  document.getElementById('errorNotification').innerHTML = '';
  let regName = document.getElementById('regName').value;
  let regEmail = document.getElementById('regEmail').value;
 
  if(regName.length > 0 && regEmail.length > 0) {

    if(validateEmail(regEmail)) {
        let reqData = {
          "name": regName,
          "email": regEmail
        }  
        console.log(reqData);
        const response = await axios.post('http://hangmangame1-usuarios.eastus.cloudapp.azure.com:4001/manager/users', reqData)
        .then(resp=>{
          console.log(resp.data);          
          window.location.reload(false);
        })  
        .catch(error=>{
          if(error.response) {          
            document.getElementById('errorNotification').innerHTML = error.response.data.email;
          }                  
          console.log(error);
        });

    } else {
        document.getElementById('errorNotification').innerHTML = 'Ingrese un correo electrónico correcto';
    }
    

  } else {
    document.getElementById('errorNotification').innerHTML = 'Complete todos los campos antes de continuar';
  }

} //registrarUsuario()

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
              <br /> <MyDatatablePage />
            </MDBCol>

            <MDBCol size="3">
            <br />
                <MDBJumbotron className='mt-3'>
                  <h4 className='text-center'>Registrar usuario</h4><br />
                  <p id="errorNotification" style={{ color: 'red', textAlign: "center", fontWeight: "bold", fontSize: 15  }}></p> 
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
