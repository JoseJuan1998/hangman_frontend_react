import React, { forwardRef, useState, useEffect } from 'react';
import { 
    MDBContainer, 
    MDBBtn, 
    MDBModal, 
    MDBModalBody, 
    MDBModalHeader, 
    MDBModalFooter, 
    MDBJumbotron
 } from 'mdbreact';
 
import MaterialTable from 'material-table';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import axios from 'axios';
import EditUsersPage from '../pages/EditUsersPage';
import { StylesContext } from '@material-ui/styles';

import { Modal, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    modal: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    },
    iconos:{
      cursor: 'pointer'
    }, 
    inputMaterial:{
      width: '100%'
    }
  }));



let listaUsuarios = [];

async function getUsers() {
    let myUsers = [];
        const response = await axios({
            method: 'get',
            url: 'http://hangmangame1-usuarios.eastus.cloudapp.azure.com:4001/manager/users'
        });
        for(let i = 0; i < response.data.users.length; i++) {
            myUsers.push({
                active: 'false', 
                name: response.data.users[i].name, 
                email: response.data.users[i].email
            });
        } 
    //console.log(myUsers);
    return myUsers;
 } // getUsers()


 async function eliminarUsuario(rowData) {
    let userToDelete = rowData.id;
    // alert('eliminando a ' + userToDelete);
    console.log(userToDelete)

    const response = await axios({
        method: 'delete',
        url: 'http://hangmangame1-usuarios.eastus.cloudapp.azure.com:4001/manager/users/' + userToDelete
    });
    window.location.reload(false);
 } // eliminarUsuario()


 async function actualizarUsuario(usuario) {
    console.log(usuario.usuarioSeleccionado.name);
    // alert('Actualizando usuario' + usuario.usuarioSeleccionado.name + ' con el id ' + usuario.usuarioSeleccionado.id + 'a ' + document.getElementById('NombreEditar').value);
    console.log(usuario.usuarioSeleccionado);
    // axios put here...

    let reqData = {
        "name":  document.getElementById('NombreEditar').value
      }
    const response = await axios.put(
        'http://hangmangame1-usuarios.eastus.cloudapp.azure.com:4001/manager/users/name/' + usuario.usuarioSeleccionado.id, 
        reqData
        );
        window.location.reload(false);
 } // actualizarUsuario()


 function MyDatatablePage() {
    const styles= useStyles();
    const tableIcons = {
        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
        DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
        Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
        Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
        ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
        ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
      };

    // const emptyList = [
        //     { active: 'Activa', name: 'Edgar Huemac Sanchez', email: 'edgar@gmail.com' }, 
        //     { active: 'No activa', name: 'Maria Fernanda Morales', email: 'mafer@gmail.com' }, 
        //     { active: 'Activa', name: 'Rodrigo Alejandro Quintana', email: 'roy12@outlook.com' }, 
        //     { active: 'Activa', name: 'Alan Martin Fuentes', email: 'alanfp@outlook.com' }, 
        // ];

    // State that manages the datatable's data
    const [data, setData] = useState([]);
    const [modalEditar, setModalEditar] = useState(false);
    const [usuarioSeleccionado, setUsuarioSeleccionado]=useState({
        name: '',
        email: '', 
        id: ''
      })

      const handleChange=e=>{
        const {name, value}=e.target;
        setUsuarioSeleccionado(prevState=>({
          ...prevState,
          [name]: value
        }));
      }


    const abrirCerrarModalEditar = (rowData = '') => {
        if(rowData != '') {
            console.log(rowData);
            setUsuarioSeleccionado({
                name: rowData.name,
                email: rowData.email, 
                id: rowData.id
              });
            // alert(rowData.tableData.id);
            document.getElementsByName('nombre').value = rowData.tableData.id; 
        }
            
        
        setModalEditar(!modalEditar);
    }


    const bodyEditar=(
        <div className={styles.modal}>
          <h3>Editar usuario</h3>
        <TextField id="NombreEditar" className={styles.inputMaterial} label="Nombre completo" name="name" onChange={handleChange} value={usuarioSeleccionado&&usuarioSeleccionado.name}/>
          <br /><br />
          <div align="right">
            <Button color="primary" onClick={()=>actualizarUsuario({usuarioSeleccionado})}>Editar</Button>
            <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
          </div>
        </div>
      )


    const columns = [
        { title: 'Estatus', field: 'active' },
        { title: 'Nombre', field: 'name' },
        { title: 'Correo electónico', field: 'email' }
    ];

    useEffect(()=>{
        fetch('http://hangmangame1-usuarios.eastus.cloudapp.azure.com:4001/manager/users')
        .then(resp=>resp.json())
        .then(resp=>{
            // console.log(resp)
            setData(resp.users)
            listaUsuarios = resp.users;
            console.log(listaUsuarios);
        })
    },[])

    return(
        <div>
            <MaterialTable 
                icons={tableIcons}
                columns={columns}
                data={data}   
                title='Usuarios registrados'
                actions={[
                    {
                        icon: Edit, 
                        tooltip: 'Editar usuario', 
                        onClick: (event, rowData) => 
                        
                        abrirCerrarModalEditar(rowData)
                    },
                    {
                        icon: DeleteOutline, 
                        tooltip: 'Eliminar usuario', 
                        onClick: (event, rowData) => 
                        eliminarUsuario(rowData)
                    },                    
                ]}             
            />


        <Modal
            open={modalEditar}
            onClose={abrirCerrarModalEditar}>
            {bodyEditar}
        </Modal>

        </div>
        
    );

} // MyDatatablePage()

export default MyDatatablePage; 