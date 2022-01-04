import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBAnimation } from 'mdbreact';
import { Email } from "@material-ui/icons";
import { blue, red } from "@material-ui/core/colors";
import Routes from "../Routes";
import axios from 'axios';
import loading from '../assets/loading.gif'

import image1 from '../assets/ahorcado/1.JPG' // vidas restantes: 0/6
import image2 from '../assets/ahorcado/2.JPG' // vidas restantes: 1/6
import image3 from '../assets/ahorcado/3.JPG' // vidas restantes: 2/6
import image4 from '../assets/ahorcado/4.JPG' // vidas restantes: 3/6
import image5 from '../assets/ahorcado/5.JPG' // vidas restantes: 4/6
import image6 from '../assets/ahorcado/6.JPG' // vidas restantes: 5/6
import image7 from '../assets/ahorcado/7.JPG' // vidas restantes: 6/6


let PALABRA_JUEGO;
let LETRAS_ENCONTRADAS = [];
let PALABRA_OCULTA_ACTUAL;
let VIDAS_RESTANTES = 6;
let IMAGENES = {
   '0': image1, 
   '1': image2, 
   '2': image3, 
   '3': image4, 
   '4': image5, 
   '5': image6, 
   '6': image7, 
}
console.log(IMAGENES);

function validateUser() {       
    let permissions = localStorage.getItem('userType');
    if(permissions == 1 || permissions == 2) {
      window.location.replace('/');
    }    
  }

  function recargarJuego() {
    window.location.reload();
  } // recargarJuego()

  function salirDelJuego() {
    window.location.replace('/');
  } // salirDelJuego

  async function obtenerPalabra() {
    let palabra = await axios.get('http://hangmangame1-palabras.eastus.cloudapp.azure.com:4001/game/word/' + localStorage.getItem("difficulty"));
    console.log("Palabra ----------------");
    // alert(palabra.data.word.word);
    palabra = palabra.data.word.word;
    //if(palabra.data.word.word) {
    //  
    //} 
    PALABRA_JUEGO = palabra;
    console.log('PALABRA_JUEGO: ' + PALABRA_JUEGO);

    let palabraOculta = '';
    for(let i = 0; i < palabra.length; i++) {
        palabraOculta += '__ ';
    }
    console.log(palabraOculta);
    PALABRA_OCULTA_ACTUAL = palabraOculta;
    return palabraOculta;    
} // obtenerPalabra()

function finJuego() {
  document.getElementById('jugarOtraVezBtn').style.display = 'inline';
  document.getElementById('salirBtn').style.display = 'inline';
}

function actualizarVidas() {
  let vidasRestantes = 'Vidas restantes: ' + VIDAS_RESTANTES + '/6';
  document.getElementById('vidasRestantes').innerHTML = vidasRestantes;
  if(VIDAS_RESTANTES >= 0) {
    document.getElementById('imagenAhorcado').src = IMAGENES[VIDAS_RESTANTES];
  }
  if(VIDAS_RESTANTES == 0) {
    document.getElementById('evaluarLetraBtn').style.display = 'none';
    document.getElementById('letra').style.display = 'none';
    document.getElementById('notificacion').innerHTML = 'La respuesta correcta era: ' + PALABRA_JUEGO;
    document.getElementById('palabraActual').innerHTML = '¡Has perdido!';
    finJuego();
      
  

  }
}

async function EvaluarJuegoGanado() {
  if(!PALABRA_OCULTA_ACTUAL.includes('_')) {
    document.getElementById('evaluarLetraBtn').style.display = 'none';
    document.getElementById('letra').style.display = 'none';
    document.getElementById('notificacion').innerHTML = '¡Felicidades, has ganado!';
    finJuego();

    // alert('haciendo request para palabra ' + PALABRA_JUEGO);
    let reqData = {
      "word": PALABRA_JUEGO
    }  
    console.log(reqData);
  
    const response = await axios.put('http://reportes-icorp.eastus.cloudapp.azure.com:4001/manager/report/words/guessed', reqData)
    .then(resp=>{
      console.log(resp.data);          
    })  
    .catch(error=>{
      alert('Ha sucedido un error, por favor, inténtelo más tarde.');
    });


  }
}

function filtrarLetra() {
  console.log('evaluating ' + document.getElementById('letra').value); 
  let valid = /^[a-zA-Z\s]*$/.test(document.getElementById('letra').value);
  if(!valid) {
    document.getElementById('letra').value = ''; 
  }
} // filtrarLetra()

function evaluarAcentos() {

}

// Funcion que va a evaluar si existen acentos dentro de la letra, y cambiarlos por su contraparte. 
function filtrarAcentos(letraMayuscula) {
  switch(letraMayuscula) {  
    case 'Á': letraMayuscula = 'A'; break; 
    case 'É': letraMayuscula = 'E'; break; 
    case 'Í': letraMayuscula = 'I'; break; 
    case 'Ó': letraMayuscula = 'O'; break; 
    case 'Ú': letraMayuscula = 'U'; break; 
       
  }
} // filtrarAcentos()

