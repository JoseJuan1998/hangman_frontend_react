import React from 'react';
import {
  MDBEdgeHeader,
  MDBFreeBird,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBCardBody,
  MDBBtn,
  MDBIcon,
  MDBCard,
  MDBCardTitle,
  MDBCardImage,
  MDBCardText,
  MDBAnimation,
  MDBNavLink
} from 'mdbreact';
import './HomePage.css';



function readyToPlay() {
  if (localStorage.getItem("game") != "null" && localStorage.getItem("difficulty") != "null") {
    return true;
  } else {
    return false;
  }
} // readyToPlay()


class HomePage extends React.Component {
  scrollToTop = () => window.scrollTo(0, 0);

  startGame() {
    return function() {
      alert('Starting game ' + localStorage.getItem("game") + ' with difficulty: ' + localStorage.getItem("difficulty"));
    }
  }; 

  setGame(game) {
    return function() {
      let elements = document.querySelectorAll('.gameBtn');
      for(let i = 0; i < elements.length; i++) {
        elements[i].className = 'btn-danger btn-outline-danger btn Ripple-parent gameBtn';
      } 
      localStorage.setItem('game', game);
      document.getElementById(game).className = 'btn-danger btn Ripple-parent gameBtn';   
      
      if(readyToPlay()) {
        console.log('ready to play');
        document.getElementById('startGameBtn').style.display = 'flex';
        document.getElementById('startGameBtn').className = 'btn-red btn Ripple-parent';
        // document.getElementById('startGameBtn').removeAttribute('disabled');
      }

    }
  }; 

  setDifficulty(difficulty) {
    return function() {
      let elements = document.querySelectorAll('.difficultyBtn');
      for(let i = 0; i < elements.length; i++) {
        elements[i].className = 'btn-danger btn-outline-danger btn Ripple-parent difficultyBtn';
      } 
      localStorage.setItem('difficulty', difficulty);
      document.getElementById(difficulty).className = 'btn-danger btn Ripple-parent difficultyBtn';
      
      if(readyToPlay()) {
        console.log('ready to play');
        document.getElementById('startGameBtn').style.display = 'flex';
        document.getElementById('startGameBtn').className = 'btn-red btn Ripple-parent';
        // document.getElementById('startGameBtn').removeAttribute('disabled');
      }



    }
  };


  render() {
    localStorage.setItem('difficulty', null);
    localStorage.setItem('game', null);
    return (
      <>
        <br /><br /><br /><br /><br /><br />
        <div className='mt-3 mb-5'>
          <MDBFreeBird>

            <MDBRow>
              <MDBCol
                md='10'
                className='mx-auto float-none white z-depth-1 py-2 px-2'
              >
                <MDBCardBody className='text-center'>                  
                  <MDBRow />
                  <div style={{ fontSize: 24, fontWeight: 'bold' }}>
                    <p>Seleccione un juego</p>
                    <MDBBtn id='ahorcado' className="gameBtn" onClick={ this.setGame('ahorcado') } outline color="danger">Ahorcado</MDBBtn>
                  </div>
                  <div style={{ fontSize: 24, fontWeight: 'bold', paddingTop: 40 }}>
                    <p>Seleccione la dificultad</p>
                    <MDBBtn className="difficultyBtn" onClick={ this.setDifficulty('facil') } id='facil' outline color="danger">Fácil</MDBBtn>
                    <MDBBtn className="difficultyBtn" onClick={ this.setDifficulty('media') } id='media' outline color="danger">Media</MDBBtn>
                    <MDBBtn className="difficultyBtn" onClick={ this.setDifficulty('dificil') } id='dificil' outline color="danger">Dificil</MDBBtn>
                    <MDBBtn className="difficultyBtn" onClick={ this.setDifficulty('aleatoria') } id='aleatoria' outline color="danger">Aleatoria</MDBBtn>
                  </div>
                </MDBCardBody>
              </MDBCol>
            </MDBRow>
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: 30}}>
                  <MDBBtn id='startGameBtn' style={{display: 'none'}} color="red" onClick={this.startGame()}>¡Comenzar el juego!</MDBBtn>
              </div>    
          </MDBFreeBird>

        </div>
      </>
    );
  }
}

export default HomePage;
