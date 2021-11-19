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


function validateUser() {       
  let permissions = localStorage.getItem('userType');
  if(permissions == 1 || permissions == 2) {
    window.location.replace('/');
  }    
}


async function getUserInfo(id) {
        let respData;
        // Si existe usuario, obtenemos sus datos
        const response = axios.get('http://hangmangame1-usuarios.eastus.cloudapp.azure.com:4001/manager/users/' + id)
        .then(resp=>{
          console.log('second request');          
          respData = resp.data.user;
          console.log(resp.data.user);

          // A cambiar... Evaluamos si es admin o no
          if(resp.data.user.admin) {
            localStorage.setItem("userType", 1);
          } else if(resp.data.user.active) {
            localStorage.setItem("userType", 2);
          } else {
            localStorage.setItem("userType", 3);
          }
          window.location.replace('/');
        })  
        .catch(error=>{
          alert(error.response.data.error);
          console.log(error.response);
        });
        return respData;
} // getUserInfo()

async function login() {
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
      const response = await axios.post('http://hangmangame1-usuarios.eastus.cloudapp.azure.com:4001/manager/login', reqData)
      .then(resp=>{
        console.log(resp.data);
        let userId = resp.data.user_id;
        // alert(userId);

        let userInfo = getUserInfo(userId);
        console.log('userInfo: ');
        console.log(userInfo);

      })  
      .catch(error=>{
        if(error.response) {          
          document.getElementById('errorNotification').innerHTML = error.response.data.error;
        }                  
        console.log(error);
      });
      document.getElementById("loadingLogo").style.display = 'none';
      
      

    } else {
      document.getElementById('errorNotification').innerHTML = 'Dirección de correo no válida';
    }
  } else  {
    document.getElementById('errorNotification').innerHTML = 'Complete los campos antes de continuar';
  }
} // login()

async function tempLogout() {
  const response = await axios.delete('http://hangmangame1-usuarios.eastus.cloudapp.azure.com:4001/manager/logout')
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
validateUser();
return (
<MDBAnimation type='fadeIn' duration='500ms'>
  <MDBContainer>  
    <MDBRow>
      <MDBCol>

        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '70vh'}}>  
          <MDBCard style={{ width: "22rem" }}>
            <MDBCardBody>

              <form>
                <p className="h4 text-center mb-4">Iniciar sesión</p>
                <p id="errorNotification" style={{ color: 'red', textAlign: "center", fontWeight: "bold"  }}></p> 
               
                

                
                  <MDBCol id="loadingLogo" style={{marginBottom: 20, display: 'none',  justifyContent:'center', alignItems:'center'}}><img src={loading} alt="loading..." /></MDBCol>                  
                

                <input type="email" placeholder="Correo electrónico" id="loginEmail" className="form-control" />
                <br />
                <input type="password" placeholder="Contraseña" id="loginPassword" className="form-control" />
                <div className="text-center mt-4">
                  <MDBBtn color="red" onClick={login}>Ingresar</MDBBtn>                    
                  <p style={{ marginTop: '1rem' }}><a href="/remember">¿No recuerdas tu contraseña?</a></p>            
                </div>
              </form>

          </MDBCardBody>
          </MDBCard>
        </div>    
      </MDBCol>
    </MDBRow>
  </MDBContainer>
</MDBAnimation>
);
};

export default LoginPage;