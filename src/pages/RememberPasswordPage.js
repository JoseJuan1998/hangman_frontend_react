import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBAnimation } from 'mdbreact';
import { Email } from "@material-ui/icons";
import { blue, red } from "@material-ui/core/colors";
import Routes from "../Routes";
import axios from 'axios';
import loading from '../assets/loading.gif'


function validateUser() {       
    let permissions = localStorage.getItem('userType');
    if(permissions == 1 || permissions == 2) {
      return false;
    } else {
      return true;
    }    
  }


function redirect() {
    window.location.replace('/');
}

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
function rememberPasswordClick() {
  rememberPassword(true);
} // rememberPasswordClick()

async function rememberPassword(validacion) {
  if (event.key === 'Enter' || validacion == true) { 
      document.getElementById('errorNotification').innerHTML = '';
      let email = document.getElementById('emailRemember').value;
      if(validateEmail(email)) {
          document.getElementById('loadingLogo').style.display = 'flex';
          let reqData = {
              "email": email
            }
            
          const response = await axios.post('http://localhost:4001/manager/users/reset/pass', reqData)
          .then(resp=>{
            console.log(resp.data);
            document.getElementById('emailRemember').style.display = 'none';
            document.getElementById('aceptar').style.display = 'inline';
            document.getElementById('rememberPwdButton').style.display = 'none';
            document.getElementById('errorNotification').style.color = 'black';
            document.getElementById('errorNotification').style.fontWeight = 'normal';
            document.getElementById('instructions').innerHTML = '';
            document.getElementById('errorNotification').innerHTML = 'Se ha enviado exitósamente un correo de recuperación de contraseña a ' + email;                  
          })  
          .catch(error=>{
            if(error.response) {
              let mensaje = error.response.data.email;
              let notificacion = 'Ha sucedido un error, por favor inténtelo más tarde';
              if(mensaje == 'Credential not found') {
                notificacion = 'No existe una cuenta con este correo electrónico';
              }
              document.getElementById('errorNotification').innerHTML = notificacion;
              console.log(error.response);
            }          
          });
          console.log(response);        
      } else {
          document.getElementById('errorNotification').innerHTML = 'El correo electrónico no es válido';
      }
      document.getElementById('loadingLogo').style.display = 'none';
  } // rememberPassword()

  async function tempLogout() {
    const response = await axios.delete('http://localhost:4001/manager/logout')
    .then(resp=>{
      console.log(resp.data);
    })  
    .catch(error=>{
      alert(error.response.data.error);
      console.log(error.response);
    });
    console.log(response);
  }
} // logout()

const RememberPasswordPage = () => {
if(validateUser()) {


return (
<MDBAnimation type='fadeIn' duration='500ms'>
  <MDBContainer>  
    <MDBRow>
      <MDBCol>

        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '70vh'}}>  
          <MDBCard style={{ width: "22rem" }}>
            <MDBCardBody>

                <p className="h4 text-center mb-4">Recordar contraseña</p>
                <p id="errorNotification" style={{ color: 'red', textAlign: "center", fontWeight: "bold"  }}></p>                         
                
                    <MDBCol id="loadingLogo" style={{marginBottom: 20, display: 'none',  justifyContent:'center', alignItems:'center'}}>
                      <img src={loading} alt="loading..." />
                    </MDBCol>                  
                
                  <p id="instructions">Ingrese el correo electrónico de su cuenta</p>
                <input onKeyPress={rememberPassword} type="email" placeholder="Correo electrónico" id="emailRemember" className="form-control" />
                <br />
                <div className="text-center mt-4">
                  <MDBBtn id="rememberPwdButton" color="red" onClick={rememberPasswordClick}>Recordar contraseña</MDBBtn>
                  <MDBBtn id="aceptar" color="red" style={{display:'none'}} onClick={redirect}>ACeptar</MDBBtn>
                                      
                </div>
              

          </MDBCardBody>
          </MDBCard>
        </div>    
      </MDBCol>
    </MDBRow>
  </MDBContainer>
</MDBAnimation>
); // return component
} else {
  window.location.replace('/palabras')
}
};

export default RememberPasswordPage;