function evaluarLetra(validacion) {
  if (event.key === 'Enter' || validacion == true) {
    let letra = document.getElementById('letra').value.toUpperCase();
    document.getElementById('letra').value = '';
    console.log(letra);
    console.log(PALABRA_JUEGO);

    if(PALABRA_JUEGO.includes(letra)) {
      // alert('La palabra ' + PALABRA_JUEGO + ' tiene la letra ' + letra);
      if(!LETRAS_ENCONTRADAS.includes(letra)) {
        LETRAS_ENCONTRADAS.push(letra);
      }
      // Creamos palabra oculta nueva en base a la lista de letras encontradas
      let palabraOculta = '';
      for(let i = 0; i < PALABRA_JUEGO.length; i++) {
          let letraActual = PALABRA_JUEGO.charAt(i);
          if(LETRAS_ENCONTRADAS.includes(letraActual)) {
            palabraOculta = palabraOculta + letraActual + ' ';
          } else {
            palabraOculta += '__ ';
          }          
      } // for
      PALABRA_OCULTA_ACTUAL = palabraOculta;
      console.log('Palabra oculta actual: ' + PALABRA_OCULTA_ACTUAL);
      document.getElementById('palabraActual').innerHTML = PALABRA_OCULTA_ACTUAL;
    } else {
      // alert('La palabra ' + PALABRA_JUEGO + ' NO tiene la letra ' + letra);
      console.log('Palabra oculta actual: ' + PALABRA_OCULTA_ACTUAL);
      VIDAS_RESTANTES -= 1; 
      actualizarVidas();
    }
    EvaluarJuegoGanado();

  }
} // evaluarLetra()

function clicEvaluarLetra() {
  evaluarLetra(true); 
} // clickEvaluarLetra  

function redirect() {
    window.location.replace('/');
}

function validateGame() {
    if (localStorage.getItem("game") != "null" && localStorage.getItem("difficulty") != "null") { 
        return true; 
    } else {
        return false;   
    }
}

function mapDifficulty(difficulty) {
  let x; 
  switch(difficulty) {
    case 'HARD': x = 'DIFICIL'; break;
    case 'MEDIUM': x = 'INTERMEDIO'; break;
    case 'EASY': x = 'FACIL'; break;
    default: window.location.replace('/');    
  }
  return x; 
} // mapDifficulty()

document.addEventListener("DOMContentLoaded", function() {
    if(document.getElementById("palabraActual")) {               
        console.log('DOM Content Loaded event function');
        let palabra;
        let url; 
        if(localStorage.getItem("difficulty") != 'RANDOM') {
          url = 'http://hangmangame1-palabras.eastus.cloudapp.azure.com:4001/game/word/' + localStorage.getItem("difficulty"); 
        } else {
          url = 'http://hangmangame1-palabras.eastus.cloudapp.azure.com:4001/game/word'; 
        }
        const response = axios.get(url)
        .then(resp=>{
          palabra = resp.data.word.word; 
          PALABRA_JUEGO = palabra;                 
          let palabraOculta = '';
          for(let i = 0; i < palabra.length; i++) {
              palabraOculta += '__ ';
          }
          console.log(palabraOculta);
          PALABRA_OCULTA_ACTUAL = palabraOculta;
          document.getElementById("palabraActual").innerHTML = palabraOculta; 
          document.getElementById("palabraActual").style.display = 'block'; 
        })
        actualizarVidas();
    }    
    
  }, false);

const GamePage = () => {

if(validateGame()) { 
    validateUser();
    let imageX = 230;
    let imageY = 240;
    return (
    <MDBAnimation type='fadeIn' duration='500ms'>
      <MDBContainer>  
        <MDBRow>
          <MDBCol>
          <br />
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '70vh'}}>  
              <MDBCard style={{ width: "32rem" }}>
                <MDBCardBody>
    
                    <p id="vidasRestantes" className="h4 text-center mb-4">Vidas restantes: 5/6</p>
                    <p id="nivel" className="text-center mb-4" >Nivel: {mapDifficulty(localStorage.getItem("difficulty"))}</p>
                    <p id="errorNotification" style={{ color: 'red', textAlign: "center", fontWeight: "bold"  }}></p>                         
                    
                        <MDBCol id="currentImage" style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                          <img id="imagenAhorcado" style={{width: imageX, heieght: imageY}} src={image6} alt="loading..." />
                        </MDBCol>                  
                    <br /><br />
    
                    
    
                    <div className="text-center">
                        <p id="palabraActual" style={{display: 'none', fontSize: 26, fontWeight: 'bold', color: 'red' }}>Hola</p>  
                        <p id="notificacion" style={{ fontSize: 20, fontWeight: 'bold'}}></p>                      
                    </div>                
                    
                    <MDBRow>
                        <MDBCol size="6">
                            <input onChange={filtrarLetra} onKeyDown={evaluarLetra} id="letra" style={{marginTop: 10}} type="text" placeholder="Escriba una letra" maxLength="1"  className="form-control" />                                        
                        </MDBCol>
                        <MDBCol size="5">
                            <MDBBtn type="button" id="evaluarLetraBtn" color="red" onClick={clicEvaluarLetra}>Probar letra</MDBBtn>                            
                        </MDBCol>

                        <MDBCol className="text-center">
                          <MDBBtn type="button" id="jugarOtraVezBtn"  style={{ display: 'none' }} onClick={recargarJuego} color="red">Jugar de nuevo</MDBBtn>
                          <MDBBtn type="button" id="salirBtn" style={{ display: 'none' }} onClick={salirDelJuego}  outline color="danger" >Salir</MDBBtn>
                        </MDBCol>

                    </MDBRow>
    
                    <div className="text-center mt-4">
                                          
                    </div>
    
              </MDBCardBody>
              </MDBCard>
            </div>    
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </MDBAnimation>
    );
} else {
    window.location.replace('/'); 
}




};


// obtenerPalabra();
export default GamePage;