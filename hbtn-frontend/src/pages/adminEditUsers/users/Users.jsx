import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

/* Styles */
import "./users.scss";

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'first_name', headerName: 'First name', width: 130 },
    { field: 'last_name', headerName: 'Last name', width: 130 },

    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.first_name || ''} ${params.row.last_name || ''}`,
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
            <nav className="navbar navbar-expand-lg">
                <div className="f-container">
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </nav>
            <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={state}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                checkboxSelection
            />
            </div>

            <div className="buttons-content">
                <button type="button" className="btn btn-outline-primary">Nuevo</button>
                <div className="separator">&nbsp;</div>
                <button type="button" className="btn btn-outline-dark">Editar</button>
                <button type="button" className="btn btn-outline-danger">Eliminar</button>
            </div>
        </div>
    );
}