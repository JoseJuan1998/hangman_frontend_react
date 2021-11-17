import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBAnimation } from 'mdbreact';

async function crearContrasena() {
  let password1 = document.getElementById('password1').value;
  let password2 = document.getElementById('password2').value;
  
  if(password1.length > 0 && password2.length > 0) {
    if(password1 === password2) {
      document.getElementById('errorNotification').innerHTML = '';
      
    } else {
      document.getElementById('errorNotification').innerHTML = 'Las contraseñas no coinciden.';
    }
  } else  {
    document.getElementById('errorNotification').innerHTML = 'Complete los campos antes de continuar';
  }
} // login()

const PasswordPage = () => {
return (
<MDBAnimation type='fadeIn' duration='500ms'>
  <MDBContainer>  
    <MDBRow>
      <MDBCol>

        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '70vh'}}>  
          <MDBCard style={{ width: "22rem" }}>
            <MDBCardBody>

              <form>
                <p className="h4 text-center mb-4">Cambiar contraseña</p>
                <p id="errorNotification" style={{ color: 'red', textAlign: "center", fontWeight: "bold"  }}></p> 
                <input type="password" placeholder="Contraseña" id="password1" className="form-control" />
                <br />
                <input type="password" placeholder="Repita su contraseña" id="password2" className="form-control" />
                <div className="text-center mt-4">
                  <MDBBtn color="red" onClick={crearContrasena}>Crear contraseña</MDBBtn>                           
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

export default PasswordPage;