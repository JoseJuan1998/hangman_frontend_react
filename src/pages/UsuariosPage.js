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
         return false;
       } else {
         return true;
       }
}
        

async function registrarUsuario(validacion) {
  if (event.key === 'Enter' || validacion === true) {


  document.getElementById('errorNotification').innerHTML = '';
  let regName = document.getElementById('regName').value;
  let regLastname = document.getElementById('regLastname').value;
  let regEmail = document.getElementById('regEmail').value;
  if(regName.length > 0 && regEmail.length > 0 && regLastname.length > 0) {
    if(validateEmail(regEmail)) {
        let reqData = {
          "name": regName,
          "lastname": regLastname,
          "email": regEmail
        }  
        console.log(reqData);
        const config = {
          headers: { Authorization: "Bearer " + localStorage.getItem('TOKEN_AUTH') }
        };
        const response = await axios.post('http://localhost:4001/manager/users', reqData, config)
        .then(resp=>{
          console.log(resp.data);          
          window.location.reload(false);
        })  
        .catch(error=>{
          if(error.response) {
            let mensaje;
            if(error.response.data.credential.email) {
              mensaje = error.response.data.credential.email[0];
            }                        
            let notificacion = 'Ha sucedido un error, por favor inténtelo más tarde';
            if(mensaje == 'Email already exist') {
              notificacion = 'El correo electrónico del usuario ya ha sido registrado';
            }           
          document.getElementById('errorNotification').innerHTML = notificacion;                            
          }             
          console.log(error.response.data.credential.email);
        });
    } else {
        document.getElementById('errorNotification').innerHTML = 'Ingrese un correo electrónico correcto';
    }    
  } else {
    document.getElementById('errorNotification').innerHTML = 'Complete todos los campos antes de continuar';
  }

  } // if event.key = enter
} //registrarUsuario()


function registrarUsuarioClick() {
  registrarUsuario(true);
}


const CSSPage = () => {
  if(!validateUser()) {
    window.location.replace('/');
  } else {

  
  
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

            <MDBCol size="3" style={{ paddingTop: 20 }}>            
                <MDBJumbotron className='mt-3'>
                  <h4 className='text-center'>Registrar usuario</h4><br />
                  <p id="errorNotification" style={{ color: 'red', textAlign: "center", fontWeight: "bold", fontSize: 15  }}></p> 
                  
                  <input onKeyDown={registrarUsuario} id="regName" type="text" placeholder="Nombre(s)" className="form-control" />
                  <br /><input onKeyDown={registrarUsuario} id="regLastname" type="text" placeholder="Apellidos" className="form-control" />
                  <br />
                  <input onKeyDown={registrarUsuario} id="regEmail" type="email" placeholder="Correo electrónico" className="form-control" />
                  <div className="text-center mt-4">
                    <MDBBtn onClick={registrarUsuarioClick} color="indigo">Registrar</MDBBtn>
                  </div>
                
                </MDBJumbotron>
            </MDBCol>
          
          
          </MDBRow>

        </MDBContainer>
      </MDBAnimation>
    </>
   );
  }
};

export default CSSPage;
