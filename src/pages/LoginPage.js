import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBAnimation } from 'mdbreact';

const LoginPage = () => {
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
                <input type="email" placeholder="Correo electrónico" id="defaultFormLoginEmailEx" className="form-control" />
                <br />
                <input type="password" placeholder="Contraseña" id="defaultFormLoginPasswordEx" className="form-control" />
                <div className="text-center mt-4">
                  <MDBBtn color="red" type="submit">Ingresar</MDBBtn>                  
                  <p style={{ marginTop: '1rem' }}><a href="#">¿No recuerdas tu contraseña?</a></p>            
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