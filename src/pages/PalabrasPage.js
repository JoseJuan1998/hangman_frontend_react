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
import MyWordsPage from '../pages/MyWordsPage';
import axios from "axios";


function validateUser() {       
  let permissions = localStorage.getItem('userType');
  if(permissions != 1 && permissions != 2) {
    return false;
  } else {
    return true;
  }
}

function onlyUpperCase() {
  document.getElementById('palabra').value = document.getElementById('palabra').value.toUpperCase(); 
} // onlyUpperCase

async function registrarPalabra(validacion) {
  if (event.key === 'Enter' || validacion == true) { 
    document.getElementById('errorNotification').innerHTML = '';  
    let palabra = document.getElementById('palabra').value.trim();
    // 1. Evaluamos que tenga menos de 30 carcteres
    if(palabra.length <= 30 && palabra.length > 0) {
      // 2. Evaluamos que no contenga numeros
      let onlyLetters = /^[a-zA-ZÀ-ú]*$/.test(palabra); 
      if(onlyLetters) {
        // alert('Introduciendo palabra ' + palabra); 

        let reqData = {
          "word": palabra
        }
        const config = {
          headers: { Authorization: "Bearer " + localStorage.getItem('TOKEN_AUTH') }
        };
        const response = await axios.post('http://localhost:4002/manager/words', reqData, config)
        .then(resp=>{
          console.log(resp.data);          
          window.location.reload(false);
        })  
        .catch(error=>{
          if(error.response) {          
            let mensaje = error.response.data.word[0]; 
            let mensajeEsp = 'Ha sucedido un error. Por favor, inténtelo más tarde.'; 
            if(mensaje == 'Word already exists') {
              mensajeEsp = 'Error. Ya existe la palabra'; 
            }
            document.getElementById('errorNotification').innerHTML = mensajeEsp;
          }                  
          console.log(error);
        });


      } else {
        document.getElementById('errorNotification').innerHTML = 'La palabra solo debe de contener letras';  
      }
    } else {
      document.getElementById('errorNotification').innerHTML = 'La palabra debe de tener entre 1 y 30 caracteres'; 
    }
  }   
} // registrarPalabra()

function registrarPalabraClick() {
  registrarPalabra(true); 
} // registrarPalabraClick

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
                <br /> <MyWordsPage />
              </MDBCol>

              <MDBCol size="3">
              <br />
                  <MDBJumbotron className='mt-3'>
                    <h4 className='text-center'>Nueva palabra</h4><br />
                    <p id="errorNotification" style={{ color: 'red', textAlign: "center", fontWeight: "bold"  }}></p>

                    <input onChange={onlyUpperCase} onKeyDown={registrarPalabra} type="text" placeholder="Escribir palabra" id="palabra" className="form-control" />
                    <div className="text-center mt-4">
                      <MDBBtn color="indigo" onClick={registrarPalabraClick}>Registrar palabra</MDBBtn>
                    </div>

                  </MDBJumbotron>
              </MDBCol>



            </MDBRow>

          </MDBContainer>
        </MDBAnimation>
      </>
    ); // return component
  }
};

export default CSSPage;
