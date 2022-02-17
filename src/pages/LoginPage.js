import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBAnimation } from 'mdbreact';
import { Email } from "@material-ui/icons";
import { blue, red } from "@material-ui/core/colors";
import Routes from "../Routes";
import axios from 'axios';
import loading from '../assets/loading.gif'



function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}


function isLoggedIn() {       
  let permissions = localStorage.getItem('userType');
  if(permissions == 1 || permissions == 2) {
    return false;
  } else {
    return true;
  }
}


async function getUserInfo(id) {
        let respData;
        
        // Si existe usuario, obtenemos sus datos
        const config = {
          headers: { Authorization: "Bearer " + localStorage.getItem('TOKEN_AUTH') }
        };
        const response = axios.get('http://localhost:4001/manager/users/' + id, config)
        .then(resp=>{          
          console.log('second request');          
          respData = resp.data.user;
          console.log(resp.data.user); 
          localStorage.setItem('USER_NAME', resp.data.user.name);

          // A cambiar... Evaluamos si es admin o no
          if(resp.data.user.admin) {
            localStorage.setItem("userType", 1);
          } else if(resp.data.user.active) {
            localStorage.setItem("userType", 2);
          } else {
            localStorage.setItem("userType", 3);
          }

          window.location.replace('/palabras');
        })  
        .catch(error=>{          
          alert(error.response.data.error);
          console.log(error.response);
        });        
        return respData;
} // getUserInfo()

function loginClick() {
  login(true);
} // loginClick()

async function login(validacion) {
  if (event.key === 'Enter' || validacion == true) { 
  
  let email = document.getElementById('loginEmail').value;
  let password = document.getElementById('loginPassword').value;
  document.getElementById('errorNotification').innerHTML = '';
  
  if(email.length > 0 && password.length > 0) {
    document.getElementById('loginPassword').value = '';
    if(validateEmail(email)) { 
      document.getElementById("loadingLogo").style.display = 'flex';

      let reqData = {
        "password": password,
        "email": email
      }
      const response = await axios.post('http://localhost:4001/manager/login', reqData)
      .then(resp=>{

        console.log(resp.data); // request response's data

        let userId = resp.data.user.id;
        localStorage.setItem('TOKEN_AUTH', resp.data.token);
        // alert(userId);

        let userInfo = getUserInfo(userId);
        console.log('userInfo: ');
        console.log(userInfo);

      })  
      .catch(error=>{
        if(error.response) {          
          let mensaje = error.response.data.error;
          let notificacion = mensaje;
          if(mensaje == 'Wrong password' || mensaje == 'User not found') {
            notificacion = 'El correo o contraseña son incorrectos';
          }
          document.getElementById('errorNotification').innerHTML = notificacion;
        }                  
        console.log(error.response); // request response's data
      });

      document.getElementById("loadingLogo").style.display = 'none';
    } else {
      document.getElementById('errorNotification').innerHTML = 'Dirección de correo no válida';
    }
  } else  {
    document.getElementById('errorNotification').innerHTML = 'Complete los campos antes de continuar';
  }
  } // if validacion == true or Enter
} // login()

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
} // logout()

const LoginPage = () => {
if(isLoggedIn()) {
  return (
    <MDBAnimation type='fadeIn' duration='500ms'>
      <MDBContainer>  
        <MDBRow>
          <MDBCol>
    
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '70vh'}}>  
              <MDBCard style={{ width: "22rem" }}>
                <MDBCardBody>
    
                    <p className="h4 text-center mb-4">Iniciar sesión</p>
                    <p id="errorNotification" style={{ color: 'red', textAlign: "center", fontWeight: "bold"  }}></p> 
                   
                    
    
                    
                      <MDBCol id="loadingLogo" style={{marginBottom: 20, display: 'none',  justifyContent:'center', alignItems:'center'}}><img src={loading} alt="loading..." /></MDBCol>                  
                    
    
                    <input onKeyPress={login} type="email" placeholder="Correo electrónico" id="loginEmail" className="form-control" />
                    <br />
                    <input onKeyPress={login} type="password" placeholder="Contraseña" id="loginPassword" className="form-control" />
                    <div className="text-center mt-4">
                      <MDBBtn color="red" onClick={loginClick}>Ingresar</MDBBtn>                    
                      <p style={{ marginTop: '1rem' }}><a href="/remember">¿No recuerdas tu contraseña?</a></p>            
                    </div>
                  
    
              </MDBCardBody>
              </MDBCard>
            </div>    
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </MDBAnimation>
    ); // return 
} else {
  window.location.replace('/palabras')
}

};

export default LoginPage;