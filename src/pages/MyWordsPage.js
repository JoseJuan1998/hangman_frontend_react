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



let listaPalabras = [];


 async function eliminarPalabra(rowData) {
    let wordToDelete = rowData.id;
    // alert('eliminando a ' + wordToDelete);
    console.log(rowData); 
    const config = {
      headers: { Authorization: localStorage.getItem('TOKEN_AUTH') }
    };
    const response = await axios.delete('http://hangmangame1-palabras.eastus.cloudapp.azure.com:4001/manager/words/' + wordToDelete,
    config);
    window.location.reload(false);
 } // eliminarPalabra()


 async function actualizarPalabra(palabra) {
    let nP = document.getElementById('PalabraEditar').value;     
    if(nP.length <= 30 && nP.length > 0) {
      let onlyLetters = /^[a-zA-Z\s]*$/.test(nP);  
      if(onlyLetters) {
        document.getElementById('notificacionUpdate').innerHTML = ''; 
        // Actualizar palabra:  
        console.log(palabra.palabraSeleccionada.name);
        console.log(palabra.palabraSeleccionada);
        // alert('actualizando palabra a: ' + document.getElementById('PalabraEditar').value); 
        let reqData = {
            "word":  document.getElementById('PalabraEditar').value, 
            }    
        const config = {
          headers: { Authorization: localStorage.getItem('TOKEN_AUTH') }
        };
        const response = await axios.put(
          'http://hangmangame1-palabras.eastus.cloudapp.azure.com:4001/manager/words/' + palabra.palabraSeleccionada.id, 
          reqData, config);
        window.location.reload(false);

      } else {
        document.getElementById('notificacionUpdate').innerHTML = 'La palabra solo puede contener letras';   
      }
    } else {
      document.getElementById('notificacionUpdate').innerHTML = 'La palabra debe tener entre 1 y 30 caracteres de longitud'; 
    }

 } // actualizarPalabra()


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


    // State that manages the datatable's data
    const [data, setData] = useState([]);
    const [modalEditar, setModalEditar] = useState(false);
    const [palabraSeleccionada, setPalabraSeleccionada]=useState({
        word: '',
        difficulty: '', 
        id: ''
      })

      const handleChange=e=>{
        const {name, value}=e.target; 
        let newValue = value;
        newValue = newValue.toUpperCase();  
        setPalabraSeleccionada(prevState=>({
          ...prevState,
          [name]: newValue
        }));
      }


    const abrirCerrarModalEditar = (rowData = '') => {
        if(rowData != '') {
            console.log(rowData);
            setPalabraSeleccionada({
                word: rowData.word,
                difficulty: rowData.difficulty, 
                id: rowData.id
              });
            if(rowData.tableData) {
              // alert(rowData.tableData.id);
              document.getElementsByName('nombre').value = rowData.tableData.id; 
            }               
        }
            
        
        setModalEditar(!modalEditar);
    }


    const bodyEditar=(
        <div className={styles.modal}>
          <h3>Editar palabra</h3>
          <p id="notificacionUpdate" style={{color: 'red',  fontSize: 18, fontWeight: 'bold'}}></p>
          <TextField id="PalabraEditar" className={styles.inputMaterial} label="Palabra" name="word" onChange={handleChange} value={palabraSeleccionada&&palabraSeleccionada.word}/>
          <br /><br />
          <div align="right">
            <Button color="primary" onClick={()=>actualizarPalabra({palabraSeleccionada})}>Editar</Button>
            <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
          </div>
        </div>
      )


    const columns = [
        { title: 'Palabra', field: 'word' },
        { title: 'Dificultad', field: 'difficulty' }
    ];

    


      
    // Obtenemos palabras de la base de datos
    useEffect(()=>{
        fetch('http://hangmangame1-palabras.eastus.cloudapp.azure.com:4001/manager/words/1/100', {
          headers: new Headers({
            'Authorization': localStorage.getItem('TOKEN_AUTH'), 
          }), 
        })
        .then(resp=>resp.json())
        .then(resp=>{
            let listaPalabras; 
            // console.log(resp)
            listaPalabras = resp.words;
            for(let x = 0; x < listaPalabras.length; x++) {
              if(listaPalabras[x].difficulty == 'EASY') {
                listaPalabras[x].difficulty = 'FACIL'; 
              } if(listaPalabras[x].difficulty == 'MEDIUM') {
                listaPalabras[x].difficulty = 'INTERMEDIA'; 
              } if(listaPalabras[x].difficulty == 'HARD') {
                listaPalabras[x].difficulty = 'DIFICIL';
              }
            }
            // console.log(listaPalabras);
            setData(resp.words)            
        })
        .catch(error=>{
          alert('No ha sido posible comunicarse con el servidor. Inténtelo más tarde.');
          console.log(error.response);
        });
    },[])

    return(
        <div>
            <MaterialTable 
                icons={tableIcons}
                columns={columns}
                options={{debounceInterval: 700, padding: 'dense'}}
                
                
                // data={data}                                 /* Without server-side pagination */ 

                                
                data={query=>                                  /* With server-side pagination */
                  new Promise((resolve, reject) => {
                    // Prepare data and call the resolve like this
                    let url = "http://hangmangame1-palabras.eastus.cloudapp.azure.com:4001/manager/words"; // .../n_pagina/n_registrosDeLaPagina         
                    url += "/" + (query.page + 1);
                    url += "/" + query.pageSize;
                    url += '?'; 

                    if(query.search) {
                      url += `char=${query.search}`; 
                      console.log(url);
                    }

                    if(query.orderBy) {
                      url += `&field=${query.orderBy.field}&order=${query.orderDirection}`; 
                    }

                    fetch(url, {
                      headers: new Headers({
                        'Authorization': localStorage.getItem('TOKEN_AUTH'), 
                      }),
                    }).then(resp=>resp.json()).then(resp=>{
                      console.log(resp);
                      resolve({
                        data: resp.words,
                        page: query.page,
                        totalCount: resp.count
                      });
                    })
                  })
                }

                title='Palabras registradas'
                actions={[
                  {
                      icon: Edit, 
                      tooltip: 'Editar palabra', 
                      onClick: (event, rowData) => 
                      
                      abrirCerrarModalEditar(rowData)
                  },
                  {
                      icon: DeleteOutline, 
                      tooltip: 'Eliminar palabra', 
                      onClick: (event, rowData) => 
                      eliminarPalabra(rowData)
                  },                    
              ]} // actions
                localization={{
                  pagination: {
                      labelDisplayedRows: '{from}-{to} de {count}',
                      labelRowsSelect: 'palabras'
                  },
                  toolbar: {
                      nRowsSelected: '{0} palabra(s) seleccionada(s)', 
                      searchPlaceholder: 'Buscar'
                  },
                  header: {
                      actions: 'Acciones'
                  },
                  body: {
                      emptyDataSourceMessage: 'No hay palabras para mostrar',
                      filterRow: {
                          filterTooltip: 'Filtrar'
                      }
                  }
              }}            
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