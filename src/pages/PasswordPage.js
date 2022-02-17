import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBAnimation } from 'mdbreact';
import axios from "axios";
import loading from '../assets/loading.gif'

function validateUser() {
  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get('id');
  const token = queryParams.get('token');
  localStorage.setItem('REMEMBER_PASSWORD_TOKEN', token);
  let permissions = localStorage.getItem('userType');
  if(id && id != null && token && token != null  && permissions == null ) {
    return true;
  } else {
    return false;
  }
}

function validPassword(password) {
  if(password.length < 8) {
    return false;
  } else {
    var hasUpperCase = /[A-Z]/.test(password);
    var hasLowerCase = /[a-z]/.test(password);
    var hasNumbers = /[0-9]/.test(password);
    if(hasUpperCase + hasLowerCase + hasNumbers < 3) {
      return false;
    } else {
      return true;
    }
  }
} // validPassword()

function redirect() {
  window.location.replace('/login');
}

async function crearContrasena() {
  let password1 = document.getElementById('password1').value;
  let password2 = document.getElementById('password2').value;
  
  if(password1.length > 0 && password2.length > 0) {
    if(password1 === password2) {
      document.getElementById('errorNotification').innerHTML = '';

      if(validPassword(password1)) {                
        const queryParams = new URLSearchParams(window.location.search);
        const id = queryParams.get('id');
        console.log(id);

      

        if(id && id != null) {
          // alert(id);
          let reqData = {
            "password_confirmation": password1,
            "password": password2
          }

          const config = {
            headers: { Authorization: "Bearer " + localStorage.getItem('REMEMBER_PASSWORD_TOKEN') }
          };

          // Pendiente: incluir headers de configuracion
          document.getElementById('loadingLogo').style.display = 'flex';
          const response = await axios.put('http://localhost:4001/manager/users/pass/' + id, reqData, config)
          .then(resp=>{
            console.log(resp.data);
            let userId = resp.data.user.id;
            // alert(userId);

            document.getElementById('aceptar').style.display = 'inline';
            document.getElementById('loadingLogo').style.display = 'none';
            document.getElementById('password1').style.display = 'none';
            document.getElementById('password2').style.display = 'none';
            document.getElementById('crearPassword').style.display = 'none';            
            document.getElementById('errorNotification').style.color = 'black';
            document.getElementById('errorNotification').style.fontWeight = 'normal';
            document.getElementById('errorNotification').innerHTML = 'La contraseña ha sido cambiada exitosamente. Ya puede iniciar sesión.';
            
             
          })
          .catch(error=>{
            document.getElementById('aceptar').style.display = 'inline';
            document.getElementById('loadingLogo').style.display = 'none';
            document.getElementById('password1').style.display = 'none';
            document.getElementById('password2').style.display = 'none';
            document.getElementById('crearPassword').style.display = 'none';            
            document.getElementById('errorNotification').style.color = 'red';
            document.getElementById('errorNotification').style.fontWeight = 'normal';
            document.getElementById('errorNotification').innerHTML = 'Sucedió un error al cambiar la contraseña. Inténtelo más tarde.';
                              
            console.log(error);
          }); 

        } 
      } else {
        document.getElementById('errorNotification').innerHTML = 'La contraseña no es segura. Debe tener al menos 8 caracteres, 1 letra mayúscula, 1 letra minúscula y 1 número.';
      }      
    
      
    } else {
      document.getElementById('errorNotification').innerHTML = 'Las contraseñas no coinciden.';
    }
  } else  {
    document.getElementById('errorNotification').innerHTML = 'Complete los campos antes de continuar';
  }
} // login()

function initFunction() {
  alert('!');
}

const PasswordPage = () => {
if(validateUser()) { 
  return (
    <MDBAnimation type='fadeIn' duration='500ms'>
      <MDBContainer>  
        <MDBRow>
          <MDBCol>
    
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '70vh'}}>  
              <MDBCard style={{ width: "22rem" }}>
                <MDBCardBody>
    
            
    
                  <form>
                    <p className="h4 text-center mb-4">Crear contraseña</p>
                      <MDBCol id="loadingLogo" style={{marginBottom: 20, display: 'none',  justifyContent:'center', alignItems:'center'}}>
                            <img src={loading} alt="loading..." />
                      </MDBCol>    
                    <p id="errorNotification" style={{ color: 'red', textAlign: "center", fontWeight: "bold"  }}></p>
                    <input type="password" placeholder="Contraseña" id="password1" className="form-control" />
                    <br />
                    <input type="password" placeholder="Repita su contraseña" id="password2" className="form-control" />
                    <div className="text-center mt-4">
                      <MDBBtn id="crearPassword" color="red" onClick={crearContrasena}>Crear contraseña</MDBBtn>                    
                      <MDBBtn id="aceptar" color="red" style={{display:'none'}} onClick={redirect}>ACeptar</MDBBtn>                         
                    </div>
                  </form>
    
              </MDBCardBody>
              </MDBCard>
            </div>    
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </MDBAnimation>    
    
    ); // return component
} else {
  window.location.replace('/palabras');
}

};

export default PasswordPage;