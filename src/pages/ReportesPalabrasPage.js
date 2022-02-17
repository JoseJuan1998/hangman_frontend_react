import React, { Fragment, useState, forwardRef } from "react";
import {
  MDBEdgeHeader,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBJumbotron,
  MDBIcon,
  MDBAnimation,
  MDBBtn, 
} from 'mdbreact';
import MaterialTable from "material-table";

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
import DatePickerPage from "./DatePickerPage";


function validateUser() {       
  let permissions = localStorage.getItem('userType');
  if(permissions != 1) {
    return false;
  } else {
    return true;
  }
}

function setIntervaloJugada() {  
  console.log('updating');
  if(document.getElementById('minJugada').value) {
    let positiveInteger = /^([0-9]*)$/.test(document.getElementById('minJugada').value);
    if(!positiveInteger) {
      alert('not positive integer integer');
    }

    localStorage.setItem('minJugada', document.getElementById('minJugada').value);
  }
  if(document.getElementById('maxJugada').value) {
    localStorage.setItem('maxJugada', document.getElementById('maxJugada').value);
  }
  if(localStorage.getItem('minJugada') && localStorage.getItem('maxJugada')) {
    window.location.reload(false);
  }
} // setIntervaloJugada()

function setIntervaloAdivinada() {
  console.log('updating');
  if(document.getElementById('minAdivinada').value) {
    localStorage.setItem('minAdivinada', document.getElementById('minAdivinada').value);
  }
  if(document.getElementById('maxAdivinada').value) {
    localStorage.setItem('maxAdivinada', document.getElementById('maxAdivinada').value);
  }
  if(localStorage.getItem('minAdivinada') && localStorage.getItem('maxAdivinada')) {
    window.location.reload(false);
  }
} // setIntervaloAdivinada()



async function descargarReporte() {

  axios({
    url: 'http://localhost:4003/manager/report/words/pdf', //your url
    method: 'GET',
    responseType: 'blob', // important
    headers: {
      Authorization: "Bearer " + localStorage.getItem('TOKEN_AUTH')
    }
}).then((response) => {

  var d = new Date();
  d = new Date(d.getTime() - 3000000);
  var date_format_str = d.getFullYear().toString()+"-"+((d.getMonth()+1).toString().length==2?(d.getMonth()+1).toString():"0"+(d.getMonth()+1).toString())+"-"+(d.getDate().toString().length==2?d.getDate().toString():"0"+d.getDate().toString())+" "+(d.getHours().toString().length==2?d.getHours().toString():"0"+d.getHours().toString())+":"+((parseInt(d.getMinutes()/5)*5).toString().length==2?(parseInt(d.getMinutes()/5)*5).toString():"0"+(parseInt(d.getMinutes()/5)*5).toString())+":00";
  console.log(date_format_str);

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'words_report_' + date_format_str + '.pdf'); //or any other extension
    document.body.appendChild(link);
    link.click();
});

} // descargarReporte()

const originalData = [
  {
    word: "MANZANA",
    user: "edgarhuemac@gmail.com",
    played: 30, 
    guessed: 12
  }, 
  {
    word: "FUTBOL",
    user: "jeffstoever@gmail.com",
    played: 24, 
    guessed: 7
  }, 
  {
    word: "FUTBOLITO",
    user: "jeffstoever@gmail.com",
    played: 16, 
    guessed: 10
  }
];


