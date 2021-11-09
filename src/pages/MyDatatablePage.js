import React, { forwardRef, useState, useEffect } from 'react';
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

async function getUsers() {
    let myUsers = [];
        const response = await axios({
            method: 'get',
            url: 'http://hangmangame1-usuarios.eastus.cloudapp.azure.com:4001/api/users'
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



 function MyDatatablePage() {
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
    const columns = [
        { title: 'Estatus', field: 'active' },
        { title: 'Nombre', field: 'name' },
        { title: 'Correo electónico', field: 'email' }
    ];



    useEffect(()=>{
        fetch('http://hangmangame1-usuarios.eastus.cloudapp.azure.com:4001/api/users')
        .then(resp=>resp.json())
        .then(resp=>{
            console.log(resp)
            setData(resp.users)
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
                        onClick: (event, rowData) => window.confirm('Editando a ' + rowData.name)
                    },
                    {
                        icon: DeleteOutline, 
                        tooltip: 'Eliminar usuario', 
                        onClick: (event, rowData) => window.confirm('Eliminando a ' + rowData.name)
                    },                    
                ]}             
            />
        </div>
    );

} // MyDatatablePage()

export default MyDatatablePage; 