import React, { Fragment, useState, forwardRef } from "react";
import { saveAs } from 'file-saver'; 
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


 function setIntervaloDate() {
  console.log('updating date');

  if(document.getElementById('minDate').value) {
    localStorage.setItem('minDate', document.getElementById('minDate').value);
  }

  if(document.getElementById('maxDate').value) {
    localStorage.setItem('maxDate', document.getElementById('maxDate').value);
  }

  if(localStorage.getItem('minDate') && localStorage.getItem('maxDate')) {
    window.location.reload(false);
  }
  

 } //setIntervaloDate()

 async function descargarReporte() {

          axios({
            url: 'http://reportes-icorp.eastus.cloudapp.azure.com:4001/manager/report/users/pdf', //your url
            method: 'GET',
            responseType: 'blob', // important
            headers: {
              Authorization: localStorage.getItem('TOKEN_AUTH')
            }
        }).then((response) => {
          var d = new Date();
          d = new Date(d.getTime() - 3000000);
          var date_format_str = d.getFullYear().toString()+"-"+((d.getMonth()+1).toString().length==2?(d.getMonth()+1).toString():"0"+(d.getMonth()+1).toString())+"-"+(d.getDate().toString().length==2?d.getDate().toString():"0"+d.getDate().toString())+" "+(d.getHours().toString().length==2?d.getHours().toString():"0"+d.getHours().toString())+":"+((parseInt(d.getMinutes()/5)*5).toString().length==2?(parseInt(d.getMinutes()/5)*5).toString():"0"+(parseInt(d.getMinutes()/5)*5).toString())+":00";
          console.log(date_format_str);
        
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'users_report_' + date_format_str + '.pdf'); //or any other extension
            document.body.appendChild(link);
            link.click();
        });

    } // descargarReporte()

const originalData = [
  {
    user: "edgarhuemac@gmail.com",
    word: "MANZANA",
    action: "Insertada", 
    date: "16-05-2021", 
    time: "12:30 hrs"
  }, 
  {
    user: "jeffstoever@gmail.com",
    word: "FUTBOL",
    action: "Insertada", 
    date: "05-12-2020", 
    time: "22:10 hrs"
  }, 
  {
    user: "jeffstoever@gmail.com",
    word: "FUTBOLITO",
    action: "Editada", 
    date: "05-12-2020", 
    time: "22:15 hrs"
  }
];


export default function CustomEditComponent(props) {

  

  const [data, setData] = useState(originalData);

  const tableColumns = [
    { title: "Usuario", field: "user" },
    { title: "Palabra", field: "word" },
    { title: "Acción", field: "action" },
    { title: "Fecha", field: "date" },
    { title: "Hora", field: "time" },

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

  

  return (
    
    <Fragment>
      
      <br /><br />      
      <MDBContainer>
      <p style={{ fontWeight: "bold" }}>Filtrar desde / Hasta </p>
      <input id="minDate" onChange={setIntervaloDate} style={{ marginRight: '20px' }} type="date"></input>      
      <input id="maxDate" onChange={setIntervaloDate} style={{ marginRight: '20px' }} type="date"></input>
      <div className="text-right">
        <MDBBtn color="red" onClick={descargarReporte}>Descargar reporte general</MDBBtn>
      </div>
      <MaterialTable
        icons={tableIcons}
        columns={tableColumns}
        
        // data={data}

        data={query=>                            /* With server-side pagination */
          new Promise((resolve, reject) => {
            // Prepare data and call the resolve like this
            let url = "http://reportes-icorp.eastus.cloudapp.azure.com:4001/manager/report/users"; // .../n_pagina/n_registrosDeLaPagina         
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

            if(localStorage.getItem('minDate') && localStorage.getItem('maxDate')) {
              url += `&min_date=${localStorage.getItem('minDate')}&max_date=${localStorage.getItem('maxDate')}`; 
              document.getElementById('minDate').value = localStorage.getItem('minDate');
              document.getElementById('maxDate').value = localStorage.getItem('maxDate');
              localStorage.removeItem('minDate');
              localStorage.removeItem('maxDate');
            }

            fetch(url, {
              headers: new Headers({
                'Authorization': localStorage.getItem('TOKEN_AUTH'), 
              }),
            }).then(resp=>resp.json()).then(resp => {
                  
                for(let x = 0; x < resp.users_reports.length; x++) {
                  let thisDate = resp.users_reports[x].date.split("T")[0];
                  let thisTime = resp.users_reports[x].date.split("T")[1] + ' hrs';
                  console.log([thisDate, thisTime])                  
                  resp.users_reports[x].date = thisDate
                  resp.users_reports[x].time = thisTime
                  // resp.users_reports[x].time = (resp.users_reports[x].date.split("T")[1]).toString();
                  

                }

                 for(let x = 0; x < resp.users_reports.length; x++) {
                   if(resp.users_reports[x].action == "INSERT" ) {
                     resp.users_reports[x].action = "Insertada";
                   } else if(resp.users_reports[x].action == "UPDATE" ) {
                     resp.users_reports[x].action = "Actualizada"; 
                   }              
                 }
               console.log(resp.users_reports);
              // console.log(resp.users.length);
              resolve({
                data: resp.users_reports,
                page: query.page,
                totalCount: resp.count
              });
            })
          })
        } 



        title="Reporte de usuarios"
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
  );
}
