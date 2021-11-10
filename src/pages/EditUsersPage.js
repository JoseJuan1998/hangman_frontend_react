import React, { Component } from 'react';
import { 
    MDBContainer, 
    MDBBtn, 
    MDBModal, 
    MDBModalBody, 
    MDBModalHeader, 
    MDBModalFooter, 
    MDBJumbotron
 } from 'mdbreact';

function editarUsuario() {
    alert('x');
}

class EditUsersPage extends Component {
state = {
  modal14: false
}

toggle = nr => () => {
  let modalNumber = 'modal' + nr
  this.setState({
    [modalNumber]: !this.state[modalNumber]
  });
}

render() {
  return (
      <MDBContainer>
        {/*<MDBBtn color="primary" onClick={this.toggle(14)}>Mi modal</MDBBtn>*/}
        <MDBBtn color="primary" onClick={this.toggle(14)}>Mi modal</MDBBtn>
        <MDBModal isOpen={this.state.modal14} toggle={this.toggle(14)} centered>
          <MDBModalHeader toggle={this.toggle(14)}>Editar usuario</MDBModalHeader>
          <MDBModalBody>
           
                <MDBJumbotron className='mt-3'>
                  <form>
                  <input id="regName" type="text" placeholder="Nombre completo" className="form-control" />
                  <br />
                  <input id="regEmail" type="email" placeholder="Correo electrónico" className="form-control" />
                </form>
                </MDBJumbotron>

          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="secondary" onClick={this.toggle(14)}>Cerrar</MDBBtn>
            <MDBBtn onClick={editarUsuario} color="indigo">Editar usuario</MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </MDBContainer>
    );
  }
}

export default EditUsersPage;