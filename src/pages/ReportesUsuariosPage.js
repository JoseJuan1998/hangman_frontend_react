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

function descargarReporte() {
  alert('Descargando reporte...');
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
      <input id="minDate" style={{ marginRight: '20px' }} type="date"></input>      
      <input id="maxDate" style={{ marginRight: '20px' }} type="date"></input>
      <div className="text-right">
        <MDBBtn color="red" onClick={descargarReporte}>Descargar reporte general</MDBBtn>
      </div>
      <MaterialTable
        icons={tableIcons}
        columns={tableColumns}
        data={data}
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
