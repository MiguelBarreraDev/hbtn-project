import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Record } from "./Record";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

/* Styles */
import "./users.scss";

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'first_name', headerName: 'First name', width: 130 },
    { field: 'last_name', headerName: 'Last name', width: 130 },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 90,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
  ];

export function Users() {
    const URL = "http://localhost:5000/users"
    const [state, setState] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() =>{
        axios.get(URL)
          .then(function (response) {
            setLoading(false)
            setState(response.data.items)
          })
          .catch(function (error) {
            console.log(error)
            setLoading(false)
          })
    },[])    

    return (
        <div className="component-content">
            <h1>Users</h1>
            <nav class="navbar navbar-expand-lg">
                <div class="f-container">
                    <form class="d-flex" role="search">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button class="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </nav>
            <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={state}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[5,10,15]}
                checkboxSelection
            />
            </div>

            <div className="buttons-content">
                <button type="button" class="btn btn-outline-primary">Nuevo</button>
                <div className="separator">&nbsp;</div>
                <button type="button" class="btn btn-outline-dark">Editar</button>
                <button type="button" class="btn btn-outline-danger">Eliminar</button>
            </div>
        </div>
    );
}