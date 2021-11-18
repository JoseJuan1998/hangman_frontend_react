import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBAnimation } from 'mdbreact';
import { Email } from "@material-ui/icons";
import { blue, red } from "@material-ui/core/colors";
import Routes from "../Routes";
import axios from 'axios';
import loading from '../assets/loading.gif'

function redirect() {
    window.location.replace('/');
}

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

async function rememberPassword() {
    document.getElementById('errorNotification').innerHTML = '';
    let email = document.getElementById('emailRemember').value;
    if(validateEmail(email)) {
        document.getElementById('loadingLogo').style.display = 'flex';
        let reqData = {
            "email": email
          }
        const response = await axios.post('http://hangmangame1-usuarios.eastus.cloudapp.azure.com:4001/manager/users/reset/pass', reqData)
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
            document.getElementById('errorNotification').innerHTML = error.response.data.email;
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

const RememberPasswordPage = () => {
return (
<MDBAnimation type='fadeIn' duration='500ms'>
  <MDBContainer>  
    <MDBRow>
      <MDBCol>

        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '70vh'}}>  
          <MDBCard style={{ width: "22rem" }}>
            <MDBCardBody>

              <form>
                <p className="h4 text-center mb-4">Recordar contraseña</p>
                <p id="errorNotification" style={{ color: 'red', textAlign: "center", fontWeight: "bold"  }}></p>                         
                
                    <MDBCol id="loadingLogo" style={{marginBottom: 20, display: 'none',  justifyContent:'center', alignItems:'center'}}>
                      <img src={loading} alt="loading..." />
                    </MDBCol>                  
                
                  <p id="instructions">Ingrese el correo electrónico de su cuenta</p>
                <input type="email" placeholder="Correo electrónico" id="emailRemember" className="form-control" />
                <br />
                <div className="text-center mt-4">
                  <MDBBtn id="rememberPwdButton" color="red" onClick={rememberPassword}>Recordar contraseña</MDBBtn>
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
);
};

export default RememberPasswordPage;