export default function CustomEditComponent(props) {

  
  const [value, setValue] = useState();

  const refresh = ()=>{
    console.log('refresh');
    // window.location.reload();
    // re-renders the component
    setValue({});
}

  const [data, setData] = useState(originalData);

  const tableColumns = [
    { title: "Palabra", field: "word" },
    { title: "Usuario propietario", field: "user" },
    { title: "Veces jugada", field: "played" },
    { title: "Veces adivinada", field: "guessed" },

    /* {
      title: "Date",
      field: "date",
      type: "date",
      dateSetting: { locale: "en-GB" },
      filterComponent: (props) => <CustomDatePicker {...props} />
    } */
  ];


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
    let inputStyles = {
      marginRight: '20px', 
      marginBottom: '10px',
      width: '160px',
      border: 0, 
      padding: '5px',
      boxShadow: '2px 2px 6px #bbbbbb',
      borderRadius: '5px'
          
    };
  
  if(!validateUser()) {
    window.location.replace('/');
  } else {

  
  return (
    <Fragment>
      
      <br /><br />      
      <MDBContainer>
      <input placeholder="Min. Jugada" id="minJugada" onInput={setIntervaloJugada} style={inputStyles} type="number" min="0" pattern="[0-9]+"></input>      
      <input placeholder="Max. Jugada" id="maxJugada" onInput={setIntervaloJugada} style={inputStyles} type="number" min="0" pattern="[0-9]+"></input>
      <br />
      <input placeholder="Min. Adivinada" id="minAdivinada" onInput={setIntervaloAdivinada} style={inputStyles} type="number" min="0" pattern="[0-9]+"></input>      
      <input placeholder="Max. Adivinada" id="maxAdivinada" onInput={setIntervaloAdivinada} style={inputStyles} type="number" min="0" pattern="[0-9]+"></input>

      <div className="text-right">
        <MDBBtn color="red" onClick={descargarReporte}>Descargar reporte general</MDBBtn>
      </div>
      <MaterialTable
        id='reportesPalabras'
        icons={tableIcons}
        columns={tableColumns}
        
        
        data={query=>                            /* With server-side pagination */
          new Promise((resolve, reject) => {
            // Prepare data and call the resolve like this
            let url = "http://localhost:4003/manager/report/words"; // .../n_pagina/n_registrosDeLaPagina         
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

            if(localStorage.getItem('minJugada') && localStorage.getItem('maxJugada')) {
              url += `&min_played=${localStorage.getItem('minJugada')}&max_played=${localStorage.getItem('minJugada')}`;
              document.getElementById('minJugada').value = localStorage.getItem('minJugada');
              document.getElementById('maxJugada').value = localStorage.getItem('maxJugada');
              localStorage.removeItem('minJugada');
              localStorage.removeItem('maxJugada');
            }

            if(localStorage.getItem('minAdivinada') && localStorage.getItem('maxAdivinada')) {
              url += `&min_guessed=${localStorage.getItem('minAdivinada')}&max_guessed=${localStorage.getItem('maxAdivinada')}`;
              document.getElementById('minAdivinada').value = localStorage.getItem('minAdivinada');
              document.getElementById('maxAdivinada').value = localStorage.getItem('maxAdivinada');
              localStorage.removeItem('minAdivinada');
              localStorage.removeItem('maxAdivinada');
            }

            fetch(url, {
              headers: new Headers({
                'Authorization': "Bearer " + localStorage.getItem('TOKEN_AUTH'), 
              }),
            }).then(resp=>resp.json()).then(resp => {
              console.log(resp.words_reports);
              // console.log(resp.users.length);
              if(resp.words_reports) {
                resolve({
                  data: resp.words_reports,
                  page: query.page,
                  totalCount: resp.count
                });
              } else {
                resolve({
                  data: [],
                  page: 0,
                  totalCount: 0
                });
              }
            })
            .catch(error=>{
              resolve({
                data: [],
                page: 0,
                totalCount: 0
              });
            });
          })
        } 
        
        
        title="Reporte de palabras"
        options={{ search: true, filtering: false }}
        localization={{
          pagination: {
              labelDisplayedRows: '{from}-{to} de {count}',
              labelRowsSelect: 'registros'
          },
          toolbar: {
              nRowsSelected: '{0} registro(s) seleccionado(s)', 
              searchPlaceholder: 'Buscar'
          },
          header: {
              actions: 'Acciones'
          },
          body: {
              emptyDataSourceMessage: 'No hay registros para mostrar',
              filterRow: {
                  filterTooltip: 'Filtrar'
              }
          }
      }} 
      />      
    </MDBContainer>
    </Fragment>
  ); // return
}
}
